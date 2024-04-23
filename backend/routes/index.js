// backend/routes/index.js
// Server-side import and export all route files

// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import route modules
const postRoutes = require("./postRoutes");
const profileRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");

// Use route modules
router.use("/post", postRoutes);
router.use("/profile", profileRoutes);
router.use("/auth", userRoutes);

module.exports = router;
