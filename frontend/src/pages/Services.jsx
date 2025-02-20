import React from "react";
import { FaTools, FaCheckCircle, FaDollarSign, FaUsers } from "react-icons/fa";

const Service = () => {
  return (
    <section
      className="relative bg-cyan-800 text-white py-12 px-10"
      style={{ padding: "0 10%" }}
    >
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/choose.jpg')" }}
      ></div>

      {/* Content */}
      <div className="relative p-10 max-w-5xl mx-auto text-center">
        <h2
          className="text-center"
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Why Choose <span style={{ color: "#CD7F32" }}>Us</span>
        </h2>
        <p
          className="text-center mx-auto"
          style={{
            fontSize: "1.1rem",
            color: "#EBF4FA",
            maxWidth: "500px",
            marginBottom: "2rem",
          }}
        >
          Discover our exceptional aquarium services that ensure the best
          environment for your aquatic life.
        </p>

        {/* Service Boxes */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: <FaTools />,
              title: "Professional",
              desc: "Expert aquarium setup and maintenance.",
            },
            {
              icon: <FaCheckCircle />,
              title: "Trusted",
              desc: "Reliable and experienced team.",
            },
            {
              icon: <FaDollarSign />,
              title: "Affordable",
              desc: "Competitive pricing for all services.",
            },
            {
              icon: <FaUsers />,
              title: "Expert Team",
              desc: "Highly trained professionals ready to help.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-cyan-700 p-4 rounded-xl shadow-lg flex items-center gap-3"
              style={{
                borderLeft: "4px solid #CD7F32",
                padding: "15px",
                minHeight: "80px",
              }}
            >
              <div style={{ color: "#CD7F32", fontSize: "1.8rem" }}>
                {service.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#EBF4FA",
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
