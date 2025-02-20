import express from "express";
import {
  createFish,
  deleteFish,
  getFishByID,
  getFishes,
  updateFish,
} from "../controllers/fishController.js"; // Named import

const router = express.Router();

// Route for fetching all fish
router.get("/getall", getFishes);
router.get("/get/:id", getFishByID);
router.post("/create", createFish);
router.put("/:id", updateFish);
router.delete("/:id", deleteFish);
export default router; // Export the router
