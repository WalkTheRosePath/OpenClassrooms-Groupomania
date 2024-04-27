// backend/middleware/authMiddleware.js
// Middleware for user authentication using JWT tokens

// Import the required modules
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Extract the JWT token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the decoded token
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
