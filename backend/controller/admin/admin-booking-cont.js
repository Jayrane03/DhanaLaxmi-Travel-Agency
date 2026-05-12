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


export const markCompleted = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: "Not found" });

    booking.completed = true;

    await booking.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    await booking.deleteOne();

    res.json({
      success: true,
      message: "Booking deleted"
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};