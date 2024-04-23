// backend/routes/userRoutes.js
// Server-side routes for managing signup, login, and logout

// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import user controller
const { userController } = require("../controllers");

// Define HTTP routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// Export router
module.exports = router;