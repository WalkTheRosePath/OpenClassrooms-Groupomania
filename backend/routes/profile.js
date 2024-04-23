// Server-side routes for managing profiles (profile.js)

const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");

// Route for getting user profile by ID
router.get("/:userId", profileController.getUserProfile);

// Route for updating user profile by ID
router.put("/:userId", profileController.updateUserProfile);

// Route for deleting user profile by ID
router.delete("/:userId", profileController.deleteUserProfile);

module.exports = router;
