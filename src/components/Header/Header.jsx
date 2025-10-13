import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for current route
import styles from "./Header.module.scss";

const Header = () => {
  const location = useLocation(); // Get current route
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu open state

  // Determine the active page based on the current route
  const getActivePage = () => {
    switch (location.pathname) {
      case '/about':
        return 'about';
      case '/projects':
        return 'projects';
      case '/reviews':
        return 'reviews';
      case '/contact':
      case '/show-contact': // Add '/show-contact' to also highlight the Contact page
        return 'contact';
      default:
        return 'home';
    }
  };

  const [activePage, setActivePage] = useState(getActivePage()); // Set active page based on the route

  useEffect(() => {
    // Update the active page when the location changes
    setActivePage(getActivePage());
  }, [location]); // Re-run when location changes

  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src="/src/assets/images/logo.png" alt="Logo" />
      </Link>

      {/* Hamburger button for mobile */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)} // Toggle menu open/close
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        {/* Home Link */}
        <li
          className={`${styles.navItem} ${activePage === 'home' ? styles.active : ''}`}
          onClick={() => setMenuOpen(false)} // Close menu on click
        >
          <Link to="/">Home</Link>
        </li>
        {/* About Link */}
        <li
          className={`${styles.navItem} ${activePage === 'about' ? styles.active : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/about">About</Link>
        </li>
        {/* Projects Link */}
        <li
          className={`${styles.navItem} ${activePage === 'projects' ? styles.active : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/projects">Projects</Link>
        </li>
        {/* Reviews Link */}
        <li
          className={`${styles.navItem} ${activePage === 'reviews' ? styles.active : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/reviews">Reviews</Link>
        </li>
        {/* Contact Link */}
        <li
          className={`${styles.navItem} ${activePage === 'contact' ? styles.active : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
