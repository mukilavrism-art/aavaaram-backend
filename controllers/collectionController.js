import Collection from "../models/Collection.js";

/* GET ALL COLLECTIONS */
export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE COLLECTION */
export const createCollection = async (req, res) => {
  try {
    const collection = new Collection({
      name: req.body.name,
    });

    const saved = await collection.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE COLLECTION */
export const deleteCollection = async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    res.json({ message: "Collection deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
