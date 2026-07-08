import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const { profileData, anonymousUserId, sessionId } = req.body;

    if (!profileData || !profileData.sub) {
      return res.status(400).json({ success: false, error: "LinkedIn profile data with unique ID (sub) is required" });
    }

    if (!anonymousUserId) {
      return res.status(400).json({ success: false, error: "anonymousUserId is required" });
    }

    const linkedInProfileId = profileData.sub;
    const now = new Date();

    // 1. Find existing LinkedIn profile
    const existingProfile = await db.collection("portfolio_linkedin_profiles").findOne({ linkedInProfileId });
    let mergedAnonymousIds = [anonymousUserId];
    let sessionIds = sessionId ? [sessionId] : [];

    if (existingProfile) {
      // Merge IDs
      mergedAnonymousIds = Array.from(new Set([...existingProfile.mergedAnonymousIds, anonymousUserId]));
      if (sessionId) {
        sessionIds = Array.from(new Set([...(existingProfile.sessionIds || []), sessionId]));
      }

      await db.collection("portfolio_linkedin_profiles").updateOne(
        { linkedInProfileId },
        {
          $set: {
            name: profileData.name || existingProfile.name,
            email: profileData.email || existingProfile.email,
            profileUrl: profileData.linkedin_url || existingProfile.profileUrl || "",
            headline: profileData.headline || existingProfile.headline || "",
            picture: profileData.picture || existingProfile.picture || "",
            linkedInRaw: profileData,
            sessionIds,
            mergedAnonymousIds,
            lastCapturedAt: now,
            updatedAt: now,
          }
        }
      );
    } else {
      await db.collection("portfolio_linkedin_profiles").insertOne({
        linkedInProfileId,
        anonymousUserId,
        sessionIds,
        linkedInRaw: profileData,
        name: profileData.name || "",
        email: profileData.email || "",
        profileUrl: profileData.linkedin_url || "",
        headline: profileData.headline || "",
        picture: profileData.picture || "",
        firstCapturedAt: now,
        lastCapturedAt: now,
        mergedAnonymousIds,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Retrieve full profile from database
    const finalProfile = await db.collection("portfolio_linkedin_profiles").findOne({ linkedInProfileId });

    // 2. Update visitors linked to all merged anonymous user IDs
    await db.collection("portfolio_visitors").updateMany(
      { anonymousUserId: { $in: mergedAnonymousIds } },
      {
        $set: {
          linkedInProfileId,
          isIdentified: true,
          updatedAt: now,
        }
      }
    );

    // 3. Update prior sessions linked to all merged anonymous user IDs
    await db.collection("portfolio_sessions").updateMany(
      { anonymousUserId: { $in: mergedAnonymousIds } },
      {
        $set: {
          linkedInProfileId,
          updatedAt: now,
        }
      }
    );

    // 4. Backtrace and update all prior events linked to all merged anonymous user IDs
    await db.collection("portfolio_events").updateMany(
      { anonymousUserId: { $in: mergedAnonymousIds } },
      {
        $set: {
          linkedInProfileId,
        }
      }
    );

    return res.status(200).json({
      success: true,
      message: "LinkedIn identity linked and historical activity backfilled successfully.",
      profile: finalProfile
    });
  } catch (err: any) {
    console.error("Failed to link LinkedIn profile and identify user:", err);
    return res.status(200).json({ success: false, error: err.message || "Failed to identify user" });
  }
}
