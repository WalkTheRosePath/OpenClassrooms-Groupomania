// backend/routes/user.js
// Server-side routes for managing signup, login, and logout

// Import the required modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Route for user signup
router.post('/signup', userController.signup);

// Route for user login
router.post('/login', userController.login);

// Route for user logout
router.get('/logout', userController.logout);

module.exports = router;