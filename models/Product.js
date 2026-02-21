import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,

    description: String,
    ingredients: String,
    usage: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    bestSeller: { type: Boolean, default: false },

    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);