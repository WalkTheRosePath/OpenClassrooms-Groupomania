// backend/controllers/profileController.js
// Server-side controller functions for user profile operations
// Such as fetching, updating, and deleting user profiles

// Import necessary modules
const User = require("../models/userModel");

// Controller function to get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Retrieve user profile data based on the user ID
    const user = await User.findById(req.params.userId).select("-password"); // Excluding password field from the response
    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Retrieve user profile data based on the user ID
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Update user profile fields
    user.name = req.body.name;
    user.email = req.body.email;
    // Add more fields as needed

    // Save updated user profile
    user = await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    // Delete user profile based on the user ID
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};