// routes/api/contact.js
import express from 'express';

const contactRoutes = (app) => {
  app.get('/contact', (req, res) => {
    res.send('Contact Route');
  });
};

export default contactRoutes;