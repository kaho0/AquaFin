import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get orders for a specific user
router.get("/user/:userId", getUserOrders);

// Get order details by order ID
router.get("/:orderId", getOrderById);

export default router;
