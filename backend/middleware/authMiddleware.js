// backend/middleware/authMiddleware.js
// Middleware for user authentication using JWT tokens

// Import the required modules
const jwt = require("jsonwebtoken");

// Middleware function to authenticate user requests
module.exports = (req, res, next) => {
  try {
    // Check if the request contains an authorization header
    if (!req.headers.authorization) {
      throw new Error("Missing authorization header");
    }

    // Extract the JWT token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token using the secret key
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;

    // Check if the user ID in the request body matches the decoded user ID
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("Invalid user ID in request body");
    }
    // Proceed to the next middleware if authentication is successful
    next();
  } catch (error) {
    // Return an error response if authentication fails
    console.error("Authentication error: ", error.message);
    res.status(401).json({
      error: "Authentication failed!",
    });
  }
};
