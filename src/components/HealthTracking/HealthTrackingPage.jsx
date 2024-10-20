import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  TextField,
} from "@mui/material";

const HealthTrackingPage = () => {
  // State variables
  const [selectedTest, setSelectedTest] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [runningDistance, setRunningDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [testResults, setTestResults] = useState([]);

  // Available health tests
  const healthTests = ["Sugar Test", "Running Test", "Weight Test"];

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    clearInputs(); // Clear previous inputs when selecting a new test
  };

  const handleSubmit = () => {
    const result = {
      test: selectedTest,
      ...(selectedTest === "Sugar Test" && { sugarLevel }),
      ...(selectedTest === "Running Test" && { runningDistance }),
      ...(selectedTest === "Weight Test" && { weight }),
    };
    setTestResults((prevResults) => [...prevResults, result]);
    clearInputs(); // Clear inputs after submission
    setSelectedTest(""); // Reset selected test
  };

  const clearInputs = () => {
    setSugarLevel("");
    setRunningDistance("");
    setWeight("");
  };

  return (
    <Container
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Health Tracking System
      </Typography>

      {/* Health Test Selection */}
      {selectedTest === "" ? (
        <>
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            Please select a health test:
          </Typography>
          {healthTests.map((test, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={() => handleTestSelection(test)}
            >
              {test}
            </Button>
          ))}
        </>
      ) : (
        <Box style={{ marginBottom: "20px" }}>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            {selectedTest}:
          </Typography>
          {selectedTest === "Sugar Test" && (
            <TextField
              label="Enter Sugar Level (mg/dL)"
              variant="outlined"
              value={sugarLevel}
              onChange={(e) => setSugarLevel(e.target.value)}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
          )}
          {selectedTest === "Running Test" && (
            <TextField
              label="Enter Running Distance (km)"
              variant="outlined"
              value={runningDistance}
              onChange={(e) => setRunningDistance(e.target.value)}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
          )}
          {selectedTest === "Weight Test" && (
            <TextField
              label="Enter Weight (kg)"
              variant="outlined"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
          )}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setSelectedTest("")}
            style={{ marginLeft: "10px" }}
          >
            Back
          </Button>
        </Box>
      )}

      <Typography variant="h5" style={{ margin: "20px 0" }}>
        Test Results
      </Typography>
      <List>
        {testResults.length > 0 ? (
          testResults.map((result, index) => (
            <ListItem key={index}>
              <Typography>
                {result.test}:{" "}
                {result.sugarLevel
                  ? `Sugar Level: ${result.sugarLevel} mg/dL`
                  : ""}
                {result.runningDistance
                  ? `Running Distance: ${result.runningDistance} km`
                  : ""}
                {result.weight ? `Weight: ${result.weight} kg` : ""}
              </Typography>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Typography>No test results submitted yet.</Typography>
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default HealthTrackingPage;
