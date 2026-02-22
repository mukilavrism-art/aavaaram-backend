import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  createCODOrder,
} from "../controllers/paymentController.js";

const router = express.Router();

/* IMPORTANT: NO AUTH MIDDLEWARE HERE */
router.post("/razorpay", createRazorpayOrder);
router.post("/verify", verifyPayment);
router.post("/cod", createCODOrder);

export default router;