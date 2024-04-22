// Client-side component for the create post page

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreatePostForm from "../components/CreatePostForm"; 

const CreatePostPage = () => {
  return (
    <div>
      <Header />
      <CreatePostForm /> 
      <Footer />
    </div>
  );
};

export default CreatePostPage;
