import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box // Import Box for message display
} from "@mui/material"; // Removed MenuItem as it's no longer needed
import axios from 'axios'; // Import axios
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(''); // State for messages
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    console.log("Attempting to register with:", {
      name, email, password // Now only sending these three fields
    });

    try {
      // Ensure your backend server is running on http://localhost:5000
      const response = await axios.post('http://localhost:5000/api/auth/register', { // Calls backend register API
        username: name, // Backend expects 'username'
        email,
        password,
      });
      setMessage(response.data.message); // Expects 'message' from backend
      navigate("/login"); // Redirect to login after successful registration

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) { // Cites backend error handling
        setMessage(error.response.data.error); // Display specific error from backend
      } else {
        setMessage('Registration failed. Please try again. Check browser console for details.');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <Container
      style={{ padding: "20px", maxWidth: "500px", marginTop: "40px" }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        {/* Name Field */}
        <TextField
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Removed Age, Address, Gender, DOB fields */}
        
        {/* Register Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Register
        </Button>
      </form>
      {/* Display messages to the user */}
      {message && (
        <Typography variant="body2" color={message.includes('successful') ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default RegisterPage;