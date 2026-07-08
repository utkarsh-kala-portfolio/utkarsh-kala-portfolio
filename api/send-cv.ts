import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
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

  const { email, name, topic, pageUrl } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address" });
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ success: false, error: "Invalid name" });
  }

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ success: false, error: "Invalid topic" });
  }

  const gmailEmail = process.env.GMAIL_EMAIL || "utkarsh.kala.9@gmail.com";
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailAppPassword) {
    return res.status(500).json({ success: false, error: "GMAIL_APP_PASSWORD not configured" });
  }

  const rawPageUrl = pageUrl || "https://utkarshkala.in";
  let displayUrl = "utkarshkala.in";
  try {
    const parsed = new URL(rawPageUrl);
    displayUrl = parsed.hostname + (parsed.pathname === "/" ? "" : parsed.pathname);
  } catch (e) {
    displayUrl = "utkarshkala.in";
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailEmail,
      pass: gmailAppPassword,
    },
  });

  const downloadLink = "https://utkarshkala.in/Utkarsh_Kala_CV.pdf";

  const mailOptions = {
    from: `"Utkarsh Kala" <${gmailEmail}>`,
    to: email,
    cc: "utkarsh.kala.9@gmail.com",
    subject: `Requested CV: ${topic} - Utkarsh Kala`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #4f46e5;">Hello ${name},</h2>
        <p>Thank you for requesting a copy of my CV from my portfolio website (<a href="${rawPageUrl}" style="color: #4f46e5; text-decoration: none;">${displayUrl}</a>) regarding your interest in <strong>${topic}</strong>.</p>
        <p>You can download and view my CV directly by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${downloadLink}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Download CV (PDF)</a>
        </div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="margin-bottom: 5px;">Best regards,</p>
        <p style="font-weight: bold; margin-top: 0;">Utkarsh Kala</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email via Gmail SMTP:", error);
    return res.status(500).json({ success: false, error: "Failed to send email" });
  }
}
