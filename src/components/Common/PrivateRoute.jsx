import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { appData } from '../Context/AppContext';

// Function to check if user is authenticated (replace with your actual auth logic)
const PrivateRoute = () => {
  const { userData } = appData();
  
  const isAuthenticated = () => {
    return !!userData?.access_token;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;