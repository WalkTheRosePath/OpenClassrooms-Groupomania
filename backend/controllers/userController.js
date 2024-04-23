// backend/controllers/userController.js
// Server-side controller functions for user authentication operations
// Such as user signup, login, and logout

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Controller function for user signup
exports.signup = (req, res) => {
  // Hash the password using bcrypt
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // Create a new user instance with hashed password
      const user = new User({
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
};

// Controller function for user login
exports.login = (req, res) => {
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
};

// Controller function for user logout
exports.logout = (req, res) => {
  // Respond with a success message
  res.status(200).json({ message: "Logout successful" });
};
