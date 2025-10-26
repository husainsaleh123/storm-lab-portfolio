// src/components/User/SignupForm/SignupForm.jsx

import { Component } from "react";
import { signUp } from '../../../utilities/users-service';
import styles from "./SignupForm.module.scss";

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: '' // Reset the error when the user changes the input
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.confirm; // Remove confirm field from form data
      delete formData.error; // Remove error field from form data
      const user = await signUp(formData); // Send the form data to the signUp function
      this.props.setUser(user); // Set the logged-in user
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' }); // Show an error if signup fails
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm; // Disable submit if passwords don't match
    const showPasswordMismatch = this.state.password && this.state.confirm && disable; // Show password mismatch message only if both fields are filled

    return (
      <div className={styles.wrap}>
        <div className={styles.formContainer}>
          <form autoComplete="off" onSubmit={this.handleSubmit} className={styles.form}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />

            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <label className={styles.label}>Confirm</label>
            <input
              className={styles.input}
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />

            <button type="submit" className={styles.submitBtn} disabled={disable}>
              Sign Up
            </button>

            {/* Show password mismatch message only when necessary */}
            {showPasswordMismatch && (
              <p className={`${styles.helper} ${styles.visible}`}>Passwords must match.</p>
            )}
          </form>
        </div>

        <p className={`${styles.errorMessage} ${this.state.error ? styles.visible : ''}`} aria-live="polite">
          &nbsp;{this.state.error}
        </p>
      </div>
    );
  }
}