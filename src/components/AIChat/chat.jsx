import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send"; // Import Material UI Send icon
import IconButton from "@mui/material/IconButton"; // Import IconButton for the logo

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = inputMessage;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "user" },
      ]);
      setInputMessage(""); // Clear the input field after sending

      // Simulate AI response based on predefined queries
      const aiResponse = getAIResponse(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, sender: "ai" },
      ]);
    }
  };

  const getAIResponse = (message) => {
    const responses = {
      "What are the symptoms of flu?":
        "Common symptoms of flu include fever, cough, sore throat, body aches, and fatigue.",
      "How can I book an appointment?":
        "You can book an appointment by visiting our 'Appointments' section on the website.",
      "What should I do if I have a headache?":
        "If you have a headache, try resting in a dark room, stay hydrated, and consider taking over-the-counter pain relief.",
      "What vaccines do I need?":
        "Vaccines vary based on age and health conditions. Please consult your healthcare provider for personalized recommendations.",
      "Can you help me with my medications?":
        "Yes, I can provide information about medications. Please tell me the name of your medication.",
      "": "I'm here to help! What would you like to know?",
    };

    return responses[message] || responses[""];
  };

  return (
    <Container
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "50%",
        position: "relative",
      }}
    >
      <Box
        style={{
          backgroundColor: "#1976d2",
          padding: "10px",
          borderRadius: "8px 8px 0 0",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Help Desk  AISupport</Typography>
        <Typography variant="body2">
          We typically reply in a few minutes
        </Typography>
      </Box>
      <Box
        style={{
          maxHeight: "100 uv",
          overflowY: "auto",
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <Typography variant="body1" style={{ margin: "5px 0" }}>
           What can I help with today?
        </Typography>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            style={{
              justifyContent:
                message.sender === "user" ? "flex-end" : "flex-start",
              margin: "5px 0",
            }}
          >
            <div
              style={{
                backgroundColor:
                  message.sender === "user" ? "#1976d2" : "#e0e0e0",
                color: message.sender === "user" ? "#fff" : "#000",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: message.sender === "ai" ? "90%" : "80%", // Increase width for AI messages
                boxShadow:
                  message.sender === "user"
                    ? "0 2px 4px rgba(0,0,0,0.2)"
                    : "none",
              }}
            >
              {message.text}
            </div>
          </ListItem>
        ))}
      </Box>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Write a message..."
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          fullWidth
          style={{ marginRight: "10px" }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </Container>
  );
};

export default Chat;
