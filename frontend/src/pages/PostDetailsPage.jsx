// frontend/src/pages/PostDetailsPage.jsx
// Client-side component for the post details page

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PostDetailsPage = () => {
  // State to store the post data
  const [post, setPost] = useState(null);
  // State to track loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to track error
  const [error, setError] = useState(null);

  // Get the post ID from URL parameters
  const { id } = useParams();

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPost(response.data);
        setIsLoading(false);
        // TODO axios request to mark post as read, look at creating a post with headers, only json no form data
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      <Header />
      <h1>Post Details</h1>
      <NavBar />
      <main>
        <div className="post-details-container">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {post && (
            // Render post details
            <div className="post-details">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Render multimedia content if available */}
              {post.multimediaUrl && (
                <div className="multimedia">
                  {post.multimediaUrl.endsWith(".mp4") ? (
                    <video controls>
                      <source src={post.multimediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={post.multimediaUrl} alt="Multimedia" />
                  )}
                </div>
              )}
              <p>
                Posted by:{" "}
                {post.User
                  ? `${post.User.firstName} ${post.User.lastName}`
                  : "Loading..."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Export the protected post details page
export default PostDetailsPage;
