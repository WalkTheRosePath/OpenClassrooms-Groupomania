// frontend/src/pages/UserProfilePage.jsx
// Client-side component for the user profile page

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the backend API using Axios
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile"
        ); 
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteProfile = async () => {
    try {
      // Send a DELETE request to the backend API
      await axios.delete("http://localhost:3000/api/auth/profile");
      setRedirect(true);
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/signup" replace={true} />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h1>User Profile</h1>
      <NavBar />
      <main>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <button onClick={handleDeleteProfile}>Delete Profile</button> 
        <Footer />
      </main>
    </div>
  );
};

export default UserProfilePage;
