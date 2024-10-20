// src/components/Appointement/AppointmentDetails.js
import React from "react";
import { Card, Typography, Box } from "@mui/material";

// Add the default image URL for the doctor logo
const DEFAULT_DOCTOR_IMAGE =
  "https://www.shutterstock.com/image-vector/calendar-check-mark-icon-on-600nw-1918854275.jpg"; // Replace this with your doctor logo URL

const AppointmentDetails = ({ details, doctorImage }) => {
  // Use default image if doctorImage is not provided
  const imageToShow = doctorImage || DEFAULT_DOCTOR_IMAGE;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card
        style={{
          padding: "20px",
          maxWidth: "500px",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Appointment Details
        </Typography>
        <img
          src={imageToShow}
          alt={details.name} // Ensure details.name is defined
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />
        <Typography variant="body1">
          <strong>Doctor Name:</strong> {details.name}
        </Typography>
        <Typography variant="body1">
          <strong>Appointment Time:</strong> {details.appointmentTime}
        </Typography>
        <Typography variant="body1">
          <strong>Payment Status:</strong> Successful
        </Typography>
      </Card>
    </Box>
  );
};

export default AppointmentDetails;
