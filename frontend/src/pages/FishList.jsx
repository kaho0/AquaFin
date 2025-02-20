import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaEye, FaTimes } from "react-icons/fa";

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(to bottom right, #0e7490, #1e40af)",
    color: "#ffffff",
    fontFamily: "Raleway, sans-serif"
  },
  header: {
    padding: "2rem",
    textAlign: "center"
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    marginBottom: "2.5rem",
    animation: "fadeIn 0.5s ease-in"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "2rem",
    padding: "2rem"
  },
  card: {
    background: "#ffffff",
    color: "#000000",
    borderRadius: "0.5rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
    transform: "scale(1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    animation: "fadeInUp 0.5s ease-in"
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.3)"
  },
  imageContainer: {
    position: "relative",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    height: "12rem",
    objectFit: "cover",
    transition: "transform 0.3s ease"
  },
  imageHover: {
    transform: "scale(1.1)"
  },
  iconButtons: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    transition: "opacity 0.3s ease"
  },
  iconButton: {
    background: "#ffffff",
    padding: "0.5rem",
    borderRadius: "9999px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, color 0.3s ease"
  },
  cardContent: {
    padding: "1.5rem"
  },
  fishName: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem"
  },
  price: {
    fontSize: "1.125rem",
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: "1rem"
  },
  addButton: {
    width: "100%",
    padding: "0.5rem 0",
    background: "#3b82f6",
    color: "#ffffff",
    borderRadius: "0.5rem",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50
  },
  modalContent: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    maxWidth: "32rem",
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
    animation: "fadeIn 0.3s ease-in"
  }
};

// Add media queries
if (typeof window !== "undefined") {
  const mediaQueries = {
    sm: window.matchMedia("(min-width: 640px)"),
    md: window.matchMedia("(min-width: 768px)"),
    lg: window.matchMedia("(min-width: 1024px)")
  };

  if (mediaQueries.sm.matches) {
    styles.grid.gridTemplateColumns = "repeat(2, 1fr)";
  }
  if (mediaQueries.md.matches) {
    styles.grid.gridTemplateColumns = "repeat(2, 1fr)";
  }
  if (mediaQueries.lg.matches) {
    styles.grid.gridTemplateColumns = "repeat(3, 1fr)";
  }
}

const FishList = ({ limit }) => {
  const [fishList, setFishList] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [hoveredFish, setHoveredFish] = useState(null);

  useEffect(() => {
    const fetchFishDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/fish/getall"
        );
        if (!response.ok)
          throw new Error(`HTTP Error! Status: ${response.status}`);
        const result = await response.json();
        setFishList(result.data);
      } catch (error) {
        console.error("Error fetching fish details:", error.message);
      }
    };

    fetchFishDetails();
  }, [limit]);

  const displayedFish = limit ? fishList.slice(0, limit) : fishList;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Available Fish</h1>
        <div style={styles.grid}>
          {displayedFish.map((fish) => (
            <div
              key={fish.id}
              style={{
                ...styles.card,
                ...(hoveredFish === fish.id && styles.cardHover)
              }}
              onMouseEnter={() => setHoveredFish(fish.id)}
              onMouseLeave={() => setHoveredFish(null)}
            >
              <div style={styles.imageContainer}>
                <img
                  src={fish.image_url}
                  alt={fish.name}
                  style={{
                    ...styles.image,
                    ...(hoveredFish === fish.id && styles.imageHover)
                  }}
                />
                <div
                  style={{
                    ...styles.iconButtons,
                    opacity: hoveredFish === fish.id ? 1 : 0
                  }}
                >
                  <button style={styles.iconButton}>
                    <FaShoppingCart />
                  </button>
                  <button style={styles.iconButton}>
                    <FaHeart />
                  </button>
                  <button
                    style={styles.iconButton}
                    onClick={() => setSelectedFish(fish)}
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.fishName}>{fish.name}</h2>
                <p style={styles.price}>৳{fish.price?.toFixed(2)}</p>
                <button style={styles.addButton}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {selectedFish && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <button
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  background: "#ef4444",
                  color: "#ffffff",
                  padding: "0.5rem",
                  borderRadius: "9999px",
                  transition: "background-color 0.3s ease"
                }}
                onClick={() => setSelectedFish(null)}
              >
                <FaTimes />
              </button>
              <img
                src={selectedFish.image_url}
                alt={selectedFish.name}
                style={{
                  width: "100%",
                  height: "16rem",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem"
                }}
              />
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#1f2937"
              }}>
                {selectedFish.name}
              </h2>
              <div style={{ color: "#4b5563" }}>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Species:</strong> {selectedFish.species ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Color:</strong> {selectedFish.color ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Size:</strong> {selectedFish.size ?? "N/A"} cm
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Weight:</strong> {selectedFish.weight ?? "N/A"} kg
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Lifespan:</strong> {selectedFish.lifespan ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Water Type:</strong> {selectedFish.water_type ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Temperature Range:</strong> {selectedFish.temperature_range ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>pH Level:</strong> {selectedFish.pH_level ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Habitat:</strong> {selectedFish.habitat ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Diet:</strong> {selectedFish.diet ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Tank Size Min:</strong> {selectedFish.tank_size_min ?? "N/A"} L
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Compatibility:</strong> {selectedFish.compatibility ?? "N/A"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Description:</strong> {selectedFish.description ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FishList;