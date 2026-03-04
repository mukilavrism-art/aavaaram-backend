import Cart from "../models/Cart.js";

// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, qty: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].qty += 1;
      } else {
        cart.items.push({ product: productId, qty: 1 });
      }

      await cart.save();
    }

    res.status(200).json(cart);

  } catch (error) {
    console.error("ADD CART ERROR:", error);
    res.status(500).json({ message: "Cart error" });
  }
};

// ✅ GET USER CART
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.status(200).json(cart);

  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};