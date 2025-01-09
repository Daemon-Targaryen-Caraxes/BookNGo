const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
});

const Admin = mongoose.model('Admin', AdminSchema); 

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/admin', async (req, res) => {
    try {
        const admin = await Admin.findOne();
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
