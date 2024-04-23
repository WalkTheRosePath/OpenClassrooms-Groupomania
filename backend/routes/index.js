// backend/routes/index.js
// Server-side import and export all route files

const express = require("express");
const router = express.Router();

// Import route modules
const postRoutes = require("./post");
const profileRoutes = require("./profile");
const userRoutes = require("./user");

// Use route modules
router.use("/post", postRoutes);
router.use("/profile", profileRoutes);
router.use("/auth", userRoutes);

module.exports = router;
