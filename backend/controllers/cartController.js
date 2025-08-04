import db from "../config/db.js";

export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, category, quantity } = req.body;

    console.log("📌 Received cart request:", req.body);

    if (!user_id || !product_id || !category || !quantity) {
      console.error("❌ Missing required fields:", { user_id, product_id, category, quantity });
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate data types
    if (typeof user_id !== 'string' || typeof product_id !== 'number' || typeof category !== 'string' || typeof quantity !== 'number') {
      console.error("❌ Invalid data types:", { user_id, product_id, category, quantity });
      return res.status(400).json({ error: "Invalid data types" });
    }

    console.log("📌 Inserting into cart:", req.body); // Debugging log

    const sql = `
      INSERT INTO cart (user_id, product_id, category, quantity)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, product_id, category) 
      DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
    `;

    const result = await db.query(sql, [
      user_id,
      product_id,
      category,
      quantity,
    ]);

    console.log("✅ PostgreSQL Query Result:", result); // Log PostgreSQL response

    // For INSERT ... ON CONFLICT ... DO UPDATE, the operation is successful even if no rows are returned
    return res.status(201).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error("❌ PostgreSQL Error:", error);
    console.error("❌ Error details:", {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ Get cart items for a user
export const getCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log("📌 Received request for user_id:", user_id);

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const query = `
      SELECT c.id, c.product_id, c.category, c.quantity,
             COALESCE(f.name, p.name) AS product_name,
             COALESCE(f.image_url, p.image_url) AS image_url,
             COALESCE(f.price, p.price) AS price
      FROM cart c
      LEFT JOIN fishes f ON c.product_id = f.id AND c.category = 'fish'
      LEFT JOIN plants p ON c.product_id = p.id AND c.category = 'plant'
      WHERE c.user_id = $1`;

    console.log("🔍 Running query:", query, [user_id]);

    // Convert to async/await
    const { rows } = await db.query(query, [user_id]);

    console.log("✅ Raw query result:", rows);

    if (!rows.length) {
      console.warn("⚠️ No items found in cart for user:", user_id);
      return res.status(404).json({ message: "No items in cart." });
    }

    // Ensure all fields are JSON-safe
    const safeResult = rows.map((item) => ({
      id: item.id,
      product_id: item.product_id, // Include product_id
      category: item.category,
      quantity: item.quantity,
      product_name: item.product_name,
      image_url: item.image_url,
      price: Number(item.price), // Convert price to number
    }));

    console.log("📤 Sending response:", JSON.stringify(safeResult, null, 2));
    res.status(200).json(safeResult);
    console.log("🎯 Response sent successfully!");
  } catch (error) {
    console.error("❌ PostgreSQL Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateCartQuantity = async (req, res) => {
  try {
    console.log("📝 Received request to update cart quantity:", req.body);
    const { user_id, product_id, category, quantity } = req.body;

    if (!user_id || !product_id || !category || quantity === undefined) {
      console.warn("⚠️ Missing required fields in request body.");
      return res.status(400).json({ error: "Missing required fields." });
    }

    const updateQuery = `
      UPDATE cart
      SET quantity = $1
      WHERE user_id = $2 AND product_id = $3 AND category = $4`;

    console.log("🔍 Running query:", updateQuery, [
      quantity,
      user_id,
      product_id,
      category,
    ]);
    const { rows } = await db.query(updateQuery, [
      quantity,
      user_id,
      product_id,
      category,
    ]);

    if (rows.length === 0) {
      console.warn("⚠️ No cart item found to update for user:", user_id);
      return res.status(404).json({ message: "Cart item not found." });
    }

    // Fetch updated cart items after update
    const fetchQuery = `
      SELECT c.id, c.product_id, c.category, c.quantity,
             COALESCE(f.name, p.name) AS product_name,
             COALESCE(f.image_url, p.image_url) AS image_url,
             COALESCE(f.price, p.price) AS price
      FROM cart c
      LEFT JOIN fishes f ON c.product_id = f.id AND c.category = 'fish'
      LEFT JOIN plants p ON c.product_id = p.id AND c.category = 'plant'
      WHERE c.user_id = $1`;

    console.log("🔍 Fetching updated cart items with query:", fetchQuery, [
      user_id,
    ]);
    const { rows: updatedCart } = await db.query(fetchQuery, [user_id]);

    console.log("✅ Updated cart items:", updatedCart);

    const safeResult = updatedCart.map((item) => ({
      id: item.id,
      product_id: item.product_id, // Include product_id
      category: item.category,
      quantity: item.quantity,
      product_name: item.product_name,
      image_url: item.image_url,
      price: Number(item.price),
    }));

    console.log(
      "📤 Sending updated cart response:",
      JSON.stringify(safeResult, null, 2)
    );
    res.status(200).json(safeResult);
    console.log("🎯 Response sent successfully!");
  } catch (error) {
    console.error("❌ Database Error (update quantity):", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    console.log("🗑️ Removing item from cart:", req.body);
    const { user_id, product_id, category } = req.body;

    if (!user_id || !product_id || !category) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const deleteQuery = `DELETE FROM cart WHERE user_id = $1 AND product_id = $2 AND category = $3`;
    const { rows } = await db.query(deleteQuery, [
      user_id,
      product_id,
      category,
    ]);

    console.log("✅ Item removed from cart!", rows);
    res.status(200).json({ message: "Item removed from cart!" });
  } catch (error) {
    console.error("🛑 DB Error (remove cart item):", error);
    res.status(500).json({ error: "Database error." });
  }
};

export const clearCart = async (req, res) => {
  try {
    console.log("🗑️ Clearing cart for user:", req.body);
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const deleteQuery = `DELETE FROM cart WHERE user_id = $1`;
    const { rows } = await db.query(deleteQuery, [user_id]);

    console.log("✅ Cart cleared for user!", rows);
    res.status(200).json({ message: "Cart cleared successfully!" });
  } catch (error) {
    console.error("🛑 DB Error (clear cart):", error);
    res.status(500).json({ error: "Database error." });
  }
};
