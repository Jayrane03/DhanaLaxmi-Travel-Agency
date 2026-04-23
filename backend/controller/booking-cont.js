import Booking from "../models/Booking.js";

/**
 * @desc Create Booking
 * @route POST /api/bookings
 */
export const createBooking = async (req, res) => {
  try {
    const { name, email, date, destination, persons, message } = req.body;

    if (!name || !email || !date || !destination || !persons) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const booking = await Booking.create({
      name,
      email,
      date,
      destination,
      persons,
      message,
      user: req.user.id, // 🔥 linked to user
    });

    res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/**
 * @desc Get My Bookings (User)
 * @route GET /api/bookings/my
 */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/**
 * @desc Get All Bookings (Admin)
 * @route GET /api/bookings
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/**
 * @desc Delete Booking (Only Owner or Admin)
 * @route DELETE /api/bookings/:id
 */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 🔥 Check ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};