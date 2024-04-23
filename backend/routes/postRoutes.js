// backend/routes/postRoutes.js
// Server-side routes for managing posts

// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import post controller
const { postController } = require("../controllers");

// TODO Add auth to routes that are protected

// Define HTTP routes
router.get("/", postController.getAllPosts);
router.post("/", postController.createPost);
router.get("/:postId", postController.getPostById);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

// Export router
module.exports = router;