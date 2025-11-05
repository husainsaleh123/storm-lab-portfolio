// src/pages/Reviews/AllReviewsPage/AllReviewsPage.jsx

import React, { useEffect, useState } from 'react';
import ReviewList from '../../../components/Reviews/ReviewList/ReviewList';
import styles from '../../../pages/Reviews/AllReviewsPage/AllReviewsPage.module.scss';
import { Link } from 'react-router-dom';

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('Highest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Track if user is logged in

  // Fetch reviews and user state on page load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
    
    // Check if user is logged in from localStorage
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Set user if found in localStorage
    }
  }, []);

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Update the state
    setIsModalOpen(false); // Close the modal
  };

  // Calculate average rating
  const averageRating = (reviews.length > 0)
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews-page">

      {/* Show the modal if the user is logged in and clicks the logout button */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout} className={styles.confirmLogoutBtn}>Yes, Log Out</button>
            <button onClick={() => setIsModalOpen(false)} className={styles.cancelLogoutBtn}>Cancel</button>
          </div>
        </div>
      )}

      {/* Pass props to ReviewList */}
      <ReviewList
        reviews={reviews}
        setReviews={setReviews}
        filter={filter}
        setFilter={setFilter}
        averageRating={averageRating} // Pass average rating to ReviewList
        reviewCount={reviews.length}  // Pass the review count to ReviewList
      />
    </div>
  );
};

export default AllReviewsPage;
