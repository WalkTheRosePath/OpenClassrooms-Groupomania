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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "multimedia" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("multimedia", formData.multimedia);

      const response = await axios.post("/api/posts", formDataToSend);

      if (response.status === 200) {
        console.log("Post created successfully");
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
