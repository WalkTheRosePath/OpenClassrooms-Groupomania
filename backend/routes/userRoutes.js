// backend/routes/userRoutes.js
// Server-side routes for managing user-related operations

// Import Express and create a router instance
const express = require('express');
const router = express.Router();
const { UserController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

// Define HTTP routes
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/profile/:userId", authMiddleware, UserController.getUserProfileById);
router.put("/profile/:userId", authMiddleware, UserController.updateUserProfileById);
router.delete("/profile/:userId", authMiddleware, UserController.deleteUserProfileById);

// Export router
module.exports = router;