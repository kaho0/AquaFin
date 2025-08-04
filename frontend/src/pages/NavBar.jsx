import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase.js";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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

  const getUserInitials = () => {
    if (!user) return "?";

    if (user.displayName && user.displayName.trim()) {
      return user.displayName.charAt(0).toUpperCase();
    } else if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }

    return "?";
  };

  return (
    <nav className="flex flex-wrap justify-between items-center p-4 mb-6">
      {/* Logo */}
      <div className="text-white text-2xl font-bold flex items-center gap-4 ml-4">
        <img
          src="/loogo.png"
          alt="Logo"
          className="h-auto w-auto max-h-40 max-w-40 object-contain"
        />
      </div>

      {/* Admin Panel Link (visible only to admin) */}
      {user && (user.email === "kahonbintezaman@gmail.com" || user.email === "zamanibna2005@gmail.com") && (
        <button
          className="text-white bg-teal-700 px-4 py-2 rounded-lg font-semibold hover:bg-teal-800 transition-colors mr-4"
          onClick={() => navigate("/admin")}
        >
          Admin Panel
        </button>
      )}

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
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-12 mt-4 md:mt-0`}
      >
        {[
          { name: "Home", path: "/" },

          { name: "Blog", path: "/blog" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((item) => (
          <button
            key={item.name}
            className="w-full md:w-auto hover:text-cyan-200 cursor-pointer font-[Raleway] text-lg font-medium px-2 py-2 md:py-1"
            style={{
              transition: "all 0.3s ease",
              borderBottom: "2px solid transparent",
            }}
            onClick={() => navigate(item.path)}
            onMouseEnter={(e) => {
              e.target.style.borderBottom = "2px solid #E6FFFA";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderBottom = "2px solid transparent";
            }}
          >
            {item.name}
          </button>
        ))}

        {/* Profile Avatar or Login Button */}
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
                <span>{getUserInitials()}</span>
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
  );
};

export default NavBar;
