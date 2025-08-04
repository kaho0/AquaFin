import express from "express";
import {
  getFishes,
  getFishByID,
  createFish,
  updateFish,
  deleteFish,
} from "../controllers/fishController.js";
import {
  getPlants,
  getPlantByID,
  createPlant,
  updatePlant,
  deletePlant,
} from "../controllers/plantController.js";
import {
  getAllOrders,
  getAdminAnalytics,
  getLowStockAlerts,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Product Management Routes
router.get("/products/fish", getFishes);
router.get("/products/fish/:id", getFishByID);
router.post("/products/fish", createFish);
router.put("/products/fish/:id", updateFish);
router.delete("/products/fish/:id", deleteFish);

router.get("/products/plant", getPlants);
router.get("/products/plant/:id", getPlantByID);
router.post("/products/plant", createPlant);
router.put("/products/plant/:id", updatePlant);
router.delete("/products/plant/:id", deletePlant);

// Order Management Routes
router.get("/orders", getAllOrders);
router.put("/orders/:order_id/status", updateOrderStatus);

// Analytics Routes
router.get("/analytics", getAdminAnalytics);
router.get("/low-stock", getLowStockAlerts);

export default router; 