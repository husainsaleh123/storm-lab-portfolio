// routes/api/review.js

import express from 'express';
import { dataController, apiController } from '../../controllers/api/review.js';
import ensureLoggedIn from '../../config/ensureLoggedIn.js';  // Import the middleware

const router = express.Router();

// GET /api/reviews - List all reviews
router.get('/', dataController.index, apiController.index);

// GET /api/reviews/:id - Get single review
router.get('/:id', dataController.show, apiController.show);

// POST /api/reviews - Create new review (ensure user is logged in)
router.post('/', ensureLoggedIn, dataController.create, apiController.create);

// PUT /api/reviews/:id - Update review (ensure user is logged in)
router.put('/:id', ensureLoggedIn, dataController.update, apiController.update);

// DELETE /api/reviews/:id - Delete review (ensure user is logged in)
router.delete('/:id', ensureLoggedIn, dataController.delete, apiController.delete);

export default router;