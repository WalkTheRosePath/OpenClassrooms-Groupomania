// frontend/src/components/NavBar.jsx
// Client-side component for the NavBar

import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  // Get the current pathname using useLocation
  const location = useLocation();
  const { pathname } = location;

  // Function to determine whether to show the NavBar
  const shouldShowNavBar = () => {
    // Check if the current pathname is '/' or '/signup'
    return !["/login", "/signup"].includes(pathname);
  };

  // Function to log out the user
  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // Redirect to the login page
    window.location.href = "/login";
  };

  // Render the NavBar only if it should be shown
  return shouldShowNavBar() ? (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to="/create-post">Create New Post</Link>
        </li>
        <li>
          <Link to="/profile">View Profile</Link>
        </li>
        <li>
          <Link to="/logout" onClick={logout}>Log Out</Link>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default NavBar;
