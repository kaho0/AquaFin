import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import {
  FaShoppingCart,
  FaEye,
  FaTimes,
  FaLeaf,
  FaTemperatureHigh,
  FaWater,
} from "react-icons/fa";
import { MdOutlineLightMode, MdCo2 } from "react-icons/md";
import { auth } from "../components/firebase.js";
import NavBar from "./NavBar.jsx";

const styles = {
  container: {
    minHeight: "100vh",
    padding: "1.5rem",
    background: "linear-gradient(135deg, #004d00, #006400, #228b22)", // Green gradient
    color: "#ffffff",
    fontFamily: "'Nunito', sans-serif",
  },

  header: {
    textAlign: "center",
    marginBottom: "2rem",
    position: "relative",
    padding: "1rem 0",
  },

  headerTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#f0fff0", // Honeydew color
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "1px",
    position: "relative",
    display: "inline-block",
  },

  titleDecoration: {
    content: '""',
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "3px",
    background: "linear-gradient(90deg, transparent, #8BC34A, transparent)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  card: {
    background: "rgba(255, 255, 255, 0.9)",
    color: "#1b5e20", // Dark green
    borderRadius: "1rem",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    position: "relative",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transform: "translateY(0)",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
    },
  },

  cardImageContainer: {
    position: "relative",
    overflow: "hidden",
    height: "220px",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },

  cardOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to top, rgba(27,94,32,0.8) 0%, transparent 50%)",
  },

  content: {
    padding: "1.5rem",
    position: "relative",
  },

  plantName: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#1b5e20", // Dark green
    fontFamily: "'Poppins', sans-serif",
    borderBottom: "2px solid rgba(27, 94, 32, 0.2)",
    paddingBottom: "0.5rem",
  },

  scientificName: {
    fontStyle: "italic",
    color: "#388e3c",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
  },

  badge: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "rgba(76, 175, 80, 0.9)",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "1rem",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },

  price: {
    fontSize: "1.25rem",
    color: "#2e7d32", // Forest green
    fontWeight: "bold",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    paddingRight: "1rem",
  },

  spec: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },

  specItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    color: "#555",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.5rem",
    marginTop: "1rem",
  },

  button: {
    padding: "0.75rem 1rem",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    flexGrow: 1,
  },

  buttonPrimary: {
    backgroundColor: "#2e7d32", // Forest green
    boxShadow: "0 4px 6px rgba(46, 125, 50, 0.2)",
    "&:hover": {
      backgroundColor: "#1b5e20", // Darker green
      transform: "translateY(-2px)",
    },
  },

  buttonSecondary: {
    backgroundColor: "#8BC34A", // Light green
    boxShadow: "0 4px 6px rgba(139, 195, 74, 0.2)",
    "&:hover": {
      backgroundColor: "#7CB342", // Slightly darker light green
      transform: "translateY(-2px)",
    },
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-out",
  },

  modalContent: {
    background: "linear-gradient(135deg, #E8F5E9, #ffffff)",
    padding: "2rem",
    borderRadius: "1rem",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "85vh",
    overflowY: "auto",
    textAlign: "left",
    position: "relative",
    color: "#1b5e20",
    fontFamily: "'Nunito', sans-serif",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    animation: "slideUp 0.4s ease-out",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },

  modalCloseButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "#ff5252",
    color: "white",
    border: "none",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    zIndex: 2,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "#ff1744",
      transform: "rotate(90deg)",
    },
  },

  modalHeader: {
    display: "flex",
    gap: "1.5rem",
  },

  modalImageContainer: {
    flex: "0 0 45%",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },

  modalImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },

  modalHeaderContent: {
    flex: 1,
  },

  modalTitle: {
    color: "#2e7d32",
    fontSize: "1.75rem",
    marginBottom: "0.5rem",
    borderBottom: "2px solid #8BC34A",
    paddingBottom: "0.5rem",
    fontWeight: "700",
  },

  modalPrice: {
    fontSize: "1.5rem",
    color: "#2e7d32",
    fontWeight: "bold",
    marginBottom: "1rem",
  },

  modalKeyFeatures: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    marginBottom: "1rem",
  },

  featureCard: {
    background: "rgba(232, 245, 233, 0.9)",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  featureIcon: {
    fontSize: "1.25rem",
    color: "#2e7d32",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalDescription: {
    lineHeight: "1.6",
    color: "#333",
    backgroundColor: "rgba(232, 245, 233, 0.6)",
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #C8E6C9",
  },

  modalAction: {
    marginTop: "1rem",
  },

  modalButton: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    "&:hover": {
      backgroundColor: "#1b5e20",
      transform: "translateY(-2px)",
    },
  },

  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  "@keyframes slideUp": {
    from: { transform: "translateY(30px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    gap: "1rem",
  },

  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(46, 125, 50, 0.1)",
    borderRadius: "50%",
    borderTop: "5px solid #2e7d32",
    animation: "spin 1s linear infinite",
  },

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

const PlantList = ({ limit }) => {
  const [plantList, setPlantList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(
        "https://aquafin.onrender.com/api/v1/plant/getall"
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setPlantList(data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching plant details:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load plant products",
          icon: "error",
          confirmButtonColor: "#2e7d32",
          background: "rgba(255, 255, 255, 0.95)",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlantDetails();
  }, []);

  const handleAddToCart = async (plant) => {
    const user = auth.currentUser;

    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add items to your cart.",
        icon: "warning",
        confirmButtonColor: "#2e7d32",
        background: "rgba(255, 255, 255, 0.95)",
      });
      return;
    }

    try {
      const user_id = user.uid;

      const response = await fetch(
        "https://aquafin.onrender.com/api/v1/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            product_id: plant.id,
            category: "plant",
            quantity: 1,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Added to Cart!",
          text: `${plant.name} has been added to your cart`,
          icon: "success",
          confirmButtonColor: "#2e7d32",
          background: "rgba(255, 255, 255, 0.95)",
        });
      } else {
        throw new Error(result.error || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Cart Error:", error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#2e7d32",
        background: "rgba(255, 255, 255, 0.95)",
      });
    }
  };

  // Filter plants based on search term
  const filteredPlants = plantList.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort plants based on selected criteria
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "difficulty") {
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    return 0;
  });

  // Get plants to display based on limit
  const displayedPlants = limit ? sortedPlants.slice(0, limit) : sortedPlants;

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading beautiful plants...</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <NavBar />
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          Botanical Paradise
          <div style={styles.titleDecoration}></div>
        </h1>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "2rem" }}
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
            <input
              type="text"
              placeholder="Search plants by name..."
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#1b5e20",
                outline: "none",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ flex: "0 1 200px" }}>
            <select
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#1b5e20",
                outline: "none",
              }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        {displayedPlants.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "3rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "1rem",
            }}
          >
            <FaLeaf
              style={{
                fontSize: "3rem",
                color: "#2e7d32",
                marginBottom: "1rem",
              }}
            />
            <h2
              style={{
                fontSize: "1.5rem",
                color: "#1b5e20",
                marginBottom: "0.5rem",
              }}
            >
              No plants found
            </h2>
            <p style={{ color: "#388e3c" }}>
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          displayedPlants.map((plant) => (
            <div
              key={plant.id}
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0, 0, 0, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
            >
              <div style={styles.cardImageContainer}>
                <img
                  src={plant.image_url}
                  alt={plant.name}
                  style={styles.image}
                  onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
                <div style={styles.cardOverlay}></div>
                <div style={styles.badge}>{plant.light_requirement}</div>
              </div>
              <div style={styles.content}>
                <h2 style={styles.plantName}>{plant.name}</h2>
                <p style={styles.scientificName}>{plant.scientific_name}</p>
                <div style={styles.price}>
                  ৳
                  {(() => {
                    try {
                      const price = plant.price;
                      if (price === null || price === undefined) return plant.formatted_price || "N/A";
                      const numPrice = typeof price === "number" ? price : Number(price);
                      return isNaN(numPrice) ? (plant.formatted_price || "N/A") : numPrice.toFixed(2);
                    } catch (error) {
                      return plant.formatted_price || "N/A";
                    }
                  })()}{" "}
                  <span
                    style={{
                      fontWeight: "lighter",
                      fontSize: "0.9em",
                      marginRight: "1rem",
                    }}
                  >
                    {/* Removed redundant unit display */}
                  </span>
                </div>

                <div style={styles.spec}>
                  <div style={styles.specItem}>
                    <FaLeaf style={{ color: "#8BC34A" }} />
                    <span>{plant.growth_rate}</span>
                  </div>
                  <div style={styles.specItem}>
                    <MdOutlineLightMode style={{ color: "#FFC107" }} />
                    <span>{plant.light_requirement}</span>
                  </div>
                  <div style={styles.specItem}>
                    <FaWater style={{ color: "#03A9F4" }} />
                    <span>
                      {plant.ph_min} - {plant.ph_max} pH
                    </span>
                  </div>
                </div>

                <div style={styles.buttonGroup}>
                  <button
                    style={{ ...styles.button, ...styles.buttonPrimary }}
                    onClick={() => handleAddToCart(plant)}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#1b5e20";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#2e7d32";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <FaShoppingCart style={{ marginRight: "0.5rem" }} />
                    Add to Cart
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonSecondary }}
                    onClick={() => setSelectedPlant(plant)}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#7CB342";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#8BC34A";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <FaEye style={{ marginRight: "0.5rem" }} />
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedPlant && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button
              style={styles.modalCloseButton}
              onClick={() => setSelectedPlant(null)}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#ff1744";
                e.target.style.transform = "rotate(90deg)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#ff5252";
                e.target.style.transform = "rotate(0deg)";
              }}
            >
              <FaTimes />
            </button>

            <div style={styles.modalHeader}>
              <div style={styles.modalImageContainer}>
                <img
                  src={selectedPlant.image_url}
                  alt={selectedPlant.name}
                  style={styles.modalImage}
                />
              </div>
              <div style={styles.modalHeaderContent}>
                <h2 style={styles.modalTitle}>{selectedPlant.name}</h2>
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#388e3c",
                    marginBottom: "0.5rem",
                  }}
                >
                  {selectedPlant.scientific_name}
                </p>
                <div style={styles.modalPrice}>
                  ৳
                  {(() => {
                    try {
                      const price = selectedPlant.price;
                      if (price === null || price === undefined) return selectedPlant.formatted_price || "N/A";
                      const numPrice = typeof price === "number" ? price : Number(price);
                      return isNaN(numPrice) ? (selectedPlant.formatted_price || "N/A") : numPrice.toFixed(2);
                    } catch (error) {
                      return selectedPlant.formatted_price || "N/A";
                    }
                  })()}
                </div>
                <p>
                  <strong>Growth Rate:</strong> {selectedPlant.growth_rate}
                </p>
                <p>
                  <strong>Max Height:</strong> {selectedPlant.max_height_cm} cm
                </p>
              </div>
            </div>

            <div style={styles.modalKeyFeatures}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <MdOutlineLightMode />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Light</div>
                  <div>{selectedPlant.light_requirement}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <FaTemperatureHigh />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Temperature</div>
                  <div>
                    {selectedPlant.temperature_min}°C -{" "}
                    {selectedPlant.temperature_max}°C
                  </div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <MdCo2 />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>CO₂</div>
                  <div>{selectedPlant.CO2_requirement}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <FaWater />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>pH Range</div>
                  <div>
                    {selectedPlant.ph_min} - {selectedPlant.ph_max}
                  </div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <FaLeaf />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Growth</div>
                  <div>{selectedPlant.growth_rate}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Care Level</div>
                  <div>{selectedPlant.difficulty}</div>
                </div>
              </div>
            </div>

            <div style={styles.modalDescription}>
              <h3 style={{ marginBottom: "0.5rem", color: "#2e7d32" }}>
                About this Plant
              </h3>
              <p>{selectedPlant.description}</p>
            </div>

            <div style={styles.modalAction}>
              <button
                style={styles.modalButton}
                onClick={() => {
                  handleAddToCart(selectedPlant);
                  setSelectedPlant(null);
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1b5e20";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#2e7d32";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <FaShoppingCart style={{ marginRight: "0.5rem" }} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PlantList.propTypes = {
  limit: PropTypes.number,
};

export default PlantList;
