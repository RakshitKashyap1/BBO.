/**
 * @file ProtectedRoute.jsx
 * @description A security wrapper component for routes that require authentication.
 * It checks if a user is logged in and if they have the necessary permissions (roles) to access a route.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute:
 * @param {Array} allowedRoles - A list of roles that are permitted to view the child routes.
 */
export default function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();

    // 1. If the user is NOT authenticated, redirect them to the login page.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. If the user IS authenticated but DOES NOT have one of the allowed roles:
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect them to their respective dashboard instead of showing an error.
        switch (user.role) {
            case 'advertiser': return <Navigate to="/advertiser/dashboard" replace />;
            case 'owner': return <Navigate to="/owner/dashboard" replace />;
            case 'admin': return <Navigate to="/admin/dashboard" replace />;
            default: return <Navigate to="/" replace />;
        }
    }

    // 3. If everything is fine, render the nested route components via <Outlet />.
    return <Outlet />;
}

