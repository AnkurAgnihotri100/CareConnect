import React, { useState } from "react";
import { Typography, Button, Box, Grid, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchDoctors from "./SearchDoctors";
import BookDoctorAppointment from "./BookDoctorAppointment";
import PaymentPage from "./Payment"; // Import the payment page for final step

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    maxWidth: 800,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  doctorImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
});

const AppointmentPage = () => {
  const classes = useStyles();
  const [doctorId, setDoctorId] = useState(null);
  const [step, setStep] = useState(1); // To manage the current step in the flow

  // Step 1: Doctor Selection
  const handleDoctorSelect = (id) => {
    setDoctorId(id);
    setStep(2); // Move to the appointment form
  };

  // Step 2: Appointment submission
  const handleAppointmentSubmit = (details) => {
    console.log("Appointment Details:", details);
    setStep(3); // Move to payment page
  };

  // Step 3: Payment success handling
  const handlePaymentSuccess = () => {
    alert("Payment Successful! Appointment confirmed.");
    setStep(1); // Reset to the first step after payment
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {step === 1 ? (
          // Step 1: Initial appointment page
          <Grid container spacing={3} className={classes.formContainer}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.header}>
                Find a Doctor and Book an Appointment
              </Typography>
              <Typography variant="body1" color="textSecondary">
                We are a team of expert doctors with 24/7 service. Choose your doctor and book an appointment.
              </Typography>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(2)} // Directly to doctor selection
                >
                  Find a Doctor
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/013/141/034/non_2x/book-doctor-appointment-card-template-schedule-hospital-visit-editable-social-media-post-design-flat-color-illustration-for-poster-web-banner-ecard-vector.jpg"
                alt="Doctor"
                className={classes.doctorImage}
              />
            </Grid>
          </Grid>
        ) : step === 2 ? (
          // Step 2: Doctor search page
          <SearchDoctors onDoctorSelect={handleDoctorSelect} />
        ) : step === 3 ? (
          // Step 3: Book appointment page
          <BookDoctorAppointment doctorId={doctorId} onSubmit={handleAppointmentSubmit} />
        ) : (
          // Step 4: Payment page
          <PaymentPage onPaymentSuccess={handlePaymentSuccess} />
        )}
      </Card>
    </div>
  );
};

export default AppointmentPage;
