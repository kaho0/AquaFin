import React from "react";
import NavBar from "./NavBar";
import Foooter from "./Foooter";

const TrustedBlogs = () => {
  const blogs = [
    {
      id: 1,
      name: "Reef Builders",
      url: "https://reefbuilders.com/",
      description:
        "Expert insights on reef aquariums, marine fish species, coral care, equipment reviews, and sustainable reef keeping practices.",
      followers: {
        facebook: "96.1K",
        twitter: "57.8K",
        instagram: "116.3K",
      },
      authority: 92,
    },
    {
      id: 2,
      name: "Aquarium Co-Op",
      url: "https://www.aquariumcoop.com/blogs/aquarium",
      description:
        "Educational resource for freshwater aquariums, plant care, fish compatibility, and beginner-friendly aquarium setup guides.",
      followers: {
        facebook: "28.3K",
        twitter: "12.6K",
        instagram: "105.4K",
      },
      authority: 57,
    },
    {
      id: 3,
      name: "The Aquarium Guide",
      url: "https://theaquariumguide.com/",
      description:
        "Comprehensive guides for aquarium hobbyists covering fish care, tank maintenance, water parameters, and troubleshooting common issues.",
      followers: {
        facebook: "15.2K",
        instagram: "22.7K",
      },
      authority: 38,
    },
    {
      id: 4,
      name: "Tropical Fish Magazine",
      url: "https://www.tfhmagazine.com/",
      description:
        "Leading publication for aquarium enthusiasts featuring articles on aquascaping, breeding techniques, species profiles, and tank setup ideas.",
      followers: {
        facebook: "31.3K",
        twitter: "13.2K",
      },
      authority: 49,
    },
    {
      id: 5,
      name: "ScienceDaily Aquarium Research",
      url: "https://www.sciencedaily.com/news/plants_animals/fish/",
      description:
        "Latest scientific discoveries about aquatic life, fish behavior, breeding patterns, and conservation efforts from academic sources.",
      followers: {
        facebook: "1.6M",
        twitter: "312.8K",
      },
      authority: 93,
    },
    {
      id: 6,
      name: "Aquascaping World",
      url: "https://www.aquascapingworld.com/",
      description:
        "Professional aquascaping techniques, planted tank tutorials, competitions, and inspiration for creating underwater landscapes.",
      followers: {
        facebook: "58.5K",
        twitter: "15.2K",
        instagram: "87.4K",
      },
      authority: 54,
    },
    {
      id: 7,
      name: "Marine Depot Blog",
      url: "https://www.marinedepot.com/aquarium-articles-information",
      description:
        "Expert advice on saltwater aquariums, equipment selection, coral care, reef maintenance, and solutions for common marine tank issues.",
      followers: {
        facebook: "44.6K",
        twitter: "11K",
        instagram: "37K",
      },
      authority: 60,
    },
    {
      id: 8,
      name: "Freshwater Aquarium Guide",
      url: "https://freshwateraquariumhobby.com/blog/",
      description:
        "Resource dedicated to freshwater aquariums, fish species profiles, plant guides, and DIY projects for tank enthusiasts.",
      followers: {
        facebook: "31.1K",
        twitter: "4.9K",
      },
      authority: 40,
    },
    {
      id: 9,
      name: "Fishlore Aquarium Blog",
      url: "https://www.fishlore.com/aquariumfishforum/",
      description:
        "Community-driven resource for aquarium setup, fish health, breeding techniques, and water quality management.",
      followers: {
        facebook: "124.6K",
        twitter: "4.9K",
        instagram: "1.8K",
      },
      authority: 56,
    },
    {
      id: 10,
      name: "Nano-Reef",
      url: "https://www.nano-reef.com/",
      description:
        "Specialized content for small saltwater aquariums, nano coral selection, equipment recommendations, and maintenance schedules.",
      followers: {
        facebook: "938",
        twitter: "5.9K",
        instagram: "1K",
      },
      authority: 40,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with elegant background */}

      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 py-10 text-white">
        <NavBar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Know More About Aquariums, Fishes & Marine Life?
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Here are some trusted blogs and resources to expand your knowledge
            about aquatic ecosystems
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-12 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {blog.name}
                  </h2>
                  <div
                    className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded"
                    title="Domain Authority Score"
                  >
                    DA: {blog.authority}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 h-24 overflow-hidden">
                  {blog.description}
                </p>

                <div className="flex space-x-4 mb-4">
                  {blog.followers.facebook && (
                    <div className="flex items-center text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                      </svg>
                      <span className="text-sm">{blog.followers.facebook}</span>
                    </div>
                  )}

                  {blog.followers.twitter && (
                    <div className="flex items-center text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                      </svg>
                      <span className="text-sm">{blog.followers.twitter}</span>
                    </div>
                  )}

                  {blog.followers.instagram && (
                    <div className="flex items-center text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                      <span className="text-sm">
                        {blog.followers.instagram}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-2 pt-4 border-t border-gray-200">
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded text-center mb-2 sm:mb-0 transition"
                  >
                    Read Now
                  </a>
                  <button className="bg-transparent hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 border border-gray-300 hover:border-gray-400 rounded text-center transition">
                    + Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Resources Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Looking for More Expert Resources?
          </h3>
          <p className="text-gray-600 mb-6">
            Join our community to discover additional blogs and connect with
            aquarium enthusiasts!
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg shadow transition transform hover:scale-105">
            Join Our Community
          </button>
        </div>
      </div>

      {/* Footer */}
      <Foooter></Foooter>
    </div>
  );
};

export default TrustedBlogs;
