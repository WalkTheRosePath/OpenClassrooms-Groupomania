// Client-side component for the sign-up page

import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";

const SignUpPage = () => {
  return (
    <div>
      <Header />
      <h2>Sign Up</h2>
      <SignUpForm />
      <Link to="/">Already have an account? Log in here.</Link>
      <Footer />
    </div>
  );
};

export default SignUpPage;
