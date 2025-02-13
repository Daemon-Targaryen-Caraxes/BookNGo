import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const adminRouter = express.Router();

const AdminSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  aadharNo: { type: String, required: true },
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { collection: "Admin" });

const Admin = mongoose.model('Admin', AdminSchema);

const initializeAdmins = async () => {
  const adminsCount = await Admin.countDocuments();
  if (adminsCount === 0) {
    const defaultAdmins = [
      { adminName: "hemeswar", password: "hemeswar123", phone: "1234567890", email: "hemeswar@example.com", gender: "Male", aadharNo: "111122223333", adminId: "admin1" },
      { adminName: "Venkat14424", password: "Sai@venkat14424", phone: "0987654321", email: "venkat@example.com", gender: "Male", aadharNo: "444455556666", adminId: "admin2" },
    ];

    for (let admin of defaultAdmins) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      admin.password = hashedPassword;
    }

    await Admin.insertMany(defaultAdmins);
  }
};

initializeAdmins();

adminRouter.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({ error: 'Failed to fetch admin document' });
  }
});

adminRouter.post('/login', async (req, res) => {
  const { adminName, password } = req.body;
  try {
    const admin = await Admin.findOne({ adminName });
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
  const { adminName, phone, email, gender, aadharNo } = req.body;

  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { adminId },
      { adminName, phone, email, gender, aadharNo },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(updatedAdmin);
  } catch (err) {
    console.error('Error updating admin profile:', err);
    res.status(500).json({ error: 'Failed to update admin profile' });
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
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

export default adminRouter;

