import express from "express";
import {
  getCollections,
  createCollection,
  deleteCollection,
} from "../controllers/collectionController.js";

const router = express.Router();

router.get("/", getCollections);
router.post("/", createCollection);
router.delete("/:id", deleteCollection);

export default router;
