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
      // Check if formData contains the required field (title)
      if (!formData.title.trim()) {
        console.error("Missing required field: Title");
        window.alert("Please enter a title for your post.");
        return;
      }

      // Create a FormData object to send the file
      const postData = new FormData();
      // postData.append("title", formData.title);
      // postData.append("content", formData.content);
      postData.append(
        "post",
        JSON.stringify({ title: formData.title, content: formData.content })
      );
      if (selectedFile) {
        postData.append("media", selectedFile);
      }

      // FIXME If a file doesn't exist, send a regular JSON POST request
      // if (selectedFile) {
      // THEN do below
      // else do a regular JSON POST request like for signup and login

      // Send a POST request to create a new post using Axios
      const response = await axios.post(
        "http://localhost:3000/api/posts",

        postData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CreatePostForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     multimedia: null,
//   });
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get the user ID from local storage
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else {
//       console.error("User ID not found in local storage");
//     }
//   }, []);

//   // Function to handle changes in form fields
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if formData contains the required field (title)
//       if (!formData.title.trim()) {
//         console.error("Missing required field: Title");
//         window.alert("Please enter a title for your post.");
//         return;
//       }

//       // Create a FormData object to send the file
//       const postData = new FormData();
//       postData.append("title", formData.title);
//       postData.append("content", formData.content);
//       postData.append("multimedia", formData.multimedia);
//       postData.append("userId", userId);

//       // Send a POST request to create a new post using Axios
//       const response = await axios.post(
//         "http://localhost:3000/api/posts",
//         postData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("Post created successfully");
//         // Redirect the user to the homepage
//         navigate("/home");
//       } else {
//         console.error("Failed to create post:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="content">Content</label>
//           <textarea
//             id="content"
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="multimedia">Upload Multimedia</label>
//           <input
//             type="file"
//             id="multimedia"
//             name="multimedia"
//             accept=".jpg, .jpeg, .png, .mp3, .mp4"
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Create Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePostForm;
