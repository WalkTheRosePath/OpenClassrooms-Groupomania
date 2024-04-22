// Client-side component for the post details page

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PostDetailsPage = () => {
  // State to store the post data
  const [post, setPost] = useState(null);
  // State to track loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to track error
  const [error, setError] = useState(null);

  // Get the postId from URL parameters
  const { postId } = useParams();

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/post/${postId}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPost();

    // Clean up function
    return () => {
      // Perform any necessary cleanup
    };
  }, [postId]);

  return (
    <div>
      <Header />
      <h1>Post Details</h1>
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
              <p>Posted by: User {post.userId}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetailsPage;
