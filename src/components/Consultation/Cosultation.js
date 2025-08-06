// src/components/Appointement/Consultation.js
import React, { useState } from "react";
import { Card, Typography, Box, TextField, Button } from "@mui/material";

// Sample video consultation image
const VIDEO_CONSULTATION_IMAGE =
  "https://aerona.com/wp-content/uploads/2020/10/NewConnect-Consult.png"; // Replace with your video consultation image URL

const Consultation = () => {
  const [roomId, setRoomId] = useState("");

  const handleStartConsultation = () => {
    // Logic to start the consultation, e.g., navigating to the video room
    console.log("Starting consultation in room:", roomId);
    // Redirect or implement your video consultation logic here
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start" // Change to flex-start to prevent full-height
      minHeight="80vh" // Decrease minimum height
      sx={{ backgroundColor: "#f5f5f5", padding: 2 }}
    >
      <Card
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Start Your Consultation
        </Typography>
        <img
          src={VIDEO_CONSULTATION_IMAGE}
          alt="Video Consultation"
          style={{
            maxWidth: "100%", // Limit the maximum width
            height: "auto", // Maintain aspect ratio
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />
        <Typography variant="body1" gutterBottom>
          Welcome to your video consultation. Please enter the room number to
          start your consultation.
        </Typography>
        <TextField
          label="Room Number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartConsultation}
          disabled={!roomId} // Disable button if roomId is empty
        >
          Enter Consultation Room
        </Button>
      </Card>
    </Box>
  );
};

export default Consultation;
