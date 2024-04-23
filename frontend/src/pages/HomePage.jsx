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
        const response = await axios.get("/api/post");
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
      <NavBar />
      {/* Display list of posts */}
      <main>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>Author: {post.author}</p>
            <p>{post.content}</p>
            <Link to={`/post/${post.id}`}>Read more</Link>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
