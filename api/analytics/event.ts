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
    const events = Array.isArray(req.body) ? req.body : [req.body];

    if (events.length === 0) {
      return res.status(400).json({ success: false, error: "No events provided" });
    }

    const processedEvents = [];

    for (const event of events) {
      const {
        eventId,
        anonymousUserId,
        sessionId,
        eventType,
        eventName,
        route,
        path,
        title,
        timestamp,
        durationMs,
        element,
        eventPayload,
        utm,
        referrer,
        device,
        browser,
        os,
        viewport,
        host,
      } = event;

      // Basic validation
      if (!anonymousUserId || !sessionId || !eventType || !eventName || !timestamp) {
        continue; // Skip invalid event payload
      }

      const eventDate = new Date(timestamp);

      // 1. Resolve identified user by anonymous ID
      let linkedInProfileId = null;
      const visitorRecord = await db.collection("portfolio_visitors").findOne({ anonymousUserId });
      if (visitorRecord?.linkedInProfileId) {
        linkedInProfileId = visitorRecord.linkedInProfileId;
      } else {
        const profile = await db.collection("portfolio_linkedin_profiles").findOne({
          $or: [
            { anonymousUserId },
            { mergedAnonymousIds: anonymousUserId }
          ]
        });
        if (profile) {
          linkedInProfileId = profile.linkedInProfileId;
        }
      }

      // 2. Upsert session
      const sessionRecord = await db.collection("portfolio_sessions").findOne({ sessionId });
      let isNewSession = false;

      if (!sessionRecord) {
        isNewSession = true;
        await db.collection("portfolio_sessions").insertOne({
          sessionId,
          anonymousUserId,
          linkedInProfileId,
          startedAt: eventDate,
          endedAt: null,
          lastActivityAt: eventDate,
          durationMs: 0,
          entryRoute: route || "/",
          exitRoute: route || "/",
          referrer: referrer || "",
          utm: utm || {},
          device: device || "desktop",
          browser: browser || "",
          os: os || "",
          viewport: viewport || {},
          pageViewCount: eventType === "page_view" ? 1 : 0,
          eventCount: 1,
          host: host || "unknown",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        const startedTime = new Date(sessionRecord.startedAt).getTime();
        const computedDurationMs = eventDate.getTime() - startedTime;
        await db.collection("portfolio_sessions").updateOne(
          { sessionId },
          {
            $set: {
              lastActivityAt: eventDate,
              durationMs: Math.max(0, computedDurationMs),
              exitRoute: route || sessionRecord.exitRoute,
              updatedAt: new Date(),
            },
            $setOnInsert: {
              linkedInProfileId,
              host: host || "unknown",
            },
            $inc: {
              eventCount: 1,
              pageViewCount: eventType === "page_view" ? 1 : 0,
            },
          }
        );
      }

      // 3. Upsert visitor
      if (!visitorRecord) {
        await db.collection("portfolio_visitors").insertOne({
          anonymousUserId,
          linkedInProfileId,
          firstSeenAt: eventDate,
          lastSeenAt: eventDate,
          firstReferrer: referrer || "",
          firstUTM: utm || {},
          latestUTM: utm || {},
          deviceSummary: device || "desktop",
          sessionCount: 1,
          eventCount: 1,
          isIdentified: !!linkedInProfileId,
          firstHost: host || "unknown",
          latestHost: host || "unknown",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        await db.collection("portfolio_visitors").updateOne(
          { anonymousUserId },
          {
            $set: {
              lastSeenAt: eventDate,
              latestUTM: utm || visitorRecord.latestUTM,
              isIdentified: visitorRecord.isIdentified || !!linkedInProfileId,
              linkedInProfileId: visitorRecord.linkedInProfileId || linkedInProfileId,
              latestHost: host || visitorRecord.latestHost || "unknown",
              updatedAt: new Date(),
            },
            $inc: {
              eventCount: 1,
              sessionCount: isNewSession ? 1 : 0,
            },
          }
        );
      }

      // 4. Insert event
      const eventToInsert = {
        eventId,
        anonymousUserId,
        sessionId,
        linkedInProfileId,
        eventType,
        eventName,
        route: route || "/",
        path: path || "/",
        title: title || "",
        timestamp: eventDate,
        durationMs: durationMs || 0,
        element: element || {},
        eventPayload: eventPayload || {},
        utm: utm || {},
        referrer: referrer || "",
        device: device || "desktop",
        browser: browser || "",
        viewport: viewport || {},
        host: host || "unknown",
        createdAt: new Date(),
      };

      await db.collection("portfolio_events").insertOne(eventToInsert);
      processedEvents.push(eventId);
    }

    return res.status(200).json({ success: true, count: processedEvents.length });
  } catch (err: any) {
    console.error("Failed to process event analytics:", err);
    // Graceful error response so frontend doesn't crash
    return res.status(200).json({ success: false, error: err.message || "Failed to process events" });
  }
}
