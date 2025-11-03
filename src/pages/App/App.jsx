// pages/App/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // useLocation for path detection
import 'font-awesome/css/font-awesome.min.css';
// import { getUser } from '../../utilities/users-service';
// Import your page components
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact/Contact';
import ShowContactPage from '../Contact/ShowContactPage/ShowContactPage';
import AllProjectsPage from '../Projects/AllProjectsPage/AllProjectsPage';
import ShowProjectsPage from '../Projects/ShowProjectsPage/ShowProjectsPage';
import AllReviewsPage from '../Reviews/AllReviewsPage/AllReviewsPage';
// import AuthPage from '../User/AuthPage/AuthPage'; 
import ShowReviewsPage from '../Reviews/ShowReviewsPage/ShowReviewsPage';
import AddReviewsPage from '../Reviews/AddReviewsPage/AddReviewsPage';
import EditReviewsPage from '../Reviews/EditReviewsPage/EditReviewsPage'; 
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function App() {
  // const [user, setUser] = useState(getUser()); // State for user
  const location = useLocation();  // Get current location path

  // Check if we're on the /auth page
  // const isAuthPage = location.pathname === '/auth'; 

  return (
    <main>
      {/* Render Header and Footer only if the current page is not '/auth' */}
      {<Header />} 
      
      <Routes>
        {/* Define routes for the pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/show-contact" element={<ShowContactPage />} />

        {/* Projects Routes */}
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/projects/:id" element={<ShowProjectsPage />} />

        {/* Reviews Routes */}
        <Route path="/reviews" element={<AllReviewsPage />} />
        <Route path="/reviews/:id" element={<ShowReviewsPage />} />

        {/* Auth Routes */}
        {/* <Route path="/auth" element={<AuthPage user={user} setUser={setUser} />} /> */}

        {/* Edit, Add, Show Review Pages */}
        <Route path="/reviews/:id/edit" element={<EditReviewsPage />} />
        <Route path="/add-review" element={<AddReviewsPage />} />
        <Route path="/show-review" element={<ShowReviewsPage />} />

        {/* Redirect to Home if no path matches */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>

      {/* Render Footer only for pages other than AuthPage */}
      {<Footer />}
    </main>
  );
}