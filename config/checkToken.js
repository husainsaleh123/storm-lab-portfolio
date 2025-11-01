// config/checkToken.js

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    let token = req.get('Authorization'); // Get token from the Authorization header

    if (token) {
        token = token.split(' ')[1]; // Split to get the token from the "Bearer <token>" format
        console.log('token',token)
        
        jwt.verify(token,process.env.SECRET, (err, decoded) => {
            req.user = err ? null : decoded.user
            req.exp = err ? null : new Date(decoded.exp * 1000)  // Convert exp to Date object for easy comparison
        })   
            return next() // Proceed to the next middleware/route handler
    } else {
        // If no token is provided, set user and exp to null and send unauthorized error
        req.user = null
        return next()
    }
}
