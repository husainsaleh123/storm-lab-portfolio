// models/contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  // User's name
  name: { type: String, required: true },

  // User's email
  email: { type: String, required: true, match: /.+\@.+\..+/ },  // Email validation

  // Message content of the contact form
  message: { type: String, required: true },

  // Required: Subject of the contact message
  subject: { type: String, required: true },  // Now required

  // Required: Phone number (if the user provides one)
  phone: { 
    type: String, 
    required: true,  // Now required
    match: /^[\d+()[\]\-\s]{6,20}$/,  // Phone number validation
    message: 'Phone number must be a valid format.' 
  },

  // Optional: Service type selection (dropdown)
  serviceType: {
    type: String,
    required: false,  // Optional
    enum: ['Website Redesign & Optimization', 'UI/UX Design', 'Landing Page Design & Optimization', 'Other'],
    default: 'Other',  // Default value
  },

}, {
  timestamps: true
});

// Create the model from the schema
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
