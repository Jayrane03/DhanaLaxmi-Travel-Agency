import express from "express";
import { auth }  from "../../middleware/auth.js";        // adjust path if needed
import  { isAdmin }  from "../../middleware/isAdmin.js";
import { updateBookingStatus } from "../../controller/admin/admin-booking-cont.js";


const router = express.Router();
router.put("/booking/:id", auth, isAdmin, updateBookingStatus);
export default router;