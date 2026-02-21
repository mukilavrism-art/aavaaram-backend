import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  getProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =============================
// Auth Routes
// =============================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Google Login
router.post("/google", googleLogin);

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);

export default router;