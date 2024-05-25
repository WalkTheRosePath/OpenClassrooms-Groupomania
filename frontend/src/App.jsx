// frontend/src/App.jsx
// Client-side main App component that contains all the routes for the application

// Import necessary modules
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import PrivateRoute from "./components/PrivateRoute"; 

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/create-post" element={<PrivateRoute><CreatePostPage /></PrivateRoute>} />
      <Route path="/post/:id" element={<PrivateRoute><PostDetailsPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default App;

