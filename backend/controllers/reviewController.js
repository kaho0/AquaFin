import db from "../config/db.js"; // Assuming you have a database connection file

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM review");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Add a new review
export const addReview = async (req, res) => {
  const { userId, name, review_text } = req.body;

  if (!userId || !name || !review_text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query =
      "INSERT INTO review (userId, name, review_text) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await db.query(query, [userId, name, review_text]);

    res.status(201).json(rows[0]);
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
    const query = "DELETE FROM review WHERE id = $1 RETURNING *";
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
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
    const { rows: existingReview } = await db.query(
      "SELECT * FROM review WHERE id = $1",
      [id]
    );

    if (existingReview.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (existingReview[0].userid !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own reviews" });
    }

    const query = "UPDATE review SET name = $1, review_text = $2 WHERE id = $3 RETURNING *";
    const { rows } = await db.query(query, [name, review_text, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};
