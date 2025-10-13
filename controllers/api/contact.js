// controllers/api/contact.js
import Contact from '../../models/contact.js';
import nodemailer from 'nodemailer';  // Import Nodemailer for email sending

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
            // Log the incoming request body for debugging
            // console.log('Request body:', req.body);

            // Validate: Ensure name, email, message, subject, phone, and serviceType are provided
            const { name, email, message, subject, phone, serviceType } = req.body;
            if (!name || !email || !message || !subject || !phone || !serviceType) {
                return res.status(400).json({ error: 'Name, Email, Message, Subject, Phone, and Service Type are required.' });
            }

            // Create the contact form in MongoDB
            const contact = await Contact.create(req.body);

            // Send an email after contact form submission (Optional)
            // await sendEmail(contact);  // Send email with contact data

            // Store the created contact in locals for the next middleware
            res.locals.data.contact = contact;

            // Proceed to the next middleware (API controller)
            next();
        } catch (error) {
            console.error('Error creating contact:', error);
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

// // Function to send email after the contact form is created
// const sendEmail = async (contact) => {
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',  // Using Gmail's SMTP service
//         auth: {
//             user: 'hussainsaleh180@gmail.com',  // Replace with your Gmail address
//             pass: 'wisg-wsnn-atbr-lasg',     // Replace with the App Password you generated
//         },
//     });

//     let mailOptions = {
//         from: 'hussainsaleh180@gmail.com',  // Your email address (same as 'user' above)
//         to: 'hussainsaleh180@gmail.com',  // Your recipient's email
//         subject: 'New Contact Form Submission',
//         text: `
//             Name: ${contact.name}
//             Email: ${contact.email}
//             Phone: ${contact.phone}
//             Subject: ${contact.subject}
//             Message: ${contact.message}
//             Service Type: ${contact.serviceType}
//         `,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully!');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

export { dataController, apiController };
