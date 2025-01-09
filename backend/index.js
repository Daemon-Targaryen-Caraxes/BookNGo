const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const PORT = 3000;

app.use(cors());

// Alternatively, specify allowed origins
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/BookNGo')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define Schemas and Models

const AdminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    password: { type: String, required: true },
});



const Admin = mongoose.model('Admin', AdminSchema, 'admins'); 

// Routes

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/admin', async (req, res) => {
    console.log('GET /admin route hit'); // Debug log
    try {
        const admin = await Admin.findOne();
        console.log('Admin Document:', admin); // Debug log
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(admin);
    } catch (err) {
        console.error('Error in /admin:', err);
        res.status(500).json({ error: 'Failed to fetch admin document' });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
