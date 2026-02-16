import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

/* ===== MEMORY STORAGE ===== */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image")) {
      cb(new Error("Please upload image"));
    }
    cb(null, true);
  },
});

/* ✅ Upload middleware */
export const uploadBanner = upload.single("image");

/* ✅ Resize middleware */
export const resizeBanner = async (req, res, next) => {
  if (!req.file) return next();

  const uploadDir = "uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filename = `banner-${Date.now()}.png`;
  const filepath = path.join(uploadDir, filename);

  await sharp(req.file.buffer)
    .resize(1024, 329)
    .png()
    .toFile(filepath);

  req.savedImage = filename;

  next();
};
