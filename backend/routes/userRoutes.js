// backend/routes/userRoutes.js
// Server-side routes for managing signup, login, and logout

// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import user controller
const { userController } = require("../controllers");

// Import middleware
const authMiddleware = require("../middleware/authMiddleware");

// Define HTTP routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.delete("/user", authMiddleware, userController.deleteUser);

// Export router
module.exports = router;