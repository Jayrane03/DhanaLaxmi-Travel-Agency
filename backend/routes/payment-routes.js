import express from "express";

const router = express.Router();

import { auth } from "../middleware/auth.js";
import { createOrder  } from "../controller/payment-cont.js";
router.post("/create-order", auth,createOrder);
// routes/booking-routes.js
// router.put("/payment/:id", auth, updatePaymentStatus);
export default router;