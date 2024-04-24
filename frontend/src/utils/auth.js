// frontend/src/utils/auth.js
// Client-side authentication functions

import api from "./api";

const auth = {
  // Function to handle user login
  login: async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const data = response.data;
      // Save the token to local storage
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Function to handle user signup
  signup: async (email, password) => {
    try {
      const response = await api.post("/signup", { email, password });
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Function to handle user logout
  logout: () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
  },

  // Function to check if the user is authenticated
  isAuthenticated: () => {
    // Check if the token exists in local storage
    return localStorage.getItem("token") !== null;
  },

  // Function to get the token
  getToken: () => {
    // Get the token from local storage or session storage
    return localStorage.getItem("token");
  },
};

export default auth;
