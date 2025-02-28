import db from "../config/db.js"; // Assuming you have a database connection file

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const [reviews] = await db.execute("SELECT * FROM review");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Add a new review
// Add a new review
export const addReview = async (req, res) => {
  const { userId, name, review_text } = req.body;

  if (!userId || !name || !review_text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query =
      "INSERT INTO review (userId, name, review_text) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [userId, name, review_text]);

    // Get the inserted review to return it (including the id)
    const [newReview] = await db.execute("SELECT * FROM review WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json(newReview[0]);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};
export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM review WHERE id = ?";
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};
// Update a review
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { userId, name, review_text } = req.body;

  if (!userId || !name || !review_text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // First check if the review exists and belongs to the user
    const [existingReview] = await db.execute(
      "SELECT * FROM review WHERE id = ?",
      [id]
    );

    if (existingReview.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (existingReview[0].userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own reviews" });
    }

    const query = "UPDATE review SET name = ?, review_text = ? WHERE id = ?";
    const [result] = await db.execute(query, [name, review_text, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Get the updated review to return it
    const [updatedReview] = await db.execute(
      "SELECT * FROM review WHERE id = ?",
      [id]
    );

    res.status(200).json(updatedReview[0]);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};
