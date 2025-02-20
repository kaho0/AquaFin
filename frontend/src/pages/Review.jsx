import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

const Review = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ review_text: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/reviews/getall")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to post a review.");

    const reviewData = {
      userId: user.id,
      name: user.name,
      profession: user.profession,
      review_text: newReview.review_text,
    };

    if (isEditing) {
      // Allow editing only if it's the user's own review
      if (editReview.userId !== user.id)
        return alert("You can only edit your own reviews.");

      axios
        .put(
          `http://localhost:4000/api/v1/reviews/${editReview.id}`,
          reviewData
        )
        .then((response) => {
          setReviews(
            reviews.map((r) => (r.id === editReview.id ? response.data : r))
          );
          setIsEditing(false);
          setNewReview({ review_text: "" });
        })
        .catch((error) => console.error("Error editing review:", error));
    } else {
      axios
        .post("http://localhost:4000/api/v1/reviews/create", reviewData)
        .then((response) => {
          setReviews([response.data, ...reviews]);
          setNewReview({ review_text: "" });
        })
        .catch((error) => console.error("Error posting review:", error));
    }
  };

  const handleEdit = (review) => {
    if (review.userId !== user.id) {
      alert("You can only edit your own review.");
      return;
    }
    setIsEditing(true);
    setEditReview(review);
    setNewReview({ review_text: review.review_text });
  };

  return (
    <section className="relative bg-cyan-800 text-white py-12 px-10 mt-10 mb-10">
      <div className="relative p-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          What <span className="text-yellow-500">Clients Say</span>
        </h2>
        {!user ? (
          <p className="text-red-500">
            You must be logged in to post a review.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mb-8">
            <textarea
              value={newReview.review_text}
              onChange={(e) => setNewReview({ review_text: e.target.value })}
              placeholder="Write your review..."
              className="w-full p-4 rounded-md border-2 border-[#CD7F32] text-black"
              rows="4"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-4 rounded-md"
            >
              {isEditing ? "Update Review" : "Post Review"}
            </button>
          </form>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-cyan-700 p-6 rounded-xl shadow-lg text-center"
            >
              <FaQuoteLeft className="text-yellow-500 text-2xl" />
              <p className="my-3 text-white">{review.review_text}</p>

              <div className="flex flex-col items-center">
                <Avatar
                  src={review.image_url || "/default-avatar.jpg"}
                  sx={{ width: 48, height: 48, border: "2px solid #CD7F32" }}
                />
                <h3 className="text-lg font-bold text-white mt-2">
                  {review.name}
                </h3>
                <p className="text-yellow-500">{review.profession}</p>
              </div>

              {user && user.id === review.userId && (
                <button
                  className="text-yellow-500 mt-3"
                  onClick={() => handleEdit(review)}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
