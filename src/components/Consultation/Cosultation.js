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
      title: "AI-Chat",
      description:
        "Get instant assistance from our AI chatbot for healthcare queries and support.",
      icon: "🤖",
      path: "/chat",
    },
    {
      title: "Appointments",
      description:
        "Effortlessly schedule, manage, and track appointments for seamless patient care.",
      icon: "📅",
      path: "/appointments",
    },
    {
      title: "Consultation",
      description:
        "Consult with qualified healthcare professionals from the comfort of your home.",
      icon: "🩺",
      path: "/consultation",
    },
    {
      title: "Search Doctors",
      description:
        "Find and connect with healthcare professionals that meet your needs.",
      icon: "👨‍⚕️",
      path: "/search-doctors",
    },
    {
      title: "Tests & Results",
      description:
        "View and manage your medical test results securely and efficiently.",
      icon: "🧪",
      path: "/tests-results",
    },
    {
      title: "EMR",
      description:
        "Access and manage electronic medical records securely and efficiently.",
      icon: "📋",
      path: "/emr",
    },
    {
      title: "Health Tracking",
      description:
        "Monitor your health metrics and get personalized recommendations.",
      icon: "📈",
      path: "/health-tracking",
    },
    {
      title: "Manage Patients",
      description:
        "Easily manage patient information, appointments, and medical records in one place.",
      icon: "👨‍⚕️",
      path: "/manage-patients",
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
      {/* ✅ Hero Section */}
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
            <strong>TeleMedPilot</strong> is number one in online Arabic
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
            alt="Telemedicine"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      </Container>

      {/* ✅ Extra Our Services Cards Section */}
      <Container maxWidth="lg" style={{ marginTop: "40px", marginBottom: "60px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Services
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: 20, height: "100%" }}>
              <img
                src="https://th-i.thgim.com/public/incoming/fvv3th/article68814583.ece/alternates/FREE_1200/IMG_Telemedicine_2_1_LFCL8K7H.jpg"
                alt="Telemedicine"
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10, marginBottom: 15 }}
              />
              <Typography variant="h6" gutterBottom>Telemedicine</Typography>
              <Typography variant="body2">
                Connect with doctors remotely and receive prescriptions from the comfort of your home.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: 20, height: "100%" }}>
              <img
                src="https://cdn.pixabay.com/photo/2016/03/09/09/17/doctor-1245887_960_720.jpg"
                alt="Pharmacy"
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10, marginBottom: 15 }}
              />
              <Typography variant="h6" gutterBottom>Online Pharmacy</Typography>
              <Typography variant="body2">
                Easily order medicines and health products online with doorstep delivery.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: 20, height: "100%" }}>
              <img
                src="https://cdn.pixabay.com/photo/2017/07/11/11/10/mobile-2490164_960_720.jpg"
                alt="Records"
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10, marginBottom: 15 }}
              />
              <Typography variant="h6" gutterBottom>Health Records</Typography>
              <Typography variant="body2">
                Maintain and access your health records securely anytime, anywhere.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ✅ Existing Features Grid */}
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
