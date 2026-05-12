// routes/adminRoutes.js

import express from "express";

// 🔐 middleware
import { auth }  from "../../middleware/auth.js";        // adjust path if needed
import  { isAdmin }  from "../../middleware/isAdmin.js";
// import { updateBookingStatus } from "../../controller/admin/admin-booking-cont.js";
// 📦 package controller
import {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage
} from "../../controller/admin/pacakage-cont.js"; // 🔥 fix spelling

// 👤 user controller
import {
  getAllUsers,
  deleteUser,
  updateUserRole
} from "../../controller/admin/user-cont.js"; // 🔥 correct imports

const router = express.Router();


// ================= PACKAGES =================

// create (admin only)
router.post("/packages", auth, isAdmin, createPackage);

// get all (public for user dashboard)
router.get("/packages", getPackages);
router.put("/packages/:id", updatePackage);
router.delete("/packages/:id", deletePackage);

// ================= USERS =================

// get all users
router.get("/users", auth, isAdmin, getAllUsers);

// delete user
router.delete("/users/:id", auth, isAdmin, deleteUser);

// update role (admin/user)
router.put("/users/:id", auth, isAdmin, updateUserRole);

// Booking

export default router;