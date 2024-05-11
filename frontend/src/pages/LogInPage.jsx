// frontend/src/pages/LogInPage.jsx
// Client-side component for the login page

import React from "react";
import { Link } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

const BaseLogInPage = () => {
  return (
    <div>
      <Header />
      <h1>Log In</h1>
      <main>
        <LogInForm />
        <Link to="/signup">Don't have an account? Click here to sign up.</Link>
      </main>
      <Footer />
    </div>
  );
};

// Export the protected login page
const LogInPage = () => <ProtectedRoute component={BaseLogInPage} />;

export default LogInPage;