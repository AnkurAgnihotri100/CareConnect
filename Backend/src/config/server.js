// config/server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log requests to the console

// You can define routes here or import them from another file
// Example:
// const authRoutes = require('../routes/authRoutes');
// app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export the app for use in other modules
