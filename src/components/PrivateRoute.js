// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, userType }) => {
  const token = localStorage.getItem('token');
  const storedUserType = localStorage.getItem('userType');

  if (!token || storedUserType !== userType) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;


