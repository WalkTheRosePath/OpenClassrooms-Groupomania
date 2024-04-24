// Client-side component for the user profile page

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

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
        <Footer />
      </main>
    </div>
  );
};

// TODO Add delete user button

export default UserProfilePage;
