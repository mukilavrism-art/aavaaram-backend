import Razorpay from "razorpay";
import Order from "../models/Order.js";

/* ===============================
   RAZORPAY INSTANCE
=================================*/
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ===============================
   CREATE RAZORPAY ORDER
=================================*/
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("RAZORPAY CREATE ERROR:", error);
    res.status(500).json({ message: "Razorpay Order Failed" });
  }
};

/* ===============================
   VERIFY PAYMENT & SAVE ORDER
=================================*/
export const verifyPayment = async (req, res) => {
  try {
    const { orderData } = req.body;

    // 🔥 IMPORTANT — SAVE FULL ORDER INCLUDING PRODUCTS
    const newOrder = await Order.create({
      items: orderData.items,              // ✅ productId + name save aagum
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod || "ONLINE",
      paymentStatus: "Paid",
      customer: orderData.customer,
    });

    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({ message: "Payment Verification Failed" });
  }
};

/* ===============================
   CASH ON DELIVERY
=================================*/
export const createCODOrder = async (req, res) => {
  try {
    const { items, totalAmount, customer, paymentMethod } = req.body;

    const newOrder = await Order.create({
      items,                               // ✅ VERY IMPORTANT
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "Pending",
      customer,
    });

    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("COD ERROR:", error);
    res.status(500).json({ message: "COD Order Failed" });
  }
};