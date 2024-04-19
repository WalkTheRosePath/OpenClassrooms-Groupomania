import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    multimedia: null,
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if formData contains all required fields for creating a post
      if (!formData.title || !formData.content || !formData.userId) {
        console.error("Missing required fields for creating a post");
        // TODO display an error message to the user
        return;
      }

      // Send a POST request to create a new post using Axios
      const response = await axios.post("/api/posts", formData);

      if (response.status === 200) {
        console.log("Post created successfully");
        // Redirect the user to the homepage
        navigate("/home");
      } else {
        console.error("Failed to create post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="multimedia">Upload Multimedia:</label>
          <input
            type="file"
            id="multimedia"
            name="multimedia"
            accept=".jpg, .jpeg, .png, .mp3, .mp4"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      <Footer />
    </div>
  );
};

export default CreatePostPage;
