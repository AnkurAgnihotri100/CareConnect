import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Change the image URL below to your desired web image link
const illustrationUrl =
  "https://w7.pngwing.com/pngs/655/50/png-transparent-computer-icons-user-login-others-miscellaneous-share-icon-advanina-group-thumbnail.png";

const FormContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "32px",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Illustration = styled("img")({
  width: "150px",
  marginBottom: "16px",
});

const Root = styled(Box)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f4f8",
});

const StyledButton = styled(Button)({
  backgroundColor: "#00c5a4",
  "&:hover": {
    backgroundColor: "#00a18a",
  },
});

const Login = ({ setIsAuthenticated, setUserProfile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Add authentication logic here (e.g., API call)
    console.log("Login attempted with:", { email, password });

    // Simulate successful login and set user profile with role as "user"
    const userProfile = { name: "Ankur", role: "user" }; // Set role as "user"
    setUserProfile(userProfile);
    setIsAuthenticated(true);

    // Navigate to the home page after login
    navigate("/");
  };

  return (
    <Root>
      <FormContainer maxWidth="xs">
        <Illustration
          src={illustrationUrl} // Use the web image URL here
          alt="Doctor Illustration"
        />
        <Typography variant="h5" component="h1" gutterBottom>
          CareConnect
        </Typography>
        <form onSubmit={handleLogin}>
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
          <StyledButton type="submit" variant="contained" fullWidth>
            Login
          </StyledButton>
        </form>
        <Typography style={{ marginTop: "16px", textAlign: "center" }}>
          Don't have an account? <Button href="/register">Sign Up</Button>
        </Typography>
      </FormContainer>
    </Root>
  );
};

export default Login;
