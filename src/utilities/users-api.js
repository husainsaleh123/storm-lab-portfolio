// src/utilities/users-api.js

// import sendRequest from './send-request';

// const BASE_URL = '/api/users'; // Base URL for user-related API requests

// // Sign up a new user
// export function signUp(userData) {
//   return sendRequest(BASE_URL, 'POST', userData);
// }

// // Login an existing user
// export function login(credentials) {
//   return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
// }

// // Create a new review - requires authentication
// export function createReview(reviewData, token) {
//   // Include the JWT token in the request headers
//   return sendRequest('/api/reviews', 'POST', reviewData, {
//     'Authorization': `Bearer ${token}`, // Include the token for authenticated requests
//   });
// }

// // Get all reviews
// export function getReviews(token) {
//   return sendRequest('/api/reviews', 'GET', null, {
//     'Authorization': `Bearer ${token}`, // Include token for authorized requests
//   });
// }