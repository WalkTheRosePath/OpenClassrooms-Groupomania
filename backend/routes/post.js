// Server-side routes for managing posts

const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

// Route for getting all posts
router.get("/", postController.getAllPosts);

// Route for creating a new post
router.post("/", postController.createPost);

// Route for getting a post by ID
router.get("/:postId", postController.getPostById);

// Route for updating a post by ID
router.put("/:postId", postController.updatePost);

// Route for deleting a post by ID
router.delete("/:postId", postController.deletePost);

module.exports = router;
