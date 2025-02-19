import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();
let otpStore = {};

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'bookngowebsite@gmail.com', 
    pass:'bookngo123', 
  },
});

// Generate OTP and send to email
router.post("/generate", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = otp; // Store OTP temporarily

  setTimeout(() => delete otpStore[email], 5 * 60 * 1000); // Expire OTP in 5 minutes

  const mailOptions = {
    from: 'bookngowebsite@gmail.com',
    to: email,
    subject: "Your OTP for Sign Up",
    text: `Your OTP for verification is: ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ error: "Failed to send OTP", details: error.message });
  }
});

// Verify OTP
router.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP or OTP expired" });
  }
});

export default router;
