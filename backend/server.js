import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysqlPool from "./config/db.js";
import fishRoutes from "./routes/fishRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import reviewRoutesRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

// ✅ Apply CORS before defining routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json()); // ✅ Middleware for parsing JSON

// ✅ Routes
app.use("/api/v1/fish", fishRoutes);
app.use("/api/v1/plant", plantRoutes);
app.use("/api/v1/reviews", reviewRoutesRoutes);
// ✅ Fix test route
app.get("/test", (req, res) => {
  res.status(200).send("MySQL running");
});

// ✅ Check MySQL connection
mysqlPool
  .query("SELECT 1")
  .then(() => console.log("✅ MySQL connected successfully!"))
  .catch((error) => console.error("❌ MySQL connection error:", error));

// ✅ Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
