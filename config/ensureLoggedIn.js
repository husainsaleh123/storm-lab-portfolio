// config/ensureLoggedIn.js

import jwt from 'jsonwebtoken';

export default function ensureLoggedIn(req, res, next) {
    // Get the token from the Authorization header (Bearer token)
    let token = req.get('Authorization');
    
    // If a token is provided in the request
    if (token) {
        // Extract the token from the 'Bearer <token>' format
        token = token.split(' ')[1];

        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.SECRET);
            
            // Attach the user info (from the token) to the request object
            req.user = decoded.user;
            req.exp = new Date(decoded.exp * 1000);  // Convert expiration time from seconds to milliseconds
            
            next(); // If the token is valid, proceed to the next middleware or route handler
        } catch (err) {
            // If the token is invalid or expired, set user and exp to null
            req.user = null;
            req.exp = null;
            
            // Respond with 401 Unauthorized if the token is invalid or expired
            return res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
        }
    } else {
        // If no token is found, set user and exp to null and send a 401 Unauthorized response
        req.user = null;
        req.exp = null;
        
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }
}
