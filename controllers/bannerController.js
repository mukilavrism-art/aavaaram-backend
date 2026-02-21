import Banner from "../models/Banner.js";
import supabase from "../config/supabase.js";

/* ADD */
export const addBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const fileName = `banners/${Date.now()}-${req.file.originalname}`;

    const { error } = await supabase.storage
      .from("products")   // same bucket
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.log("UPLOAD ERROR:", error);
      return res.status(500).json({ message: error.message });
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    const banner = await Banner.create({
      image: data.publicUrl,
    });

    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET */
export const getBanners = async (req, res) => {
  res.json(await Banner.find());
};

/* UPDATE */
export const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const fileName = `banners/${Date.now()}-${req.file.originalname}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      { image: data.publicUrl },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteBanner = async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
