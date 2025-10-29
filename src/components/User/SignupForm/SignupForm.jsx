// src/components/User/SignupForm/SignupForm.jsx

import { Component } from "react";
import { signUp } from "../../../utilities/users-service";
import styles from "./SignupForm.module.scss";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
    successMessage: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
      successMessage: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    this.setState({ error: "", successMessage: "" });

    try {
      const formData = { ...this.state };
      delete formData.confirm;
      delete formData.error;
      const response = await signUp(formData);

      if (response.success) {
        this.setState({
          successMessage: response.message,
          error: "",
        });
        this.props.setUser(response.user); // Set the logged-in user
      } else {
        this.setState({
          error: response.message,
          successMessage: "",
        });
      }
    } catch (error) {
      this.setState({ error: error.message, successMessage: "" });
    }
  };

  render() {
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

            {showPasswordMismatch && (
              <p className={`${styles.helper} ${styles.visible}`}>Passwords must match.</p>
            )}

            {this.state.successMessage && (
              <p className={`${styles.successMessage} ${styles.visible}`}>
                {this.state.successMessage}
              </p>
            )}
          </form>
        </div>

        <p className={`${styles.errorMessage} ${this.state.error ? styles.visible : ""}`} aria-live="polite">
          &nbsp;{this.state.error}
        </p>
      </div>
    );
  }
}