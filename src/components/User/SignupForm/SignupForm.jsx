// src/components/User/SignupForm/SignupForm.jsx

import { Component } from "react";
import { signUp } from "../../../utilities/users-service"; // Import signUp function
import styles from "./SignupForm.module.scss";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "", // To show any errors
    successMessage: "", // To show success message
  };

  // Handle change of input fields
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "", // Reset error messages when user types
      successMessage: "", // Reset success message when user types
    });
  };

  // Handle form submission
  handleSubmit = (evt) => {
    evt.preventDefault();
    
    const formData = { ...this.state };
    delete formData.confirm;
    delete formData.error;

    // The signUp function returns a promise, so we handle the response
    signUp(formData).then((user) => {
      this.props.setUser(user); // Successfully signed up, set user
      this.setState({ successMessage: 'Account created successfully! ' });
    }).catch(() => {
      // An error happened on the server
      this.setState({ error: 'Sign Up Failed - Try Again' });
    });
  };


  render() {
    // Disable submit if passwords don't match
    const disable = this.state.password !== this.state.confirm;
    const showPasswordMismatch =
      this.state.password && this.state.confirm && disable;

    return (
      <div className={styles.wrap}>
        <div className={styles.formContainer}>
          <form autoComplete="off" onSubmit={this.handleSubmit} className={styles.form}>
            <label className={styles.label}>Username</label>
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

            {/* Show mismatch password message */}
            {showPasswordMismatch && (
              <p className={`${styles.helper} ${styles.visible}`}>
                Passwords must match.
              </p>
            )}

            {/* Display success message if signup is successful */}
            {this.state.successMessage && (
              <p className={`${styles.successMessage} ${styles.visible}`}>
                {this.state.successMessage}
              </p>
            )}
          </form>
        </div>

        {/* Display error message if any */}
        <p
          className={`${styles.errorMessage} ${this.state.error ? styles.visible : ""}`}
          aria-live="polite"
        >
          &nbsp;{this.state.error}
        </p>
      </div>
    );
  }
}
