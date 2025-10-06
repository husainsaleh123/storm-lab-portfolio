import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  // User's name
  name: { type: String, required: true },

  // User's email
  email: { type: String, required: true, match: /.+\@.+\..+/ }, // Email validation

  // Message content of the contact form
  message: { type: String, required: true },

  // Optional: Subject of the contact message
  subject: { type: String, required: false },

  // Optional: A field for storing a phone number (if the user provides one)
  phone: { 
    type: String, 
    required: false,  // Phone number is optional
    match: /^[0-9]{8}$/,  // Must be exactly 8 digits
    message: 'Phone number must be exactly 8 digits.'
  }
}, {
  timestamps: true
});

// Create the model from the schema
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
