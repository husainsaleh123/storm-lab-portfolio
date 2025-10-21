// src/components/Reviews/ReviewDetail/ReviewDetail.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faStar, faArrowLeft, faMessage } from '@fortawesome/free-solid-svg-icons';
import styles from '../ReviewDetail/ReviewDetail.module.scss';
import { Link } from 'react-router-dom';

const ReviewDetail = ({ review }) => {
  const getStars = (rating) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return filledStars + emptyStars;
  };

  return (
    <main>
      <div className={styles.container}>
        <h2>Thank you for visiting Storm Lab’s reviews.</h2>
        <p>View details of {review.name}'s review.</p>

        <div className={styles.card}>
          <div className={styles.detail}>
              <div className={styles.infoRow}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <strong>Name:</strong> {review.name}
              </div>
              <div className={styles.infoRow}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                <strong>Email:</strong> {review.email}
              </div>
              <div className={styles.infoRow}>
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <strong>Rating:</strong> <span className={styles.reviewRating}>{getStars(review.rating)}</span>
              </div>
              <div className={styles.infoRow}>
                <FontAwesomeIcon icon={faMessage} className={styles.icon} />
                <strong>Message:</strong> {review.message}
              </div>
          </div>
            <button className={styles.backButton}>
              <Link to="/reviews" className={styles.addReviewBtn}>
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} /> Back
              </Link>
            </button>
        </div>
      </div>
    </main>
  );
};

export default ReviewDetail;
