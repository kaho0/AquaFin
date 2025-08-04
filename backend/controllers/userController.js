import db from "../config/db.js"; // Import your database connection

// Register a new user
export const registerUser = async (req, res) => {
  const { uid, email, firstName, photo } = req.body;

  if (!uid || !email || !firstName || !photo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const sql =
      "INSERT INTO users (uid, email, firstName, photo) VALUES ($1, $2, $3, $4) RETURNING *";
    const { rows } = await db.query(sql, [uid, email, firstName, photo]);

    res.status(201).json({ 
      message: "User registered successfully",
      data: rows[0]
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user details by UID
export const getUserById = async (req, res) => {
  const { uid } = req.params;

  try {
    const { rows } = await db.query("SELECT * FROM users WHERE uid = $1", [uid]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
