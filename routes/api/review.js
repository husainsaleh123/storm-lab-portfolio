// routes/api/review.js
import express from 'express';

const reviewRoutes = (app) => {
  app.get('/review', (req, res) => {
    res.send('Review Route');
  });
};

export default reviewRoutes; // Default export
