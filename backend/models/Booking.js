import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  date: {
    type: Date,
    required: true,
  },

  destination: {
    type: String,
    required: true,
    trim: true,
  },

  persons: {
    type: Number,
    required: true,
    min: 1,
  },

  message: {
    type: String,
    trim: true,
  },

  // ✅ 🔥 ADD THIS FIELD (CRITICAL)
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  // (Optional but recommended if using packages)
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  paymentStatus: {
  type: String,
  enum: ["Unpaid", "Paid", "Failed"],
  default: "Unpaid",
},


  paymentId: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;