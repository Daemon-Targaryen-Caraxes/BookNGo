const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/BookNGo')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const AdminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "Admin" });
const Admin = mongoose.model('Admin', AdminSchema);
const newAdmin = new Admin({ adminName: "hemeswar", password: "hemeswar123" })
newAdmin.save()
    .then(() => console.log("Saved successfully"))
    .catch((err) => console.log("Oops you get an error and the error is", err))
app.get('/admin', async (req, res) => {
    try {
        Admin.insertMany([{ adminName: "Venkat14424", password: "Sai@venkat14424" }])
        const admin = await Admin.find();
        console.log('Admin Document:', admin);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(admin);
    } catch (err) {
        console.error('Error in /admin:', err);
        res.status(500).json({ error: 'Failed to fetch admin document' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
mongoose.connect('mongodb://localhost:27017/BookNGo')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    aadhaar: { type: String, required: true },
    userid: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, { collection: "Users" });
const User = mongoose.model('User', UserSchema);
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
    const newUser = new User({
        username,
        phone,
        gender,
        dob,
        aadhaar,
        userid,
        password: hashedPassword,
    });
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
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
