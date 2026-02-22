import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* GET ALL */
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

/* GET USER ORDERS */
router.get("/user/:email", async (req, res) => {
  const orders = await Order.find({
    "customer.email": req.params.email,
  }).sort({ createdAt: -1 });

  res.json(orders);
});

export default router;