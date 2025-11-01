// src/utilities/users-service.js

import * as usersAPI from './users-api';

// Sign up a new user
export async function signUp(userData) {
    const response = await usersAPI.signUp(userData);

    localStorage.setItem('token', response.token)

    return response.user;
}

// Login an existing user
export async function login(credentials) {
    const response = await usersAPI.login(credentials);

    localStorage.setItem('token', response.token);
    
    return response.user;
}

// Check if user is authenticated
export function isAuthenticated() {
  return getToken() !== null;
}

// Get token from localStorage
export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));  // Decode JWT token
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token'); // Remove expired token
      return null;
    }
    return token;
  } catch (error) {
    console.log('Invalid token format, removing from localStorage');
    localStorage.removeItem('token');
    return null;
  }
}

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

export function logOut() {
  localStorage.removeItem('token');
}