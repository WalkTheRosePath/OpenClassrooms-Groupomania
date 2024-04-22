// Client-side component for the header

import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "../App.css";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img className="logo-img" src="/icon.png" alt="Groupomania Logo" />
        </Link>
        <h2>Groupomania</h2>
        <h3>Connect with our community!</h3>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
