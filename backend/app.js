/**
 * Server-side entry point for the application
 * Initializes the Express server, connects to PostgreSQL database,
 * and defines routes for handling user authentication (signup and login)
 */

// Import the required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import user routes
const userRoutes = require('./routes/user');

const app = express();

// Middleware to parse JSON-encoded bodies
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Mount user routes
app.use('/api/auth', userRoutes); 

module.exports = app;
