// backend/routes/userRoutes.js
// Server-side routes for managing user-related operations

// Import Express and create a router instance
const express = require('express');
const router = express.Router();
const { userController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

// Define HTTP routes for users
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/profile/:id", authMiddleware, userController.getUserProfileById);
router.delete("/profile/:id", authMiddleware, userController.deleteUserProfileById);

// Export router
module.exports = router;