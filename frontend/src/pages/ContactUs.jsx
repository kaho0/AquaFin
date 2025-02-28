import React, { useState } from "react";
import NavBar from "./NavBar";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 to-blue-900 text-white py-12 px-4 md:px-8">
      {/* Hero Section */}
      <NavBar></NavBar>
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Get In <span className="text-cyan-300">Touch</span>
        </h1>
        <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
          Have questions about aquarium setup, fish care, or our products? Our
          team of experts is here to help!
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="md:flex gap-8">
          {/* Contact Form */}
          <div className="md:w-3/5 mb-12 md:mb-0">
            <div className="bg-gradient-to-r from-blue-800/50 to-cyan-800/50 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-cyan-200 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-cyan-200 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-cyan-200 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  >
                    <option value="" disabled className="text-gray-700">
                      Select a subject
                    </option>
                    <option value="product" className="text-gray-700">
                      Product Inquiry
                    </option>
                    <option value="support" className="text-gray-700">
                      Technical Support
                    </option>
                    <option value="care" className="text-gray-700">
                      Fish Care Advice
                    </option>
                    <option value="other" className="text-gray-700">
                      Other
                    </option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-cyan-200 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:w-2/5">
            <div className="bg-gradient-to-r from-blue-800/50 to-cyan-800/50 rounded-3xl p-8 shadow-xl mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                  Store Location
                </h3>
                <p className="text-cyan-100">123 Ocean Avenue</p>
                <p className="text-cyan-100">Coral Bay, CA 90210</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                  Opening Hours
                </h3>
                <p className="text-cyan-100">Monday - Friday: 9AM to 7PM</p>
                <p className="text-cyan-100">Saturday: 10AM to 6PM</p>
                <p className="text-cyan-100">Sunday: Closed</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                  Contact Details
                </h3>
                <p className="text-cyan-100">Phone: (555) 123-4567</p>
                <p className="text-cyan-100">Email: support@aquastore.com</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-800/50 to-cyan-800/50 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <div className="flex gap-4">
                {["Facebook", "Instagram", "Twitter", "YouTube"].map(
                  (platform) => (
                    <button
                      key={platform}
                      className="w-12 h-12 rounded-full bg-cyan-700 hover:bg-cyan-600 transition-all flex items-center justify-center"
                    >
                      {platform.charAt(0)}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
