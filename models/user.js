// models/user.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { 
    type: String, 
    required: true, 
    unique: true,
     lowercase: true, 
     match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email address.'] 
    },
  password: { 
    type: String,
    trim: true, 
    required: true 
  },
  reviews:[{type: Schema.Types.ObjectId, ref:"Review"}],
  }, { 
    timestamps: true,
    toJSON: {
          transform: function (doc, ret) {
              delete ret.password;
              return ret;
          }
      } 
  });

// Hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it's modified
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);  // Hash the password
    return next();  // Continue with the save operation
});

export default mongoose.model('User', userSchema);