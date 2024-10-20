import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ isAuthenticated, setIsAuthenticated, userProfile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token here if applicable
    setIsAuthenticated(false);
    // Redirect to login page
    navigate("/login");
  };

  const profilePath =
    userProfile?.role === "doctor" ? "/doctor-dashboard" : "/user-dashboard";

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link} // Use the Link component to make it clickable
          to="/" // Set the path to the home page
          style={{
            flexGrow: 1,
            fontWeight: "bold", // Makes the text bold
            fontFamily: "Roboto, sans-serif", // You can change this to any font you prefer
            textTransform: "uppercase", // Makes text uppercase (optional)
            letterSpacing: "1px", // Adds letter spacing (optional)
            color: "inherit", // Ensure the link inherits the text color from the AppBar
            textDecoration: "none", // Remove underline from the link
          }}
        >
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
              onClick={handleLogout}
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

        {/* Search field */}
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
