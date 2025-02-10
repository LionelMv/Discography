import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    localStorage.setItem("redirected", "true");
    return <Navigate to="/" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
