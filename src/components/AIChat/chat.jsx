import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios'; // Import axios

const AIChat = () => {
  const [messages, setMessages] = useState([]); // Stores chat history: [{ type: 'user'/'ai', text: '...' }]
  const [input, setInput] = useState(""); // Stores current user input
  const [loading, setLoading] = useState(false); // Loading state for AI response
  const [error, setError] = useState(''); // Error message state
  const messagesEndRef = useRef(null); // Ref for auto-scrolling to bottom

  // Scroll to the bottom of the chat window whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat
    setInput(""); // Clear input field
    setError(''); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      // Make a POST request to your backend's AI chat endpoint
      // Ensure your backend server is running on http://localhost:5000
      const response = await axios.post('http://localhost:5000/api/ai/chat', { // Calls backend AI endpoint
        query: userMessage.text, // Send the user's query
      });

      const aiResponseText = response.data.response; // Extract AI response from backend
      const aiMessage = { type: "ai", text: aiResponseText };
      setMessages((prevMessages) => [...prevMessages, aiMessage]); // Add AI message to chat

    } catch (err) {
      console.error("Error sending query to AI backend:", err.response ? err.response.data : err.message);
      setError('Failed to get AI response. Please try again.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", text: "Sorry, I couldn't process that. Please try again or rephrase." },
      ]);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        AI Health Assistant
      </Typography>

      {/* Chat Messages Display Area */}
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          p: 2,
          mb: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          bgcolor: '#e0f7fa', // Light blue background for chat
          borderRadius: 2,
        }}
      >
        {messages.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 'auto', mb: 'auto' }}>
                Type your health question below to get started!
            </Typography>
        )}
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 2,
                maxWidth: "70%",
                wordBreak: "break-word",
                bgcolor: msg.type === "user" ? "#dcf8c6" : "white", // User messages light green, AI messages white
                color: msg.type === "user" ? "#333" : "#444",
                boxShadow: msg.type === "user" ? '0px 1px 3px rgba(0,0,0,0.2)' : '0px 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
        {loading && ( // Loading indicator for AI response
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2" color="textSecondary">Thinking...</Typography>
            </Box>
        )}
        {error && ( // Error message display
            <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                {error}
            </Typography>
        )}
        <div ref={messagesEndRef} /> {/* Element to scroll to */}
      </Paper>

      {/* Input Field and Send Button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Ask a health question..."
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading} // Disable input while loading
          sx={{ bgcolor: 'white', borderRadius: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={loading || input.trim() === ""} // Disable button while loading or input is empty
          sx={{ minWidth: 'auto', p: 1.5 }} // Adjust padding for icon button
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
        </Button>
      </Box>
    </Container>
  );
};

export default AIChat;