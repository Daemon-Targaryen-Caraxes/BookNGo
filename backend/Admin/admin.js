import express from "express";
import mongoose from "mongoose";
const adminRouter = express.Router();

const AdminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "Admin" });

const Admin = mongoose.model('Admin', AdminSchema);
adminRouter.get('/', async (req, res) => {
    try {
        if((await Admin.find()).length < 1){
            Admin.insertMany([{ adminName: "hemeswar", password: "hemeswar123" }])
        }
        const admin = await Admin.find();
        // console.log('Admin Document:', admin);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(admin);
    } catch (err) {
        console.error('Error in /admin:', err);
        res.status(500).json({ error: 'Failed to fetch admin document' });
    }
});

export default adminRouter;
