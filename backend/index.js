import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./APIRouters/User/user.js";
import adminRouter from "./APIRouters/Admin/admin.js";
import transportRouter from "./APIRouters/Admin/transport.js";
import booking from "./APIRouters/Admin/booking.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

mongoose.connect('mongodb://127.0.0.1:27017/BookNGo', { family: 4 })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));
  
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/transport', transportRouter);
app.use('/booking', booking);
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
