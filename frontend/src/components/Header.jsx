// Client-side component for the header

import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/icon.png" alt="Groupomania Logo" />
        </Link>
      </div>
      <div className="title">
        <h1>Groupomania</h1>
        <h2>Connect with our community!</h2>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
