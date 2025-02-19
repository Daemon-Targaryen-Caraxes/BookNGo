import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminRouter = express.Router();

const AdminSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  aadharNo: { type: String, required: true },
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { collection: "Admin" });

const Admin = mongoose.model('Admin', AdminSchema);

adminRouter.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch {
    res.status(500).json({ error: 'Failed to fetch admin data' });
  }
});

adminRouter.post('/login', async (req, res) => {
  const { adminId, password } = req.body;
  if (!adminId || !password) return res.status(400).json({ error: 'Admin ID and password are required' });
  try {
    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    if (!(await bcrypt.compare(password, admin.password))) return res.status(400).json({ error: 'Invalid password' });
    res.json({ message: 'Login successful', adminId: admin.adminId });
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
});
adminRouter.get('/:adminId/profile', async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminId: req.params.adminId });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch {
    res.status(500).json({ error: 'Failed to fetch admin profile' });
  }
});


adminRouter.put('/:adminId/editprofile', async (req, res) => {
  const { newAdminId, adminName, email, gender, aadharNo } = req.body;
  
  if (!adminName || !email || !gender || !aadharNo || !newAdminId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const admin = await Admin.findOne({ adminId: req.params.adminId });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    if (admin.adminId !== newAdminId) {
      const existingAdmin = await Admin.findOne({ adminId: newAdminId });
      if (existingAdmin) {
        return res.status(400).json({ error: 'New Admin ID is already in use' });
      }
    }
    admin.adminId = newAdminId;
    admin.adminName = adminName;
    admin.email = email;
    admin.gender = gender;
    admin.aadharNo = aadharNo;
    await admin.save();
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed' });
  }
});

adminRouter.put('/:adminId/change-password', async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedAdmin = await Admin.findOneAndUpdate(
      { adminId: req.params.adminId },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});


adminRouter.post('/add', async (req, res) => {
  const { adminName, email, gender, aadharNo, adminId, password } = req.body;
  if (!adminName || !email || !gender || !aadharNo || !adminId || !password) return res.status(400).json({ error: 'All fields are required' });
  try {
    if (await Admin.findOne({ adminId })) return res.status(400).json({ error: 'Admin ID already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ adminName, email, gender, aadharNo, adminId, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully', adminId: newAdmin.adminId });
  } catch {
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

export default adminRouter;
