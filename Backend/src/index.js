const express = require("express");
const dotenv = require("dotenv"); // Import dotenv to load environment variables
const connectDB = require("./config/db"); // Import the DB connection function
const cors = require('cors'); // Import cors middleware (install it if you haven't)

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB(); // Call the function to connect to the database when the server starts

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env (which is 3000 in your case) or default to 5000

// Middleware
app.use(express.json()); // For parsing application/json bodies from incoming requests
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors()); // Enable CORS for all routes, allowing your frontend to connect

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello, This is Backend server of Healthcare System!");
});

// Define a placeholder for your authentication routes (you'll create this file next)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // All auth-related routes will be prefixed with /api/auth

// You will add other routes here as you implement more features, e.g.:
// const doctorRoutes = require("./routes/doctorRoutes");
// app.use("/api/doctors", doctorRoutes);
// const appointmentRoutes = require("./routes/appointmentRoutes");
// app.use("/api/appointments", appointmentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});