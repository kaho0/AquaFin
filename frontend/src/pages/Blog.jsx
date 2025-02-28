import React from "react";
import "./Blog.css";
import NavBar from "./NavBar";

const TrustedBlogs = () => {
  const blogs = [
    {
      id: 1,
      name: "NOAA Fisheries Blog",
      url: "https://www.fisheries.noaa.gov/news-and-announcements",
      description:
        "Expert insights on ocean resources and habitat stewardship, sustainable fisheries, seafood safety, and conservation of protected marine resources.",
      followers: {
        facebook: "96.1K",
        twitter: "57.8K",
        instagram: "116.3K",
      },
      authority: 92,
    },
    {
      id: 2,
      name: "American Fisheries Society",
      url: "https://fisheries.org/news/",
      description:
        "The world's oldest organization dedicated to strengthening fisheries profession, advancing fisheries science, and conservation, with 8,000+ global members.",
      followers: {
        facebook: "8.3K",
        twitter: "12.6K",
        instagram: "5.4K",
      },
      authority: 57,
    },
    {
      id: 3,
      name: "Fishery Nation",
      url: "https://fisherynation.com/",
      description:
        "A platform for fishermen to connect regionally, share sea stories, how-to guides, recipes, crew stories, and engage in political activism for their community.",
      followers: {},
      authority: 38,
    },
    {
      id: 4,
      name: "Pacific Fishery Management Council",
      url: "https://www.pcouncil.org/category/news-and-events/",
      description:
        "Official regional fishery management council recommending fishery measures for Federal waters off Washington, Oregon, and California.",
      followers: {
        facebook: "1.3K",
        twitter: "3.2K",
      },
      authority: 49,
    },
    {
      id: 5,
      name: "ScienceDaily Fisheries",
      url: "https://www.sciencedaily.com/news/plants_animals/fisheries/",
      description:
        "Breaking news about the latest discoveries in sustainable fisheries, fishing threats, and the future of commercial fishing from leading scientific sources.",
      followers: {
        facebook: "1.6M",
        twitter: "312.8K",
      },
      authority: 93,
    },
    {
      id: 6,
      name: "IntraFish Fisheries",
      url: "https://www.intrafish.com/fisheries",
      description:
        "Leading seafood, fisheries and aquaculture news source with 20+ years of global industry coverage and business intelligence.",
      followers: {
        facebook: "8.5K",
        twitter: "15.2K",
      },
      authority: 54,
    },
    {
      id: 7,
      name: "Australian Marine Conservation Society",
      url: "https://www.marineconservation.org.au/category/fisheries/",
      description:
        "57+ years of marine conservation expertise, featuring the latest updates to the GoodFish Sustainable Seafood Guide and conservation initiatives.",
      followers: {
        facebook: "180.9K",
        twitter: "11K",
        instagram: "37K",
      },
      authority: 60,
    },
    {
      id: 8,
      name: "Freshwater Fisheries Society of BC",
      url: "https://www.gofishbc.com/Blog.aspx",
      description:
        "Non-profit dedicated to enhancing and conserving BC's freshwater fisheries through partnerships with government, industry, and anglers.",
      followers: {
        facebook: "31.1K",
        twitter: "4.9K",
      },
      authority: 40,
    },
    {
      id: 9,
      name: "NFI Blog",
      url: "https://aboutseafood.com/news-blog/",
      description:
        "National Fisheries Institute's resource for seafood safety, sustainability, nutrition education, and responsible aquaculture practices.",
      followers: {
        facebook: "124.6K",
        twitter: "4.9K",
        instagram: "1.8K",
      },
      authority: 56,
    },
    {
      id: 10,
      name: "Sustainable Fisheries UW",
      url: "https://sustainablefisheries-uw.org/",
      description:
        "Network of scientists communicating accurate information about fisheries sustainability to counter misconceptions in mainstream media.",
      followers: {
        facebook: "938",
        twitter: "5.9K",
        instagram: "1K",
      },
      authority: 40,
    },
  ];

  return (
    <div className="trusted-blogs-container">
      <NavBar></NavBar>
      <div className="trusted-blogs-header">
        <h1>Want to Know More About Aquariums, Fishes & Marine Life?</h1>
        <p>
          Here are some trusted blogs and resources to expand your knowledge
          about aquatic ecosystems
        </p>
      </div>

      <div className="trusted-blogs-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-card-header">
              <h2>{blog.name}</h2>
              <div className="authority-badge" title="Domain Authority Score">
                DA: {blog.authority}
              </div>
            </div>

            <p className="blog-description">{blog.description}</p>

            <div className="blog-social">
              {blog.followers.facebook && (
                <div className="social-stat">
                  <i className="fab fa-facebook"></i>
                  <span>{blog.followers.facebook}</span>
                </div>
              )}

              {blog.followers.twitter && (
                <div className="social-stat">
                  <i className="fab fa-twitter"></i>
                  <span>{blog.followers.twitter}</span>
                </div>
              )}

              {blog.followers.instagram && (
                <div className="social-stat">
                  <i className="fab fa-instagram"></i>
                  <span>{blog.followers.instagram}</span>
                </div>
              )}
            </div>

            <div className="blog-actions">
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-now-btn"
              >
                Read Now
              </a>
              <button className="follow-btn">+ Follow Blog</button>
            </div>
          </div>
        ))}
      </div>

      <div className="more-resources">
        <h3>Looking for More Expert Resources?</h3>
        <p>
          Join our community to discover additional blogs and connect with
          aquarium enthusiasts!
        </p>
        <button className="join-community-btn">Join Our Community</button>
      </div>
    </div>
  );
};

export default TrustedBlogs;
