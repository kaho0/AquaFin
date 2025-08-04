import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postgresPool from "./config/db.js";
import fishRoutes from "./routes/fishRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ Apply CORS before defining routes
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"], // ✅ Localhost for development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ Needed for authentication
  })
);

app.use(express.json()); // ✅ Middleware for parsing JSON

// ✅ Routes
app.use("/api/v1/fish", fishRoutes);
app.use("/api/v1/plant", plantRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/admin", adminRoutes);

// ✅ Fix test route
app.get("/test", (req, res) => {
  res.status(200).send("NeonDB PostgreSQL running");
});
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ✅ Check PostgreSQL connection
postgresPool
  .query("SELECT 1")
  .then(() => console.log("✅ NeonDB PostgreSQL connected successfully!"))
  .catch((error) => console.error("❌ PostgreSQL connection error:", error));

// ✅ Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
