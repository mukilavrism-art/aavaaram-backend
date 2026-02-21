import express from "express";
import {
  addBanner,
  getBanners,
  deleteBanner,
  updateBanner,
} from "../controllers/bannerController.js";

import { upload } from "../middleware/upload.js"; // 🔥 use multer memoryStorage

const router = express.Router();

/* GET */
router.get("/", getBanners);

/* UPLOAD */
router.post("/", upload.single("image"), addBanner);

/* UPDATE */
router.put("/:id", upload.single("image"), updateBanner);

/* DELETE */
router.delete("/:id", deleteBanner);

export default router;
