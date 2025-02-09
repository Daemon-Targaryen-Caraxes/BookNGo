require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

let otpStorage = {};

app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length !== 10 || isNaN(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStorage[phone] = otp;

  try {
    await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (otpStorage[phone] && otpStorage[phone] === otp) {
    delete otpStorage[phone];
    res.json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

app.post("/user/signup", (req, res) => {
  const { phone, username, aadhaar, password, confirmPassword } = req.body;
  if (!username || !phone || !aadhaar || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }
  if (!otpStorage[phone]) {
    return res.status(400).json({ error: "OTP verification required." });
  }
  delete otpStorage[phone];
  res.json({ message: "Sign-Up Successful!" });
});
