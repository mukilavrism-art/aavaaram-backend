import express from "express";
import {
  getProducts,
  getProductsByCategory,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getProducts);
router.get("/category/:categoryId", getProductsByCategory);

/* ADMIN */
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
