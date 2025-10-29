// src/utilities/users-service.js

import sendRequest from './send-request';

// Sign up a new user
export async function signUp(userData) {
  try {
    const response = await sendRequest('/api/users/signup', 'POST', userData);

    if (response.token && response.user) {
      localStorage.setItem('token', response.token);
      return {
        success: true,
        message: 'User created successfully!',
        user: response.user,
        token: response.token,
      };
    } else {
      return { success: false, message: 'Failed to sign up: Invalid response from server' };
    }
  } catch (error) {
    console.error('Sign Up Failed', error);
    return { success: false, message: 'Sign Up Failed - Try Again' };
  }
}

// Login an existing user
export async function login(credentials) {
  try {
    const response = await sendRequest('/api/users/login', 'POST', credentials);

    if (response.token && response.user) {
      localStorage.setItem('token', response.token);
      return {
        success: true,
        message: 'Login successful!',
        user: response.user,
        token: response.token,
      };
    } else {
      return { success: false, message: 'Invalid response from server' };
    }
  } catch (error) {
    console.error('Login Failed', error);

    if (error.response) {
      return {
        success: false,
        message: error.response.data.error || 'An error occurred during login',
      };
    } else {
      return {
        success: false,
        message: 'Log In Failed, Please Try Again',
      };
    }
  }
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