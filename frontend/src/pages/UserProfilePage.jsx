// frontend/src/pages/UserProfilePage.jsx
// Client-side component for the user profile page

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/auth/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRedirect(true);
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/login" replace={true} />;
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
