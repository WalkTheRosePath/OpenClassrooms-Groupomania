// LoginPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm"; 

const LoginPage = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <Link to="/signup">Don't have an account? Sign up here.</Link>
    </div>
  );
};

export default LoginPage;
