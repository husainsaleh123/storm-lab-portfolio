// src/main.jsx

import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

// Ensure that the App component is wrapped in Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Wrap the App component in BrowserRouter */}
      <App />
    </Router>
  </React.StrictMode>,
)