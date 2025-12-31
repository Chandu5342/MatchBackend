import express from "express";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../controllers/favorite.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:matchId", authMiddleware, addToFavorites);
router.delete("/:matchId", authMiddleware, removeFromFavorites);
router.get("/", authMiddleware, getFavorites);

export default router;
