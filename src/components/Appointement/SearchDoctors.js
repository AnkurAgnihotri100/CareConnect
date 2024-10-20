import React from "react";
import { Typography, Button, Box, Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Define styles for the component
const useStyles = makeStyles({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    maxWidth: 800,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    margin: "20px auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  doctorCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  doctorImageContainer: {
    width: "100px", // Set a fixed width for the container
    height: "100px", // Set a fixed height for the container
    overflow: "hidden", // Hide any overflow
    borderRadius: "50%", // Optional: make it circular
    margin: "0 auto 15px auto", // Center image and add margin
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  doctorImage: {
    width: "100%", // Scale image to fit container
    height: "100%", // Scale image to fit container
    objectFit: "cover", // Crop image to maintain aspect ratio
  },
  paragraph: {
    margin: "20px 0",
    textAlign: "center",
    color: "#555",
  },
});

// Sample doctors list
const doctorsList = [
  {
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    id: 1,
    image:
      "https://th.bing.com/th/id/OIP.T-8Yy7xmWv0CtBS3juSLuQHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    name: "Dr. Jane Smith",
    specialty: "Pediatrician",
    id: 2,
    image:
      "https://doctoryouneed.org/wp-content/uploads/2022/01/smith-jane.jpg",
  },
  {
    name: "Dr. Alan Parker",
    specialty: "Dermatologist",
    id: 3,
    image:
      "https://th.bing.com/th/id/OIP.XaMaCqrkUXJCohPpS2gO0wHaLH?rs=1&pid=ImgDetMain",
  },
];


const SearchDoctors = ({ onDoctorSelect }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.header}>
          Find a Doctor and Book an Appointment
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          We are a team of expert doctors with 24/7 service. Choose your doctor
          and book an appointment.
        </Typography>
        <Grid container spacing={2}>
          {doctorsList.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Box className={classes.doctorCard}>
                <div className={classes.doctorImageContainer}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className={classes.doctorImage}
                  />
                </div>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {doctor.specialty}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onDoctorSelect(doctor.id, doctor.name)} // Pass doctor's name as well
                >
                  Book Appointment
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default SearchDoctors;
