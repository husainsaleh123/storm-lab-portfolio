// src/pages/Home/Home.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for current route
import styles from '../Home/Home.module.scss'

const Home = () => {
  return (
    <main>
      <section className={styles.welcomeSection}>
        <div className={styles.left}>
          <p className={styles.welcome}>Welcome to Storm Lab!</p>
          <h3 className={styles.deliver}>We deliver solutions through code.</h3>
           <div className={styles.buttons}>
           
            <Link to="/contact">
             <button className={styles.contactButton}>Contact me</button>
             </Link>

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

      <div className={styles.section}>
          <div className={styles.line}></div>
          <span className={styles.title}>What can I offer?</span>
          <div className={styles.line}></div>
      </div>
      
      <div className={styles.cards}>

        <div className={styles.card}>
          <h3>Custom Website Design</h3>
          <img className={styles.serviceImg} src="src/assets/images/web-design.png" alt="service" />
          <p>I Create fully customized websites tailored to the client's needs, including responsive design, and user-friendly navigation.</p>
        </div>

        <div className={styles.card}>
          <h3>Website Redesign and Optimization</h3>
          <img className={styles.serviceImg} src="src/assets/images/Redesign.png" alt="service" />
          <p>I help clients refresh their outdated websites with modern designs, better navigation, and improved performance.</p>
        </div>

        <div className={styles.card}>
          <h3>User Interface & Experience Design</h3>
          <img className={styles.serviceImg} src="src/assets/images/UI_UX.png" alt="service" />
          <p>I help clients improve the user experience and interface of their websites to make them more user-friendly.</p>
        </div>

        <div className={styles.card}>
          <h3>Landing Page Optimization</h3>
          <img className={styles.serviceImg} src="src/assets/images/website.png" alt="service" />
          <p>Design high-converting landing pages, with focus on elements like call-to-action buttons and engaging design.</p>
        </div>

      </div>

    </main>
  );
};

export default Home;  // Ensure default export here
