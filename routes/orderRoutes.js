import express from "express";
import {
  createOrder,
  getOrders,
  exportOrders,
  getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE ORDER */
router.post("/", createOrder);

/* ADMIN ROUTES */
router.get("/", getOrders);
router.get("/export", exportOrders);

/* USER ROUTE */
router.get("/my-orders", protect, getMyOrders);

export default router;
