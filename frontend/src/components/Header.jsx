import React from "react";
import { Link } from "react-router-dom";

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
        <h2>Connect with your community</h2>
      </div>
    </header>
  );
};

export default Header;
