// src/utilities/send-request.js
import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };

  // If there's a payload (for POST, PUT, etc.), add it to the request body
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  // Retrieve the token from localStorage (if available)
  const token = getToken();
  
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;  // Include token in Authorization header
  }

  try {
    // Send the request to the backend
    const res = await fetch(url, options);

    if (res.ok) {
      return res.json();  // Parse and return the response JSON
    }

    throw new Error(`Error ${res.status}: ${res.statusText}`);  // If request failed, throw an error
  } catch (error) {
    console.error('API request failed', error);
    throw error;  // Propagate the error to be handled in the calling function
  }
}
