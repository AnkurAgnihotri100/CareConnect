import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import axios from 'axios'; // <--- NEW LINE: Import axios
import { jwtDecode } from 'jwt-decode'; // <--- NEW LINE: Import jwtDecode

const illustrationUrl =
  "https://w7.pngwing.com/pngs/655/50/png-transparent-computer-icons-user-login-others-miscellaneous-share-icon-advanina-group-thumbnail.png";

// Receive setIsAuthenticated and setUserProfile as props from App.js
const Login = ({ setIsAuthenticated, setUserProfile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(''); // <--- NEW LINE: State for messages
  const navigate = useNavigate();

  const handleLogin = async (e) => { // <--- CHANGED LINE: Make function async
    e.preventDefault();
    setMessage(''); // Clear previous messages
    console.log("Login attempted with:", { email, password });

    try {
      // Make a POST request to your backend's login endpoint
      // Ensure your backend server is running on http://localhost:5000
      const response = await axios.post('http://localhost:5000/api/auth/login', { // <--- CHANGED LINE: axios call to backend login
        email,
        password,
      });
      
      const { token } = response.data; // Extract the JWT token
      localStorage.setItem('token', token); // Store the token

      // Decode the token to get user information (like ID and role)
      const decoded = jwtDecode(token); // <--- NEW LINE: Decode token
      
      // Update the authentication state in App.js via props
      setIsAuthenticated(true);
      setUserProfile({ id: decoded.id, role: decoded.role }); // <--- CHANGED LINE: Set user profile from decoded token

      setMessage('Login successful!'); // <--- NEW LINE: Set success message
      navigate('/dashboard'); // Redirect to dashboard

    } catch (error) {
      // Handle errors from the backend (e.g., invalid credentials)
      if (error.response && error.response.data && error.response.data.message) { // Cites backend error handling
        setMessage(error.response.data.message); // Display specific error from backend
      } else {
        setMessage('Login failed. Please check your credentials or try again.');
        console.error('Login error:', error);
      }
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f7f7f7",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          backgroundColor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={illustrationUrl}
          alt="User Login Illustration" // Changed alt text for clarity
          sx={{
            width: 100,
            height: "auto",
            mb: 2,
            mx: "auto",
          }}
        />
        <Typography variant="h5" component="h1" color="primary" gutterBottom>
          CareConnect
        </Typography>
        {/* Email Field */}
        <TextField
          label="Email"
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
        {/* Login Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1 }}
        >
          Login
        </Button>
        {/* Message display */}
        {message && ( // <--- NEW LINE: Display messages
          <Typography variant="body2" color={message.includes('successful') ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
            {message}
          </Typography>
        )}
        {/* Sign Up Link */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/register" color="primary">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;