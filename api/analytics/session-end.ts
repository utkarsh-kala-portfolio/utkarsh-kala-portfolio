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
    // Support parsing parameters from either JSON body or plain text (useful for sendBeacon)
    let payload = req.body;
    if (typeof payload === "string") {
      try {
        payload = JSON.parse(payload);
      } catch (parseErr) {
        // Handled below
      }
    }

    const { sessionId, exitRoute, timestamp } = payload || {};

    if (!sessionId) {
      return res.status(400).json({ success: false, error: "sessionId is required" });
    }

    const endDate = timestamp ? new Date(timestamp) : new Date();

    const sessionRecord = await db.collection("portfolio_sessions").findOne({ sessionId });

    if (sessionRecord) {
      const startedTime = new Date(sessionRecord.startedAt).getTime();
      const computedDurationMs = endDate.getTime() - startedTime;

      await db.collection("portfolio_sessions").updateOne(
        { sessionId },
        {
          $set: {
            endedAt: endDate,
            lastActivityAt: endDate,
            exitRoute: exitRoute || sessionRecord.exitRoute || "/",
            durationMs: Math.max(0, computedDurationMs),
            updatedAt: new Date(),
          }
        }
      );
    }

    return res.status(200).json({ success: true, message: "Session ended successfully" });
  } catch (err: any) {
    console.error("Failed to end session analytics:", err);
    return res.status(200).json({ success: false, error: err.message || "Failed to end session" });
  }
}
