import express from "express";
import { auth }  from "../../middleware/auth.js";        // adjust path if needed
import  { isAdmin }  from "../../middleware/isAdmin.js";
import { updateBookingStatus , markCompleted , deleteBooking } from "../../controller/admin/admin-booking-cont.js";


const router = express.Router();
router.delete("/remove:id", auth, isAdmin , deleteBooking);
router.put("/booking/:id", auth, isAdmin, updateBookingStatus);
router.put("/complete/:id", auth, markCompleted);
export default router;