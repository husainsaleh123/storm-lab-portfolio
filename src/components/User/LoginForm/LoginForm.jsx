// src/components/User/LoginForm/LoginForm.jsx

import { useState } from 'react';
import * as usersService from '../../../utilities/users-service';
import styles from "./LoginForm.module.scss";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');  // Reset the error when user starts typing
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // Attempt to log the user in
      const user = await usersService.login(credentials);
      setUser(user);  // Set the logged-in user
    } catch {
      setError('Log In Failed, Please Try Again');  // Set error if login fails
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.formContainer}>
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={credentials.email}
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
