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
// CANCEL ORDER
router.put("/cancel/:id", async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: "Cancelled",
        cancelReason: reason,
        cancelledAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cancel failed" });
  }
});

export default router;