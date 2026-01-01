import express from "express";
import {
  getMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controllers/match.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

// Public/protected routes
router.get("/", authMiddleware, getMatches);

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, createMatch);
router.put("/:id", authMiddleware, adminMiddleware, updateMatch);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMatch);

export default router;
