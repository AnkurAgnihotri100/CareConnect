import React, { useState } from "react";
import { Button, TextField, Typography, Grid, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Define styles for the component
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    maxWidth: "500px",
    width: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
  },
});

const BookDoctorAppointment = ({ doctorId, doctorName, onSubmit }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [problem, setProblem] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleSubmit = () => {
    const appointmentDetails = {
      doctorId,
      doctorName, // Include doctor's name in the details
      name,
      age,
      gender,
      problem,
      appointmentDate,
      appointmentTime,
    };
    onSubmit(appointmentDetails); // Send the details back to MainApp
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h5" className={classes.header}>
          Book Appointment with Dr. {doctorName} {/* Display doctor's name */}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Problem Description"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Appointment Date"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Appointment Time"
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
        >
          Confirm Appointment
        </Button>
      </Card>
    </div>
  );
};

export default BookDoctorAppointment;
