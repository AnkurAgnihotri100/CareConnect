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

const illustrationUrl =
  "https://w7.pngwing.com/pngs/655/50/png-transparent-computer-icons-user-login-others-miscellaneous-share-icon-advanina-group-thumbnail.png";

const Login = ({ setIsAuthenticated, setUserProfile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });

    const userProfile = { name: "Ankur", role: "user" };
    setUserProfile(userProfile);
    setIsAuthenticated(true);

    navigate("/");
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
          alt="Doctor Illustration"
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
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1 }}
        >
          Login
        </Button>
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
