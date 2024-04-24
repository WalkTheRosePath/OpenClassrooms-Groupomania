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
            const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
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

  // Controller function for user logout
  logout(req, res) {
    // Respond with a success message
    res.status(200).json({ message: "User logged out successfully!" });
  },

  // Controller function to get user profile by ID
  getUserProfile(req, res) {
    // Extract the token from the request headers
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization token not provided" });
    }
    // Verify the token
    jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
      // Token is valid, extract the user ID from the decoded token
      const userId = decoded.userId;
      // Use the user ID to fetch the user's profile data
      User.findByPk(userId)
        .then((user) => {
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          res.status(200).json(user);
        })
        .catch((error) => {
          console.error("Error getting user profile:", error);
          res.status(500).json({ error: "Failed to get user profile" });
        });
    });
  },
};

// Export UserController object
module.exports = UserController;
