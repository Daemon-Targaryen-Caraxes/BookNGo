import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const userRouter = express.Router();

userRouter.use(express.json());

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

userRouter.post('/signup', async (req, res) => {
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

userRouter.post('/login', async (req, res) => {
  const { userid, password } = req.body;
  console.log(userid, password)
  const user = await User.findOne({ username: userid });
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

userRouter.get('/:userNumber', async (req, res) => {
  const givenNumber = req.params.userNumber;
  try{
    const userExist = await User.findOne({ phone: givenNumber });
    if(!userExist){
      return res.status(400).json({ error: "user not found with this number"});
    }
    return res.json(userExist);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
})

userRouter.get('/details/:userid', async (req, res) => {
  const { userid } = req.params;

  try {
    const user = await User.findOne({ userid });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const { password, ...userData } = user.toObject();

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user details' });
  }
});

userRouter.put('/change-password/:userid', async (req, res) => {
  const { userid } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ userid });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error changing password' });
  }
});

export default userRouter;
