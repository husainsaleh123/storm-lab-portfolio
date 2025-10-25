// models/user.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true,  // Ensures that names are unique
      trim: true,    // Trims whitespace from the name
      minlength: 3   // Validates that name length is at least 3 characters
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,  // Ensures that email is unique
      lowercase: true, // Converts email to lowercase before saving to prevent case-sensitive duplicates
      match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email address.'] // Validates email format
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6  // Ensures password is at least 6 characters
    }
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Instance method for comparing password (to be used when checking login)
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password); // Compares provided password with the hashed password stored in DB
};

// Static method for finding a user by email (to be used when checking login or sign up)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });  // Searches the database for a user with the provided email
};

// Middleware - runs before saving a user (encrypts password)
userSchema.pre('save', async function(next) {
  // Ensure this logic only runs if the password field is modified (e.g., during signup or password change)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash the password with a salt factor of 10
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;  // Save the hashed password
    next();  // Move to the next middleware or save operation
  } catch (error) {
    next(error);  // Pass any errors to the next error handler
  }
});

// Handle errors for unique constraint violations (like email or name being taken)
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) { // Check for unique index violation
    const field = Object.keys(error.keyValue)[0]; // Get which field caused the error
    next(new Error(`The ${field} is already in use.`));  // Send a custom error message
  } else {
    next(error);  // If it's a different error, pass it to the next handler
  }
});

// Export the User model
export default mongoose.model('User', userSchema);
