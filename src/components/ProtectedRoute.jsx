import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Determine fallback based on role
        switch (user.role) {
            case 'advertiser': return <Navigate to="/advertiser/dashboard" replace />;
            case 'owner': return <Navigate to="/owner/dashboard" replace />;
            case 'admin': return <Navigate to="/admin/dashboard" replace />;
            default: return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
}
