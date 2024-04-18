// LoginPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h2>Login</h2>
      {/* Login form */}
      <Link to="/signup">Don't have an account? Sign up here.</Link>
    </div>
  );
};

export default LoginPage;
