import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  // Dummy auth function, we are to replace this with real auth logic
  const isAuthenticated = () => {
    return localStorage.getItem('authToken'); // Just an example
  };

  const Authentication = isAuthenticated();

  // If authenticated, allow access to children (i.e., AppLayout)
  // If not authenticated, redirect to login or access denied page

  return Authentication ? children : <Navigate to="/access-denied" />;
};

export default ProtectedRoute;


