// backend/controllers/postController.js
// Server-side controller functions for handling post-related operations

// Import necessary modules
const { Post } = require("../models");

// PostController object with controller functions
const PostController = {
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

  // Controller function to update a post by post ID
  async updatePostById(req, res) {
    const postId = req.params.id;
    const { title, content, multimediaUrl } = req.body;

    //Check if the title, content, or multimedia URL is present
    if (!title && !content && !multimediaUrl) {
      return res.status(400).json({ error: "Title, content, or multimedia URL is required." });
    }

    try {
      // Find the post by ID
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Update the post with the new data if present
      if (title) post.title = title;
      if (content) post.content = content;
      if (multimediaUrl) post.multimediaUrl = multimediaUrl;

      // Save the updated post
      const updatedPost = await post.save();
      res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  },

  // Controller function to delete a post by post ID
  async deletePostById(req, res) {
    const postId = req.params.id;
    try {
      // Find the post by ID
      const deletedPost = await Post.destroy({ where: { id: postId } });
      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }   
  }
};

module.exports = PostController;





// // Import necessary modules
// const jwt = require("jsonwebtoken");
// const { Post } = require("../models");

// // // Function to get the user ID from the JWT token
// // const getUserId = (token) => {
// //   try {
// //     const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
// //     return decodedToken.userId;
// //   } catch (error) {
// //     console.error("Error decoding token:", error);
// //     return null;
// //   }
// // };

// // PostController object with controller functions
// const PostController = {

//   // Controller function to get all posts
//   async getAllPosts(req, res) {
//     try {
//       // Retrieve all posts from the database
//       const posts = await Post.findAll();

//       // Respond with the list of posts
//       res.json(posts);
//     } catch (error) {
//       console.error("Error getting posts:", error);
//       res.status(500).json({ error: "Failed to get posts" });
//     }
//   },

//   // Controller function to get a post by ID
//   async getPostById(req, res) {
//     try {
//       const postId = req.params.id;

//       // Retrieve the post by ID from the database
//       const post = await Post.findByPk(postId);

//       if (!post) {
//         return res.status(404).json({ error: "Post not found" });
//       }

//       // Respond with the found post
//       res.json(post);
//     } catch (error) {
//       console.error("Error getting post by ID:", error);
//       res.status(500).json({ error: "Failed to get post" });
//     }
//   },

//   // Controller function to create a new post
//   async createPost(req, res) {
//     try {
//       // Get the user ID from the JWT token
//       const userId = getUserId(req.headers.authorization);
//       console.log("User ID:", userId);

//       if (!userId) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }

//       // Get the title and content from the request body
//       const { title, content } = req.body;

//       // Set the multimedia URL to null by default
//       let multimediaUrl = null;

//       // Check if file was uploaded
//       if (req.file) {
//         multimediaUrl = req.file.path;
//       } else {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       // Create a new post in the database
//       const newPost = await Post.create({
//         title,
//         content,
//         multimediaUrl,
//         userId,
//       });

//       // Respond with the created post
//       res.status(201).json(newPost);
//     } catch (error) {
//       console.error("Error creating post:", error);
//       res.status(500).json({ error: "Failed to create post" });
//     }
//   },

//   // Controller function to update a post by ID
//   async updatePostById(req, res) {
//     try {
//       const postId = req.params.id;
//       const { title, content, multimediaUrl } = req.body;

//       // Find the post by ID in the database
//       const post = await Post.findByPk(postId);

//       if (!post) {
//         return res.status(404).json({ error: "Post not found" });
//       }

//       // Update the post with the new data
//       post.title = title;
//       post.content = content;
//       post.multimediaUrl = multimediaUrl;

//       // Save the updated post to the database
//       await post.save();

//       // Respond with the updated post
//       res.json(post);
//     } catch (error) {
//       console.error("Error updating post:", error);
//       res.status(500).json({ error: "Failed to update post" });
//     }
//   },

//   // Controller function to delete a post by ID
//   async deletePostById(req, res) {
//     try {
//       const postId = req.params.id;

//       // Delete the post by ID from the database
//       await Post.destroy({ where: { id: postId } });

//       // Respond with success message
//       res.json({ message: "Post deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       res.status(500).json({ error: "Failed to delete post" });
//     }
//   },
// };

// // Export PostController
// module.exports = PostController;
