import express from "express";
import {
  getReviews,
  addReview,
  deleteReview,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/getall", getReviews);
router.post("/create", addReview);
router.delete("/:id", deleteReview);
// Add the missing PUT route for editing
router.put("/:id", updateReview); // You'll need to implement updateReview

export default router;
