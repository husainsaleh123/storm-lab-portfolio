// src/components/Review/DeleteReview/DeleteReview.jsx

import React from 'react';
import styles from './DeleteReview.module.scss'; // Optional: Add styles for the modal

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Close button (X) */}
        <button className={styles.closeButton} onClick={onClose}>&#10005;</button>

        <h3 className={styles.confirmMsg}>Are you sure you want to delete this review?</h3>

        {/* Buttons for confirmation */}
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={onClose}>No, Cancel</button>
          <button className={styles.confirmButton} onClick={onConfirm}>Yes, Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;