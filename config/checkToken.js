// config/checkToken.js

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    let token = req.get('Authorization'); // Get token from the Authorization header
    
    if (token) {
        token = token.split(' ')[1]; // Split to get the token from the "Bearer <token>" format
        
        try {
            const decoded = jwt.verify(token, process.env.SECRET); // Verify the token using the secret key
            req.user = decoded.user;  // Attach decoded user to the request object
            req.exp = new Date(decoded.exp * 1000);  // Convert exp to Date object for easy comparison
            
            next();  // Proceed to the next middleware/route handler
        } catch (err) {
            // If token is invalid or expired, set user and exp to null
            req.user = null;
            req.exp = null;
            res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });  // Send Unauthorized error
        }
    } else {
        // If no token is provided, set user and exp to null
        req.user = null;
        req.exp = null;
        res.status(401).json({ message: 'Unauthorized: No token provided' });  // Send Unauthorized error
    }
};
