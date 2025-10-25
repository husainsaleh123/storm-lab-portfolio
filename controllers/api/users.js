// controllers/api/users.js

import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const dataController = {
    // Sign up function
    async signup(req, res, next) {
        try {
            // Destructure input data
            const { name, email, password } = req.body;

            // Check if a user with the same email already exists
            const existingUserEmail = await User.findOne({ email });
            if (existingUserEmail) {
                throw new Error('Email already in use');
            }

            // Check if a user with the same name already exists
            const existingUserName = await User.findOne({ name });
            if (existingUserName) {
                throw new Error('Name already taken');
            }

            // Create new user after validation
            const user = await User.create({ name, email, password });

            // Create a JWT token for the user
            const token = createJWT(user);

            // Store the user and token in locals for further processing
            res.locals.data.user = user;
            res.locals.data.token = token;

            // Call the next middleware or route handler
            next();
        } catch (error) {
            // Return error response if something goes wrong
            res.status(400).json({ error: error.message });
        }
    },

    // Login function
    async login(req, res, next) {
        try {
            // Find user by email
            const user = await User.findOne({ email: req.body.email });
            if (!user) throw new Error('User not found');
            
            // Compare entered password with stored hashed password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) throw new Error('Password mismatch');
            
            // Create a JWT token for the user
            const token = createJWT(user);

            // Store user and token in locals
            res.locals.data.user = user;
            res.locals.data.token = token;

            // Call the next middleware or route handler
            next();
        } catch (error) {
            // Return error response if login fails
            res.status(400).json({ error: error.message });
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
        { userId: user._id, name: user.name, email: user.email }, // Include only necessary info
        process.env.SECRET,
        { expiresIn: '24h' } // Token expires in 24 hours
    );
}

export { dataController, apiController };
