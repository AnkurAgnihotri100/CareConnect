import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Paper,
  Fade,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  LoginOutlined,
} from "@mui/icons-material";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = ({ setIsAuthenticated, setUserProfile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      
      setIsAuthenticated(true);
      setUserProfile({ id: decoded.id, role: decoded.role });
      setMessage('Login successful!');
      
      // Redirect after showing success message
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" fill-opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat",
          opacity: 0.3,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                textAlign: "center",
                py: 5,
                px: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                },
              }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <LoginOutlined sx={{ fontSize: 42, opacity: 0.9 }} />
              </Box>
              <Typography 
                variant="h3" 
                fontWeight="700" 
                gutterBottom
                sx={{
                  background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-1px",
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 300 }}>
                Sign in to your CareConnect account
              </Typography>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 5 }}>
              <Box component="form" onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#4facfe" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(79, 172, 254, 0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(79, 172, 254, 0.05)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(79, 172, 254, 0.08)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4facfe",
                          borderWidth: 2,
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4facfe",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#4facfe" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#4facfe" },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(79, 172, 254, 0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(79, 172, 254, 0.05)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(79, 172, 254, 0.08)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4facfe",
                          borderWidth: 2,
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4facfe",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    mb: 2,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.5s ease",
                    },
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                    "&:disabled": {
                      background: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                      transform: "none",
                    },
                  }}
                >
                  {loading ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircularProgress size={20} color="inherit" />
                      Signing In...
                    </Box>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {message && (
                  <Fade in>
                    <Alert 
                      severity={message.includes('successful') ? 'success' : 'error'}
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        fontWeight: 500,
                      }}
                    >
                      {message}
                    </Alert>
                  </Fade>
                )}

                <Divider sx={{ my: 3 }}>
                  <Typography 
                    variant="body2" 
                    color="textSecondary"
                    sx={{ 
                      px: 2,
                      fontWeight: 500,
                      background: "white",
                    }}
                  >
                    New to CareConnect?
                  </Typography>
                </Divider>

                <Box textAlign="center">
                  <Link
                    href="/register"
                    sx={{
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "transparent",
                      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -2,
                        left: "50%",
                        width: 0,
                        height: "2px",
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    Create your account →
                  </Link>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;