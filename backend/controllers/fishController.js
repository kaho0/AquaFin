// controllers/fishController.js

import db from "../config/db.js"; // Ensure correct import

// GET ALL FISH LIST
export const getFishes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM fishes"); // Fetch all fish
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
    const [rows] = await db.query("SELECT * FROM fishes WHERE id = ?", [id]); // Fetch fish by ID
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
  // Destructure all the fields from the request body
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
    // SQL query to insert the new fish data into the 'fishes' table
    const [result] = await db.query(
      `INSERT INTO fishes 
        (name, species, color, size, weight, lifespan, water_type, temperature_range, pH_level, habitat, diet, tank_size_min, compatibility, image_url, description, price) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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

    // Return a successful response
    res.status(201).json({
      success: true,
      message: "Fish created successfully",
      data: {
        id: result.insertId,
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
      },
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
export const updateFish = async (req, res) => {
  const { id } = req.params; // Get the fish ID from the request params
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
    const [result] = await db.query(
      `UPDATE fishes SET 
        name = ?, 
        species = ?, 
        color = ?, 
        size = ?, 
        weight = ?, 
        lifespan = ?, 
        water_type = ?, 
        temperature_range = ?, 
        pH_level = ?, 
        habitat = ?, 
        diet = ?, 
        tank_size_min = ?, 
        compatibility = ?, 
        image_url = ?, 
        description = ?, 
        price = ?
        WHERE id = ?`,
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
        id, // The fish id to identify which fish to update
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Fish not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fish updated successfully",
      data: {
        id,
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
      },
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
export const deleteFish = async (req, res) => {
  const { id } = req.params; // Get the fish ID from the request params

  try {
    const [result] = await db.query("DELETE FROM fishes WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
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
