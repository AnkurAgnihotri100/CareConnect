import React, { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material"; // Import necessary components
import SearchDoctors from "../components/Appointement/SearchDoctors";
import BookDoctorAppointment from "../components/Appointement/BookDoctorAppointment";
import PaymentPage from "../components/Appointement/Payment";
import AppointmentDetails from "../components/Appointement/AppointmentDetails"; // Import the new component

const MainApp = () => {
  const [step, setStep] = useState(1);
  const [doctorId, setDoctorId] = useState(null);
  const [doctorName, setDoctorName] = useState(""); // Store the doctor's name
  const [doctorImage, setDoctorImage] = useState(""); // Store the doctor's image
  const [appointmentTime, setAppointmentTime] = useState(""); // Store appointment time
  const [notification, setNotification] = useState(null); // State for notifications

  // Handle doctor selection
  const handleDoctorSelect = (id, name, image) => {
    setDoctorId(id);
    setDoctorName(name); // Set the doctor's name
    setDoctorImage(image); // Set the doctor's image
    setStep(2); // Move to the appointment form
  };

  // Handle appointment submission
  const handleAppointmentSubmit = (details) => {
    setAppointmentTime(details.appointmentTime); // Store the appointment time
    setStep(3); // Move to payment page
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    setNotification(
      "Your appointment is confirmed and payment was successful!"
    ); // Set the notification message
    setStep(4); // Navigate to appointment details page
  };

  // Back to doctor search
  const handleBackToSearch = () => {
    setStep(1); // Reset to first step
    setDoctorId(null); // Reset selected doctor
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification(null); // Clear the notification
  };

  // Prepare appointment details to pass to the AppointmentDetails component
  const appointmentDetails = {
    doctorId,
    name: doctorName,
    appointmentTime,
  };

  return (
    <>
      {step === 1 && <SearchDoctors onDoctorSelect={handleDoctorSelect} />}
      {step === 2 && (
        <div>
          <BookDoctorAppointment
            doctorId={doctorId}
            onSubmit={handleAppointmentSubmit}
          />
          <Button onClick={handleBackToSearch}>Back to Search Doctors</Button>
        </div>
      )}
      {step === 3 && <PaymentPage onPaymentSuccess={handlePaymentSuccess} />}
      {step === 4 && (
        <AppointmentDetails
          details={appointmentDetails}
          doctorImage={doctorImage}
        />
      )}

      {/* Snackbar for notification */}
      <Snackbar
        open={Boolean(notification)} // Open if notification is set
        autoHideDuration={6000} // Duration before automatically closing
        onClose={handleCloseNotification} // Close handler
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning of the notification
      >
        <Alert onClose={handleCloseNotification} severity="success">
          {notification} {/* Notification message */}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainApp;
