import express from "express";
import mongoose from "mongoose";
const transportRouter = express.Router();

transportRouter.use(express.json());

const transportSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  number: { type: String, required: true },
  name: { type: String, required: true },
  normalSeats: { type: Number, default: 0 },
  normalSeatAmount: { type: Number, required: true },
  acSeats: { type: Number, default: 0 },
  acSeatAmount: { type: Number, required: function() { return this.mode === 'train' } },
  sleeperSeats: { type: Number, default: 0 },
  sleeperSeatAmount: { type: Number, required: true },
  businessSeats: { type: Number, default: 0 },
  businessSeatAmount: { type: Number, required: function() { return this.mode === 'flight'; } },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  mode: { type: String, required: true, enum: ['bus', 'train', 'flight'] },
});

const Transport = mongoose.model('Transport', transportSchema);
transportRouter.post('/add-transport', async (req, res) => {
  try {
    const newTransportData = req.body;
    if (newTransportData.mode === 'bus') {
      if (!newTransportData.sleeperSeats || !newTransportData.sleeperSeatAmount) {
        return res.status(400).json({ message: 'Sleeper seat data is required for bus mode.' });
      }
    } 
    else if (newTransportData.mode === 'train') {
      if (!newTransportData.acSeats || !newTransportData.acSeatAmount) {
        return res.status(400).json({ message: 'AC seat data is required for train/flight mode.' });
      }
    }
    const newTransport = new Transport(newTransportData);
    console.log('Transport data to be saved:', newTransport);
    await newTransport.save();
    res.status(201).json({ message: 'Transport added successfully!' });
  } catch (err) {
    console.error('Error adding transport:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Decrease seat route
transportRouter.put('/decreaseseat', async (req, res) => {
  try {
    const { from, to, date, number, seatType } = req.body;

    if (!from || !to || !date || !number || !seatType) {
      return res.status(400).json({ message: 'Missing required fields: from, to, date, number, seatType' });
    }

    const transport = await Transport.findOne({ from, to, date, number });
    if (!transport) {
      return res.status(404).json({ message: 'No matching transport found for the given criteria' });
    }

    const normalizedSeatType = seatType.toLowerCase();

    // Decrease seat count based on type
    if (normalizedSeatType === 'normal' && transport.normalSeats > 0) {
      transport.normalSeats -= 1;
    } else if (normalizedSeatType === 'ac' && transport.acSeats > 0) {
      transport.acSeats -= 1;
    } else if (normalizedSeatType === 'sleeper' && transport.sleeperSeats > 0) {
      transport.sleeperSeats -= 1;
    } else if (normalizedSeatType === 'business' && transport.businessSeats > 0) {
      transport.businessSeats -= 1;
    } else {
      return res.status(400).json({ message: 'Invalid seat type or no seats available' });
    }

    await transport.save();
    res.status(200).json({ message: 'Seat successfully decreased', transport });
  } catch (err) {
    console.error('Error decreasing seat:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get transport route
transportRouter.post('/get-transport', async (req, res) => {
  try {
    const { from, to, date, mode } = req.body;
    const data = await Transport.find({ from, to, date, mode });
    res.json(data);
  } catch (err) {
    console.error('Error fetching transport:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get all transport route
transportRouter.get('/transport', async (req, res) => {
  try {
    const transport = await Transport.find();
    if (!transport || transport.length === 0) {
      return res.status(404).json({ error: 'Transport data not found' });
    }
    res.json(transport);
  } catch (err) {
    console.error('Error in /transport:', err);
    res.status(500).json({ error: 'Failed to fetch transport document' });
  }
});

export default transportRouter;
