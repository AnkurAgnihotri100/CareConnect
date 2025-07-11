import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import RegisterPage from "./components/Auth/Register";
import Chat from "./components/AIChat/chat";
import HealthTrackingPage from "./components/HealthTracking/HealthTrackingPage";
import EMRPage from "./components/EMR/EMRPage";
import UserDashboard from "./components/DashBoard/UserDashboard";
import DoctorDashboard from "./components/DashBoard/DoctorDashboard";
import MainApp from "./pages/MainApp";
import Consultation from "./components/Consultation/Cosultation";

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

  return (
    <Router>
      {/* Header with props */}
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userProfile={userProfile}
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
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUserProfile={setUserProfile} />}
        />
        <Route path="/register" element={<RegisterPage />} />
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
