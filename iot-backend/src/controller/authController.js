const User = require('../models/User');
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email:user.email, role: user.role },
    process.env.JWT_SECRET || 'testsecret',
    { expiresIn: '1h' }
  );
};


exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check for duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = new User({ username, email, password, role });
    await user.save();    
    return res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  } 
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
