// src/pages/Reviews/AllReviewsPage/AllReviewsPage.jsx

import React, { useEffect, useState } from 'react';
import ReviewList from '../../../components/Reviews/ReviewList/ReviewList'; // Import the review list component
import styles from '../../../pages/Reviews/AllReviewsPage/AllReviewsPage.module.scss';

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [filter, setFilter] = useState('Highest'); // State for filter

  // Fetch reviews when the page loads (Only fetch once)
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

    fetchReviews(); // Fetch reviews on component mount
  }, []); // Empty dependency array ensures this runs once when the component is first loaded.

  // Calculate the average rating of reviews
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();  // Calculate average rating
  const reviewCount = reviews.length;  // Count the number of reviews

  return (
    <div className="reviews-page">
      {/* Pass reviews, filter, averageRating, and reviewCount to the ReviewList component */}
      <ReviewList 
        reviews={reviews} 
        setReviews={setReviews}  // Pass setReviews to allow updating reviews
        filter={filter} 
        setFilter={setFilter}  // Pass the setFilter function to handle filter change
        averageRating={averageRating}  // Pass average rating as a prop
        reviewCount={reviewCount}      // Pass review count as a prop
      />
    </div>
  );
};

export default AllReviewsPage;