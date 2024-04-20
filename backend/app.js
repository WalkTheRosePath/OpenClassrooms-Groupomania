// Server-side entry point for the application

// Import the required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import user routes
const userRoutes = require('./routes/user');
const postRoutes = require("./routes/posts");

const app = express();

// Middleware to parse JSON-encoded bodies
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Mount user and post routes
app.use('/api/auth', userRoutes);
app.use("/api/post", postRoutes);  

module.exports = app;