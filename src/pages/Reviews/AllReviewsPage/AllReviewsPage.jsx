// src/pages/Reviews/AllReviewsPage/AllReviewsPage.jsx
import React, { useEffect, useState } from 'react';
import ReviewList from '../../../components/Reviews/ReviewList/ReviewList'; // Import the review list component

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews'); // Make sure your API endpoint is correct
        const data = await res.json();
        setReviews(data); // Store reviews in the state
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews(); // Fetch reviews when the page loads
  }, []);

  return (
    <div>
      {/* Pass reviews data to the ReviewList component */}
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default AllReviewsPage;
