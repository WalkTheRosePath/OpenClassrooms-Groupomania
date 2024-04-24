// backend/routes/postRoutes.js
// Server-side routes for managing posts

// Import Express and create a router instance
const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");

// Define HTTP routes
router.get("/", authMiddleware, postController.getAllPosts);
router.post("/", authMiddleware, multerMiddleware, postController.createPost);
router.get("/:postId", authMiddleware, postController.getPostById);
router.put("/:postId", authMiddleware, postController.updatePost);
router.delete("/:postId", authMiddleware, postController.deletePost);

// Export router
module.exports = router;