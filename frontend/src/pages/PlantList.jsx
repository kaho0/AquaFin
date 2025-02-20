import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

const PlantList = ({ limit }) => {
  const [plantList, setPlantList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [hoveredPlant, setHoveredPlant] = useState(null);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/plant/getall"
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const result = await response.json();

        // Check if result.data exists
        if (!result.data) {
          throw new Error("Invalid API response: 'data' field missing");
        }

        // Apply limit if provided
        const plantsToShow = limit ? result.data.slice(0, limit) : result.data;
        setPlantList(plantsToShow);
      } catch (error) {
        console.error("Error fetching plant details:", error.message);
      }
    };

    fetchPlantDetails();
  }, [limit]);

  return (
    <div className="min-h-screen w-screen bg-green-700 text-white font-[Raleway]">
      <div className="p-8">
        <h1 className="text-center text-3xl font-bold mb-10">
          Available Plants
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {plantList.map((plant) => (
            <div
              key={plant.id}
              className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              onMouseEnter={() => setHoveredPlant(plant.id)}
              onMouseLeave={() => setHoveredPlant(null)}
            >
              <div className="relative cursor-pointer">
                <img
                  src={plant.image_url}
                  alt={plant.name}
                  className="w-full h-48 object-cover"
                />
                <div
                  className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${
                    hoveredPlant === plant.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 hover:text-blue-500 transition-colors">
                    <FaShoppingCart />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 hover:text-red-500 transition-colors">
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 hover:text-green-500 transition-colors"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{plant.name}</h2>
                <p className="text-lg text-green-600 font-bold mb-4">
                  ৳{Number(plant.price).toFixed(2)}
                </p>
                <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Plant Details Modal */}
        {selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-[80vh] relative">
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                onClick={() => setSelectedPlant(null)}
              >
                X
              </button>
              <img
                src={selectedPlant.image_url}
                alt={selectedPlant.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {selectedPlant.name}
              </h2>
              <div className="text-gray-700">
                <p className="mb-2">
                  <strong>Scientific Name:</strong>{" "}
                  {selectedPlant.scientific_name}
                </p>
                <p className="mb-2">
                  <strong>Growth Rate:</strong> {selectedPlant.growth_rate}
                </p>
                <p className="mb-2">
                  <strong>Light Requirement:</strong>{" "}
                  {selectedPlant.light_requirement}
                </p>
                <p className="mb-2">
                  <strong>CO2 Requirement:</strong>{" "}
                  {selectedPlant.CO2_requirement}
                </p>
                <p className="mb-2">
                  <strong>Temperature Range:</strong>{" "}
                  {selectedPlant.temperature_min}°C -{" "}
                  {selectedPlant.temperature_max}°C
                </p>
                <p className="mb-2">
                  <strong>pH Range:</strong> {selectedPlant.ph_min} -{" "}
                  {selectedPlant.ph_max}
                </p>
                <p className="mb-2">
                  <strong>Difficulty:</strong> {selectedPlant.difficulty}
                </p>
                <p className="mb-2">
                  <strong>Max Height:</strong> {selectedPlant.max_height_cm} cm
                </p>
                <p className="mb-2">
                  <strong>Description:</strong> {selectedPlant.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantList;
