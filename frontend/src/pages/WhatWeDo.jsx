import React from "react";

const HeroSection = () => {
  return (
    <div
      className="mt-20 relative h-[400px] w-full bg-cyan-800 flex items-center text-white"
      style={{ padding: "0 10%" }} // Adjusted padding for left alignment
    >
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/child2.jpg')" }} // Replace with actual image
      ></div>

      {/* Content */}
      <div className="relative max-w-xl">
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Dive into the Best{" "}
          <span style={{ color: "#CD7F32" }}>Aquarium Supplies</span>
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#EBF4FA",
            lineHeight: "1.6",
            maxWidth: "600px",
          }}
        >
          Transform your aquarium into a stunning underwater world. Explore
          top-quality fish tanks, decorations, filtration systems, and premium
          fish food.
        </p>
        <button
          style={{
            backgroundColor: "#CD7F32",
            color: "white",
            padding: "12px 30px",
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: "30px", // Explicitly set borderRadius
            marginTop: "1.5rem",
            transition:
              "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#A67C52"; // Slightly darker bronze hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#CD7F32";
          }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
