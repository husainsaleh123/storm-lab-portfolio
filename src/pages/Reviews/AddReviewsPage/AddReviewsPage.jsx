// src/pages/Reviews/AddReviewsPage/AddReviewsPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import styles from './AddReviewsPage.module.scss'; // Import SCSS for styling
import ReviewForm from '../../../components/Reviews/ReviewForm/ReviewForm'; // Import the ReviewForm component

const AddReviewsPage = () => {
  const [userDetails, setUserDetails] = useState({ name: '', email: '' }); // State for user's details
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    rating: '',
    message: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook to navigate to another page

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Check if the token exists in localStorage

    if (token) {
      const user = JSON.parse(localStorage.getItem('user')); // Get user details from localStorage
      if (user) {
        setUserDetails({ name: user.name, email: user.email });
        setReviewData({ ...reviewData, name: user.name, email: user.email });
      }
    } else {
      // If no token is found, redirect to login page
      navigate('/auth');
    }
  }, [navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit review data to the backend or process it as needed
    console.log('Review submitted:', reviewData);
  };

  return (
    <div>
      <h2 className={styles.FeedbackWlcmMsg}>Welcome, {userDetails.name}. We improving through feedback. </h2>
      <p className={styles.XpShareMsg}>Please share your experience with us.</p>
      <ReviewForm
        reviewData={{ ...reviewData, name: userDetails.name, email: userDetails.email }} // Pre-fill form with user details
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddReviewsPage;
