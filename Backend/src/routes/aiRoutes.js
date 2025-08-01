// Backend/src/routes/aiRoutes.js

const express = require("express");
const { getAiResponse } = require("../controllers/aiController"); // Import the AI controller

const router = express.Router();

// Route for AI chat queries
// This could be a protected route later, requiring a JWT token for logged-in users
router.post("/chat", getAiResponse);

module.exports = router;