// src/utilities/users-service.js

import * as usersAPI from './users-api';

// Sign up a new user
export async function signUp(userData) {
  // The backend now returns { token: "...", user: {...} }
  const response = await usersAPI.signUp(userData);
  // Persist the token to localStorage
  localStorage.setItem('token', response.token);
  // Return the user object directly
  return response.user;
}

// Login an existing user
export async function login(credentials) {
  // The backend now returns { token: "...", user: {...} }
  const response = await usersAPI.login(credentials);
  // Persist the token to localStorage
  localStorage.setItem('token', response.token);
  // Return the user object directly
  return response.user;
}

// Get the token from localStorage and check its validity
export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's expiration is expressed in seconds, not milliseconds
    if (payload.exp < Date.now() / 1000) {
      // Token has expired
      localStorage.removeItem('token');
      return null;
    }
    return token;
  } catch (error) {
    // Token is malformed or invalid
    console.log('Invalid token, removing from localStorage');
    localStorage.removeItem('token');
    return null;
  }
}

// Get user data from the token
export function getUser() {
  const token = getToken();
  if (!token) return null;
  
  try {
    return JSON.parse(atob(token.split('.')[1])).user;
  } catch (error) {
    // Token is malformed, remove it
    console.log('Invalid token format, removing from localStorage');
    localStorage.removeItem('token');
    return null;
  }
}

// Log out the user by removing the token
export function logOut() {
  localStorage.removeItem('token');
}

// Check if the user is authenticated (token exists)
export function isAuthenticated() {
  return getToken() !== null;
}

// Make an API call that requires the user to be authenticated (for example: adding a review)
export async function createReview(reviewData) {
  // If the user is not authenticated, reject the operation
  if (!isAuthenticated()) {
    throw new Error('You must be logged in to add a review');
  }

  const token = getToken();
  
  // Make the API call with the token in the Authorization header
  const response = await usersAPI.createReview(reviewData, token);
  return response;
}
