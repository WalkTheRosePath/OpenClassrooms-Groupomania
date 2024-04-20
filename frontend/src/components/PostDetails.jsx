// Client-side component for the post details page

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {/* Render multimedia content if available */}
      {post.multimediaUrl && (
        <div>
          <h3>Multimedia</h3>
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
  );
};

export default PostDetails;
