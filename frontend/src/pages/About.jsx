import React from "react";
import NavBar from "./NavBar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-400 to-slate-500">
      <div className="text-white about-container max-w-6xl mx-auto px-6 py-16 text-slate-800">
        <NavBar />

        <header className="text-center mb-20">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            About <span className="text-emerald-600">AquaFin</span>
          </h1>
          <div className="w-32 h-1 bg-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto italic font-light">
            Discover the wonders of the deep at Noakhali's premier aquatic
            experience
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <section className="mission-section text-emerald-900 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600">✦</span>
              </span>
              Our Mission
            </h2>
            <p className="text-slate-700 leading-relaxed">
              At AquaFin, we are dedicated to creating an immersive underwater
              experience that inspires wonder, fosters education, and promotes
              conservation of our world's precious aquatic ecosystems.
            </p>
          </section>

          <section className="story-section text-emerald-900 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4 flex items-center">
              <span className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600">✦</span>
              </span>
              Our Story
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Founded in 2010, AquaFin began with a simple vision: to bring the
              majesty of underwater worlds to our community. What started as a
              modest collection has grown into one of the region's premier
              aquatic attractions, housing over 500 species in carefully crafted
              habitats.
            </p>
          </section>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <section className="conservation-section text-emerald-900 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4 flex items-center">
              <span className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600">✦</span>
              </span>
              Conservation Efforts
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Conservation is at the heart of everything we do at AquaFin. We're
              committed to protecting aquatic ecosystems through education and
              direct action. Through partnerships with local organizations, we
              work to preserve our coastal environments.
            </p>
          </section>

          <section className="education-section text-emerald-900 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4 flex items-center">
              <span className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600">✦</span>
              </span>
              Educational Experiences
            </h2>
            <p className="text-slate-700 leading-relaxed">
              We believe education is the foundation of conservation. Visit us
              to learn about marine life through our interactive exhibits and
              expert presentations. Our educational programs cater to visitors
              of all ages, from school groups to senior citizens.
            </p>
          </section>
        </div>

        <section className="visit-section bg-gray-500 p-10 rounded-3xl shadow-2xl mb-16 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Visit Us</h2>
          <p className="text-lg mb-8 text-center max-w-2xl mx-auto">
            Come experience the wonder of aquatic life! Our facility is open
            year-round with special events and seasonal exhibits.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-emerald-100 mb-4 flex items-center">
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
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-emerald-100 mb-4 flex items-center">
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
                  className="text-emerald-200 hover:text-white transition-colors flex items-center mt-2"
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
                  className="text-emerald-200 hover:text-white transition-colors flex items-center mt-2"
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
            <button className="bg-white text-emerald-700 font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-emerald-50 transform hover:-translate-y-1">
              Plan Your Visit
            </button>
          </div>
        </section>

        <footer className="text-center text-slate-600 border-t border-emerald-200 pt-8">
          <p className="max-w-2xl mx-auto">
            We look forward to welcoming you to AquaFin, where every visit
            supports our mission of education and conservation.
          </p>
          <div className="mt-6 text-emerald-600 flex justify-center space-x-6">
            <a href="#" className="hover:text-emerald-800">
              <span className="sr-only">Facebook</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="hover:text-emerald-800">
              <span className="sr-only">Instagram</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="hover:text-emerald-800">
              <span className="sr-only">Twitter</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
