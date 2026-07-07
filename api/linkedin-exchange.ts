import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

// Manually parse .env.local in local dev if environment variables are not injected by the CLI host
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || "";
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (err) {
  console.error("Failed to load .env.local manually in API:", err);
}

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

  const { code, redirectUri } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Authorization code is required" });
  }

  if (!redirectUri) {
    return res.status(400).json({ success: false, error: "Redirect URI is required" });
  }

  const clientId = process.env.VITE_LINKEDIN_CLIENT_ID || process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      success: false,
      error: "CREDENTIALS_MISSING",
      message: "LinkedIn OAuth credentials (LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET) are not configured in Vercel environment variables."
    });
  }

  try {
    // 1. Exchange auth code for access token
    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("LinkedIn token exchange error response:", errorText);
      return res.status(400).json({
        success: false,
        error: "TOKEN_EXCHANGE_FAILED",
        message: "Failed to exchange authorization code for access token.",
        details: errorText
      });
    }

    const tokenData = await tokenResponse.json() as { access_token: string; expires_in?: number };
    const accessToken = tokenData.access_token;

    // 2. Use access token to fetch user profile via OIDC
    const userinfoResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userinfoResponse.ok) {
      const errorText = await userinfoResponse.text();
      console.error("LinkedIn userinfo error response:", errorText);
      return res.status(400).json({
        success: false,
        error: "USERINFO_FETCH_FAILED",
        message: "Failed to retrieve LinkedIn user profile data.",
        details: errorText
      });
    }

    const userInfo = await userinfoResponse.json() as {
      sub: string;
      name: string;
      given_name?: string;
      family_name?: string;
      picture?: string;
      email?: string;
      email_verified?: boolean;
    };

    return res.status(200).json({
      success: true,
      data: {
        id: userInfo.sub,
        name: userInfo.name,
        given_name: userInfo.given_name || userInfo.name.split(" ")[0] || "",
        family_name: userInfo.family_name || userInfo.name.split(" ").slice(1).join(" ") || "",
        email: userInfo.email || "",
        picture: userInfo.picture || "",
        access_token: accessToken,
      }
    });
  } catch (error) {
    console.error("LinkedIn exchange server error:", error);
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: error instanceof Error ? error.message : "An unexpected server error occurred."
    });
  }
}
