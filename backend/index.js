import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./User/user.js";
import adminRouter from "./Admin/admin.js";
const app = express();
const PORT = 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

mongoose.connect('mongodb://localhost:27017/BookNGo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/admin', adminRouter);
app.use('/user', userRouter);


const transportSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  number: { type: String, required: true },
  name: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  acSeats: { type: Number, required: true },
  normalSeats: { type: Number, required: true },
  acSeatAmount: { type: Number, required: true },
  normalSeatAmount: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  mode: { type: String, required: true, enum: ['bus', 'train', 'flight'] },
});
const Transport = mongoose.model('Transport', transportSchema);

app.post('/add-transport', async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    await newTransport.save();
    res.status(201).json({ message: 'Transport added successfully!' });
  } catch (err) {
    console.error('Error adding transport:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.get('/transport', async (req, res) => {
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

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
