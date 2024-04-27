// // backend/controllers/postController.js
// // Server-side controller functions for handling post-related operations

// Import necessary modules
const jwt = require("jsonwebtoken");
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
  getPostById(req, res) {
    const postId = req.params.id;
    Post.findById(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
      })
      .catch((error) => {
        console.error("Error getting post by ID:", error);
        res.status(500).json({ error: "Failed to get post" });
      });
  },

  // Controller function to create a new post
  createPost(req, res) {
    const { title, content, multimediaUrl } = req.body;
    const userId = req.user._id;

    const newPost = new Post({
      title,
      content,
      multimediaUrl,
      userId,
    });

    newPost
      .save()
      .then((post) => {
        res.status(201).json({ message: "Post created successfully", post });
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
      });
  },

  // Controller function to update a post by post ID
  updatePostById(req, res) {
    const postId = req.params.id;
    const { title, content, multimediaUrl } = req.body;

    Post.findById(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        post.title = title;
        post.content = content;
        post.multimediaUrl = multimediaUrl;

        return post.save();
      })
      .then((updatedPost) => {
        res
          .status(200)
          .json({ message: "Post updated successfully", updatedPost });
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
      });
  },

  // Controller function to delete a post by post ID
    deletePostById(req, res) { 
        const postId = req.params.id;
        Post.findByIdAndDelete(postId)
            .then(deletedPost => {
                if (!deletedPost) {
                    return res.status(404).json({ error: "Post not found" });
                }
                res.status(200).json({ message: "Post deleted successfully" });
            })
            .catch(error => {
                console.error("Error deleting post:", error);
                res.status(500).json({ error: "Failed to delete post" });
            });
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
