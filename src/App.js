import React, { useState, useEffect } from "react"; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding tokens

// Import your components
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import RegisterPage from "./components/Auth/Register"; // Kept original import name for consistency
import Chat from "./components/AIChat/chat";
import HealthTrackingPage from "./components/HealthTracking/HealthTrackingPage";
import EMRPage from "./components/EMR/EMRPage";
import UserDashboard from "./components/DashBoard/UserDashboard";
import DoctorDashboard from "./components/DashBoard/DoctorDashboard";
import MainApp from "./pages/MainApp"; // Assuming this is for appointments or general app flow
import Consultation from "./components/Consultation/Cosultation"; // Note: Typo 'Cosultation'
import './App.css';  // or wherever you placed the file

// Simple 404 component
const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

const App = () => {
  // State for auth and user profile
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  // --- NEW: Check for token on initial load ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUserProfile({});
        } else {
          // Token is valid
          setIsAuthenticated(true);
          setUserProfile({ id: decoded.id, role: decoded.role }); // Set user profile from token
        }
      } catch (error) {
        // Handle invalid token (e.g., malformed)
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserProfile({});
      }
    }
  }, []); // Run only once on component mount

  // --- NEW: Logout function ---
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false); // Reset authentication state
    setUserProfile({}); // Clear user profile
    // Optionally, redirect to login or home page after logout
    // You might want to use navigate('/') or navigate('/login') here if you import useNavigate
  };

  return (
    <Router>
      {/* Header with props, now including handleLogout */}
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated} // Keep if Header needs to directly set auth state (e.g., for login button visibility)
        userProfile={userProfile}
        handleLogout={handleLogout} // Pass the new logout function
      />

      {/* Main Routes */}
      <Routes>
        <Route
          path="/"
          element={<Home isAuthenticated={isAuthenticated} userProfile={userProfile} />}
        />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/appointments" element={<MainApp />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/health-tracking" element={<HealthTrackingPage />} />
        <Route path="/emr" element={<EMRPage />} />
        {/* Login route, passing setters to update App.js state */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUserProfile={setUserProfile} />}
        />
        {/* Register route */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Dashboards - these should ideally be protected routes */}
        <Route path="/user-dashboard" element={<UserDashboard userProfile={userProfile} />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard userProfile={userProfile} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;