// routes/api/contact.js
import express from 'express';
import { dataController, apiController } from '../../controllers/api/contact.js';

const router = express.Router();

// GET /api/contacts/:id - Get single contact
router.get('/:id', dataController.show, apiController.show);

// POST /api/contacts - Create new contact
router.post('/', dataController.create, apiController.create);

// PUT /api/contact/:id - Update contact
router.put('/:id', dataController.update, apiController.update);

// DELETE /api/contact/:id - Delete review
router.delete('/:id', dataController.delete, apiController.delete);

export default router; // Default export
