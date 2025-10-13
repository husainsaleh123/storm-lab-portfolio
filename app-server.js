import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
// import reviewRoutes from './routes/api/review.js';
import contactRoutes from './routes/api/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
const app = express();

app.use(cors());
app.use(express.json());  // Middleware to parse incoming JSON requests
app.use((req, res, next) => {
    res.locals.data = {};  // Initialize the locals object to store data
    next();
});

// API Routes - These must come before static file serving
// app.use('/api/review', reviewRoutes);
app.use('/api/contacts', contactRoutes);  // API route for contacts

// Serve static files for React app
const staticDir = process.env.NODE_ENV === 'production' ? 'dist' : 'public';
const indexPath = process.env.NODE_ENV === 'production' ? 'dist/index.html' : 'index.html';

// Serve static files (images, JS, CSS, etc.)
app.use(express.static(path.join(__dirname, staticDir)));

// Catch-all route for React (to handle non-API routes)
app.get('/show-contact', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, indexPath)));  // Serve React app for '/show-contact'
});

// Default route for all non-API requests (handles React Router)
app.get('/', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, indexPath)));  // Serve index.html for React app
});

export default app;
