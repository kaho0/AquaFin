import express from "express";
import {
  getReviews,
  addReview,
  deleteReview,
} from "../controllers/reviewController.js"; // Named import

const router = express.Router();

// Route for fetching all reviews
router.get("/getall", getReviews);

// Route for adding a new review
router.post("/create", addReview);

// Route for deleting a review by ID
router.delete("/:id", deleteReview);

export default router; // Export the router
