import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { paymentStatus: status },
    { new: true }
  );

  res.json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({
    "customer.email": req.params.email,
  }).sort({ createdAt: -1 });

  res.json(orders);
};