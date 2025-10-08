// src/components/Footer/Footer.jsx
import React from 'react';
import styles from "./Footer.module.scss";
import 'font-awesome/css/font-awesome.min.css';  // Import Font Awesome if you used npm

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.msg}>In Storm Lab, we deliver solutions through code.</p>
      <h3>Connect with us</h3>
      <div className={styles.socialIcons}>
        <a href="#" className={styles.instagram}><i className="fa fa-instagram"></i></a>
        <a href="#" className={styles.whatsapp}><i className="fa fa-whatsapp"></i></a>
        <a href="#" className={styles.linkedin}><i className="fa fa-linkedin"></i></a>
        <a href="#" className={styles.facebook}><i className="fa fa-facebook"></i></a>
      </div>
    <p className={styles.copyright}> Storm Lab 2025 &copy; all rights reserved.</p>
    </footer>
  );
};

export default Footer;  // Ensure this line is here
