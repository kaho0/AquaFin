import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase.js";
import fish1 from "/s1.jpg";
import fish2 from "/s2.jpg";
import fish3 from "/s3.jpg";
import seahorse from "/rec1.png";
import fish4 from "/rec2.png";
import turtle from "/rec3.png";
import background from "/home.png";
import HeroSection from "./WhatWeDo";
import Service from "./Services";
import Footer from "./Footer";
import Review from "./Review";
import NavBar from "./NavBar.jsx"; // Import the NavBar component

const Home = () => {
  const navigate = useNavigate();
  const [fishList, setFishList] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fishResponse, plantResponse] = await Promise.all([
          fetch(
        "https://aquafin.onrender.com/api/v1/fish/getall"
          ),
          fetch(
        "https://aquafin.onrender.com/api/v1/plant/getall"
          ),
        ]);

        if (!fishResponse.ok)
          throw new Error(`HTTP Error! Status: ${fishResponse.status}`);
        if (!plantResponse.ok)
          throw new Error(`HTTP Error! Status: ${plantResponse.status}`);

        const fishResult = await fishResponse.json();
        const plantResult = await plantResponse.json();

        setFishList(fishResult.data);
        setPlantList(plantResult.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedFish = fishList.slice(0, 3);
  const displayedPlants = plantList.slice(0, 3);

  // Custom button style for reuse
  const primaryButtonStyle = {
    backgroundColor: "#CD7F32",
    color: "white",
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "30px",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Card hover animation
  const cardHoverAnimation =
    "transform transition duration-300 hover:scale-105 hover:shadow-2xl";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-cyan-700 to-cyan-600 text-white font-[Raleway]">
      {/* Background Image with improved opacity handling */}
      <div
        className="fixed inset-0 opacity-15 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <div className="relative z-10 mx-auto px-4 md:px-6 lg:px-16 py-2">
        {/* NavBar Component */}
        <NavBar />

        {/* Hero Section with improved responsiveness */}
        <div className="mt-6 md:mt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl w-full lg:pl-8 space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Discover the Wonders{" "}
              <span className="text-[#CD7F32] animate-pulse">
                Colorful Fish
              </span>{" "}
              in the Ocean
            </h1>
            <p className="text-lg text-cyan-50 leading-relaxed">
              Know about their habitats, behaviors, and how to appreciate their
              role in the ocean&apos;s delicate ecosystem.
            </p>
            <button
              style={primaryButtonStyle}
              className="mt-6 hover:bg-[#A67C52] active:scale-95 group"
              onClick={() => navigate("/more")}
            >
              Explore Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            {/* Fish Gallery with hover effects */}
            <div className="mt-12 pt-4">
              <p className="text-lg mb-4 font-medium">Aquarium Fish</p>
              <div className="flex justify-center md:justify-start space-x-4">
                {[fish1, fish2, fish3].map((fish, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={fish}
                      alt={`Fish ${index + 1}`}
                      className="w-24 h-24 rounded-lg border-2 border-cyan-300/30 hover:scale-105 transition-all duration-300 cursor-pointer object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center">
                      <span className="text-xs text-white pb-1">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Images with animation */}
          <div className="relative flex mt-8 md:mt-0 hidden md:flex animate-float">
            <img
              src={seahorse}
              alt="Seahorse"
              className="-mr-10 hover:scale-105 transition-transform duration-300"
            />
            <img
              src={fish4}
              alt="Colorful Fish"
              className="-mr-10 hover:scale-105 transition-transform duration-300"
            />
            <img
              src={turtle}
              alt="Sea Turtle"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Fish Cards Section with improved styling and loading state */}
      <div className="mt-8 px-4 sm:px-8 md:px-16 py-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black mb-12 pb-4 text-[#DCD9D1] text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-[#CD7F32] m-4">
          Get Your Fish
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CD7F32]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {displayedFish.map((fish, index) => (
              <div
                key={fish.id}
                className={`${cardHoverAnimation} bg-gradient-to-br from-[#2d4f61] to-[#345b6f] text-[#DCD9D1] rounded-xl overflow-hidden shadow-lg`}
                style={{
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={fish.image_url}
                    alt={fish.name}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#345b6f]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                    <button className="mb-6 px-4 py-2 bg-[#CD7F32] text-white rounded-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-[Raleway] mb-2">
                    {fish.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-[#CD7F32] font-bold">
                      ৳{Number(fish.price).toFixed(2)}
                    </p>
                    <div className="flex items-center text-cyan-200 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>{(4 + Math.random()).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              onClick={() => navigate("/allfish")}
              className={`${cardHoverAnimation} bg-gradient-to-r from-[#b2a190] to-[#c4b2a0] text-white rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center min-h-[300px]`}
            >
              <div className="text-center p-6 flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-[Raleway]">
                  View More Fish
                </h3>
                <p className="text-gray-100 font-medium flex items-center">
                  & Get Your Fish
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* What We Do Section */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* Featured Plants Section with enhanced styling */}
      <div className="space-y-20 relative z-10">
        <div className="px-4 sm:px-8 md:px-16 py-12">
          <h2 className="text-3xl md:text-4xl font-black mb-12 pb-4 text-[#DCD9D1] text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-[#a7a436] m-4">
            Get Your Plants
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a7a436]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {displayedPlants.map((plant, index) => (
                <div
                  key={plant.id}
                  className={`${cardHoverAnimation} bg-gradient-to-br from-[#2d4f61] to-[#345B6F] text-[#DCD9D1] rounded-xl overflow-hidden shadow-lg`}
                  style={{
                    boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="relative overflow-hidden group">
                    <img
                      src={plant.image_url}
                      alt={plant.name}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#345b6f]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                      <button className="mb-6 px-4 py-2 bg-[#a7a436] text-white rounded-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold font-[Raleway] mb-2">
                      {plant.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-lg text-[#a7a436] font-bold">
                        ৳{Number(plant.price).toFixed(2)}
                      </p>
                      <div className="flex items-center text-cyan-200 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span>{(4 + Math.random()).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div
                onClick={() => navigate("/allplants")}
                className={`${cardHoverAnimation} bg-gradient-to-r from-[#a7a436] to-[#bab74c] text-white rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center min-h-[300px]`}
              >
                <div className="text-center p-6 flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold font-[Raleway]">
                    View More Plants
                  </h3>
                  <p className="text-gray-100 font-medium flex items-center">
                    &Get Your Plants
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services and Reviews */}
        <div className="relative z-10">
          <Service />
        </div>
        <div className="relative z-10">
          <Review />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
