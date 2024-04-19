// SignupPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const SignupPage = () => {
  return (
    <div>
      <Header />
      <h2>Sign Up</h2>
      {/* Signup form */}
      <Link to="/">Already have an account? Log in here.</Link>
    </div>
  );
};

export default SignupPage;
