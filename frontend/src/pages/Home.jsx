// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import fish1 from "/s1.jpg";
// import fish2 from "/s2.jpg";
// import fish3 from "/s3.jpg";
// import seahorse from "/rec1.png";
// import fish4 from "/rec2.png";
// import turtle from "/rec3.png";
// import background from "/home.png";

// import HeroSection from "./WhatWeDo";
// import Service from "./Services";
// import Footer from "./Footer";
// import Review from "./Review";

// const Home = () => {
//   const navigate = useNavigate();
//   const [fishList, setFishList] = useState([]);
//   const [plantList, setPlantList] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchFishDetails = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/v1/fish/getall"
//         );
//         if (!response.ok)
//           throw new Error(`HTTP Error! Status: ${response.status}`);
//         const result = await response.json();
//         setFishList(result.data);
//       } catch (error) {
//         console.error("Error fetching fish details:", error.message);
//       }
//     };

//     const fetchPlantDetails = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/v1/plant/getall"
//         );
//         if (!response.ok)
//           throw new Error(`HTTP Error! Status: ${response.status}`);
//         const result = await response.json();
//         setPlantList(result.data);
//       } catch (error) {
//         console.error("Error fetching plant details:", error.message);
//       }
//     };

//     fetchFishDetails();
//     fetchPlantDetails();
//   }, []);

//   const displayedFish = fishList.slice(0, 3);
//   const displayedPlants = plantList.slice(0, 3);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen w-screen bg-cyan-600 text-white font-[Raleway]">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 opacity-20 bg-cover bg-center"
//         style={{ backgroundImage: `url(${background})` }}
//       ></div>

//       <div className="relative mx-auto px-4 md:px-13 py-1">
//         <nav className="flex flex-wrap justify-between items-center p-4 mb-6">
//           <div className="text-white text-2xl font-bold flex items-center gap-4 ml-4">
//             <img src="/logo.png" alt="Logo" className="h-12 w-12 md:h-16 md:w-16" />
//             <span>AquaStore</span>
//           </div>

//           {/* Hamburger Menu Button for Mobile */}
//           <button
//             className="md:hidden p-2 rounded-lg hover:bg-cyan-700 transition-colors"
//             onClick={toggleMenu}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//               />
//             </svg>
//           </button>

//           {/* Navigation Links */}
//           <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-12 mt-4 md:mt-0`}>
//             {["Home", "Shop", "Blog", "About", "Contact"].map((item) => (
//               <button
//                 key={item}
//                 className="w-full md:w-auto hover:text-cyan-200 cursor-pointer font-[Raleway] text-lg font-medium px-2 py-2 md:py-1"
//                 style={{
//                   transition: "all 0.3s ease",
//                   borderBottom: "2px solid transparent",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.borderBottom = "2px solid #E6FFFA";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.borderBottom = "2px solid transparent";
//                 }}
//               >
//                 {item}
//               </button>
//             ))}
//             <button
//               className="w-full md:w-auto bg-[#CD7F32] text-white px-6 md:px-10 py-2 rounded-full text-lg font-semibold
//                        hover:bg-[#A67C52] hover:scale-105 active:scale-95"
//               style={{
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 border: "2px solid transparent",
//                 borderRadius: "30px",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.border = "2px solid #E6FFFA";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.border = "2px solid transparent";
//               }}
//               onClick={() => (window.location.href = "/login")}
//             >
//               LogIn
//             </button>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
//           <div className="max-w-xl lg:pl-16">
//             <h1
//               style={{
//                 fontSize: "2.2rem",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//               }}
//             >
//               Discover the Wonders{" "}
//               <span className="text-[#CD7F32]">Colorful Fish</span> in the Ocean
//             </h1>
//             <p className="mt-6 text-lg text-cyan-50 font-[Raleway]">
//               Know about their habitats, behaviors, and how to appreciate their
//               role in the ocean&apos;s delicate ecosystem.
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#CD7F32",
//                 color: "white",
//                 padding: "12px 22px",
//                 fontSize: "1rem",
//                 fontWeight: "600",
//                 borderRadius: "30px",
//                 marginTop: "1rem",
//                 transition:
//                   "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
//                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = "#A67C52";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = "#CD7F32";
//               }}
//               onClick={() => navigate("/more")}
//             >
//               Explore Now
//             </button>

//             {/* Fish Gallery */}
//             <div className="mt-16">
//               <p className="text-lg mb-4 font-[Raleway]">Aquarium Fish</p>
//               <div className="flex space-x-4">
//                 {[fish1, fish2, fish3].map((fish, index) => (
//                   <img
//                     key={index}
//                     src={fish}
//                     alt={`Fish ${index + 1}`}
//                     className="w-24 h-24 rounded-md border border-gray-300 hover:scale-105 transition-transform cursor-pointer"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Side Images */}
//           <div className="relative flex mt-8 md:mt-0 hidden md:flex">
//             <img src={seahorse} alt="Seahorse" className="-mr-10" />
//             <img src={fish4} alt="Colorful Fish" className="-mr-10" />
//             <img src={turtle} alt="Sea Turtle" />
//           </div>
//         </div>
//       </div>

//       {/* Fish Cards Section */}
//       <div className="mt-10 px-16 py-12">
//         <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "2.5rem", paddingBottom: "1.25rem", color: "#DCD9D1", textAlign: "center" }}>Featured Fish</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//           {displayedFish.map((fish) => (
//             <div
//               key={fish.id}
//               className="bg-[#345b6f] text-[#DCD9D1] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
//               style={{
//                 boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//                 transition: "all 0.3s ease",
//                 animation: "fadeInUp 0.5s ease-in",

//               }}
//             >
//               <img
//                 src={fish.image_url}
//                 alt={fish.name}
//                 className="w-full h-48 object-cover hover:opacity-90"
//                 style={{
//                   transition: "all 0.3s ease",
//                 }}
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold font-[Raleway] mb-2">{fish.name}</h3>
//                 <p className="text-lg text-[#b2a190] font-bold">
//                   ৳{Number(fish.price).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}

//           <div
//             onClick={() => navigate("/allfish")}
//             className="bg-[#b2a190] text-[#DCD9D1] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
//             style={{
//               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//               transition: "all 0.3s ease",
//               animation: "fadeInUp 0.5s ease-in",

//             }}
//           >
//             <div className="text-center p-6">
//               <h3 className="text-2xl text-white font-semibold font-[Raleway] mb-3">View More Fish</h3>
//               <p className="text-gray-200 mt-2 font-medium">Explore our collection {'>'}{'>'}
// </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <HeroSection />
//       {/* Featured Plants Section */}
//       <div className="space-y-20 ">

//         <div className="mt-5 px-16 py-10">
//           <h2 style={{ fontSize: "2rem", fontWeight: 800, paddingBottom: "2rem", color: "#DCD9D1", textAlign: "center" }}>Featured Plants</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//             {displayedPlants.map((plant) => (
//               <div
//                 key={plant.id}
//                 className="bg-[#345B6F] text-[#DCD9D1] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
//                 style={{
//                   boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//                   transition: "all 0.3s ease",
//                   animation: "fadeInUp 0.5s ease-in",
//                   border: "",
//                 }}
//               >
//                 <img
//                   src={plant.image_url}
//                   alt={plant.name}
//                   className="w-full h-48 object-cover hover:opacity-90"
//                   style={{
//                     transition: "all 0.3s ease",
//                   }}
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold font-[Raleway] mb-2">{plant.name}</h3>
//                   <p className="text-lg text-[#C7A64F] font-bold">
//                     ৳{Number(plant.price).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))}

//             <div
//               onClick={() => navigate("/allplants")}
//               className="bg-[#a7a436] text-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
//               style={{
//                 boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//                 transition: "all 0.3s ease",
//                 animation: "fadeInUp 0.5s ease-in",
//                 border: "2px solid #a7a436",
//               }}
//             >
//               <div className="text-center p-6">
//                 <h3 className="text-2xl font-semibold font-[Raleway] mb-3">View More Plants</h3>
//                 <p className="text-gray-200 mt-2 font-medium">Explore our collection {'>'}{'>'}
// </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Service />
//         <Review />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
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

const Home = () => {
  const navigate = useNavigate();
  const [fishList, setFishList] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for profile dropdown

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

    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/plant/getall"
        );
        if (!response.ok)
          throw new Error(`HTTP Error! Status: ${response.status}`);
        const result = await response.json();
        setPlantList(result.data);
      } catch (error) {
        console.error("Error fetching plant details:", error.message);
      }
    };

    fetchFishDetails();
    fetchPlantDetails();

    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const displayedFish = fishList.slice(0, 3);
  const displayedPlants = plantList.slice(0, 3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const getUserInitials = (displayName) => {
    if (!displayName) return "U"; // Default initial if no display name
    const names = displayName.split(" ");
    return names
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen w-screen bg-cyan-600 text-white font-[Raleway]">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <div className="relative mx-auto px-4 md:px-13 py-1">
        <nav className="flex flex-wrap justify-between items-center p-4 mb-6">
          <div className="text-white text-2xl font-bold flex items-center gap-4 ml-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 md:h-16 md:w-16"
            />
            <span>AquaStore</span>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-cyan-700 transition-colors"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-12 mt-4 md:mt-0`}
          >
            {["Home", "Shop", "Blog", "About", "Contact"].map((item) => (
              <button
                key={item}
                className="w-full md:w-auto hover:text-cyan-200 cursor-pointer font-[Raleway] text-lg font-medium px-2 py-2 md:py-1"
                style={{
                  transition: "all 0.3s ease",
                  borderBottom: "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderBottom = "2px solid #E6FFFA";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderBottom = "2px solid transparent";
                }}
              >
                {item}
              </button>
            ))}
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center justify-center w-10 h-10 bg-[#CD7F32] rounded-full text-white font-semibold hover:bg-[#A67C52] transition-colors"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <span>{getUserInitials(user.displayName)}</span>
                  )}
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => navigate("/profile")}
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 text-left"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="w-full md:w-auto bg-[#CD7F32] text-white px-6 md:px-10 py-2 rounded-full text-lg font-semibold 
                         hover:bg-[#A67C52] hover:scale-105 active:scale-95"
                style={{
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "2px solid transparent",
                  borderRadius: "30px",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
          <div className="max-w-xl lg:pl-16">
            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Discover the Wonders{" "}
              <span className="text-[#CD7F32]">Colorful Fish</span> in the Ocean
            </h1>
            <p className="mt-6 text-lg text-cyan-50 font-[Raleway]">
              Know about their habitats, behaviors, and how to appreciate their
              role in the ocean&apos;s delicate ecosystem.
            </p>
            <button
              style={{
                backgroundColor: "#CD7F32",
                color: "white",
                padding: "12px 22px",
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "30px",
                marginTop: "1rem",
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#A67C52";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#CD7F32";
              }}
              onClick={() => navigate("/more")}
            >
              Explore Now
            </button>

            {/* Fish Gallery */}
            <div className="mt-16">
              <p className="text-lg mb-4 font-[Raleway]">Aquarium Fish</p>
              <div className="flex space-x-4">
                {[fish1, fish2, fish3].map((fish, index) => (
                  <img
                    key={index}
                    src={fish}
                    alt={`Fish ${index + 1}`}
                    className="w-24 h-24 rounded-md border border-gray-300 hover:scale-105 transition-transform cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Images */}
          <div className="relative flex mt-8 md:mt-0 hidden md:flex">
            <img src={seahorse} alt="Seahorse" className="-mr-10" />
            <img src={fish4} alt="Colorful Fish" className="-mr-10" />
            <img src={turtle} alt="Sea Turtle" />
          </div>
        </div>
      </div>

      {/* Fish Cards Section */}
      <div className="mt-10 px-16 py-12">
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 900,
            marginBottom: "2.5rem",
            paddingBottom: "1.25rem",
            color: "#DCD9D1",
            textAlign: "center",
          }}
        >
          Featured Fish
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {displayedFish.map((fish) => (
            <div
              key={fish.id}
              className="bg-[#345b6f] text-[#DCD9D1] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: "all 0.3s ease",
                animation: "fadeInUp 0.5s ease-in",
              }}
            >
              <img
                src={fish.image_url}
                alt={fish.name}
                className="w-full h-48 object-cover hover:opacity-90"
                style={{
                  transition: "all 0.3s ease",
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold font-[Raleway] mb-2">
                  {fish.name}
                </h3>
                <p className="text-lg text-[#b2a190] font-bold">
                  ৳{Number(fish.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div
            onClick={() => navigate("/allfish")}
            className="bg-[#b2a190] text-[#DCD9D1] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: "all 0.3s ease",
              animation: "fadeInUp 0.5s ease-in",
            }}
          >
            <div className="text-center p-6">
              <h3 className="text-2xl text-white font-semibold font-[Raleway] mb-3">
                View More Fish
              </h3>
              <p className="text-gray-200 mt-2 font-medium">
                Explore our collection {">"}
                {">"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <HeroSection />
      {/* Featured Plants Section */}
      <div className="space-y-20">
        <div className="mt-5 px-16 py-10">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              paddingBottom: "2rem",
              color: "#DCD9D1",
              textAlign: "center",
            }}
          >
            Featured Plants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {displayedPlants.map((plant) => (
              <div
                key={plant.id}
                className="bg-[#345B6F] text-[#DCD9D1] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.3s ease",
                  animation: "fadeInUp 0.5s ease-in",
                }}
              >
                <img
                  src={plant.image_url}
                  alt={plant.name}
                  className="w-full h-48 object-cover hover:opacity-90"
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-[Raleway] mb-2">
                    {plant.name}
                  </h3>
                  <p className="text-lg text-[#C7A64F] font-bold">
                    ৳{Number(plant.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div
              onClick={() => navigate("/allplants")}
              className="bg-[#a7a436] text-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: "all 0.3s ease",
                animation: "fadeInUp 0.5s ease-in",
              }}
            >
              <div className="text-center p-6">
                <h3 className="text-2xl font-semibold font-[Raleway] mb-3">
                  View More Plants
                </h3>
                <p className="text-gray-200 mt-2 font-medium">
                  Explore our collection {">"}
                  {">"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Service />
        <Review />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
