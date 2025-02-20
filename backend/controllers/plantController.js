import db from "../config/db.js"; // Ensure correct import

// GET ALL PLANTS
export const getPlants = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM plants"); // Fetch all plants
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
    const [rows] = await db.query("SELECT * FROM plants WHERE id = ?", [id]); // Fetch plant by ID
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
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO plants 
        (name, scientific_name, growth_rate, light_requirement, CO2_requirement, temperature_min, 
        temperature_max, ph_min, ph_max, difficulty, max_height_cm, description, image_url, price) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ]
    );

    res.status(201).json({
      success: true,
      message: "Plant created successfully",
      data: {
        id: result.insertId,
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
      },
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
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE plants SET 
        name = ?, 
        scientific_name = ?, 
        growth_rate = ?, 
        light_requirement = ?, 
        CO2_requirement = ?, 
        temperature_min = ?, 
        temperature_max = ?, 
        ph_min = ?, 
        ph_max = ?, 
        difficulty = ?, 
        max_height_cm = ?, 
        description = ?, 
        image_url = ?, 
        price = ?
        WHERE id = ?`,
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
        id, // Plant ID for updating
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plant updated successfully",
      data: {
        id,
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
      },
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
    const [result] = await db.query("DELETE FROM plants WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
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
