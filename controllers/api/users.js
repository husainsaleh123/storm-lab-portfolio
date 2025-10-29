// controllers/api/users.js

import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const dataController = {
  // Sign up function
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Check if a user with the same email already exists
      const existingUserEmail = await User.findOne({ email });
      if (existingUserEmail) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Check if a user with the same name already exists
      const existingUserName = await User.findOne({ name });
      if (existingUserName) {
        return res.status(400).json({ error: 'Name already taken' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user after validation
      const user = await User.create({ name, email, password: hashedPassword });

      // Create a JWT token for the user
      const token = createJWT(user);

      // Store the user and token in locals for further processing
      res.locals.data = { user, token };

      // Send success response with user data and token
      return res.status(201).json({
        message: 'User created successfully!',
        user: res.locals.data.user,
        token: res.locals.data.token
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Something went wrong during signup' });
    }
  },

  // Login function
  async login(req, res, next) {
  try {
    const { name, password } = req.body;
    
    console.log('Login Request Body:', req.body);  // Log incoming request body

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    console.log('Stored Hashed Password:', user.password);  // Log the hashed password stored in DB
    const match = await user.comparePassword(password);  // Compare the hashed password
    console.log('Password Match:', match);  // Log the result of password comparison

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = createJWT(user);  // Generate JWT for the user
    res.locals.data = { user, token };

    return res.status(200).json({
      message: 'Login successful!',
      user: res.locals.data.user,
      token: res.locals.data.token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Something went wrong during login' });
  }
}
};

// Helper function to create JWT
function createJWT(user) {
  return jwt.sign(
    { userId: user._id, name: user.name, email: user.email }, // Include only necessary info
    process.env.SECRET, // Ensure SECRET is set in the environment
    { expiresIn: '24h' } // Token expires in 24 hours
  );
}

// API controller to return the user data and token
const apiController = {
  auth(req, res) {
    res.json({
      token: res.locals.data.token,
      user: res.locals.data.user
    });
  }
};

export { dataController, apiController };