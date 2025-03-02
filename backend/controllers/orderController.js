import db from "../config/db.js";

// Validation function integrated directly in controller
const validateOrder = (orderData) => {
  const errors = [];

  // Check required fields
  if (!orderData.user_id) {
    errors.push("user_id is required");
  }

  if (
    !orderData.ordered_products ||
    (Array.isArray(orderData.ordered_products) &&
      orderData.ordered_products.length === 0)
  ) {
    errors.push("ordered_products are required and cannot be empty");
  }

  if (!orderData.address) {
    errors.push("address is required");
  }

  if (orderData.total_amount === undefined || orderData.total_amount === null) {
    errors.push("total_amount is required");
  } else if (
    isNaN(parseFloat(orderData.total_amount)) ||
    parseFloat(orderData.total_amount) < 0
  ) {
    errors.push("total_amount must be a valid non-negative number");
  }

  // Validate ordered_products if present
  if (orderData.ordered_products && Array.isArray(orderData.ordered_products)) {
    orderData.ordered_products.forEach((product, index) => {
      if (!product.product_id) {
        errors.push(`Product at index ${index} is missing product_id`);
      }
      if (!product.product_name) {
        errors.push(`Product at index ${index} is missing product_name`);
      }
      if (product.price === undefined || product.price === null) {
        errors.push(`Product at index ${index} is missing price`);
      } else if (isNaN(parseFloat(product.price))) {
        errors.push(`Product at index ${index} has an invalid price`);
      }
      if (!product.quantity || isNaN(parseInt(product.quantity))) {
        errors.push(`Product at index ${index} has an invalid quantity`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : null,
  };
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      ordered_products,
      address,
      total_amount,
      status = "pending",
    } = req.body;

    // Validate order data
    const validation = validateOrder(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors });
    }

    // Convert ordered_products to JSON string if it's an object
    const orderedProductsJSON =
      typeof ordered_products === "object"
        ? JSON.stringify(ordered_products)
        : ordered_products;

    const order_date = req.body.order_date || new Date();

    const query = `
      INSERT INTO orders 
        (user_id, ordered_products, address, order_date, total_amount, status, created_at, updated_at) 
      VALUES 
        (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(query, [
      user_id,
      orderedProductsJSON,
      address,
      order_date,
      total_amount,
      status,
    ]);

    res.status(201).json({
      message: "Order created successfully",
      order_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = `
      SELECT id, user_id, ordered_products, address, order_date, total_amount, status, created_at, updated_at 
      FROM orders 
      WHERE user_id = ? 
      ORDER BY order_date DESC
    `;

    const [orders] = await db.execute(query, [user_id]);

    // Parse JSON ordered_products for each order
    const processedOrders = orders.map((order) => {
      try {
        // Only parse if it's a string
        const parsedProducts =
          typeof order.ordered_products === "string"
            ? JSON.parse(order.ordered_products)
            : order.ordered_products;

        return {
          ...order,
          ordered_products: parsedProducts,
        };
      } catch (error) {
        console.error(
          `Error parsing ordered_products for order ${order.id}:`,
          error
        );
        // Return with empty array if parsing fails
        return {
          ...order,
          ordered_products: [],
        };
      }
    });

    res.json(processedOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;

    const query = `
      SELECT id, user_id, ordered_products, address, order_date, total_amount, status, created_at, updated_at 
      FROM orders 
      WHERE id = ?
    `;

    const [orders] = await db.execute(query, [order_id]);

    if (orders.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Parse the JSON ordered_products
    const order = {
      ...orders[0],
      ordered_products: JSON.parse(orders[0].ordered_products),
    };

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const query = `
      UPDATE orders 
      SET status = ?, updated_at = NOW() 
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [status, order_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    const query = `DELETE FROM orders WHERE id = ?`;

    const [result] = await db.execute(query, [order_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

// Get order analytics
export const getOrderAnalytics = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Query to get total orders, total spent, and average order value
    const analyticsQuery = `
      SELECT 
        COUNT(*) as total_orders,
        SUM(total_amount) as total_spent,
        AVG(total_amount) as average_order_value
      FROM orders
      WHERE user_id = ?
    `;

    // Query to get orders by status
    const statusQuery = `
      SELECT status, COUNT(*) as count
      FROM orders
      WHERE user_id = ?
      GROUP BY status
    `;

    const [analytics] = await db.execute(analyticsQuery, [user_id]);
    const [statusCounts] = await db.execute(statusQuery, [user_id]);

    res.json({
      analytics: analytics[0],
      ordersByStatus: statusCounts,
    });
  } catch (error) {
    console.error("Error fetching order analytics:", error);
    res.status(500).json({ error: "Failed to fetch order analytics" });
  }
};
