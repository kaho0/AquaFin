import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderAnalytics,
  getAllOrders,
  getAdminAnalytics,
  getLowStockAlerts,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

// Get all orders for a user
router.get("/user/:user_id", getUserOrders);

// Get a specific order by ID
router.get("/:order_id", getOrderById);

// Update order status
router.put("/:order_id/status", updateOrderStatus);

// Delete an order
router.delete("/:order_id", deleteOrder);

// Get order analytics
router.get("/analytics/:user_id", getOrderAnalytics);

// Add admin route to get all orders
router.get("/admin/all", getAllOrders);

// Add admin analytics routes
router.get("/admin/analytics", getAdminAnalytics);
router.get("/admin/low-stock", getLowStockAlerts);

export default router;
