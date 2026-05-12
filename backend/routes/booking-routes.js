import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  // deleteBooking,
  cancelBooking
} from "../controller/booking-cont.js";
// import { createOrder } from "../controller/payment-cont.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { updatePaymentStatus } from "../controller/payment-cont.js";
const router = express.Router();

router.post("/", auth, createBooking);
router.get("/my", auth, getMyBookings);
router.get("/", auth, getAllBookings);

 // or booking controller

router.put("/payment/:id", auth, updatePaymentStatus);
router.put("/:id/cancel", auth, cancelBooking);
export default router;