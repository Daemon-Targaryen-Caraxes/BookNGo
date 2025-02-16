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
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({ error: 'Failed to fetch admin document' });
  }
});

adminRouter.get('/:adminId/profile', async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findOne({ adminId: adminId });

    if (!admin) {
      return res.status(404).json({ error: `Admin with ID ${adminId} not found` });
    }

    res.json(admin);
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ error: 'Failed to fetch admin profile' });
  }
});

adminRouter.post('/login', async (req, res) => {
  const adminsCount = await Admin.countDocuments();
  if (adminsCount === 0) {
    const defaultAdmins = [
      { adminName: "hemeswar", password: "hemeswar123", email: "hemeswar@example.com", gender: "Male", aadharNo: "111122223333", adminId: "admin1" },
      { adminName: "Venkat14424", password: "Sai@venkat14424", email: "venkat@example.com", gender: "Male", aadharNo: "444455556666", adminId: "admin2" },
    ];
  
    for (let admin of defaultAdmins) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      admin.password = hashedPassword;
    }

    try {
      await Admin.insertMany(defaultAdmins);
    } catch (err) {
      console.error('Error inserting default admins:', err);
      return res.status(500).json({ error: 'Failed to insert default admins' });
    }
  }

  const { adminId, password } = req.body;
  
  if (!adminId || !password) {
    return res.status(400).json({ error: 'adminName and password are required' });
  }

  try {
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful', adminId: admin.adminId });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

adminRouter.put('/:adminId/profile', async (req, res) => {
  const { adminId } = req.params;
  const { adminName, email, gender, aadharNo } = req.body;

  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(400).json({ error: "Invalid admin ID format" });
  }

  if (!adminName || !phone || !email || !gender || !aadharNo) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId, 
      { $set: { adminName, email, gender, aadharNo } },
      { new: true, runValidators: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: `Admin with ID ${adminId} not found` });
    }
    res.json(updatedAdmin);
  } catch (err) {
    console.error("Error updating admin profile:", err);
    res.status(500).json({ error: "Failed to update admin profile" });
  }
});


adminRouter.put('/:adminId/change-password', async (req, res) => {
  const { adminId } = req.params;
  const { newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedAdmin = await Admin.findOneAndUpdate(
      { adminId },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: `Admin with ID ${adminId} not found` });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

adminRouter.post('/add', async (req, res) => {
  const { adminName, email, gender, aadharNo, adminId, password } = req.body;

  if (!adminName  || !email || !gender || !aadharNo || !adminId || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingAdmin = await Admin.findOne({ adminId });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin ID already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      adminName,
      email,
      gender,
      aadharNo,
      adminId,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).json({ message: 'New admin created successfully', adminId: newAdmin.adminId });
  } catch (err) {
    console.error('Error adding new admin:', err);
    res.status(500).json({ error: 'Failed to create new admin' });
  }
});

export default adminRouter;
