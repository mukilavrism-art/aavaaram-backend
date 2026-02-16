import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
