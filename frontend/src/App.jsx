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
import PrivateRoute from "./utils/PrivateRoute"; 

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


// The code below works, but is not protected

// // Import necessary modules
// import './App.css';
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
// } from "react-router-dom";
// import LogInPage from "./pages/LogInPage";
// import SignUpPage from "./pages/SignUpPage";
// import HomePage from "./pages/HomePage";
// import CreatePostPage from "./pages/CreatePostPage";
// import PostDetailsPage from "./pages/PostDetailsPage";
// import UserProfilePage from "./pages/UserProfilePage";

// // Define routes for different URLs
// const App = () => (
//   <Router>
//     <Routes>
//       {/* Route for the root URL to render LogInPage */}
//       <Route path="/login" element={<LogInPage />} />

//       {/* Route for the /signup URL to render SignUpPage */}
//       <Route path="/signup" element={<SignUpPage />} />

//       {/* Route for the /home URL to render HomePage
//       <ProtectedRoute path="/" component={<HomePage />} /> */}
//       <Route path="/" element={<HomePage />} />

//       {/* Route for the /create-post URL to render CreatePostPage */}
//       <Route path="/create-post" element={<CreatePostPage />} />

//       {/* Route for the /post/:id URL to render PostDetailsPage */}
//       <Route path="/post/:id" element={<PostDetailsPage />} />

//       {/* Route for the /profile URL to render UserProfilePage */}
//       <Route path="/profile" element={<UserProfilePage />} />
//     </Routes>
//   </Router>
// );

// export default App;
