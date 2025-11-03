// src/components/Reviews/ReviewForm/ReviewForm.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { faUser, faEnvelope, faStar, faComment } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import styles from './ReviewForm.module.scss';

const ReviewForm = ({ reviewData, handleInputChange, handleSubmit }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        <span><FontAwesomeIcon icon={faUser} className={styles.icon} /> Name</span>
        <input
          type="text"
          name="name"
          value={reviewData.name}
          onChange={handleInputChange}
          required
          placeholder="Enter your name"
          className={styles.input}  // Apply the same input style
        />
      </label>

      <label className={styles.label}>
        <span><FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Email</span>
        <input
          type="email"
          name="email"
          value={reviewData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
          className={styles.input}  // Apply the same input style
        />
      </label>

      <label className={styles.label}>
        <span><FontAwesomeIcon icon={faStar} className={styles.icon} /> Rating</span>
        <select
          name="rating"
          value={reviewData.rating}
          onChange={handleInputChange}
          required
          className={styles.input}  // Apply the same input style
        >
          <option value="">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      <label className={styles.label}>
        <span><FontAwesomeIcon icon={faComment} className={styles.icon} /> Message</span>
        <textarea
          name="message"
          value={reviewData.message}
          onChange={handleInputChange}
          placeholder="Write your review here"
          className={styles.input}  // Apply the same input style
        />
      </label>

      <button type="submit" className={styles.submitButton}>
        Submit review
      </button>
    </form>
  );
};

export default ReviewForm;