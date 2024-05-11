// frontend/src/components/ProtectedRoute.jsx

import { Route, Navigate } from "react-router-dom";

// Function to check if user is logged in
const ProtectedRoute = ({ path, component }) => {
  const token = localStorage.getItem("token");

  // return (
  //   <Route path={path} element={token ? component : <Navigate to="/login" />} />
  // );
};

export default ProtectedRoute;
