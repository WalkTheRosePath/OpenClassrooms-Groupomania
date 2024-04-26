// backend/controllers/postController.js
// Server-side controller functions for handling post-related operations

// Import necessary modules
const fs = require("fs");
const { Post } = require("../models");
const utils = require("../utils");
const { error } = require("console");

// Controller function to create a new post based on the data received in the request body
exports.createPost = (req, res) => {
  // Create a new post with the data received in the request body
  const postDocument = new Post({
    ...JSON.parse(req.body.post),
    multimediaUrl: utils.getMultimediaUrl(req),
  });
  // Save the post to the database
  postDocument.save()
    .then((doc) => {
      res.status(201).json({ post: doc, message: "Post created successfully" });
    })
    .catch((error) => {
      // Handle errors
      res.status(400).json({ error: error.message });
    });
};

// Controller function to get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Get all posts
    const posts = await Post.findAll();
    // Send the response
    res.status(200).json({ posts });
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

// Controller function to get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    // Get the post ID from the request parameters
    const { id } = req.params;
    // Find the post by ID
    const post = await Post.findByPk(id);
    // Send the response
    res.status(200).json({ post });
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

// Controller function to modify a post by ID
exports.modifyPostById = async (req, res) => {
  try {
    // Get the post ID from the request parameters
    const { id } = req.params;
    // Get the post data from the request body
    const { title, content, multimediaUrl } = req.body;
    // Find the post by ID
    const post = await Post.findByPk(id);
    // Update the post
    post.title = title;
    post.content = content;
    post.multimediaUrl = multimediaUrl;
    await post.save();
    // Send the response
    res.status(200).json({ post });
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

// Controller function to delete a post by ID
exports.deletePostById = async (req, res) => {
  try {
    // Get the post ID from the request parameters
    const { id } = req.params;
    // Find the post by ID
    const post = await Post.findByPk(id);
    // Delete the post
    await post.destroy();
    // Send the response
    res.status(204).end();
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};
