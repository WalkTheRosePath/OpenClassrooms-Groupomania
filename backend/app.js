// backend/app.js
// Server-side entry point for the application
// Configures the Express application and mounts the routes

// Import the required modules
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import routes from the index file
const routes = require("./routes");

const app = express();

// Middleware to parse JSON-encoded bodies
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routes from the index file
app.use("/api", routes);

module.exports = app;
