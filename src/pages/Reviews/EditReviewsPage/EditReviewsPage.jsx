//src/pages/Reviews/EditReviewsPage/EditReviewsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import ReviewForm from '../../../components/Reviews/ReviewForm/ReviewForm'; // Import the ReviewForm component
import styles from './EditReviewsPage.module.scss';

const EditReviewsPage = () => {
  const { id } = useParams(); // Get review ID from the URL
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    rating: '',
    message: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch the review data based on the review ID from the URL
    const fetchReviewData = async () => {
      try {
        const res = await fetch(`/api/reviews/${id}`);
        const data = await res.json();
        setReviewData(data); // Pre-fill the form with the existing review data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReviewData(); // Fetch the review data when the component mounts
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert('Review updated successfully');
        navigate('/reviews'); // Redirect to reviews page after successful update
      } else {
        console.error('Failed to update review');
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading message while fetching the data

  return (
    <div>
      <h1 className={styles.EditReview}>Edit Your Review</h1>
      <ReviewForm
        reviewData={reviewData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditReviewsPage;
