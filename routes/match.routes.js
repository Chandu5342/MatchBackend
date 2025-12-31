import express from "express";
import { getMatches } from "../controllers/match.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected route
router.get("/", authMiddleware, getMatches);

export default router;
