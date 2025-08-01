import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  UploadFile,
  Visibility,
  CalendarToday,
  LocalPharmacy,
  Assessment,
  NotificationsActive,
  MonitorHeart,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  PersonAdd,
  Chat,
} from "@mui/icons-material";

const EnhancedUserDashboard = ({
  userProfile,
  appointments = [],
  prescriptions = [],
  tests = [],
  recommendations = [],
}) => {
  // State management for new features
  const [healthMetrics, setHealthMetrics] = useState({
    bmi: userProfile?.bmi || null,
    weight: userProfile?.weight || null,
    height: userProfile?.height || null,
    lastUpdated: userProfile?.lastHealthUpdate || null,
  });
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'medication',
      message: 'Time to take your morning medication',
      time: new Date(),
      priority: 'high'
    },
    {
      id: 2,
      type: 'appointment',
      message: 'Upcoming appointment with Dr. Smith tomorrow',
      time: new Date(),
      priority: 'medium'
    }
  ]);

  const [bmiDialogOpen, setBmiDialogOpen] = useState(false);
  const [bmiFormData, setBmiFormData] = useState({ weight: '', height: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
  };

  // Get BMI status
  const getBMIStatus = (bmi) => {
    if (!bmi) return { status: 'Unknown', color: 'default', advice: 'Please update your measurements' };
    if (bmi < 18.5) return { status: 'Underweight', color: 'info', advice: 'Consider consulting a nutritionist' };
    if (bmi < 25) return { status: 'Normal', color: 'success', advice: 'Maintain your healthy lifestyle' };
    if (bmi < 30) return { status: 'Overweight', color: 'warning', advice: 'Consider more physical activity' };
    return { status: 'Obese', color: 'error', advice: 'Consult with a healthcare provider' };
  };

  // Handle BMI update
  const handleBMIUpdate = () => {
    const weight = parseFloat(bmiFormData.weight);
    const height = parseFloat(bmiFormData.height);
    
    if (weight && height) {
      const newBMI = calculateBMI(weight, height);
      setHealthMetrics({
        bmi: newBMI,
        weight,
        height,
        lastUpdated: new Date(),
      });
      setBmiDialogOpen(false);
      setBmiFormData({ weight: '', height: '' });
      setSnackbarMessage('BMI updated successfully!');
      setSnackbarOpen(true);
      
      // Here you would typically send this data to your backend
      // updateHealthMetrics({ weight, height, bmi: newBMI });
    }
  };

  // Get next appointment
  const getNextAppointment = () => {
    const upcoming = appointments
      .filter(apt => new Date(apt.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return upcoming[0];
  };

  const nextAppointment = getNextAppointment();
  const bmiStatus = getBMIStatus(healthMetrics.bmi);

  return (
    <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
      {/* Enhanced Header with Notifications */}
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
        <Box>
          <Typography variant="h5">Welcome back, {userProfile.name}!</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Your health dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton 
            color="inherit" 
            onClick={() => setChatOpen(true)}
            sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Chat />
          </IconButton>
          <IconButton 
            color="inherit"
            sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <NotificationsActive />
            {notifications.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  width: 12,
                  height: 12,
                  backgroundColor: '#ff4444',
                  borderRadius: '50%',
                }}
              />
            )}
          </IconButton>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: "#ff9800" }}
            startIcon={<CalendarToday />}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>

      {/* Health Metrics Overview */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MonitorHeart sx={{ color: '#1976d2', mr: 1 }} />
                <Typography variant="h6">BMI Status</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {healthMetrics.bmi || 'N/A'}
              </Typography>
              <Chip 
                label={bmiStatus.status} 
                color={bmiStatus.color} 
                size="small"
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="textSecondary">
                {bmiStatus.advice}
              </Typography>
              <Button 
                size="small" 
                onClick={() => setBmiDialogOpen(true)}
                sx={{ mt: 1 }}
              >
                Update BMI
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Schedule sx={{ color: '#1976d2', mr: 1 }} />
                <Typography variant="h6">Next Appointment</Typography>
              </Box>
              {nextAppointment ? (
                <>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {new Date(nextAppointment.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {nextAppointment.time} - Dr. {nextAppointment.doctor}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {nextAppointment.type}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No upcoming appointments
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalPharmacy sx={{ color: '#1976d2', mr: 1 }} />
                <Typography variant="h6">Active Medications</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {prescriptions.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Current prescriptions
              </Typography>
              {prescriptions.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Next dose: {prescriptions[0]?.nextDose || '9:00 AM'}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ color: '#1976d2', mr: 1 }} />
                <Typography variant="h6">Health Score</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                85%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={85} 
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="textSecondary">
                Good overall health
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, borderLeft: '4px solid #ff9800' }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <NotificationsActive sx={{ mr: 1 }} />
            Recent Notifications
          </Typography>
          {notifications.slice(0, 3).map((notification) => (
            <Alert 
              key={notification.id}
              severity={notification.priority === 'high' ? 'warning' : 'info'}
              sx={{ mb: 1 }}
              action={
                <Button size="small">
                  {notification.type === 'medication' ? 'Mark Taken' : 'View'}
                </Button>
              }
            >
              {notification.message}
            </Alert>
          ))}
        </Paper>
      )}

      {/* Original Profile Section - Enhanced */}
      <Grid container spacing={4}>
        {/* Contact Details - Enhanced */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              height: '100%',
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
                src={userProfile.profilePicture || "https://via.placeholder.com/100"}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  marginRight: "20px",
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                }}
              />
              <Box>
                <Typography variant="h6">{userProfile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Patient ID: #{userProfile.id || '12345'}
                </Typography>
                <Chip 
                  label="Active Patient" 
                  color="success" 
                  size="small" 
                  sx={{ mt: 1 }}
                />
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
            
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ mt: 2 }}
              startIcon={<PersonAdd />}
            >
              Update Profile
            </Button>
          </Paper>
        </Grid>

        {/* Overview Section - Enhanced */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Medical Overview
            </Typography>
            <Box sx={{ marginBottom: "15px" }}>
              <Typography variant="body2" color="textSecondary">
                Gender:
              </Typography>
              <Typography variant="body1">{userProfile.gender}</Typography>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <Typography variant="body2" color="textSecondary">
                Date of Birth:
              </Typography>
              <Typography variant="body1">{userProfile.dob}</Typography>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <Typography variant="body2" color="textSecondary">
                Blood Group:
              </Typography>
              <Typography variant="body1">{userProfile.bloodGroup || 'Not specified'}</Typography>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <Typography variant="body2" color="textSecondary">
                Emergency Contact:
              </Typography>
              <Typography variant="body1">{userProfile.nextOfKin}</Typography>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <Typography variant="body2" color="textSecondary">
                Known Allergies:
              </Typography>
              <Typography variant="body1" color={userProfile.allergies !== 'None' ? 'error' : 'inherit'}>
                {userProfile.allergies}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Latest Lab Results Section - Enhanced */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Recent Lab Results
            </Typography>
            
            {tests.length > 0 ? (
              tests.slice(0, 3).map((test, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                  }}
                >
                  <Assessment sx={{ color: "#1976d2", mr: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {test.name || `Test ${index + 1}`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {test.date || '25 Nov'} • {test.size || '2.7 MB'}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <Visibility />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  No recent lab results
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="outlined" startIcon={<UploadFile />} size="small">
                Upload
              </Button>
              <Button variant="text" startIcon={<Visibility />} size="small">
                View All
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Enhanced Actions Section */}
      <Grid container spacing={4} style={{ marginTop: "30px" }}>
        {[
          { label: "Appointments", icon: "📅", color: "#1976d2", count: appointments.length },
          { label: "Doctors", icon: "👨‍⚕️", color: "#4caf50" },
          { label: "Medications", icon: "💊", color: "#ff9800", count: prescriptions.length },
          { label: "Lab Results", icon: "🧪", color: "#9c27b0", count: tests.length },
          { label: "AI Chat", icon: "🤖", color: "#00bcd4", action: () => setChatOpen(true) },
          { label: "Health Records", icon: "📋", color: "#795548" },
          { label: "Billing", icon: "💳", color: "#607d8b" },
          { label: "Emergency", icon: "🚨", color: "#f44336" },
        ].map((item, index) => (
          <Grid item xs={6} sm={3} md={3} key={index}>
            <Paper
              sx={{
                padding: "20px",
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s",
                cursor: "pointer",
                position: "relative",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)",
                  backgroundColor: item.color,
                  color: "white",
                },
              }}
              onClick={item.action}
            >
              {item.count !== undefined && (
                <Chip
                  label={item.count}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: item.color,
                    color: "white",
                  }}
                />
              )}
              <Typography variant="h4" component="div">
                {item.icon}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* BMI Update Dialog */}
      <Dialog open={bmiDialogOpen} onClose={() => setBmiDialogOpen(false)}>
        <DialogTitle>Update BMI Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Weight (kg)"
            type="number"
            fullWidth
            variant="outlined"
            value={bmiFormData.weight}
            onChange={(e) => setBmiFormData({ ...bmiFormData, weight: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Height (cm)"
            type="number"
            fullWidth
            variant="outlined"
            value={bmiFormData.height}
            onChange={(e) => setBmiFormData({ ...bmiFormData, height: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBmiDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleBMIUpdate} variant="contained">
            Update BMI
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default EnhancedUserDashboard;