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
  const [loading, setLoading] = useState(false); // State for loading
  const [errorMessage, setErrorMessage] = useState(''); // Error state for showing error messages
  const navigate = useNavigate(); // Initialize useNavigate hook to navigate to another page

  // Fetch user details and token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Check if the token exists in localStorage

    console.log('Token from localStorage:', token); // Log the token to ensure it's retrieved correctly

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken'); // Get the token from localStorage

    // Ensure the token exists before submitting the review
    if (!token) {
      setErrorMessage('Token is missing. Please log in again.');
      return;
    }

    console.log('JWT Token being sent in Authorization header:', token); // Log the token being sent

    setLoading(true); // Set loading state to true
    setErrorMessage(''); // Reset the error message

    console.log('Review submitted:', reviewData);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify(reviewData), // Send review data in the request body
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const data = await response.json(); // Correctly parse the response as JSON

      alert('Review submitted successfully!');
      navigate(`/reviews/${data._id}`); // Navigate to the ShowReviewsPage with the new review's ID
    } catch (error) {
      setErrorMessage(error.message); // Display the error message
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <div>
      <h2 className={styles.FeedbackWlcmMsg}>Welcome, {userDetails.name}. We are improving through feedback.</h2>
      <p className={styles.XpShareMsg}>Please share your experience with us.</p>

      {/* Display error message if there's an error */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <ReviewForm
        reviewData={reviewData} // Pre-fill the review form with user details
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* Show loading spinner or text while submitting */}
      {loading && <p>Submitting your review...</p>}
    </div>
  );
};

export default AddReviewsPage;
