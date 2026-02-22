import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  deleteProduct,
  addReview,
  updateProduct
} from "../controllers/productController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

/* ===== GET ROUTES ===== */
router.get("/", getProducts);

// ✅ CATEGORY ROUTE MUST COME BEFORE :id
router.get("/category/:categoryId", getProductsByCategory);

router.get("/:id", getProductById);

/* ===== CREATE ===== */
router.post("/", upload.single("image"), createProduct);

/* ===== UPDATE ===== */
router.put("/:id", upload.single("image"), updateProduct);

/* ===== REVIEW ===== */
router.post("/:id/review", addReview);

/* ===== DELETE ===== */
router.delete("/:id", deleteProduct);

export default router;