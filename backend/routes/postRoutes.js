// backend/routes/postRoutes.js
// Server-side routes for managing posts

// Import Express and create a router instance
const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

// Define HTTP routes
router.get("/", postController.getAllPosts);
router.post("/", postController.createPost);
router.get("/:postId", postController.getPostById);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", authMiddleware, postController.deletePost);

// Export router
module.exports = router;