// backend/routes/postRoutes.js
// Server-side routes for managing posts

// Import Express and create a router instance
const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");

// Define HTTP routes for posts
router.get("/", authMiddleware, postController.getAllPosts);
router.get("/:id", authMiddleware, postController.getPostById);
router.post("/", authMiddleware, multerMiddleware, postController.createPost);
router.put("/:id/read", authMiddleware, postController.markPostAsRead);

// Export router
module.exports = router;