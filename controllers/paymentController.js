import Razorpay from "razorpay";
import Order from "../models/Order.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/* CREATE RAZORPAY ORDER */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    res.json(order);
  } catch (err) {
    console.log("RAZORPAY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* VERIFY PAYMENT */
export const verifyPayment = async (req, res) => {
  try {
    const { orderData } = req.body;

    await Order.create({
      ...orderData,
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* COD */
export const createCODOrder = async (req, res) => {
  try {
    await Order.create({
      ...req.body,
      paymentMethod: "COD",
      paymentStatus: "Pending",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};