// backend/controllers/profileController.js
// Server-side controller functions for handling profile-related operations

// Import necessary modules
const { Profile } = require("../models");

// ProfileController object with controller functions
const ProfileController = {
  // Controller function to get user profile by ID
  async getUserProfile(req, res) {
    try {
      // Retrieve user profile data based on the user ID
      const user = await Profile.findOne({
        where: { userId: req.params.userId },
        attributes: { exclude: ["password"] }, // Excluding password field from the response
      });
      if (!user) {
        return res.status(404).json({ message: "User profile not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Controller function to update user profile by ID
  async updateUserProfile(req, res) {
    try {
      // Retrieve user profile data based on the user ID
      let user = await Profile.findOne({
        where: { userId: req.params.userId },
      });
      if (!user) {
        return res.status(404).json({ message: "User profile not found" });
      }

      // Update user profile fields
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      // Add more fields as needed

      // Save updated user profile
      user = await user.save();

      res.json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Controller function to delete user profile by ID
  async deleteUserProfile(req, res) {
    try {
      // Delete user profile based on the user ID
      const user = await Profile.destroy({
        where: { userId: req.params.userId },
      });
      if (!user) {
        return res.status(404).json({ message: "User profile not found" });
      }
      res.json({ message: "User profile deleted successfully" });
    } catch (error) {
      console.error("Error deleting user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Export ProfileController
module.exports = ProfileController;