// models/review.js

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Creating the review schema
const reviewSchema = new Schema({
  // Reference to the User model (user's _id)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // Storing the user's name and email explicitly in the review
  name: { 
    type: String, 
    required: false, 
    default: 'Anonymous' 
  },

  email: { 
    type: String, 
    required: false, 
    default: 'Anonymous user' 
  },

  // Rating out of 5
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5, 
    default: 5  // Default rating is 5, but user can provide their own
  },

  // Review message
  message: { 
    type: String, 
    required: false, 
    default: 'none' 
  },
}, {
  // Timestamps will automatically add createdAt and updatedAt fields
  timestamps: true
});

// Hook to populate the 'name' and 'email' fields from the 'User' model when querying reviews
reviewSchema.pre('save', async function(next) {
  if (this.user) {
    try {
      const user = await mongoose.model('User').findById(this.user);
      if (user) {
        this.name = user.name;
        this.email = user.email;
      }
      next();
    } catch (err) {
      next(err); // Pass the error to the next middleware
    }
  } else {
    next(); // Proceed if there is no user
  }
});

// Create the model from the schema
const Review = mongoose.model('Review', reviewSchema);

export default Review;
