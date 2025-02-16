import express from "express";
import mongoose from "mongoose";

const booking = express.Router();

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true, get: (v) => v.toISOString().split("T")[0] },
    amount: { type: Number, required: true },
    mode: { type: String, required: true, enum: ["bus", "train", "flight"] },
    name: { type: String, required: true },
    no: { type: String, required: true },
    Class: { type: String, required: true },
    passengerName: { type: String, required: true },
    phoneNo: { type: String, required: true, match: [/^\d{10}$/, "Invalid phone number"] },
    dob: { type: Date, required: true },
    aadhaar: { type: String, required: true, match: [/^\d{12}$/, "Invalid Aadhaar number"] },
    age: { type: Number, required: true, min: 1, max: 120 },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    bookingDateTime: { type: Date, default: Date.now },
    seatId: { type: String, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
booking.post("/add", async (req, res) => {
  console.log("Received Data:", req.body);
  try {
    if (!req.body.date) {
      return res.status(400).json({ error: "Date is required" });
    }
    req.body.date = new Date(req.body.date);
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (err) {
    console.error("Error Saving Booking:", err.message);
    res.status(500).json({ error: "Failed to create booking", details: err.message });
  }
});


booking.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err });
  }
});

booking.get("/search/:phoneNo", async (req, res) => {
  const { phoneNo } = req.params;
  try {
    const bookings = await Booking.find({ phoneNo });
    if (bookings.length > 0) {
      res.json(bookings);
    } else {
      res.status(404).json({ error: "No bookings found for this phone number" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err });
  }
});

booking.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch booking", details: err });
  }
});

booking.get("/history/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId: userId }).sort({ bookingDateTime: -1 });

    if (bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ error: "Failed to fetch booking history" });
  }
});

export default booking;
