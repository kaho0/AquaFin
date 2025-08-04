import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaEye,
  FaTimes,
  FaWater,
  FaTemperatureLow,
  FaFish,
  FaFlask,
} from "react-icons/fa";
import { GiWeight, GiLifeBar, GiCoral } from "react-icons/gi";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { auth } from "../components/firebase.js";
import NavBar from "./NavBar.jsx";

const styles = {
  container: {
    minHeight: "100vh",
    padding: "1.5rem",
    background: "linear-gradient(135deg, #003366, #006699, #0099cc)", // Ocean blue gradient
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
    color: "#f0f8ff",
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
    background: "linear-gradient(90deg, transparent, #4fc3f7, transparent)",
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
    color: "#003366",
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
      "linear-gradient(to top, rgba(0,51,102,0.8) 0%, transparent 50%)",
  },

  content: {
    padding: "1.5rem",
    position: "relative",
  },

  fishName: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#003366",
    fontFamily: "'Poppins', sans-serif",
    borderBottom: "2px solid rgba(0, 51, 102, 0.2)",
    paddingBottom: "0.5rem",
  },

  badge: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "rgba(0, 153, 204, 0.9)",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "1rem",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },

  price: {
    fontSize: "1.25rem",
    color: "#00796b",
    fontWeight: "bold",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
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
    backgroundColor: "#006699",
    boxShadow: "0 4px 6px rgba(0, 102, 153, 0.2)",
    "&:hover": {
      backgroundColor: "#004d73",
      transform: "translateY(-2px)",
    },
  },

  buttonSecondary: {
    backgroundColor: "#4fc3f7",
    boxShadow: "0 4px 6px rgba(79, 195, 247, 0.2)",
    "&:hover": {
      backgroundColor: "#29b6f6",
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
    background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
    padding: "2rem",
    borderRadius: "1rem",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "85vh",
    overflowY: "auto",
    textAlign: "left",
    position: "relative",
    color: "#003366",
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
    color: "#006699",
    fontSize: "1.75rem",
    marginBottom: "0.5rem",
    borderBottom: "2px solid #4fc3f7",
    paddingBottom: "0.5rem",
    fontWeight: "700",
  },

  modalPrice: {
    fontSize: "1.5rem",
    color: "#00796b",
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
    background: "rgba(230, 255, 255, 0.9)",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  featureIcon: {
    fontSize: "1.25rem",
    color: "#006699",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalDescription: {
    lineHeight: "1.6",
    color: "#333",
    backgroundColor: "rgba(224, 247, 250, 0.6)",
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #b2ebf2",
  },

  modalAction: {
    marginTop: "1rem",
  },

  modalButton: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#006699",
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
      backgroundColor: "#004d73",
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
    border: "5px solid rgba(0, 102, 153, 0.1)",
    borderRadius: "50%",
    borderTop: "5px solid #006699",
    animation: "spin 1s linear infinite",
  },

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

const FishList = ({ limit }) => {
  const [fishList, setFishList] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFishDetails = async () => {
      try {
        const response = await fetch(
        "https://aquafin.onrender.com/api/v1/fish/getall"
        );
        const data = await response.json();
        setFishList(data.data);
      } catch (error) {
        console.error("Error fetching fish details:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load fish products",
          icon: "error",
          confirmButtonColor: "#006699",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFishDetails();
  }, []);

  const handleAddToCart = async (fish) => {
    const user = auth.currentUser;

    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add items to your cart.",
        icon: "warning",
        confirmButtonColor: "#006699",
        background: "rgba(255, 255, 255, 0.95)",
      });
      return;
    }

    try {
      const user_id = user.uid;
      console.log("Adding to cart:", { user_id, product_id: fish.id, category: "fish", quantity: 1 });

      const response = await fetch(
        "https://aquafin.onrender.com/api/v1/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            product_id: fish.id,
            category: "fish",
            quantity: 1,
          }),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const result = await response.json();
      console.log("Response result:", result);

      if (response.ok) {
        Swal.fire({
          title: "Added to Cart!",
          text: `${fish.name} has been added to your cart`,
          icon: "success",
          confirmButtonColor: "#006699",
          background: "rgba(255, 255, 255, 0.95)",
        });
      } else {
        console.error("Server error response:", result);
        throw new Error(result.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Cart Error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      let errorMessage = "Failed to add item to cart";
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error: Please check your connection";
      } else if (error.message.includes("Server error")) {
        errorMessage = "Server error: Please try again later";
      } else {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#006699",
        background: "rgba(255, 255, 255, 0.95)",
      });
    }
  };

  const getWaterTypeLabel = (waterType) => {
    const types = {
      freshwater: "Freshwater",
      saltwater: "Saltwater",
      brackish: "Brackish",
    };
    return types[waterType.toLowerCase()] || waterType;
  };

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading aquatic friends...</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <NavBar />
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          Aquatic Wonders
          <div style={styles.titleDecoration}></div>
        </h1>
      </div>
      <div style={styles.grid}>
        {(limit ? fishList.slice(0, limit) : fishList).map((fish) => (
          <div
            key={fish.id}
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
                src={fish.image_url}
                alt={fish.name}
                style={styles.image}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
              <div style={styles.cardOverlay}></div>
              <div style={styles.badge}>
                {getWaterTypeLabel(fish.water_type)}
              </div>
            </div>
            <div style={styles.content}>
              <h2 style={styles.fishName}>{fish.name}</h2>
              <div style={styles.price}>৳{(() => {
                try {
                  const price = fish.price;
                  if (price === null || price === undefined) return "0.00";
                  const numPrice = typeof price === "number" ? price : Number(price);
                  return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
                } catch (error) {
                  return "0.00";
                }
              })()}</div>

              <div style={styles.spec}>
                <div style={styles.specItem}>
                  <FaFish style={{ color: "#4fc3f7" }} />{" "}
                  {fish.species.split(" ")[0]}
                </div>
                <div style={styles.specItem}>
                  <GiWeight /> {fish.weight}g
                </div>
                <div style={styles.specItem}>
                  <FaWater style={{ color: "#29b6f6" }} /> {fish.tank_size_min}L
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                  onClick={() => handleAddToCart(fish)}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#004d73";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#006699";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <FaShoppingCart style={{ marginRight: "0.5rem" }} />
                  Add to Cart
                </button>
                <button
                  style={{ ...styles.button, ...styles.buttonSecondary }}
                  onClick={() => setSelectedFish(fish)}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#29b6f6";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#4fc3f7";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <FaEye style={{ marginRight: "0.5rem" }} />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFish && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button
              style={styles.modalCloseButton}
              onClick={() => setSelectedFish(null)}
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
                  src={selectedFish.image_url}
                  alt={selectedFish.name}
                  style={styles.modalImage}
                />
              </div>
              <div style={styles.modalHeaderContent}>
                <h2 style={styles.modalTitle}>{selectedFish.name}</h2>
                <div style={styles.modalPrice}>
                  ৳{(() => {
                    try {
                      const price = selectedFish.price;
                      if (price === null || price === undefined) return "0.00";
                      const numPrice = typeof price === "number" ? price : Number(price);
                      return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
                    } catch (error) {
                      return "0.00";
                    }
                  })()}
                </div>
                <p>
                  <strong>Species:</strong> {selectedFish.species}
                </p>
                <p>
                  <strong>Color:</strong> {selectedFish.color}
                </p>
                <p>
                  <strong>Size:</strong> {selectedFish.size} cm
                </p>
                <p>
                  <strong>Weight:</strong> {selectedFish.weight} g
                </p>
              </div>
            </div>

            <div style={styles.modalKeyFeatures}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <FaWater />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Water Type</div>
                  <div>{selectedFish.water_type}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <FaTemperatureLow />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Temperature</div>
                  <div>{selectedFish.temperature_range}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <FaFlask />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>pH Level</div>
                  <div>{selectedFish.pH_level}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <GiLifeBar />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Lifespan</div>
                  <div>{selectedFish.lifespan}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <GiCoral />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Habitat</div>
                  <div>{selectedFish.habitat}</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <FaFish />
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Tank Size</div>
                  <div>{selectedFish.tank_size_min} L</div>
                </div>
              </div>
            </div>

            <div>
              <h3>Diet</h3>
              <p>{selectedFish.diet}</p>
            </div>

            <div>
              <h3>Compatibility</h3>
              <p>{selectedFish.compatibility}</p>
            </div>

            <div style={styles.modalDescription}>
              <h3>About this Fish</h3>
              <p>{selectedFish.description}</p>
            </div>

            <div style={styles.modalAction}>
              <button
                style={styles.modalButton}
                onClick={() => {
                  handleAddToCart(selectedFish);
                  setSelectedFish(null);
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#004d73";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#006699";
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

FishList.propTypes = {
  limit: PropTypes.number,
};

export default FishList;
