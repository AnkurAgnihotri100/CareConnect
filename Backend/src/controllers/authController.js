// controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// User sign-up
const register = async (req, res) => {
  console.log('Received registration request body:', req.body); // Still useful for debugging

  // <--- CHANGED LINE: Destructure 'username' from req.body instead of 'name'
  const { username, email, password } = req.body; 

  // Basic server-side validation for only the required fields
  // <--- CHANGED LINE: Use 'username' in the validation check
  if (!username || !email || !password) { 
    return res.status(400).json({ error: "Please enter all required fields (Name, Email, Password)." });
  }

  try {
    // Check if user with that email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User with that email already exists." });
    }
    // Check for duplicate username
    user = await User.findOne({ username }); // <--- CHANGED LINE: Use 'username' here
    if (user) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    // Create a new User instance with only the simplified fields
    user = new User({
      username, // <--- CHANGED LINE: Directly use 'username' (no mapping needed here anymore)
      email,
      password, // Password will be hashed by the pre-save hook in the User model
    });

    await user.save(); // Save the new user to the database

    // Generate JWT token (optional to send on register, but useful for auto-login)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Uses JWT_SECRET from .env
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully! You can now log in.",
      token // Sending token here to allow auto-login or immediate authentication state update
    });
  } catch (error) {
    console.error("Server Error during registration:", error);
    res.status(500).json({ error: error.message || "Server Error. Registration failed." });
  }
};

// User login (remains unchanged)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Uses JWT_SECRET from .env
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Server Error during login:", error);
    res.status(500).json({ error: error.message || "Server Error. Login failed." });
  }
};

module.exports = { register, login };