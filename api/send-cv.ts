import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

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

  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address" });
  }

  const gmailEmail = process.env.GMAIL_EMAIL || "utkarsh.kala.9@gmail.com";
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailAppPassword) {
    return res.status(500).json({ success: false, error: "GMAIL_APP_PASSWORD not configured" });
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
    subject: "Requested CV - Utkarsh Kala",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #4f46e5;">Hello,</h2>
        <p>Thank you for requesting a copy of my CV from my portfolio website (<a href="https://utkarshkala.in" style="color: #4f46e5; text-decoration: none;">utkarshkala.in</a>).</p>
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
