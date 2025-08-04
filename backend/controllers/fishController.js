import db from "../config/db.js"; // Ensure correct import

// GET ALL FISH LIST
export const getFishes = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT *, 'fish' AS category FROM fishes" // Add 'fish' as the category
    );
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching fishes:", error);
    res.status(500).json({
      success: false,
      message: "Error in Get All Fish API",
      error,
    });
  }
};

// GET FISH BY ID
export const getFishByID = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "SELECT *, 'fish' AS category FROM fishes WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Fish not found",
      });
    }
    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching fish by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error in Get Fish By ID API",
      error,
    });
  }
};

// CREATE NEW FISH
export const createFish = async (req, res) => {
  const {
    name,
    species,
    color,
    size,
    weight,
    lifespan,
    water_type,
    temperature_range,
    pH_level,
    habitat,
    diet,
    tank_size_min,
    compatibility,
    image_url,
    description,
    price,
  } = req.body;

  try {
    const { rows } = await db.query(
      `INSERT INTO fishes 
        (name, species, color, size, weight, lifespan, water_type, temperature_range, pH_level, habitat, diet, tank_size_min, compatibility, image_url, description, price) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *`,
      [
        name,
        species,
        color,
        size,
        weight,
        lifespan,
        water_type,
        temperature_range,
        pH_level,
        habitat,
        diet,
        tank_size_min,
        compatibility,
        image_url,
        description,
        price,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Fish created successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error creating fish:", error);
    res.status(500).json({
      success: false,
      message: "Error in Create Fish API",
      error,
    });
  }
};

// UPDATE FISH
export const updateFish = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    species,
    color,
    size,
    weight,
    lifespan,
    water_type,
    temperature_range,
    pH_level,
    habitat,
    diet,
    tank_size_min,
    compatibility,
    image_url,
    description,
    price,
  } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE fishes SET 
        name = $1, 
        species = $2, 
        color = $3, 
        size = $4, 
        weight = $5, 
        lifespan = $6, 
        water_type = $7, 
        temperature_range = $8, 
        pH_level = $9, 
        habitat = $10, 
        diet = $11, 
        tank_size_min = $12, 
        compatibility = $13, 
        image_url = $14, 
        description = $15, 
        price = $16
        WHERE id = $17
        RETURNING *`,
      [
        name,
        species,
        color,
        size,
        weight,
        lifespan,
        water_type,
        temperature_range,
        pH_level,
        habitat,
        diet,
        tank_size_min,
        compatibility,
        image_url,
        description,
        price,
        id,
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Fish not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fish updated successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error updating fish:", error);
    res.status(500).json({
      success: false,
      message: "Error in Update Fish API",
      error,
    });
  }
};

// DELETE FISH
export const deleteFish = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await db.query(
      "DELETE FROM fishes WHERE id = $1 RETURNING *", 
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Fish not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fish deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting fish:", error);
    res.status(500).json({
      success: false,
      message: "Error in Delete Fish API",
      error,
    });
  }
};
