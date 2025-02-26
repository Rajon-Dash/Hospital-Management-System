import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain  al least 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain  al least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, "Please provied valid email "],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone number most contain 11 digit"],
    maxLength: [11, "Phone number most contain 11 digit"],
  },
  nid: {
    type: String,
    required: true,
    minLength: [13, "NID must contain 13 digits"],
    maxLength: [13, "NID must contain 13 digits"],
  },

  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },

  hasVisited: {
    type: Boolean,
    default:false,
  },

  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
