import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Box, // <--- NEW LINE: Import Box component
} from "@mui/material"; // <--- CHANGED LINE: Box is now imported
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HospitalLogo from '../../assets/img/pngtree-hospital-logo-icon-abstract-alliance-picture-image_8313149.png'; // Your logo import


// Receive handleLogout as a prop from App.js
const Header = ({ isAuthenticated, userProfile, handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(); // Call the central logout function from App.js
    navigate('/login'); // Redirect to login page after logout
  };

  // Determine the correct dashboard path based on user role
  const profilePath =
    userProfile?.role === "doctor" ? "/doctor-dashboard" : "/user-dashboard";

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            flexGrow: 1,
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Logo integration */}
          <Box
            component="img"
            src={HospitalLogo}
            alt="CareConnect Logo"
            sx={{
              height: 30,
              width: 30,
              mr: 1,
              borderRadius: '50%',
            }}
          />
          CareConnect
        </Typography>

        {/* Show Home and Profile if authenticated */}
        {isAuthenticated ? (
          <>
            <IconButton
              color="inherit"
              component={Link}
              to="/"
              aria-label="Home"
            >
              <HomeIcon />
            </IconButton>

            {/* Profile/Dashboard Button */}
            <IconButton
              color="inherit"
              component={Link}
              to={profilePath}
              aria-label="Profile"
            >
              <AccountCircleIcon />
            </IconButton>

            {/* Logout button */}
            <IconButton
              color="inherit"
              onClick={onLogoutClick}
              aria-label="Logout"
            >
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          /* Show Login button if not authenticated */
          <IconButton
            color="inherit"
            component={Link}
            to="/login"
            aria-label="Login"
          >
            <LoginIcon />
            <Typography style={{ marginLeft: "5px" }}>Login</Typography>
          </IconButton>
        )}

        {/* Search field - kept original structure */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          style={{ marginLeft: "10px", backgroundColor: "#fff" }}
        />
        <IconButton
          color="inherit"
          style={{ marginLeft: "10px" }}
          aria-label="Search"
        >
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;