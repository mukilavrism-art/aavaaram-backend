import express from "express";
import {
  addBanner,
  getBanners,
  deleteBanner,
  updateBanner,
} from "../controllers/bannerController.js";

import {
  uploadBanner,
  resizeBanner,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getBanners);

// ✅ upload
router.post("/", uploadBanner, resizeBanner, addBanner);

// ✅ edit
router.put("/:id", uploadBanner, resizeBanner, updateBanner);

// ✅ delete
router.delete("/:id", deleteBanner);

export default router;
