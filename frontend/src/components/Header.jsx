// Client-side component for the header

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img className="logo-img" src="/icon.png" alt="Groupomania Logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
