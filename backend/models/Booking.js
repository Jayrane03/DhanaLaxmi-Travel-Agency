import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  destination: { type: String, required: true },
  persons: { type: Number, required: true },
  message: { type: String },
  status: {
  type: String,
  enum: ["Pending", "Confirmed", "Cancelled"],
  default: "Pending"
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;