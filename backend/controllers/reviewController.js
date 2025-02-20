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
export const addReview = async (req, res) => {
  const { name, role, review, img } = req.body;
  if (!name || !role || !review || !img) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query =
      "INSERT INTO review (name, role, review, img) VALUES (?, ?, ?, ?)";
    await db.execute(query, [name, role, review, img]);
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

// Delete a review by ID
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
