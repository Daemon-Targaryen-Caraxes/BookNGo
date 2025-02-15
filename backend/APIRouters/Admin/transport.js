import express from "express";
import mongoose from "mongoose";
const transportRouter = express.Router();

transportRouter.use(express.json());

const transportSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  number: { type: String, required: true },
  name: { type: String, required: true },
  normalSeats: { type: Number, required: true },
  normalSeatAmount: { type: Number, required: true },
  acSeats: { type: Number },
  acSeatAmount: { type: Number },
  sleeperSeats: { type: Number },
  sleeperSeatAmount: { type: Number },
  businessSeats: { type: Number },
  businessSeatAmount: { type: Number },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  mode: { type: String, required: true, enum: ['bus', 'train', 'flight'] },
});

const Transport = mongoose.model('Transport', transportSchema);

transportRouter.get('/', (req, res) => {
  res.send("Welcome to transport API endpoint!!!");
});

transportRouter.post('/add-transport', async (req, res) => {
  try {
    const newTransportData = req.body;

    if (newTransportData.mode === 'bus') {
      if (!newTransportData.sleeperSeats || !newTransportData.sleeperSeatAmount) {
        return res.status(400).json({ message: 'Sleeper seat data is required for bus mode.' });
      }
    } else if (newTransportData.mode === 'train' || newTransportData.mode === 'flight') {
      if (!newTransportData.acSeats || !newTransportData.acSeatAmount) {
        return res.status(400).json({ message: 'AC seat data is required for train/flight mode.' });
      }
      if (newTransportData.mode === 'flight' && !newTransportData.businessSeats) {
        return res.status(400).json({ message: 'Business class seat data is required for flight mode.' });
      }
    }

    const newTransport = new Transport(newTransportData);
    await newTransport.save();
    res.status(201).json({ message: 'Transport added successfully!' });
  } catch (err) {
    console.error('Error adding transport:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

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
