// backend/routes/userRoutes.js
// Server-side routes for managing signup, login, and logout

// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import user controller
const { userController } = require("../controllers");

// TODO Add auth to routes that are protected (delete user)

// Define HTTP routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// TODO Add delete user route

// Export router
module.exports = router;