import express from "express";
import {
  createPlant,
  deletePlant,
  getPlantByID,
  getPlants,
  updatePlant,
} from "../controllers/plantController.js"; // Named import

const router = express.Router();

// Route for fetching all plants
router.get("/getall", getPlants);

// Route for fetching a single plant by ID
router.get("/get/:id", getPlantByID);

// Route for creating a new plant
router.post("/create", createPlant);

// Route for updating a plant by ID
router.put("/:id", updatePlant);

// Route for deleting a plant by ID
router.delete("/:id", deletePlant);

export default router; // Export the router
