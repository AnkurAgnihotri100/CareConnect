import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Box,
  CircularProgress,
} from "@mui/material";

const EMRPage = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch records from the collaboration with AHBA
  const fetchRecords = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulated API call to fetch records
      // Replace with actual API endpoint
      const response = await fetch(
        `https://api.ahbahealth.com/patients?search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch records");
      }
      const data = await response.json();
      setRecords(data.records); // Assuming records is an array in the response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchRecords();
    }
  };

  return (
    <Container
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Electronic Medical Records (EMR)
      </Typography>
      <Box style={{ marginBottom: "20px" }}>
        <TextField
          label="Search Patient Records"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}

      <Typography variant="h5" style={{ margin: "20px 0" }}>
        Patient Records
      </Typography>
      <List>
        {records.length > 0 ? (
          records.map((record, index) => (
            <ListItem key={index}>
              <Typography>
                <strong>Name:</strong> {record.name} <br />
                <strong>Email:</strong> {record.email} <br />
                <strong>Date of Birth:</strong> {record.dob} <br />
                <strong>Last Visit:</strong> {record.lastVisit} <br />
                <strong>Conditions:</strong> {record.conditions.join(", ")}
              </Typography>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Typography>No records found.</Typography>
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default EMRPage;
