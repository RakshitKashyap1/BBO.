/**
 * @file AuthContext.jsx
 * @description Provides a global state for user authentication using React Context.
 * This ensures that user data and login/logout functions are available to any component in the app.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login/', { email, password });
            const { access, refresh, role } = response.data;
            
            localStorage.setItem('token', access);
            localStorage.setItem('refresh_token', refresh);
            
            // For now, we'll store basic user info. In a real app, you might fetch profile info.
            const userInfo = { email, role, name: email.split('@')[0] };
            setUser(userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo));
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            const errorMsg = error.response?.data?.error || error.response?.data?.detail || "Login failed - please check credentials";
            return { success: false, error: errorMsg };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth: Custom hook to easily access authentication context from any functional component.
 * @returns {Object} - Contains { user, login, logout }.
 * @throws {Error} - If used outside of an AuthProvider.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

