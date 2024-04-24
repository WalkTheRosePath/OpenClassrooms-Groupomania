// frontend/src/utils/auth.js
// Client-side authentication functions

const BASE_URL = "http://localhost:3000"; // Backend server URL

const auth = {
  // Function to handle user login
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // Save the token to local storage or session storage
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
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Function to handle user logout
  logout: () => {
    // Remove the token from local storage or session storage
    localStorage.removeItem("token");
  },

  // Function to check if the user is authenticated
  isAuthenticated: () => {
    // Check if the token exists in local storage or session storage
    return localStorage.getItem("token") !== null;
  },

  // Function to get the token
  getToken: () => {
    // Get the token from local storage or session storage
    return localStorage.getItem("token");
  },
};

export default auth;
