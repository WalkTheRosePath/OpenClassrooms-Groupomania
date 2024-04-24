// backend/routes/userRoutes.js
// Server-side routes for managing user-related operations

// Import Express and create a router instance
const express = require('express');
const router = express.Router();
const { UserController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

// Define HTTP routes for user authentication
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

// Define HTTP routes for user profile
router.get("/profile/:id", authMiddleware, UserController.getUserProfileById);
router.put("/profile/:id", authMiddleware, UserController.updateUserProfileById);
router.delete("/profile/:id", authMiddleware, UserController.deleteUserProfileById);

// Export router
module.exports = router;