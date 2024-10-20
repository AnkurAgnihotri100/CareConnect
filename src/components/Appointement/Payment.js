import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const PaymentPage = ({ onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("debitCard"); // Default payment method
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const amount = 500; // Replace with your dynamic amount

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = () => {
    // Validate input fields before proceeding to payment
    if (paymentMethod === "debitCard") {
      if (!cardNumber || !expiryDate || !cvv) {
        alert("Please fill in all debit card details.");
        return;
      }
    } else {
      if (!upiId) {
        alert("Please enter your UPI ID.");
        return;
      }
    }

    // Proceed with payment
    alert("Payment Successful! Your appointment is confirmed.");
    onPaymentSuccess(); // Call the success callback
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Payment Information
      </Typography>
      <Typography variant="h6" gutterBottom>
        Amount: ₹{amount}
      </Typography>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
          width: "100%",
          maxWidth: 400, // Set a max width for the form
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Payment Method</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel
              value="debitCard"
              control={<Radio />}
              label="Debit Card"
            />
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          </RadioGroup>
        </FormControl>

        {paymentMethod === "debitCard" && (
          <Box>
            <TextField
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Expiry Date (MM/YY)"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              fullWidth
              margin="normal"
              type="password"
            />
          </Box>
        )}

        {paymentMethod === "upi" && (
          <Box>
            <TextField
              label="UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
