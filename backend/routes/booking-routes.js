import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  deleteBooking
} from "../controller/booking-cont.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/my", auth, getMyBookings);
router.get("/", auth, getAllBookings);
router.delete("/:id", auth, deleteBooking);

export default router;