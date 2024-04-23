// backend/routes/profileRoutes.js
// Server-side routes for managing profiles (profile.js)

// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import profile controller
const profileController = require("../controllers/profileController");

// Define HTTP routes
router.get("/:userId", profileController.getUserProfile);
router.put("/:userId", profileController.updateUserProfile);
router.delete("/:userId", profileController.deleteUserProfile);

module.exports = router;
