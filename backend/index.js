import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./APIRouters/User/user.js";
import adminRouter from "./APIRouters/Admin/admin.js";
import transportRouter from "./APIRouters/Admin/transport.js";
import bookingRouter from "./APIRouters/Admin/booking.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://bookngowebsite:Saivenkat14424@bookngo.kvtkp.mongodb.net/?retryWrites=true&w=majority&appName=BookNGo", { family: 4 })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/transport', transportRouter);
app.use('/booking', bookingRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
