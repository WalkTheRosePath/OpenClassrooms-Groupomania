// frontend/src/components/CreatePostForm.jsx
// Client-side component for creating a new post

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    multimedia: null,
  });
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if formData contains the required fields
      if (!formData.title.trim()) {
        window.alert("Please enter a title for your post.");
        return;
      }
      if (!formData.content.trim()) {
        window.alert("Please enter content for your post.");
        return;
      }

      let postData;
      let config;

      if (selectedFile) {
        // Create a FormData object to send the file
        postData = new FormData();
        postData.append(
          "post",
          JSON.stringify({ title: formData.title, content: formData.content })
        );
        postData.append("media", selectedFile);
        config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      } else {
        postData = {
          title: formData.title,
          content: formData.content,
        };
        config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      }

      // Send a POST request to create a new post using Axios
      const response = await axios.post(
        "http://localhost:3001/api/posts",
        postData,
        config
      );
      // Check if the response is "Created"
      if (response.status >= 200 && response.status < 300) {
        console.log("Post created successfully");
        // Redirect the user to the homepage
        navigate("/");
      } else {
        console.error("Failed to create post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="multimedia">Upload Multimedia</label>
          <input
            type="file"
            // value={selectedFile || ""}
            id="media"
            name="media"
            accept=".jpg, .jpeg, .png, .mp3, .mp4"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
