// src/pages/Home/Home.jsx
import React from 'react';
import styles from '../Home/Home.module.scss'

const Home = () => {
  return (
    <main>
      <section className={styles.welcomeSection}>
        <div className={styles.left}>
          <p className={styles.welcome}>Welcome to Storm Lab!</p>
          <h3 className={styles.deliver}>We deliver solutions through code.</h3>
           <div className={styles.buttons}>
            <button className={styles.contactButton}>Contact me</button>
            <button className={styles.viewButton}>View Projects</button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imageContainer}>
            {/* Insert your image or animation here */}
            <img className={styles.logo} src="src/assets/images/home-img.png" alt="Logo" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;  // Ensure default export here
