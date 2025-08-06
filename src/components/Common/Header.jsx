import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import HospitalLogo from "../../assets/img/pngtree-hospital-logo-icon-abstract-alliance-picture-image_8313149.png";

const Header = ({ isAuthenticated, userProfile, handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  const profilePath =
    userProfile?.role === "doctor" ? "/doctor-dashboard" : "/user-dashboard";

  const extractFirstName = (nameOrEmail) => {
    if (!nameOrEmail) return "User";
    if (nameOrEmail.includes("@")) return nameOrEmail.split("@")[0];
    return nameOrEmail.split(" ")[0];
  };

  const firstName = extractFirstName(userProfile?.name || userProfile?.email);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff", color: "#333" }}>
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Left: Logo & Brand Name */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={HospitalLogo}
            alt="CareConnect Logo"
            sx={{ height: 30, width: 30, borderRadius: "50%", mr: 1 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: "1px" }}>
            CareConnect
          </Typography>
        </Box>

        {/* Middle: Nav Links */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Find Doctor", to: "/appointments" },
            { label: "Contact Us", to: "/contact-us" },
            { label: "Blog", to: "/blog" },
          ].map((item) => (
            <Button
              key={item.to}
              component={Link}
              to={item.to}
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  fontWeight: "bold",
                  color: "#1976d2",
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right: Search + User Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              width: 180,
              transition: "all 0.3s ease",
              "& .MuiOutlinedInput-root": {
                fontSize: "0.9rem",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                  fontWeight: "bold",
                  color: "#1976d2",
                },
              },
            }}
          />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>

          {isAuthenticated ? (
            <>
              <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                {firstName}
              </Typography>
              <IconButton component={Link} to={profilePath}>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  {firstName?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>
              </IconButton>
              <IconButton onClick={onLogoutClick} color="inherit">
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <Button
              startIcon={<LoginIcon />}
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                ml: 1,
                textTransform: "none",
                "&:hover": {
                  fontWeight: "bold",
                  color: "#1976d2",
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
