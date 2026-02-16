import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: String,

    customer: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    products: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
      }
    ],

    totalAmount: Number,
    paymentMethod: String,
    paymentStatus: String,
    orderStatus: String,
  },
  { timestamps: true }   // 🔥 THIS ADDS createdAt automatically
);

export default mongoose.model("Order", orderSchema);
