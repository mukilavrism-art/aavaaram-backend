import Category from "../models/Category.js";

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
  const category = await Category.create(req.body);
  res.json(category);
};

/* DELETE */
export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
