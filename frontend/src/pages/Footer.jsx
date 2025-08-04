import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-cyan-800 text-white px-10 mt-10">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/6.jpg')" }}
      ></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Brand Name */}
        <h2
          className="p-4"
          style={{
            fontSize: "2.8rem",
            fontWeight: "bold",
            color: "#CD7F32",
            marginBottom: "0.5rem",
          }}
        >
          AquaFin
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#EBF4FA",
            maxWidth: "600px",
            marginInline: "auto",
            marginBottom: "2rem",
          }}
        >
          Your premier destination for all things aquatic.
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-5">
          {["About", "Services", "Contact"].map((link, index) => (
            <a
              key={index}
              href="#"
              style={{
                fontSize: "1.2rem",
                color: "#FFFFFF",
                fontWeight: "600",
                transition: "color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#CD7F32";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#FFFFFF";
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-6 mb-6">
          {[
            { icon: <FaFacebookF />, url: "#" },
            { icon: <FaTwitter />, url: "#" },
            { icon: <FaInstagram />, url: "#" },
            { icon: <FaLinkedinIn />, url: "#" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-700"
              style={{
                color: "#FFFFFF",
                fontSize: "1.5rem",
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#CD7F32";
                e.target.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#2D6A73";
                e.target.style.color = "#FFFFFF";
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="pb-5"
          style={{
            fontSize: "1rem",
            color: "#EBF4FA",
            marginTop: "2rem",
          }}
        >
          &copy; {new Date().getFullYear()} AquaFin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
