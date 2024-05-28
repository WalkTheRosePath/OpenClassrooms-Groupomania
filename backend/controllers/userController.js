// backend/controllers/userController.js
// Server-side controller functions for handling user-related operations

// Import necessary modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// UserController object with controller functions
const UserController = {
  // Controller function for user signup
  signup(req, res) {
    // Hash the password using bcrypt
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        // Create a new user instance with hashed password
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        });
        // Save the user to the database
        user
          .save()
          .then(() => {
            // If saved successfully, return a message
            res.status(201).json({
              message: "User added successfully!",
            });
          })
          .catch((error) => {
            // If not saved, return "Internal Server Error" message
            res.status(500).json({ error: error.message });
          });
      })
      .catch((error) => {
        // Handle database error with "Internal Server Error" message
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  },

  // Controller function for user login
  login(req, res) {
    // Find user by email in the database
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          // If user is not found, return an error message
          return res.status(401).json({
            error: new Error("Incorrect username or password!").message,
          });
        }
        // Compare passwords using bcrypt
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            // If password is incorrect, return an error message
            if (!valid) {
              return res.status(401).json({
                error: new Error("Incorrect username or password!").message,
              });
            }
            // Generate JWT token for authentication
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
              expiresIn: "24h",
            });
            // Send successful login response with token
            res.status(200).json({ userId: user.id, token });
          })
          .catch((error) => {
            // Handle bcrypt error with "Internal Server Error" message
            console.log(error);
            res.status(500).json({ error: error.message });
          });
      })
      .catch((error) => {
        // Handle database error with "Internal Server Error" message
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  },

  // Controller function to get user profile by ID
  async getUserProfileById(req, res) {
    try {
      const userId = req.userId; // Extract user ID from request object

      // Find user by ID in the database
      const user = await User.findByPk(userId, {
        attributes: {
          exclude: ["password"],
        },
      });

      // If user is not found, return an error message
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // If user is found, return the user profile
      res.json(user);
    } catch (error) {
      console.error("Error getting user profile:", error);
      res.status(500).json({ error: "Failed to get user profile" });
    }
  },

  // Controller function to delete user profile by ID
  deleteUserProfileById(req, res) {
    console.log(req.params);
    const userId = req.params.id; // Extract user ID from request parameters
    // Find user by ID in the database and delete it
    User.destroy({ where: { id: userId } })
      .then(() => {
        res.status(200).json({ message: "User profile deleted successfully" });
      })
      .catch((error) => {
        console.error("Error deleting user profile:", error);
        res.status(500).json({ error: "Failed to delete user profile" });
      });
  },
};

// Export UserController object
module.exports = UserController;
