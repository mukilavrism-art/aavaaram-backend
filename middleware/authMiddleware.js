import jwt from "jsonwebtoken";
import User from "../models/User.js";
/*  */
// Protect routes (user/admin)
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};

// Admin-only middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ error: "Admin access required" });
};
