const express = require("express");
const { register, login } = require("../controllers/authController"); // Import controller functions

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

module.exports = router;