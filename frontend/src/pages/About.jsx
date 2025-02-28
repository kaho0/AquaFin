import React from "react";
import NavBar from "./NavBar";

const AboutPage = () => {
  return (
    <div className="about-container max-w-6xl mx-auto px-4 py-12">
      <NavBar></NavBar>
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">About AquaFin</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the wonders of the deep at Florida's premier aquatic
          experience
        </p>
      </header>

      <section className="mission-section mb-16">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          At AquaFin, we are dedicated to creating an immersive underwater
          experience that inspires wonder, fosters education, and promotes
          conservation of our world's precious aquatic ecosystems. Our
          state-of-the-art facility serves as a window to the extraordinary
          diversity of marine and freshwater life from around the globe.
        </p>
        <div className="bg-blue-50 p-8 rounded-lg shadow-md">
          <blockquote className="text-xl italic text-blue-900">
            "Bringing the ocean's magic to visitors while protecting its
            future."
          </blockquote>
        </div>
      </section>

      <section className="story-section mb-16">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Our Story</h2>
        <p className="text-lg text-gray-700 mb-4">
          Founded in 2010, AquaFin began with a simple vision: to bring the
          majesty of underwater worlds to our community. What started as a
          modest collection has grown into one of the region's premier aquatic
          attractions, housing over 500 species in carefully crafted habitats
          that replicate their natural environments.
        </p>
        <p className="text-lg text-gray-700">
          Our journey has been guided by a passionate team of marine biologists,
          conservationists, and educators who share a common belief that
          understanding our oceans and waterways is crucial for their
          preservation.
        </p>
      </section>

      <section className="conservation-section mb-16">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Conservation Efforts
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Conservation is at the heart of everything we do at AquaFin.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Habitat Restoration
            </h3>
            <p className="text-gray-700">
              We actively participate in local and international restoration
              projects for coral reefs, wetlands, and river systems.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Breeding Programs
            </h3>
            <p className="text-gray-700">
              Our specialized breeding programs help sustain endangered aquatic
              species and reduce pressure on wild populations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Plastic Reduction
            </h3>
            <p className="text-gray-700">
              We've eliminated single-use plastics throughout our facility and
              advocate for cleaner waterways in our community.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Research Partnerships
            </h3>
            <p className="text-gray-700">
              We collaborate with leading universities and research institutions
              to advance marine science and conservation techniques.
            </p>
          </div>
        </div>
      </section>

      <section className="education-section mb-16">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Educational Experiences
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          We believe education is the foundation of conservation.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-2">•</span>
            <span className="text-gray-700">
              <span className="font-semibold">Interactive Exhibits:</span> Touch
              pools and hands-on stations where visitors can safely interact
              with gentle aquatic creatures.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-2">•</span>
            <span className="text-gray-700">
              <span className="font-semibold">Daily Presentations:</span>{" "}
              Expert-led talks and feeding demonstrations throughout the day.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-2">•</span>
            <span className="text-gray-700">
              <span className="font-semibold">School Programs:</span>{" "}
              Curriculum-aligned educational programs for students of all ages.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-2">•</span>
            <span className="text-gray-700">
              <span className="font-semibold">Behind-the-Scenes Tours:</span>{" "}
              Exclusive looks at our water filtration systems, food preparation
              areas, and conservation laboratories.
            </span>
          </li>
        </ul>
      </section>

      <section className="aquatic-family-section mb-16">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Meet Our Aquatic Family
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Coral Reef
            </h3>
            <p className="text-gray-700">
              A vibrant reef teeming with colorful tropical fish
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Open Ocean
            </h3>
            <p className="text-gray-700">
              Graceful rays and sharks in our largest exhibit
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Coastal Zone
            </h3>
            <p className="text-gray-700">
              Playful otters and penguins in their habitat
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Deep Sea
            </h3>
            <p className="text-gray-700">
              Mysterious creatures from the ocean depths
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Jellyfish Gallery
            </h3>
            <p className="text-gray-700">
              Delicate jellyfish in specialized cylindrical tanks
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              River Life
            </h3>
            <p className="text-gray-700">
              Freshwater species from rivers around the world
            </p>
          </div>
        </div>
      </section>

      <section className="team-section mb-16">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Our Team</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our dedicated staff includes marine biologists, animal care
          specialists, educators, and conservation experts who work tirelessly
          to maintain the highest standards of animal welfare and visitor
          experience.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600">
              Dr. Marina Waters
            </h3>
            <p className="text-gray-600">Marine Biologist</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600">Carlos Reef</h3>
            <p className="text-gray-600">Conservation Director</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600">Sarah Fins</h3>
            <p className="text-gray-600">Education Coordinator</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600">
              Miguel Ocean
            </h3>
            <p className="text-gray-600">Animal Care Specialist</p>
          </div>
        </div>
      </section>

      <section className="visit-section bg-blue-50 p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Visit Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          Come experience the wonder of aquatic life! Our facility is open
          year-round with special events, seasonal exhibits, and members-only
          opportunities.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Hours</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Monday - Friday:</span> 9:00 AM -
                5:00 PM
              </li>
              <li>
                <span className="font-medium">Saturday - Sunday:</span> 9:00 AM
                - 6:00 PM
              </li>
              <li>
                <span className="font-medium">Holiday Hours:</span> Please check
                our calendar
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Location
            </h3>
            <address className="not-italic text-gray-700 mb-4">
              123 Ocean Drive
              <br />
              Seaside, FL 33123
              <br />
              <a
                href="tel:+15551234567"
                className="text-blue-600 hover:underline"
              >
                555-123-4567
              </a>
              <br />
              <a
                href="mailto:info@aquafin.com"
                className="text-blue-600 hover:underline"
              >
                info@aquafin.com
              </a>
            </address>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Plan Your Visit
          </button>
        </div>
      </section>

      <footer className="text-center text-gray-600">
        <p>
          We look forward to welcoming you to AquaFin, where every visit
          supports our mission of education and conservation.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
