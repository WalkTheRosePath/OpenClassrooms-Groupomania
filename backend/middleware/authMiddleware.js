// backend/middleware/authMiddleware.js
// Middleware for user authentication using JWT tokens

// Import the required modules
const jwt = require("jsonwebtoken");

// Middleware function to authenticate user requests
module.exports = (req, res, next) => {
  try {
    // Check if the request contains an authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Missing or invalid authorization header");
    }

    // Extract the JWT token from the authorization header
    const token = authHeader.split(" ")[1];

    // Verify the JWT token using the secret key
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;

    // Log the extracted token and user ID
    console.log("JWT token:", token);
    console.log("User ID:", userId);

    // Attach the user ID to the request object
    req.userId = userId;

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
