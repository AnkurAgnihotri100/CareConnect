import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Register:", {
      name,
      email,
      password,
      age,
      address,
      gender,
      dob,
    });
    navigate("/login"); // Redirect to login after registration
  };

  return (
    <Container
      style={{ padding: "20px", maxWidth: "500px", marginTop: "40px" }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
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
        <TextField
          label="Age"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <TextField
          label="Address"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          label="Gender"
          select
          variant="outlined"
          fullWidth
          margin="normal"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
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
    </Container>
  );
};

export default RegisterPage;
