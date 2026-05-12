import Razorpay from "razorpay";
import Booking from "../models/Booking.js";
// ✅ SINGLE instance (top only)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_SgsruGGzwArIjD",
  key_secret: process.env.RAZORPAY_SECRET||"nqA7e05uc24LutEbzOo76RX2"
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("Incoming amount:", amount);
    console.log("KEY:", process.env.RAZORPAY_KEY_ID);
    console.log("SECRET:", process.env.RAZORPAY_SECRET);

    // ✅ validation
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const options = {
      amount: amount * 100, // 🔥 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    console.log("ORDER CREATED:", order.id);

    res.status(200).json(order);

  } catch (error) {
    console.error("RAZORPAY ERROR FULL:", error);

    res.status(500).json({
      success: false,
      message: error?.error?.description || "Order creation failed"
    });
  }
};
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentId } = req.body;

    console.log("Updating payment for:", id);

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // ✅ check user ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    // ✅ update fields
    booking.paymentStatus = "Paid";
    booking.paymentId = paymentId;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: booking
    });

  } catch (err) {
    console.error("UPDATE PAYMENT ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};