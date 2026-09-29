// controllers/api/users.js

import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Middleware to check the JWT token
const checkToken = (req, res) => {
  console.log('req.user', req.user);  // Log the user information from the decoded token
  res.json(req.exp);  // You can return the expiration date if needed
};

const dataController = {
  // Sign up function
  async signup(req, res, next) {
    try {
      // Create a new user in the database
      const user = await User.create(req.body);
      console.log(req.body);  // Log the user data for debugging

      // Generate JWT token for the user
      const token = createJWT(user);

      // Store the user and token in res.locals for later middleware access
      res.locals.data = { user, token };

      // Return the response with the user and token
      return res.status(201).json({
        message: 'User created successfully!',
        user: res.locals.data.user,
        token: res.locals.data.token  // Send the token in the response
      });
    } catch (error) {
      console.log('Database problem during sign-up:', error);
      res.status(400).json({ error: error.message });  // Send error message if user creation fails
    }
  },

  // Login function
  async login(req, res, next) {
    try {
      // Find user by name (not email)
      const user = await User.findOne({ name: req.body.name });

      if (!user) throw new Error('User not found');  // If user doesn't exist

      // Compare the password entered with the hashed password in the DB
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error('Incorrect password');  // If password is incorrect

      // Create a token for the user after successful login
      const token = createJWT(user);

      // Store the user and token in res.locals for later middleware access
      res.locals.data = { user, token };

      // Send the user and token in the response
      res.status(200).json({
        message: 'Login successful!',
        token: res.locals.data.token,  // Send token in the response
        user: res.locals.data.user,    // Send user data in the response
      });

    } catch (error) {
      console.log('Login failed:', error);
      res.status(400).json({ error: 'Bad Credentials' });  // Send error message on failure
    }
  }
};

// API controller to return the user data and token
const apiController = {
  auth(req, res) {
    res.json({
      token: res.locals.data.token,
      user: res.locals.data.user
    });
  }
};

// Helper function to create JWT
function createJWT(user) {
  // Create JWT with user data and an expiration time
  return jwt.sign(
    { userId: user._id, name: user.name, email: user.email },  // Include necessary info for the payload
    process.env.SECRET,  // Ensure SECRET is set in the environment variables
    { expiresIn: '24h' }  // Set token expiration to 24 hours
  );
}

export { checkToken, dataController, apiController };
