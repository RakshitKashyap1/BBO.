import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (role) => {
        // Select the first mock user that matches the requested role
        const foundUser = mockUsers.find(u => u.role === role);
        if (foundUser) {
            setUser(foundUser);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
