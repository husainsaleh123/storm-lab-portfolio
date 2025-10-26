// src/pages/Reviews/AddReviewsPage/AddReviewsPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import styles from './AddReviewsPage.module.scss'; // Import SCSS for styling

const AddReviewsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication
  const navigate = useNavigate(); // Initialize useNavigate hook to navigate to another page

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Check if token exists in localStorage

    if (token) {
      setIsAuthenticated(true); // User is logged in
    } else {
      setIsAuthenticated(false); // User is not logged in
    }
  }, []);

  // Redirect to login/signup page if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.loginPrompt}>
        <img
          src="../src/assets/images/auth.png"
          alt="Login Prompt"
          className={styles.loginImage} // Image class for styling
        />
        <h1>Only authenticated users can leave reviews.</h1>
        <p>Please Sign up and Login to leave your review.</p>

        {/* Wrapping buttons inside a div to align them in a row */}
        <div className={styles.buttonWrapper}>
          <button
            onClick={() => navigate('/auth')}
            className={styles.btnSignUp}
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/auth')}
            className={styles.btnLogin}
          >
            Login
          </button>
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className={styles.btnBack}
          >
            &#8592; Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Your review form goes here if authenticated */}
      <h2>Add Your Review</h2>
    </div>
  );
};

export default AddReviewsPage;
