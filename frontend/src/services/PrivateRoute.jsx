// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Show a loading spinner while the auth check is in progress
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // If there is a user, render the children (the protected page)
    if (user) {
        return children;
    }

    // If there is no user and loading is complete, redirect to the login page
    return <Navigate to="/" />;
};

export default PrivateRoute;