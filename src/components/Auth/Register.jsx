import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  InputAdornment,
  IconButton,
  Paper,
  Fade,
  Alert,
  Divider,
  Link,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Person,
  Lock,
  PersonAddOutlined,
  CheckCircle,
} from "@mui/icons-material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Password strength calculation
  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.match(/[a-z]/)) strength += 25;
    if (pwd.match(/[A-Z]/)) strength += 25;
    if (pwd.match(/[0-9]/)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(calculatePasswordStrength(pwd));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "error";
    if (passwordStrength < 75) return "warning";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Very Weak";
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: name,
        email,
        password,
      });
      setMessage(response.data.message);
      
      // Redirect to login after showing success message
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"dots\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1.5\" fill=\"%23ffffff\" fill-opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23dots)\"/></svg>') repeat",
          opacity: 0.4,
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
                background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
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
                <PersonAddOutlined sx={{ fontSize: 42, opacity: 0.9 }} />
              </Box>
              <Typography 
                variant="h3" 
                fontWeight="700" 
                gutterBottom
                sx={{
                  background: "linear-gradient(45deg, #ffffff 30%, #fce4ec 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-1px",
                }}
              >
                Join CareConnect
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 300 }}>
                Create your account to get started
              </Typography>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 5 }}>
              <Box component="form" onSubmit={handleRegister}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#ff9a9e" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 154, 158, 0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 154, 158, 0.05)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 154, 158, 0.08)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ff9a9e",
                          borderWidth: 2,
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff9a9e",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#ff9a9e" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 154, 158, 0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 154, 158, 0.05)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 154, 158, 0.08)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ff9a9e",
                          borderWidth: 2,
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff9a9e",
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
                  onChange={handlePasswordChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#ff9a9e" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#ff9a9e" },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 154, 158, 0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 154, 158, 0.05)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 154, 158, 0.08)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ff9a9e",
                          borderWidth: 2,
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff9a9e",
                    },
                  }}
                />

                {/* Password Strength Indicator */}
                {password && (
                  <Box sx={{ mb: 2 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="caption" color="textSecondary">
                        Password Strength:
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color={`${getPasswordStrengthColor()}.main`}
                        fontWeight="600"
                      >
                        {getPasswordStrengthText()}
                      </Typography>
                      {passwordStrength === 100 && (
                        <CheckCircle sx={{ fontSize: 16, color: "success.main" }} />
                      )}
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={passwordStrength}
                      color={getPasswordStrengthColor()}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "rgba(0,0,0,0.1)",
                      }}
                    />
                  </Box>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    mb: 2,
                    mt: 1,
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
                      background: "linear-gradient(135deg, #e481f0 0%, #e74860 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(240, 147, 251, 0.4)",
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
                      Creating Account...
                    </Box>
                  ) : (
                    "Create Account"
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
                    Already have an account?
                  </Typography>
                </Divider>

                <Box textAlign="center">
                  <Link
                    href="/login"
                    sx={{
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "transparent",
                      background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
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
                        background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    Sign in instead →
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

export default RegisterPage;