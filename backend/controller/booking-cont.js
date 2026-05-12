import Booking from "../models/Booking.js";

/**
 * @desc Create Booking
 * @route POST /api/bookings
 */
export const createBooking = async (req, res) => {
  try {
    let {
      name,
      email,
      date,
      destination,
      persons,
      message,
      price
    } = req.body;

    // ✅ Normalize values
    price = Number(price);
    persons = Number(persons);

    // 🔴 Required validation
    if (!name || !email || !date || !destination || !persons) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 🔴 CRITICAL FIX: Validate price
    if (!price || isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: "Valid price is required",
      });
    }

    const booking = await Booking.create({
      name,
      email,
      date,
      destination,
      persons,
      price, // ✅ now guaranteed valid
      message,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);

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
    console.error("GET MY BOOKINGS ERROR:", err);

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
    console.error("GET ALL BOOKINGS ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "Cancelled";

    // 🔥 refund logic
    if (booking.paymentStatus === "Paid") {
      booking.paymentStatus = "Refunded";
    }

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};