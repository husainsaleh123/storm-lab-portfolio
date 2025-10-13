//./server.js

import dotenv from 'dotenv';

// Loading environment variables FIRST
dotenv.config();

// Then import other modules that need environment variables
import './config/database.js';
import app from './app-server.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('This porfolio was promised to me ' + PORT + ' years ago.')
})