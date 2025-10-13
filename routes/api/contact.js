// routes/api/contact.js
import express from 'express';
import { dataController, apiController } from '../../controllers/api/contact.js';

const router = express.Router();

// Create new contact
router.post('/', dataController.create, apiController.create);  // Call the dataController.create method

// Other routes (GET, DELETE, etc.)
router.get('/', dataController.index, apiController.index);

// Get a contact by ID
router.get('/:id', dataController.show, apiController.show);

export default router;