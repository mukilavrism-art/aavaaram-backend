
import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
   updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

// 🔥 ADD THIS
router.post("/", upload.single("image"), createCategory);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;