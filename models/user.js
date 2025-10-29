// models/user.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email address.'] },
  password: { type: String, required: true }
}, { timestamps: true });

// Password comparison method
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);  // Compare the entered password with the stored hashed password
};

// Hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it's modified
  try {
    this.password = await bcrypt.hash(this.password, 10);  // Hash the password
    next();  // Continue with the save operation
  } catch (error) {
    next(error);  // Pass any errors to the next error handler
  }
});

export default mongoose.model('User', userSchema);
