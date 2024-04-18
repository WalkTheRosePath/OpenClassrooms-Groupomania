/**
 * Entry point for the application
 * Initializes the Express server, connects to MongoDB Atlas,
 * and defines routes for handling user authentication (signup and login)
 */

// Import the required modules
const express = require('express');
const path = require('path');

// Import user routes
const userRoutes = require('./routes/user');

const app = express();

// Middleware to parse JSON-encoded bodies
app.use(express.json());

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Mount user routes
app.use('/api/auth', userRoutes); 

module.exports = app;
