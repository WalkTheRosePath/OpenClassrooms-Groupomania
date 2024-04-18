// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* Optionally include link to Home page if user is logged in */}
      </ul>
    </nav>
  );
};

export default NavBar;
