import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';

// Import your page components
import Home from '../Home/Home';
import About from '../About/About'; 
import Contact from '../Contact/Contact'; 
import AllProjectsPage from '../Projects/AllProjectsPage/AllProjectsPage'; 
import ShowProjectsPage from '../Projects/ShowProjectsPage/ShowProjectsPage'; 
import AllReviewsPage from '../Reviews/AllReviewsPage/AllReviewsPage'; 
import ShowReviewsPage from '../Reviews/ShowReviewsPage/ShowReviewsPage';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function App() {
  return (
    <Router>  {/* Ensure your routes are wrapped inside Router */}
      <main>
        <Header />
        <Routes>
          {/* Define all the routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Projects Routes */}
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/projects/:id" element={<ShowProjectsPage />} />

          {/* Reviews Routes */}
          <Route path="/reviews" element={<AllReviewsPage />} />
          <Route path="/reviews/:id" element={<ShowReviewsPage />} />
          
          {/* Redirect to Home if no path matches */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </main>
    </Router>  
  );
}
