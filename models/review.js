// models/review.js

import mongoose from 'mongoose';

// Creating the review schema
const reviewSchema = new mongoose.Schema({
  // Reference to the User model (user's _id)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // User's name, can be anonymous if not provided
  name: { type: String, required: false, default: 'Anonymous' },

  // Email of the user, default to 'Anonymous user' if not provided
  email: { type: String, required: false, default: 'Anonymous user' },

  // Rating out of 5
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5, 
    default: 5  // Default rating is 5, but user can provide their own
  },

  // Review message
  message: { type: String, required: false, default: 'none' },
}, {
  // Timestamps will automatically add createdAt and updatedAt fields
  timestamps: true
});

// Creating the model from the schema
const Review = mongoose.model('Review', reviewSchema);

export default Review;
