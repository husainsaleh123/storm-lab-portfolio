// src/components/User/LoginForm/LoginForm.jsx

import { useState } from 'react';
import * as usersService from '../../../utilities/users-service'; // Service to handle API calls
import styles from "./LoginForm.module.scss";
import { Navigate } from 'react-router-dom';  // Import Navigate component for redirection

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [redirectToReviews, setRedirectToReviews] = useState(false);  // State to trigger redirection

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError(''); // Reset error on input change
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);  // This should return both the user object and token

      // Store the JWT token in localStorage
      localStorage.setItem("jwtToken", user.token);  // Store the token in localStorage
      localStorage.setItem("user", JSON.stringify(user));  // Store user details (name, email)

      setUser(user);  // Pass the user data to the parent component to manage app state
      setRedirectToReviews(true);  // Trigger redirection after successful login
    } catch {
      setError('Log In Failed, Please Try Again');  // Set error message if login fails
    }
  }

  // Redirect to /reviews page after successful login
  if (redirectToReviews) {
    return <Navigate to="/reviews" />;  // Redirect the user to /reviews page
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.formContainer}>
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Log In
          </button>
        </form>
      </div>

      {/* Display the error message only when there's an error */}
      <p
        className={`${styles.errorMessage} ${error ? styles.visible : styles.hidden}`}
        aria-live="polite"
      >
        {error && <>&nbsp;{error}</>}
      </p>
    </div>
  );
}
