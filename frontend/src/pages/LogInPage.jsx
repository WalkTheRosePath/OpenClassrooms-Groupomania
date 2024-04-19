// LoginPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import Header from "../components/Header"; 

const LogInPage = () => {
  return (
    <div>
      <Header />
      <h2>Log In</h2>
      <LogInForm />
      <Link to="/signup">Don't have an account? Sign up here.</Link>
    </div>
  );
};

export default LogInPage;
