import Order from "../models/Order.js";
import { v4 as uuidv4 } from "uuid";
import { Parser } from "json2csv";

/* ================= CREATE ORDER ================= */
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      orderId: "ORD-" + uuidv4().slice(0, 8),
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ORDERS (ADMIN) ================= */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET MY ORDERS (USER) ================= */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "customer.email": req.user.email,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= EXPORT CSV ================= */
export const exportOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    const formatted = orders.map((order) => ({
      OrderID: order.orderId,
      Name:
        order.customer?.firstName +
        " " +
        order.customer?.lastName,
      Email: order.customer?.email,
      Products: order.products
        ?.map((p) => p.name + " x" + p.qty)
        .join(", "),
      Payment: order.paymentMethod,
      Status: order.orderStatus,
      Total: order.totalAmount,
      BookingTime: order.createdAt,
    }));

    const parser = new Parser();
    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("orders.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
