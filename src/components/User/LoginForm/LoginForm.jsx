// src/components/User/LoginForm/LoginForm.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from '../../../utilities/users-service';
import styles from "./LoginForm.module.scss";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

async function handleSubmit(evt) {
  evt.preventDefault();
  console.log('Submitting credentials:', credentials);  // Log credentials to check their values
  try {
    const response = await usersService.login(credentials);  // Call login service
    if (response.success) {
      setUser(response.user);  // Set the logged-in user
      navigate('/reviews');  // Redirect to the /reviews page after successful login
    } else {
      setError(response.message);  // Display specific error message from backend
    }
  } catch (error) {
    setError('Log In Failed, Please Try Again');  // Set generic error if login fails
  }
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