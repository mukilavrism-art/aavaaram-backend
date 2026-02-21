import Category from "../models/Category.js";
import supabase from "../config/supabase.js";

/* GET ALL */
export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

/* GET BY ID */
export const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
};

/* CREATE */
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    let imageUrl = "";

    if (req.file) {
      const fileName = `categories/${Date.now()}-${req.file.originalname}`;

      const { error } = await supabase.storage
        .from("products") // same bucket
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

      imageUrl = data.publicUrl;
    }

    const category = await Category.create({
      name,
      image: imageUrl,
    });

    res.json(category);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};