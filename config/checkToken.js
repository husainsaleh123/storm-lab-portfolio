// config/checkToken.js
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  let token = req.get('Authorization');  // Get token from Authorization header
  if (token) {
    token = token.split(' ')[1];  // Extract the token part (Bearer <token>)
    console.log('Token from Authorization header:', token);  // Log token for debugging

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification failed:', err);
        req.user = null;  // Set req.user to null if verification fails
      } else {
        console.log('Decoded token:', decoded);  // Log decoded token
        req.user = decoded.user || {};  // Attach decoded user info to req.user
        req.exp = new Date(decoded.exp * 1000);  // Set token expiration time
      }
      return next();  // Continue to the next middleware or route handler
    });
  } else {
    req.user = null;  // If no token is found, set req.user to null
    return next();  // Continue to the next middleware or route handler
  }
};
