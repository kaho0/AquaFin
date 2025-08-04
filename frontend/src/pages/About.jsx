import React from "react";
import NavBar from "./NavBar";
import Foooter from "./Foooter";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with gradient background - from trusted blogs theme */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 py-10 text-white">
        <NavBar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-white">AquaFin</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the wonders of the deep at Noakhali's premier aquatic
            experience
          </p>
        </div>
      </div>

      {/* Main content section - styled with blog card approach */}
      <div className="container mx-auto px-4 py-12 -mt-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600">✦</span>
              </span>
              Our Mission
            </h2>
            <p className="text-gray-600">
              At AquaFin, we are dedicated to creating an immersive underwater
              experience that inspires wonder, fosters education, and promotes
              conservation of our world's precious aquatic ecosystems.
            </p>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600">✦</span>
              </span>
              Our Story
            </h2>
            <p className="text-gray-600">
              Founded in 2010, AquaFin began with a simple vision: to bring the
              majesty of underwater worlds to our community. What started as a
              modest collection has grown into one of the region's premier
              aquatic attractions, housing over 500 species in carefully crafted
              habitats.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-cyan-600">✦</span>
              </span>
              Conservation Efforts
            </h2>
            <p className="text-gray-600">
              Conservation is at the heart of everything we do at AquaFin. We're
              committed to protecting aquatic ecosystems through education and
              direct action. Through partnerships with local organizations, we
              work to preserve our coastal environments.
            </p>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600">✦</span>
              </span>
              Educational Experiences
            </h2>
            <p className="text-gray-600">
              We believe education is the foundation of conservation. Visit us
              to learn about marine life through our interactive exhibits and
              expert presentations. Our educational programs cater to visitors
              of all ages, from school groups to senior citizens.
            </p>
          </div>
        </div>

        {/* Visit section - styled with teal theme */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-lg p-8 shadow-xl mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Visit Us</h2>
          <p className="text-lg mb-8 text-center max-w-2xl mx-auto">
            Come experience the wonder of aquatic life! Our facility is open
            year-round with special events and seasonal exhibits.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Hours
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Saturday - Sunday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Location
              </h3>
              <address className="not-italic mb-4">
                Begumganj, Noakhali
                <br />
                Postal Code: 3820
                <br />
                <a
                  href="tel:+8801828749710"
                  className="text-white hover:text-teal-100 transition-colors flex items-center mt-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  +880 1828 749710
                </a>
                <br />
                <a
                  href="mailto:info@aquafin.com"
                  className="text-white hover:text-teal-100 transition-colors flex items-center mt-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  info@aquafin.com
                </a>
              </address>
            </div>
          </div>
          <div className="mt-10 text-center">
            <button className="bg-white text-teal-700 font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-teal-50 transform hover:-translate-y-1">
              Plan Your Visit
            </button>
          </div>
        </div>

        {/* CTA Section - like the blog's "More Resources" section */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Want to Support Our Conservation Efforts?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community to help preserve aquatic ecosystems and make a
              difference!
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg shadow transition transform hover:scale-105">
              Become a Member
            </button>
          </div>
        </div>

        {/* Footer - using the blog's footer style */}
        <Foooter></Foooter>
      </div>
    </div>
  );
};

export default AboutPage;
