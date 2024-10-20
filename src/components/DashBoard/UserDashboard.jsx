import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  UploadFile,
  Visibility,
} from "@mui/icons-material";

const UserDashboard = ({
  userProfile,
  appointments = [],
  prescriptions = [],
  tests = [],
  recommendations = [],
}) => {
  return (
    <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h5">Patient Profile</Typography>
        <Button variant="contained" sx={{ backgroundColor: "#ff9800" }}>
          Book Appointment
        </Button>
      </Box>

      {/* Profile Section */}
      <Grid container spacing={4}>
        {/* Contact Details */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  marginRight: "20px",
                }}
              />
              <Box>
                <Typography variant="h6">{userProfile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Contact Details
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Phone
                fontSize="small"
                sx={{ marginRight: "10px", color: "#1976d2" }}
              />
              <Typography variant="body2">{userProfile.phone}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Email
                fontSize="small"
                sx={{ marginRight: "10px", color: "#1976d2" }}
              />
              <Typography variant="body2">{userProfile.email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn
                fontSize="small"
                sx={{ marginRight: "10px", color: "#1976d2" }}
              />
              <Typography variant="body2">{userProfile.address}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Overview Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Overview
            </Typography>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="body2" color="textSecondary">
                Gender:
              </Typography>
              <Typography variant="body1">{userProfile.gender}</Typography>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="body2" color="textSecondary">
                Date of Birth:
              </Typography>
              <Typography variant="body1">{userProfile.dob}</Typography>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="body2" color="textSecondary">
                Next of Kin:
              </Typography>
              <Typography variant="body1">{userProfile.nextOfKin}</Typography>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="body2" color="textSecondary">
                Allergies:
              </Typography>
              <Typography variant="body1">{userProfile.allergies}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Latest Lab Results Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Latest Lab Results
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src="https://via.placeholder.com/30"
                alt="Ovarian Scan"
                style={{ marginRight: "10px" }}
              />
              <Typography variant="body2">
                Ovarian Scan, 25 Nov, 2.7 MB
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src="https://via.placeholder.com/30"
                alt="Blood Test"
                style={{ marginRight: "10px" }}
              />
              <Typography variant="body2">XYV Blood Tests, 0.7 MB</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src="https://via.placeholder.com/30"
                alt="Blood Test"
                style={{ marginRight: "10px" }}
              />
              <Typography variant="body2">Blood Tests XYZ, 0.7 MB</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" startIcon={<UploadFile />}>
                Upload Files
              </Button>
              <Button variant="text" startIcon={<Visibility />}>
                View All
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Actions Section */}
      <Grid container spacing={4} style={{ marginTop: "30px" }}>
        {[
          { label: "Appointments", icon: "📅" },
          { label: "Doctors", icon: "👨‍⚕️" },
          { label: "Treatment", icon: "💊" },
          { label: "Tests & Results", icon: "🧪" },
          { label: "Billing", icon: "💳" },
          { label: "Consent Forms", icon: "📝" },
          { label: "Medical History", icon: "📜" }, // Added item
          { label: "Health Insurance", icon: "🛡️" }, // Added item
        ].map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Paper
              sx={{
                padding: "20px",
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography variant="h4" component="div">
                {item.icon}
              </Typography>
              <Typography variant="body1">{item.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserDashboard;
