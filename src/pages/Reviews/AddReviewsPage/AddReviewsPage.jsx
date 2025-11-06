// src/pages/Reviews/AddReviewsPage/AddReviewsPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import styles from './AddReviewsPage.module.scss'; // Import SCSS for styling
import ReviewForm from '../../../components/Reviews/ReviewForm/ReviewForm'; // Import the ReviewForm component

const AddReviewsPage = () => {
  const [userDetails, setUserDetails] = useState({ name: '', email: '' }); // State for user's details
  const [reviewData, setReviewData] = useState({
    rating: '', // Rating starts empty
    message: '', // Message starts empty
  });

  const navigate = useNavigate(); // Initialize useNavigate hook to navigate to another page

  // Fetch user details and token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Check if the token exists in localStorage

    if (token) {
      const user = JSON.parse(localStorage.getItem('user')); // Get user details from localStorage
      if (user) {
        setUserDetails({ name: user.name, email: user.email }); // Set the user details in state
        setReviewData((prevData) => ({ ...prevData, name: user.name, email: user.email })); // Pre-fill review data with name and email
      }
    } else {
      // If no token is found, redirect to login page
      console.log('No token found, redirecting to login...');
      navigate('/auth');
    }
  }, [navigate]);

  // Handle input changes for the review form
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
      <h2 className={styles.FeedbackWlcmMsg}>Welcome, {userDetails.name}. We are improving through feedback.</h2>
      <p className={styles.XpShareMsg}>Please share your experience with us.</p>
      <ReviewForm
        reviewData={reviewData} // Pre-fill the review form with user details
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddReviewsPage;
