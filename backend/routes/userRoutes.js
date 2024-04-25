// backend/routes/userRoutes.js
// Server-side routes for managing user-related operations

// Import Express and create a router instance
const express = require('express');
const router = express.Router();
const { userController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

// Define HTTP routes for user authentication
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", authMiddleware, userController.logout);

// Define HTTP routes for user profile
router.get("/profile/:id", authMiddleware, userController.getUserProfileById);
router.put("/profile/:id", authMiddleware, userController.updateUserProfileById);
router.delete("/profile/:id", authMiddleware, userController.deleteUserProfileById);

// Export router
module.exports = router;