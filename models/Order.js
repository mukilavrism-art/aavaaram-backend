import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalAmount: Number,
    paymentMethod: String,
    paymentStatus: { type: String, default: "Pending" },

    customer: {
      email: String,
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);