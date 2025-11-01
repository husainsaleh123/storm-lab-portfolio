// controllers/api/users.js

import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Middleware to check the JWT token
const checkToken = (req, res) => {
  console.log('req.user', req.user);
  res.json(req.exp); // Log the token expiration or the user info if needed
};

const dataController = {
  // Sign up function
  async signup(req, res, next) {
    try {
      const user = await User.create(req.body);
      console.log(req.body);
      
      // Generate JWT token for the user
      const token = createJWT(user);

      // Store the user and token in res.locals for later middleware access
      res.locals.data = { user, token };
      
      // Return the response
      return res.status(201).json({
        message: 'User created successfully!',
        user: res.locals.data.user,
        token: res.locals.data.token
      });
    } catch (error) {
      console.log('Database problem during sign-up:', error);
      res.status(400).json(error); // Send back the error if user creation fails
    }
  },

  // Login function
async login(req, res, next) {
  try {
    // Find user by name (not email)
    const user = await User.findOne({ name: req.body.name });

    if (!user) throw new Error('User not found');

    // Compare the password entered with the hashed password in the DB
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error('Incorrect password');

    // Create a token for the user after successful login
    const token = createJWT(user);

    // Store the user and token in res.locals for later middleware access
    res.locals.data = { user, token };

    // Send the user and token in the response
    res.status(200).json({
      message: 'Login successful!',
      token: res.locals.data.token,
      user: res.locals.data.user
    });
    
    // On the client-side (React, Vue, etc.), you would handle the redirection as follows:
    // In your frontend React code (assuming you're using `react-router-dom`):
    // history.push('/reviews'); // Redirect the user to the /reviews page after successful login

  } catch (error) {
    console.log('Login failed:', error);
    res.status(400).json('Bad Credentials'); // Send bad credentials message on failure
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
  return jwt.sign(
    { userId: user._id, name: user.name, email: user.email },  // Include necessary info for the payload
    process.env.SECRET,  // Ensure SECRET is set in the environment variables
    { expiresIn: '24h' }  // Set token expiration to 24 hours
  );
}

export { checkToken, dataController, apiController };