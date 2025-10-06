import Contact from '../../models/contact.js';

// Data Controller for Contact
const dataController = {
    // Purpose: Retrieve all contacts Process: Find all contacts → Store in locals → Continue Response: List of contacts
    async index(req, res, next) {
        try {
            const contacts = await Contact.find({});
            res.locals.data.contacts = contacts;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Retrieve a single contact by ID Process: Find by ID → Check existence → Store in locals → Continue Response: Single contact object
    async show(req, res, next) {
        try {
            const contact = await Contact.findById(req.params.id);
            if (!contact) throw new Error('Contact not found');
            res.locals.data.contact = contact;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Create a new contact Process: Create contact from request body → Store in locals → Continue Response: Newly created contact object
    async create(req, res, next) {
        try {
            const contact = await Contact.create(req.body);
            res.locals.data.contact = contact;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Update an existing contact Process: Find contact by ID → Update with request body → Store updated contact → Continue Response: Updated contact
    async update(req, res, next) {
        try {
            const contact = await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!contact) throw new Error('Contact not found');
            res.locals.data.contact = contact;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Delete a contact Process: Find and delete contact → Store deleted contact → Continue Response: Success message
    async delete(req, res, next) {
        try {
            const contact = await Contact.findByIdAndDelete(req.params.id);
            if (!contact) throw new Error('Contact not found');
            res.locals.data.contact = contact;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

// API Controller for Contact
const apiController = {
    // Purpose: Return all contacts as JSON
    index(req, res) {
        res.json(res.locals.data.contacts);
    },

    // Purpose: Return a single contact by ID as JSON
    show(req, res) {
        res.json(res.locals.data.contact);
    },

    // Purpose: Return newly created contact as JSON
    create(req, res) {
        res.status(201).json(res.locals.data.contact);
    },

    // Purpose: Return updated contact as JSON
    update(req, res) {
        res.json(res.locals.data.contact);
    },

    // Purpose: Return success message for deletion
    delete(req, res) {
        res.json({ message: 'Contact deleted successfully' });
    }
};

export { dataController, apiController };
