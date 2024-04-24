// frontend/src/components/SignUpForm.jsx
// Client-side component for the sign-up form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send sign-up request to the backend with formData using Axios
      const response = await axios.post("http://localhost:3000/api/auth/signup", formData);

      // Log the response data for debugging
      console.log(response.data);

      // Redirect to the login page upon successful sign-up
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code (e.g., 400, 500)
        console.error("Error signing up:", error.response.data);
        alert("Sign-up failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error signing up:", error.request);
        alert("An error occurred while signing up. Please try again later.");
      } else {
        // Other errors
        console.error("Error signing up:", error.message);
        alert("An error occurred while signing up. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
