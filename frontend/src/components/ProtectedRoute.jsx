// frontend/src/components/ProtectedRoute.jsx

import React from "react";
import { Route, Redirect } from "react-router-dom";

// Function to check if user is logged in
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("token");
    return (
        <Route
        {...rest}
        render={(props) =>
            token ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
};
    
export default ProtectedRoute;