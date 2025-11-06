// controllers/api/review.js
import Review from '../../models/review.js';
import mongoose from 'mongoose';

// Data controller for handling review data
const dataController = {
  // Retrieve all reviews
  async index(req, res, next) {
    try {
      const reviews = await Review.find({});
      res.locals.data.reviews = reviews;
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Retrieve a single review by ID
  async show(req, res, next) {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) throw new Error('Review not found');
      res.locals.data.review = review;
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Create a new review
  async create(req, res, next) {
    try {
      console.log("Request body:", req.body);  // Log the data being sent

      // Ensure that user is authenticated and extract their name and email from the JWT token (req.user)
      const { userId, name, email } = req.user;  // Assuming the token contains userId, name, and email

      // Create the review and populate the name and email
      const review = await Review.create({
        ...req.body,       // Include all other review data from req.body
        user: userId,      // Store the userId reference
        name,              // Use the name from the user
        email              // Use the email from the user
      });

      // Store the review in res.locals for further use (e.g., returning in response)
      res.locals.data.review = review;
      next();
    } catch (error) {
      console.error("Error creating review:", error);  // Log the error to get more details
      res.status(400).json({ error: error.message });
    }
  },

  // Update an existing review
  async update(req, res, next) {
    try {
      const review = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!review) throw new Error('Item not found');
      res.locals.data.review = review;
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a review from the database
  async delete(req, res, next) {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) throw new Error('Item not found');
      res.locals.data.review = review;
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// API controller to handle responses
const apiController = {
  // Return all reviews
  index(req, res) {
    res.json(res.locals.data.reviews);
  },

  // Return a single review
  show(req, res) {
    res.json(res.locals.data.review);
  },

  // Return the created review
  create(req, res) {
    res.status(201).json(res.locals.data.review);
  },

  // Return the updated review
  update(req, res) {
    res.json(res.locals.data.review);
  },

  // Return a message upon deletion
  delete(req, res) {
    res.json({ message: 'Review deleted successfully' });
  }
};

export { dataController, apiController };
