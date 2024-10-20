import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const Home = ({ isAuthenticated, userProfile }) => {
  // Define features available to both users and doctors
  const allFeatures = [
    {
      title: "AI-Chat",
      description:
        "Get instant assistance from our AI chatbot for healthcare queries and support.",
      icon: "🤖",
      path: "/chat",
      roles: ["user", "doctor"],
    },
    {
      title: "Appointments",
      description:
        "Effortlessly schedule, manage, and track appointments for seamless patient care.",
      icon: "📅",
      path: "/appointments",
      roles: ["user", "doctor"],
    },
    {
      title: "Consultation",
      description:
        "Consult with qualified healthcare professionals from the comfort of your home.",
      icon: "🩺",
      path: "/consultation",
      roles: ["user", "doctor"],
    },
    {
      title: "Search Doctors",
      description:
        "Find and connect with healthcare professionals that meet your needs.",
      icon: "👨‍⚕️",
      path: "/search-doctors",
      roles: ["user"],
    },
    {
      title: "Tests & Results",
      description:
        "View and manage your medical test results securely and efficiently.",
      icon: "🧪",
      path: "/tests-results",
      roles: ["user"],
    },
    {
      title: "EMR",
      description:
        "Access and manage electronic medical records securely and efficiently.",
      icon: "📋",
      path: "/emr",
      roles: ["doctor"],
    },
    {
      title: "Health Tracking",
      description:
        "Monitor your health metrics and get personalized recommendations.",
      icon: "📈",
      path: "/health-tracking",
      roles: ["user"],
    },
    {
      title: "Manage Patients",
      description:
        "Easily manage patient information, appointments, and medical records in one place.",
      icon: "👨‍⚕️",
      path: "/manage-patients",
      roles: ["doctor"],
    },
  ];

  // State to manage location input
  const [location, setLocation] = useState("");
  const handleLocationChange = (e) => setLocation(e.target.value);

  // Filter features based on user role
  const filteredFeatures = allFeatures.filter((feature) =>
    feature.roles.includes(userProfile.role)
  );

  return (
    <div>
      <Container style={{ textAlign: "center", padding: "20px" }}>
        {isAuthenticated ? (
          <>
            <Typography variant="h2" gutterBottom>
              Welcome back, {userProfile.name}!
            </Typography>
            <Typography variant="h5" gutterBottom>
              Your health management solution at your fingertips.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h2" gutterBottom>
              Welcome to the Integrated Health Management System
            </Typography>
            <Typography variant="h5" gutterBottom>
              Your health management solution at your fingertips.
            </Typography>
          </>
        )}

        {/* Location Search Bar */}
        <Container style={{ marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Find healthcare services near you:
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8} sm={6} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter your location"
                value={location}
                onChange={handleLocationChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>

      <Container style={{ marginTop: "40px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Explore Our Services: What Are You Looking For?
        </Typography>

        <Grid container spacing={4}>
          {filteredFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={feature.path} style={{ textDecoration: "none" }}>
                <Paper
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    {feature.icon}
                  </div>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body1">{feature.description}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
