import express from "express";
import {
  createOrder,
  getOrders,
  exportOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/export", exportOrders);

export default router;
