// frontend/src/pages/HomePage.jsx
// Client-side component for the home page

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts data from the backend API
    const fetchPosts = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get("http://localhost:3000/api/posts", {
          headers,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const currentUserId = localStorage.getItem("userId");

  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <NavBar />
      {/* Display list of posts */}
      <main>
        {posts.map((post) => (
          <div key={post.id} className="post-details">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>
              Author: {post.User.firstName} {post.User.lastName}
            </p>
            {post.multimediaUrl && (
              // TODO Use conditional rendering to display html tags for multimedia based on the file extension type (image jpg or png, video mp4, audio mp3)
              <img
                src={post.multimediaUrl}
                alt={post.title}
                style={{ width: "100px", height: "auto" }}
              />
            )}
            {post.usersRead &&
              post.usersRead.includes(Number(currentUserId)) && <p>Read</p>}
            <Link to={`/post/${post.id}`}>See more</Link>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
