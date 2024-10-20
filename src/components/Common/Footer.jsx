import React from "react";
import { Container, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "40px",
        backgroundColor: "#f5f5f5",
        padding: "20px 0",
      }}
    >
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              We are dedicated to providing comprehensive health management
              solutions to enhance your healthcare experience.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6">Quick Links</Typography>
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Terms of Service
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6">Connect with Us</Typography>
            <Link href="#" color="inherit" underline="hover">
              Facebook
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Twitter
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              LinkedIn
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          textAlign="center"
          style={{ marginTop: "20px" }}
        >
          © {new Date().getFullYear()} Integrated Health Management System. All
          rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
