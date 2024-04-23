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
    return !["/", "/signup"].includes(pathname);
  };

  // Render the NavBar only if it should be shown
  return shouldShowNavBar() ? (
    <nav>
      <ul>
        <li>
          <Link to="/create-post">Create New Post</Link>
        </li>
        <li>
          <Link to="/profile">View Profile</Link>
        </li>
        <li>
          <Link to="/">Log Out</Link>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default NavBar;
