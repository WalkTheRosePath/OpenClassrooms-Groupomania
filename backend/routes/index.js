// backend/routes/index.js
// Server-side import and export all route files

// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import route modules
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

// Use route modules
router.use("/posts", postRoutes);
router.use("/auth", userRoutes);

// Export router
module.exports = router;