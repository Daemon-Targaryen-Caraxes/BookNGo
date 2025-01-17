import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./APIRouters/User/user.js";
import adminRouter from "./APIRouters/Admin/admin.js";
import transportRouter from "./APIRouters/Admin/transport.js";
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
app.use('/transport', transportRouter)


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
