// src/pages/Reviews/ShowReviewsPage/ShowReviewPage.jsx
import React, { useState, useEffect } from 'react';
import ReviewDetail from '../../../components/Reviews/ReviewDetail/ReviewDetail'; // Assuming you're using ReviewDetail to show a single review
import { useParams } from 'react-router-dom'; // For getting the reviewId from the URL

const ShowReviewsPage = () => {
  const [review, setReview] = useState(null); // Store the single review
  const { id } = useParams(); // Get the review ID from the URL

  useEffect(() => {
    const fetchReview = async () => {
      try {
        // Fetch the review using the ID from the URL
        const res = await fetch(`/api/reviews/${id}`);
        const data = await res.json();
        setReview(data); // Store the fetched review
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    if (id) {
      fetchReview(); // Fetch review when the page loads and reviewId is available
    }
  }, [id]); // Refetch if the reviewId changes (when redirected to this page with a new review)

  if (!review) return <div>Loading...</div>; // Show loading state if the review is not yet fetched

  return (
    <div>
      {/* Pass the fetched review to the ReviewDetail component */}
      <ReviewDetail review={review} />
    </div>
  );
};

export default ShowReviewsPage;
