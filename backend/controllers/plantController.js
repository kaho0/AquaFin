import db from "../config/db.js"; // Ensure correct import

// GET ALL PLANTS
export const getPlants = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT *, CONCAT(price, ' ', price_unit) AS formatted_price FROM plants"
    ); // Fetch all plants
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({
      success: false,
      message: "Error in Get All Plants API",
      error,
    });
  }
};

// GET PLANT BY ID
export const getPlantByID = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "SELECT *, CONCAT(price, ' ', price_unit) AS formatted_price FROM plants WHERE id = $1",
      [id]
    ); // Fetch plant by ID
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }
    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching plant by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error in Get Plant By ID API",
      error,
    });
  }
};

// CREATE NEW PLANT
export const createPlant = async (req, res) => {
  const {
    name,
    scientific_name,
    growth_rate,
    light_requirement,
    CO2_requirement,
    temperature_min,
    temperature_max,
    ph_min,
    ph_max,
    difficulty,
    max_height_cm,
    description,
    image_url,
    price,
    price_unit, // Added price_unit
  } = req.body;

  try {
    const { rows } = await db.query(
      `INSERT INTO plants 
        (name, scientific_name, growth_rate, light_requirement, CO2_requirement, temperature_min, 
        temperature_max, ph_min, ph_max, difficulty, max_height_cm, description, image_url, price, price_unit) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *`,
      [
        name,
        scientific_name,
        growth_rate,
        light_requirement,
        CO2_requirement,
        temperature_min,
        temperature_max,
        ph_min,
        ph_max,
        difficulty,
        max_height_cm,
        description,
        image_url,
        price,
        price_unit, // Added price_unit
      ]
    );

    res.status(201).json({
      success: true,
      message: "Plant created successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({
      success: false,
      message: "Error in Create Plant API",
      error,
    });
  }
};

// UPDATE PLANT
export const updatePlant = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    scientific_name,
    growth_rate,
    light_requirement,
    CO2_requirement,
    temperature_min,
    temperature_max,
    ph_min,
    ph_max,
    difficulty,
    max_height_cm,
    description,
    image_url,
    price,
    price_unit, // Added price_unit
  } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE plants SET 
        name = $1, 
        scientific_name = $2, 
        growth_rate = $3, 
        light_requirement = $4, 
        CO2_requirement = $5, 
        temperature_min = $6, 
        temperature_max = $7, 
        ph_min = $8, 
        ph_max = $9, 
        difficulty = $10, 
        max_height_cm = $11, 
        description = $12, 
        image_url = $13, 
        price = $14, 
        price_unit = $15 
        WHERE id = $16
        RETURNING *`,
      [
        name,
        scientific_name,
        growth_rate,
        light_requirement,
        CO2_requirement,
        temperature_min,
        temperature_max,
        ph_min,
        ph_max,
        difficulty,
        max_height_cm,
        description,
        image_url,
        price,
        price_unit, // Added price_unit
        id, // Plant ID for updating
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plant updated successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error updating plant:", error);
    res.status(500).json({
      success: false,
      message: "Error in Update Plant API",
      error,
    });
  }
};

// DELETE PLANT
export const deletePlant = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await db.query(
      "DELETE FROM plants WHERE id = $1 RETURNING *", 
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plant deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).json({
      success: false,
      message: "Error in Delete Plant API",
      error,
    });
  }
};
