// Server-side routes for managing user profiles

const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");

// Route for getting user profile by ID
router.get("/:userId", profileController.getUserProfileById);

// Route for updating user profile by ID
router.put("/:userId", profileController.updateUserProfileById);

// Route for deleting user profile by ID
router.delete("/:userId", profileController.deleteUserProfileById);

module.exports = router;
