import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faStar, faMessage, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DeleteReview from '../DeleteReview/DeleteReview';
import styles from './ReviewList.module.scss';

const ReviewList = ({ reviews, setReviews, filter, setFilter, averageRating }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [user, setUser] = useState(null); // Track if the user is logged in

  // Get the current user from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Set user if found in localStorage
    }
  }, []); // Run this only once on page load

  // Function to display filled and empty stars
  const getStars = (rating) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return filledStars + emptyStars;
  };

  // Handle Delete
  const handleDelete = (id) => {
    setReviewToDelete(id); // Store the review ID to be deleted
    setIsModalOpen(true); // Open the modal
  };

  // Re-fetch reviews from the server after deletion
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data); // Update reviews with the latest data
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Confirm Deletion
  const handleConfirmDelete = async () => {
    setIsModalOpen(false); // Close the modal immediately when user confirms

    try {
      const response = await fetch(`/api/reviews/${reviewToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchReviews(); // Refresh the reviews list after successful deletion
      } else {
        console.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Cancel Deletion
  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  // Sort reviews based on the filter
  const sortedReviews = () => {
    switch (filter) {
      case 'Highest':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case 'Lowest':
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case 'Earliest':
        return [...reviews].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'Latest':
        return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return reviews;
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);  // Set filter value
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Update the state
  };

  return (
    <div className={styles.wrapper}>
      {/* Display reviews or no reviews message */}
      {reviews.length === 0 ? (
        <div className={styles.noReviews}>
          <div className={styles.icon}>
            <img src="/src/assets/images/review.png" alt="No reviews" className={styles.largeImage} />
          </div>
          <h2 className={styles.NoReviewText}>No reviews exist at the moment.</h2>
          <h3 className={styles.addReview}>Be the first to add a review.</h3>
          <Link to="/add-review" className={styles.addReviewBtn}>Add review</Link>
        </div>
      ) : (
        <div className={styles.reviews}>
          <div className={styles.header}>
            <h1>Thank you for visiting Storm Lab’s reviews.</h1>
            <div className={styles.headerInfo}>
              <p className={styles.AllReviewPText}>
                <strong>Our average rating is {averageRating}/5</strong> with <strong>{reviews.length} review(s)</strong>.
              </p>

              {/* Reordered buttons to ensure Add review is on the left and Login/Logout is on the right */}
              <Link to="/add-review" className={styles.addReviewBtn}>Add review</Link>

              {/* Show login/logout button based on user state */}
              {user ? (
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/auth" className={styles.loginBtn}>Login</Link>
              )}
            </div>
          </div>

          {/* Filter Section */}
          <div className={styles.filterSection}>
            <label htmlFor="filter" className={styles.filterText}>
              <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} /> {/* Filter icon */}
              Filter by:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange} // Handle filter change
              className={styles.filterSelect}
            >
              <option value="Highest">Highest</option>
              <option value="Lowest">Lowest</option>
              <option value="Earliest">Earliest</option>
              <option value="Latest">Latest</option>
            </select>
          </div>

          {sortedReviews().map((review) => (
            <div key={review._id} className={styles.review}>
              <div className={styles.card}>
                <div className={styles.detail}>
                  <div className={styles.infoRow}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
                    <strong className={styles.strongInfo}>Name:</strong> {review.name}
                  </div>
                  <div className={styles.infoRow}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                    <strong className={styles.strongInfo}>Email:</strong> {review.email}
                  </div>
                  <div className={styles.infoRow}>
                    <FontAwesomeIcon icon={faStar} className={styles.icon} />
                    <strong className={styles.strongInfo}>Rating:</strong> <span className={styles.reviewRating}>{getStars(review.rating)}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <FontAwesomeIcon icon={faMessage} className={styles.icon} />
                    <strong className={styles.strongInfo}>Message:</strong> {review.message}
                  </div>
                </div>

                <div className={styles.buttons}>
                  <button className={styles.backButton}>
                    <Link to={`/reviews/${review._id}`} className={styles.ViewDetailsBtn}>View</Link>
                  </button>

                  <button className={styles.editButton}>
                    <Link to={`/reviews/${review._id}/edit`} className={styles.EditDetailsBtn}>Edit</Link>
                  </button>

                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(review._id)} // Trigger handleDelete when clicked
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteReview
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ReviewList;
