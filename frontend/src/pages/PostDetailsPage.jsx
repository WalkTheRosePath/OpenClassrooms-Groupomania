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

        // Mark the post as read
        await axios.put(
          `http://localhost:3000/api/posts/${id}/read`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error fetching post:", error);
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
        {post && (
          // Render post details
          <div className="post-details">
            <h2 className="post-element">{post.title}</h2>
            {post.multimediaUrl && (
              <div className="multimedia">
                {post.multimediaUrl.endsWith(".jpg") ||
                post.multimediaUrl.endsWith(".png") ? (
                  <img
                    className="post-element"
                    src={post.multimediaUrl}
                    alt={post.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : null}

                {post.multimediaUrl.endsWith(".mp4") ? (
                  <video
                    className="post-element"
                    width="300"
                    height="220"
                    controls
                  >
                    <source src={post.multimediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}

                {post.multimediaUrl.endsWith(".mp3") ? (
                  <audio className="post-element" controls>
                    <source src={post.multimediaUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : null}
              </div>
            )}
            <p className="post-content post-element">{post.content}</p>
            <p className="post-element">
              Author:{" "}
              {post.User
                ? `${post.User.firstName} ${post.User.lastName}`
                : "Loading..."}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

// Export the post details page
export default PostDetailsPage;
