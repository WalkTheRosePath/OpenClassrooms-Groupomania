import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts data from the backend API
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      
      <h1>Home Page</h1>

      {/* Link to create new post page */}
      <Link to="/create-post">Create New Post</Link>

      {/* Link to user profile page */}
      <Link to="/profile">View Profile</Link>

      {/* Display list of posts */}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>Author: {post.author}</p>
            <p>{post.content}</p>
            <Link to={`/post/${post.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
