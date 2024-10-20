// models/Appointment.js

const mongoose = require("mongoose");

// Appointment schema definition
const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
