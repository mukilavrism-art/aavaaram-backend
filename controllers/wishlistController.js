import Wishlist from "../models/Wishlist.js";

// ✅ TOGGLE WISHLIST
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [productId],
      });
    } else {
      const exists = wishlist.products.includes(productId);

      if (exists) {
        wishlist.products = wishlist.products.filter(
          (id) => id.toString() !== productId
        );
      } else {
        wishlist.products.push(productId);
      }

      await wishlist.save();
    }

    res.status(200).json(wishlist);

  } catch (error) {
    console.error("WISHLIST ERROR:", error);
    res.status(500).json({ message: "Wishlist error" });
  }
};

// ✅ GET USER WISHLIST
export const getUserWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate("products");

    res.status(200).json(wishlist);

  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};