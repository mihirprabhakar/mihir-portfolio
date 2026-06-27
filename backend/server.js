const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ── Nodemailer transporter (Gmail) ──
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,   // your Gmail address
    pass: process.env.GMAIL_PASS,   // Gmail App Password (not your real password)
  },
});

// ── POST /api/contact ──
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Mail to YOU (portfolio owner)
  const toOwner = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `📩 New Portfolio Message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #e0e0e0;border-radius:10px;">
        <h2 style="color:#6c63ff;">New Message — Mihir's Portfolio</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;width:80px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f8f8f8;border-radius:8px;">
          <p style="color:#555;white-space:pre-wrap;">${message}</p>
        </div>
        <p style="margin-top:16px;font-size:12px;color:#bbb;">Sent via mihirprabhakar.dev portfolio contact form</p>
      </div>
    `,
  };

  // Auto-reply to sender
  const toSender = {
    from: `"Mihir Prabhakar" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! `,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #e0e0e0;border-radius:10px;">
        <h2 style="color:#6c63ff;">Hey ${name}! </h2>
        <p style="color:#555;">Thanks for reaching out through my portfolio. I've received your message and will get back to you as soon as possible — usually within 24 hours.</p>
        <div style="margin:20px 0;padding:16px;background:#f8f8f8;border-radius:8px;">
          <p style="color:#888;font-size:13px;margin-bottom:6px;">Your message:</p>
          <p style="color:#555;white-space:pre-wrap;">${message}</p>
        </div>
        <p style="color:#555;">Meanwhile, feel free to check out my work:</p>
        <div style="margin-top:12px;display:flex;gap:12px;">
          <a href="https://github.com/mihirprabhakar" style="color:#6c63ff;font-weight:600;">GitHub</a> &nbsp;·&nbsp;
          <a href="https://www.linkedin.com/in/mihir-prabhakar-952869291/" style="color:#6c63ff;font-weight:600;">LinkedIn</a>
        </div>
        <p style="margin-top:24px;color:#888;font-size:13px;">— Mihir Prabhakar<br>Full Stack Developer | B.Tech CSE</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(toOwner);
    await transporter.sendMail(toSender);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

// ── Health check ──
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));