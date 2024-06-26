// backend/controllers/postController.js
// Server-side controller functions for handling post-related operations

// Import necessary modules
const { Post, User } = require("../models");
const utils = require("../utils");

// PostController object with controller functions
const PostController = {
    // Controller function to create a new post
  async createPost(req, res) {
    try {
      // Get the user ID from the request object
      const userId = req.userId;

      // Check if the user ID is valid
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      let postData;

      if (req.file) {
        postData = JSON.parse(req.body.post);
      } else {
        postData = req.body;
      }

      // Destructure the title, content, and multimedia URL from the request body
      const { title, content } = postData;
      const multimediaUrl = req.file ? utils.createMediaUrl(req) : null;

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
        multimediaUrl, 
        userId,
        usersRead: [],
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
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["firstName", "lastName"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
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
      const post = await Post.findByPk(postId, {
        include: [{
          model: User,
          attributes: ['firstName', 'lastName'],
        }],
      });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error("Error getting post by ID:", error);
      res.status(500).json({ error: "Failed to get post" });
    }
  },

  // Controller function to mark a post as read
  async markPostAsRead(req, res) {
    const postId = req.params.id;
    const userId = req.userId;
    // console.log(`postId: ${postId}, userId: ${userId}`);
    try {
      const post = await Post.findByPk(postId);
      // console.log(`post: ${JSON.stringify(post, null, 2)}`)
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (!post.usersRead) {
        post.usersRead = [];
      }
      if (!post.usersRead.includes(userId)) {
        post.usersRead = [...post.usersRead, userId];
        await post.save();
      }
      res.status(200).json(post);
    } catch (error) {
      console.error("Error marking post as read:", error);
      res.status(500).json({ error: "Failed to mark post as read" });
    }
  },

  // Controller function to check if a post is read
  async checkIfPostIsRead(req, res) {
    const postId = req.params.id;
    const userId = req.userId;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      const hasRead = post.usersRead.includes(userId);
      res.status(200).json({ read: hasRead });
    } catch (error) {
      console.error("Error checking if post is read:", error);
      res.status(500).json({ error: "Failed to check if post is read" });
    }
  }
};

module.exports = PostController;
