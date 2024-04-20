// Client-side component for the user profile page

import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the backend API
        const response = await axios.get("/api/user"); // Adjust the API endpoint accordingly
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
      <h1>User Profile</h1>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      {/* Add more user information as needed */}
    </div>
  );
};

export default UserProfilePage;
