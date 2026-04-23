import Booking from "../../models/Booking.js";
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
  req.params.id,
  { status },
  { new: true }
);

if (!booking) {
  return res.status(404).json({ msg: "Booking not found" });
}

res.json({
  success: true,
  data: booking
});

  } catch (err) {
  console.error("UPDATE ERROR:", err); // 🔥 ADD THIS
  res.status(500).json({ msg: err.message });
}
};