// backend/controllers/postController.js
// Server-side controller functions for handling post-related operations

// Import necessary modules
const { Post } = require("../models");

// PostController object with controller functions
const PostController = {
    // Controller function to create a new post
  async createPost(req, res) {
    try {
      // Get the user ID from the request object
      const userId = req.userId;

      let postData;

      if (req.file) {
        postData = JSON.parse(req.body.post);
      } else {
        postData = req.body;
      }

      // Destructure the title, content, and multimedia URL from the request body
      const { title, content, multimediaUrl } = postData;

      // Check if the title is empty
      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required fields." });
      }

      // Create a new post using user ID and post data
      const newPost = await Post.create({
        title,
        content,
        multimediaUrl: multimediaUrl || null, // Set multimedia URL to null if not provided
        userId,
      });

      // Respond with the created post
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post. Please try again later." });
    }
  },
  
  // Controller function to get all posts
  async getAllPosts(req, res) {
    try {
      // Retrieve all posts from the database
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      console.error("Error getting posts:", error);
      res.status(500).json({ error: "Failed to get posts" });
    }
  },

  // Controller function to get a post by post ID
  async getPostById(req, res) {
    const postId = req.params.id;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error("Error getting post by ID:", error);
      res.status(500).json({ error: "Failed to get post" });
    }
  },
};

module.exports = PostController;
