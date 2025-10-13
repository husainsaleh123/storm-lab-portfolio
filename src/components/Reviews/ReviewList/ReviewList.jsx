// src/components/Reviews/ReviewList/ReviewList.jsx
import React from 'react';
import styles from './ReviewList.module.scss';
import { Link } from 'react-router-dom'; // Import Link for routing

const ReviewList = ({ reviews }) => {
  return (
    <div className={styles.wrapper}>
      {/* Check if there are reviews */}
      {reviews.length === 0 ? (
        <div className={styles.noReviews}>
          <div className={styles.icon}>
            {/* Make image larger */}
            <img src="src/assets/images/review.png" alt="No reviews" className={styles.largeImage} />
          </div>
          <h2 className={styles.NoReviewText}>No reviews exist at the moment.</h2>
          <h3 className={styles.addReview}>Be the first to add a review.</h3>
          <Link to="/add-review" className={styles.addReviewBtn}>
            Add review
          </Link>
        </div>
      ) : (
        // Display reviews here if they exist (you can map over reviews data)
        <div className={styles.reviews}>
          {reviews.map((review) => (
            <div key={review._id} className={styles.review}>
              <h3>{review.subject}</h3>
              <p>{review.message}</p>
              <span>By: {review.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
