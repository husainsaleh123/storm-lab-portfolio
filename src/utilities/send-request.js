// src/utilities/send-request.js
import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Initialize the options object for the fetch call
  const options = { method };

  // If there is a payload (for POST, PUT, etc.), add it to the request body
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  // Get the token if it's available (from localStorage)
  const token = getToken();
  
  // If token is available, include it in the Authorization header
  if (token) {
    // Ensure headers object exists before adding Authorization
    options.headers = options.headers || {};  // In case no headers are set, initialize it
    options.headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Make the API request with the provided URL and options
    const res = await fetch(url, options);

    // If the response is OK (status code 2xx), return the parsed JSON
    if (res.ok) {
      return res.json();
    }

    // If the response is not OK, throw an error with a relevant message
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  } catch (error) {
    // If there's an error with the fetch (network issues, etc.), catch it here
    console.error('API request failed', error);
    throw error;  // Re-throw the error so the calling function can handle it
  }
}
