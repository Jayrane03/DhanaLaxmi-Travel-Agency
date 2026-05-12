import express from "express";
const router = express.Router();

import {
  createQuery,
  getQueries,
  getQueriesGrouped,
  updateQueryStatus,
  deleteQuery,
  getUserQueries
} from "../../controller/admin/admin-query-cont.js";

import { auth } from "../../middleware/auth.js";

// USER
router.post("/", createQuery);

// ADMIN
router.get("/grouped", auth, getQueriesGrouped); // 🔥 MUST be before "/:id"
router.get("/", auth, getQueries);

router.put("/:id", auth, updateQueryStatus);
router.delete("/:id", auth, deleteQuery);
router.get("/user", getUserQueries);
export default router;