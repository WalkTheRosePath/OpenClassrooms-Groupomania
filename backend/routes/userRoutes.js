// backend/routes/userRoutes.js
// Server-side routes for managing signup, login, and logout

// Import Express and create a router instance
const express = require('express');
const router = express.Router();
const { userController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

// Define HTTP routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.getUserProfile);
router.put("/profile", authMiddleware, userController.updateUserProfile);
router.delete("/profile", authMiddleware, userController.deleteUserProfile);

// Export router
module.exports = router;