// config/db.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URL
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/healthcare";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
