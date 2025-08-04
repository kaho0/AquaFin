import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { auth } from "../components/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { Alert, CircularProgress } from "@mui/material";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ review_text: "", rating: 5 });
  const [isEditing, setIsEditing] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Transform Firebase user to the format needed for our app
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName || "Anonymous User",
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Fetch reviews
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://aquafin.onrender.com/api/v1/reviews/getall"
      )
      .then((response) => {
        // Sort reviews by date (newest first)
        const sortedReviews = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setReviews(sortedReviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to post a review.");
      return;
    }

    if (!newReview.review_text.trim()) {
      setError("Review text cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    const reviewData = {
      userId: user.id,
      name: user.name,
      review_text: newReview.review_text,
      rating: newReview.rating, // Include rating in the review data
    };

    try {
      if (isEditing) {
        // Make sure user can only edit their own reviews
        if (editReview.userId !== user.id) {
          setError("You can only edit your own reviews.");
          setLoading(false);
          return;
        }

        const response = await axios.put(
        `https://aquafin.onrender.com/api/v1/reviews/${editReview.id}`,
          reviewData
        );

        setReviews(
          reviews.map((r) => (r.id === editReview.id ? response.data : r))
        );
        setSuccess("Review updated successfully!");
        setIsEditing(false);
      } else {
        const response = await axios.post(
        "https://aquafin.onrender.com/api/v1/reviews/create",
          reviewData
        );

        setReviews([response.data, ...reviews]);
        setSuccess("Review posted successfully!");
      }

      setNewReview({ review_text: "", rating: 5 });
    } catch (error) {
      console.error("Error with review:", error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    if (!user) {
      setError("You must be logged in to edit reviews.");
      return;
    }

    if (review.userId !== user.id) {
      setError("You can only edit your own reviews.");
      return;
    }

    setIsEditing(true);
    setEditReview(review);
    setNewReview({
      review_text: review.review_text,
      rating: review.rating || 5,
    });

    // Scroll to the form
    document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (reviewId) => {
    if (!user) {
      setError("You must be logged in to delete reviews.");
      return;
    }

    const reviewToDelete = reviews.find((r) => r.id === reviewId);

    if (reviewToDelete.userId !== user.id) {
      setError("You can only delete your own reviews.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this review?")) {
      setLoading(true);

      try {
        await axios.delete(
        `https://aquafin.onrender.com/api/v1/reviews/${reviewId}`
        );
        setReviews(reviews.filter((r) => r.id !== reviewId));
        setSuccess("Review deleted successfully!");

        // If we were editing this review, reset the form
        if (isEditing && editReview.id === reviewId) {
          setIsEditing(false);
          setNewReview({ review_text: "", rating: 5 });
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        setError(error.response?.data?.message || "Failed to delete review.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewReview({ review_text: "", rating: 5 });
  };

  // Star rating component
  const StarRating = ({ rating, setRating, editable = false }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (editable) {
        stars.push(
          <span key={i} className="cursor-pointer" onClick={() => setRating(i)}>
            {i <= rating ? (
              <FaStar className="text-yellow-500 inline text-xl" />
            ) : (
              <FiStar className="text-yellow-500 inline text-xl" />
            )}
          </span>
        );
      } else {
        // For display-only star ratings
        if (i <= Math.floor(rating)) {
          stars.push(
            <FaStar key={i} className="text-yellow-500 inline text-xl" />
          );
        } else if (i - 0.5 <= rating) {
          stars.push(
            <FaStarHalfAlt key={i} className="text-yellow-500 inline text-xl" />
          );
        } else {
          stars.push(
            <FiStar key={i} className="text-yellow-500 inline text-xl" />
          );
        }
      }
    }

    return <div className="flex space-x-1 justify-center">{stars}</div>;
  };

  // Display a message when firebase auth is still initializing
  if (loading && !reviews.length) {
    return (
      <section className="relative bg-cyan-800 text-white py-12 px-10 mt-10 mb-10">
        <div className="flex justify-center items-center h-40">
          <CircularProgress color="inherit" />
          <span className="ml-3">Loading reviews...</span>
        </div>
      </section>
    );
  }

  // Get only the first 3 reviews for initial display
  const displayReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <section className="relative bg-cyan-800 text-white py-12 px-10 mt-10 mb-10">
      <div className="relative p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">
          What <span className="text-yellow-500">Clients Say</span>
        </h2>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            className="mb-4"
            sx={{ bgcolor: "rgba(211, 47, 47, 0.2)", color: "#f8d7da" }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            onClose={() => setSuccess(null)}
            className="mb-4"
            sx={{ bgcolor: "rgba(46, 125, 50, 0.2)", color: "#d4edda" }}
          >
            {success}
          </Alert>
        )}

        {!user ? (
          <div className="bg-cyan-700 p-6 rounded-xl shadow-lg text-center mb-8">
            <p className="text-white">
              You must be logged in to post a review. Please sign in to share
              your experience.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-cyan-700 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-3">
              {isEditing ? "Edit Your Review" : "Share Your Experience"}
            </h3>

            <div className="mb-4">
              <label className="block mb-2">Your Rating:</label>
              <StarRating
                rating={newReview.rating}
                setRating={(value) =>
                  setNewReview({ ...newReview, rating: value })
                }
                editable={true}
              />
            </div>

            <textarea
              value={newReview.review_text}
              onChange={(e) =>
                setNewReview({ ...newReview, review_text: e.target.value })
              }
              placeholder="Write your review..."
              className="w-full p-4 rounded-md border-2 border-yellow-500 text-black mb-3"
              rows="4"
              required
              disabled={loading}
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                className={`bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : isEditing
                  ? "Update Review"
                  : "Post Review"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {displayReviews.length === 0 ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-xl">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            displayReviews.map((review) => (
              <div
                key={review.id}
                className="bg-cyan-700 p-6 rounded-xl shadow-lg text-center relative"
              >
                <FaQuoteLeft className="text-yellow-500 text-2xl mx-auto mb-2" />

                {/* Display star rating */}
                <div className="my-2">
                  <StarRating rating={review.rating || 5} />
                </div>

                <p className="my-3 text-white">{review.review_text}</p>

                <div className="flex flex-col items-center mt-4">
                  <Avatar
                    src={review.image_url || "/default-avatar.jpg"}
                    alt={review.name}
                    sx={{ width: 48, height: 48, border: "2px solid #CD7F32" }}
                  />
                  <h3 className="text-lg font-bold text-white mt-2">
                    {review.name}
                  </h3>
                </div>

                {user && user.id === review.userId && (
                  <div className="mt-3 flex justify-center space-x-3">
                    <button
                      className="text-yellow-500 pr-5 hover:text-yellow-400 transition"
                      onClick={() => handleEdit(review)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300 transition"
                      onClick={() => handleDelete(review.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* "Watch More Reviews" button */}
        {reviews.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition"
            >
              {showAllReviews ? "Show Less" : "Watch More Reviews"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Review;
