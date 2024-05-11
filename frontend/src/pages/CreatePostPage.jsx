// Client-side component for the create post page

import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CreatePostForm from "../components/CreatePostForm";
import ProtectedRoute from "../components/ProtectedRoute";

const BaseCreatePostPage = () => {
  return (
    <div>
      <Header />
      <h1>Create a Post</h1>
      <NavBar />
      <main>
        <CreatePostForm />
      </main>
      <Footer />
    </div>
  );
};

// Export the protected create post page
const CreatePostPage = () => <ProtectedRoute component={BaseCreatePostPage} />; 

export default CreatePostPage;
