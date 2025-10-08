import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from "./Header.module.scss";

const Header = () => {
  // State to keep track of the active page
  const [activePage, setActivePage] = useState('home'); // Default to 'home'
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu open state

  // Function to set the active page
  const handleSetActivePage = (page) => {
    setActivePage(page);
    setMenuOpen(false); // Closes the menu when clicking a page
  };

  return (
    <header className={styles.header}>
      <img className={styles.logo} src="src/assets/images/logo.png" alt="Logo" />

       {/* Hamburger button */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      
      <ul className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <li 
          className={`${styles.navItem} ${activePage === 'home' ? styles.active : ''}`} 
          onClick={() => handleSetActivePage('home')}
        >
          <Link to="/">Home</Link>
        </li>
        <li 
          className={`${styles.navItem} ${activePage === 'about' ? styles.active : ''}`} 
          onClick={() => handleSetActivePage('about')}
        >
          <Link to="/about">About</Link>
        </li>
        <li 
          className={`${styles.navItem} ${activePage === 'projects' ? styles.active : ''}`} 
          onClick={() => handleSetActivePage('projects')}
        >
           <Link to="/projects">Projects</Link>
        </li>
        <li 
          className={`${styles.navItem} ${activePage === 'reviews' ? styles.active : ''}`} 
          onClick={() => handleSetActivePage('reviews')}
        >
          <Link to="/reviews">Reviews</Link>
        </li>
        <li 
          className={`${styles.navItem} ${activePage === 'contact' ? styles.active : ''}`} 
          onClick={() => handleSetActivePage('contact')}
        >
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
