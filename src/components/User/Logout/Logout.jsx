import React from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate programmatically after logout
import { logOut } from '../../utilities/users-service'; // Assuming the logout logic is here
import styles from './Logout.module.scss'; // Assuming styles are imported here

export default function UserLogOut({ user, setUser }) {
  const navigate = useNavigate(); // Initialize useNavigate for redirection after logout

  function handleLogOut() {
    logOut(); // Clear user-related data from localStorage (jwtToken, user)
    setUser(null); // Reset the user state in the app
    navigate('/auth'); // Redirect the user to the login page after logging out
  }

  return (
    <div className={styles.UserLogOut}>
      {/* Displaying logged-in user's name */}
      <div className={styles.name}>Logged in as: {user.name}</div>
      {/* Button to trigger logout */}
      <button className="btn-sm" onClick={handleLogOut}>Logout</button>
    </div>
  );
}
