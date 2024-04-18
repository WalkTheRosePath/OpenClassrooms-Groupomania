// SignupPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      {/* Signup form */}
      <Link to="/login">Already have an account? Log in here.</Link>
    </div>
  );
};

export default SignupPage;
