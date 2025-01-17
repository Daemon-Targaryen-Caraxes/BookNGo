const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const adminRouter = require('./Admin/admin.js');
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/BookNGo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routers
app.use('/admin', adminRouter);

// User Schema and Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  aadhaar: { type: String, required: true },
  userid: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { collection: 'Users' });
const User = mongoose.model('User', UserSchema);

// User Routes
app.post('/signup', async (req, res) => {
  const { username, phone, gender, dob, aadhaar, userid, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  const userExist = await User.findOne({ userid });
  if (userExist) {
    return res.status(400).json({ error: 'User ID already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, phone, gender, dob, aadhaar, userid, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user', details: err });
  }
});

app.post('/login', async (req, res) => {
  const { userid, password } = req.body;
  const user = await User.findOne({ userid });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// Transport Schema and Model
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

// Transport Routes
app.post('/api/add-transport', async (req, res) => {
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

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
