// controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// User sign-up
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
