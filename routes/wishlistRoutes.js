import express from "express";
import {
  toggleWishlist,
  getUserWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/toggle", protect, toggleWishlist);
router.get("/", protect, getUserWishlist);

export default router;