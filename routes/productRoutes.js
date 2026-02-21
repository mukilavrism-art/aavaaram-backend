import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  deleteProduct,
  addReview,
} from "../controllers/productController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:categoryId", getProductsByCategory);

router.post("/", upload.single("image"), createProduct);
router.post("/:id/review", addReview);
router.delete("/:id", deleteProduct);

export default router;