// Client-side main App component that contains all the routes for the application

// Import necessary modules
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";

// TODO Determine if user is logged in from the presence of a token in local storage
const isLoggedIn = true;

// Define routes for different URLs
const App = () => (
  <Router>
    <Routes>
      {/* Route for the root URL to render LogInPage */}
      <Route path="/login" element={<LogInPage />} />

      {/* Route for the /signup URL to render SignUpPage */}
      <Route path="/signup" element={<SignUpPage />} />

      {/* Route for the /home URL to render HomePage */}
      <Route
        path="/"
        element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
      />

      {/* Route for the /create-post URL to render CreatePostPage */}
      <Route path="/create-post" element={<CreatePostPage />} />

      {/* Route for the /post/:id URL to render PostDetailsPage */}
      <Route path="/post/:id" element={<PostDetailsPage />} />

      {/* Route for the /profile URL to render UserProfilePage */}
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  </Router>
);

export default App;
