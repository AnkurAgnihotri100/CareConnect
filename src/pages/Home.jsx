// import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuthenticated, userProfile }) => {
  const navigate = useNavigate();

  const allFeatures = [
    {
      title: "Search Doctors",
      description:
        "Find and connect with healthcare professionals that meet your needs.",
      icon: "👨‍⚕️",
      path: "/appointments",
    },
    {
      title: "Consultation",
      description:
        "Consult with qualified professionals from the comfort of your home.",
      icon: "🩺",
      path: "/consultation",
    },
    {
      title: "Tests & Results",
      description:
        "View and manage your medical test results securely and efficiently.",
      icon: "🧪",
      path: "/tests-results",
    },
   
    {
      title: "Health Tracking",
      description:
        "Monitor your health metrics and get personalized recommendations.",
      icon: "📈",
      path: "/health-tracking",
    },
    
  ];

  const handleFeatureClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* ✅ Hero Section Updated */}
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px 0",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 500px", paddingRight: "20px" }}>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            Talk to <strong>your doctor</strong> online <br />{" "}
            <strong>privately</strong> anytime, anywhere!
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ marginTop: "20px", fontSize: "18px" }}
          >
            <strong>CareConnect</strong> is number one in online 
            Telemedicine worldwide.
          </Typography>

          <div style={{ marginTop: "30px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={() => navigate("/search-doctors")}
            >
              Explore Our Doctors
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Get Matched With a Doctor
            </Button>
          </div>
        </div>

        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <img
            src="https://th-i.thgim.com/public/incoming/fvv3th/article68814583.ece/alternates/FREE_1200/IMG_Telemedicine_2_1_LFCL8K7H.jpg"
            alt="Telemedicine illustration"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      </Container>

      {/* ✅ Feature Cards Section Unchanged */}
      <Container style={{ marginTop: "40px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Explore Our Services: What Are You Looking For?
        </Typography>

        <Grid container spacing={4}>
          {allFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                onClick={() => handleFeatureClick(feature.path)}
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
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
