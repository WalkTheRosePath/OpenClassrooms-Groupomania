import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => (
  <Router>
    <Routes>
      {/* Route for the root URL to render LogInPage */}
      <Route path="/" element={<LogInPage />} />

      {/* Route for the /signup URL to render SignUpPage */}
      <Route path="/signup" element={<SignUpPage />} />

      {/* Route for the /home URL to render HomePage */}
      <Route path="/home" element={<HomePage />} />

      {/* Route for the /post/:id URL to render PostDetailsPage */}
      <Route path="/post/:id" element={<PostDetailsPage />} />

      {/* Route for the /profile URL to render UserProfilePage */}
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  </Router>
);

export default App;
