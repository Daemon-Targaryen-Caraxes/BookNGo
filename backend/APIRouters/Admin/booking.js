import express from "express";
import mongoose from "mongoose";

const booking = express.Router();

const bookingSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    mode: { type: String, required: true },
    name: { type: String, required: true },
    no: { type: String, required: true },
    Class: { type: String, required: true },
    passengerName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    dob: { type: Date, required: true },
    aadhaar: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    bookingDateTime: { type: Date, required: true },
  },
  { timestamps: true } 
);

const Booking = mongoose.model("Booking", bookingSchema);

booking.post("/add", async (req, res) => {
  const {
    from,
    to,
    time,
    date,
    amount,
    mode,
    name,
    no,
    Class,
    passengerName,
    phoneNo,
    dob,
    aadhaar,
    age,
    gender,
    bookingDateTime,
  } = req.body;

  console.log("Received booking data:", req.body); // Log the incoming data

  try {
    const newBooking = new Booking({
      from,
      to,
      time,
      date,
      amount,
      mode,
      name,
      no,
      Class,
      passengerName,
      phoneNo,
      dob,
      aadhaar,
      age,
      gender,
      bookingDateTime: bookingDateTime || new Date(), // Use the passed booking date or current date
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (err) {
    console.error("Error during booking creation:", err);
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

export default booking;
