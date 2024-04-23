// Client-side component for the login form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend with formData using Axios
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);

      // Log the response data for debugging
      console.log(response.data);

      // Redirect to the HomePage upon successful login
      navigate("/");
    } catch (error) {
      // Handle authentication error (e.g., invalid credentials)
      alert("Invalid email or password. Please try again.");
    }
  };

  // Function to handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LogInForm;
