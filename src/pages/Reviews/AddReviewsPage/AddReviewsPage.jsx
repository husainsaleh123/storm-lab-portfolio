import React, { useState } from 'react';
import ReviewForm from '../../../components/Reviews/ReviewForm/ReviewForm'; // Import the ReviewForm component
import styles from '../../../pages/Reviews/AddReviewsPage/AddReviewsPage.module.scss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AddReviewsPage = () => {
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    rating: '',
    message: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook to navigate to another page

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Review data to submit:", reviewData);  // Check the data

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const data = await response.json(); // Correctly parse the response as JSON

      alert('Review submitted successfully!');

      // After successfully submitting the review, redirect to the ShowReviewsPage with the review ID
      navigate(`/reviews/${data._id}`);  // Navigate to the ShowReviewsPage with the new review's ID
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.addReviewPage}>
      <h2 className={styles.feedback}>Constantly improving through feedback.</h2>
      <h3 className={styles.experience}>Please share your experience with us.</h3>
      <ReviewForm
        reviewData={reviewData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddReviewsPage;
