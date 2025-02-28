import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// ✅ Add an item to the cart
router.post("/add", addToCart);

// ✅ Get all cart items for a user
router.get("/:user_id", getCartItems);
// router.get("/cart", getWholeCart);
// ✅ Update cart item quantity
router.put("/update", updateCartQuantity);

// ✅ Remove a specific item from the cart
router.delete("/remove", removeFromCart);

// ✅ Clear the entire cart for a user
router.delete("/clear", clearCart);

export default router;
