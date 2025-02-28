import db from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, status = "completed" } = req.body;

    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("📌 Creating new order:", { userId, totalAmount, status });

    // Start a transaction
    await db.query("START TRANSACTION");

    // 1. Create order in orders table
    const orderQuery = `
      INSERT INTO orders (user_id, total_amount, status, created_at)
      VALUES (?, ?, ?, NOW())
    `;

    const [orderResult] = await db.query(orderQuery, [
      userId,
      totalAmount,
      status,
    ]);

    const orderId = orderResult.insertId;
    console.log("✅ Order created with ID:", orderId);

    // 2. Add order items
    const orderItemsQuery = `
      INSERT INTO order_items (order_id, product_id, category, quantity, price)
      VALUES ?
    `;

    const orderItemsValues = items.map((item) => [
      orderId,
      item.product_id,
      item.category,
      item.quantity,
      item.price,
    ]);

    await db.query(orderItemsQuery, [orderItemsValues]);
    console.log("✅ Order items added:", items.length);

    // 3. Clear the user's cart
    const clearCartQuery = `DELETE FROM cart WHERE user_id = ?`;
    await db.query(clearCartQuery, [userId]);
    console.log("✅ User cart cleared");

    // Commit the transaction
    await db.query("COMMIT");

    res.status(201).json({
      message: "Order created successfully",
      orderId: orderId,
    });
  } catch (error) {
    // Rollback in case of error
    await db.query("ROLLBACK");
    console.error("❌ MySQL Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    console.log("📌 Fetching orders for user:", userId);

    // Get orders
    const ordersQuery = `
      SELECT id, total_amount, status, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;

    const [orders] = await db.query(ordersQuery, [userId]);
    console.log("✅ Retrieved orders:", orders.length);

    if (orders.length === 0) {
      return res.status(200).json([]);
    }

    // Get order items for each order
    const orderIds = orders.map((order) => order.id);
    const orderItemsQuery = `
      SELECT oi.order_id, oi.product_id, oi.category, oi.quantity, oi.price,
             COALESCE(f.name, p.name) AS product_name,
             COALESCE(f.image_url, p.image_url) AS image_url
      FROM order_items oi
      LEFT JOIN fishes f ON oi.product_id = f.id AND oi.category = 'fish'
      LEFT JOIN plants p ON oi.product_id = p.id AND oi.category = 'plant'
      WHERE oi.order_id IN (?)
    `;

    const [orderItems] = await db.query(orderItemsQuery, [orderIds]);
    console.log("✅ Retrieved order items:", orderItems.length);

    // Combine orders with their items
    const ordersWithItems = orders.map((order) => {
      const items = orderItems.filter((item) => item.order_id === order.id);
      return {
        id: order.id,
        totalAmount: Number(order.total_amount),
        status: order.status,
        createdAt: order.created_at,
        items: items.map((item) => ({
          product_id: item.product_id,
          category: item.category,
          quantity: item.quantity,
          price: Number(item.price),
          product_name: item.product_name,
          image_url: item.image_url,
        })),
      };
    });

    res.status(200).json(ordersWithItems);
  } catch (error) {
    console.error("❌ MySQL Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // Get order details
    const orderQuery = `
      SELECT id, user_id, total_amount, status, created_at
      FROM orders
      WHERE id = ?
    `;

    const [orders] = await db.query(orderQuery, [orderId]);

    if (orders.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = orders[0];

    // Get order items
    const itemsQuery = `
      SELECT oi.product_id, oi.category, oi.quantity, oi.price,
             COALESCE(f.name, p.name) AS product_name,
             COALESCE(f.image_url, p.image_url) AS image_url
      FROM order_items oi
      LEFT JOIN fishes f ON oi.product_id = f.id AND oi.category = 'fish'
      LEFT JOIN plants p ON oi.product_id = p.id AND oi.category = 'plant'
      WHERE oi.order_id = ?
    `;

    const [items] = await db.query(itemsQuery, [orderId]);

    const orderWithItems = {
      id: order.id,
      userId: order.user_id,
      totalAmount: Number(order.total_amount),
      status: order.status,
      createdAt: order.created_at,
      items: items.map((item) => ({
        product_id: item.product_id,
        category: item.category,
        quantity: item.quantity,
        price: Number(item.price),
        product_name: item.product_name,
        image_url: item.image_url,
      })),
    };

    res.status(200).json(orderWithItems);
  } catch (error) {
    console.error("❌ MySQL Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
