import Product from "../models/Product.js";
import supabase from "../config/supabase.js";

/* ================= GET ALL ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE ================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET BY CATEGORY ================= */
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
    }).populate("category");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      shortDescription,
      description,
      ingredients,
      usage,
      disclaimer,   // ✅ NEW
  // otherNames,
      weight,          // ✅ NEW
      dimensions,      // ✅ NEW
      bestSeller,
    } = req.body;

    let imageUrl = "";

    /* ===== IMAGE UPLOAD ===== */
    if (req.file) {
      const fileName = `public/${Date.now()}-${req.file.originalname}`;

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

      imageUrl = data.publicUrl;
    }

    const product = await Product.create({
      name,
      price: Number(price),
      category,
      shortDescription,
      description,
      ingredients,
      usage,
      disclaimer,   // ✅ NEW
  // otherNames,
      weight,            // ✅ SAVE
      dimensions,        // ✅ SAVE
      image: imageUrl,
      bestSeller: bestSeller === "true" || bestSeller === true,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      price,
      category,
      shortDescription,
      description,
      ingredients,
      usage,
      disclaimer,   // ✅ NEW
  // otherNames,
      weight,          // ✅ NEW
      dimensions,      // ✅ NEW
      bestSeller,
    } = req.body;

    /* ===== FIELD UPDATE ===== */
    product.name = name || product.name;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.shortDescription = shortDescription ?? product.shortDescription;
    product.description = description || product.description;
    product.ingredients = ingredients || product.ingredients;
    product.usage = usage || product.usage;
    product.disclaimer = disclaimer || product.disclaimer;
// product.otherNames = otherNames || product.otherNames;
    product.weight = weight || product.weight;              // ✅ UPDATE
    product.dimensions = dimensions || product.dimensions;  // ✅ UPDATE

    if (bestSeller !== undefined) {
      product.bestSeller =
        bestSeller === "true" || bestSeller === true;
    }

    /* ===== IMAGE UPDATE ===== */
    if (req.file) {
      const fileName = `public/${Date.now()}-${req.file.originalname}`;

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

      product.image = data.publicUrl;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= REVIEW ================= */
export const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, rating, comment } = req.body;

    product.reviews.push({
      name,
      rating: Number(rating),
      comment,
    });

    product.averageRating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};