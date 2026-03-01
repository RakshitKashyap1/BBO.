import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Monitor, UserCircle, LogOut, Menu } from 'lucide-react';
import Footer from '../components/Footer';

export default function PublicLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardLink = () => {
        if (!user) return '/login';
        if (user.role === 'advertiser') return '/advertiser/dashboard';
        if (user.role === 'owner') return '/owner/dashboard';
        if (user.role === 'admin') return '/admin/dashboard';
        return '/';
    }

    return (
        <div className="flex-col min-h-screen">
            <nav className="navbar">
                <div className="container navbar-container">
                    <Link to="/" className="navbar-brand">
                        <Monitor size={28} className="text-primary" />
                        BBO.
                    </Link>

                    <div className="navbar-links">
                        <Link to="/search" className="navbar-link">Explore Ad Spaces</Link>
                        {user ? (
                            <>
                                <Link to={dashboardLink()} className="navbar-link">Dashboard</Link>
                                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                                    <LogOut size={16} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-link">Login</Link>
                                <Link to="/register" className="btn btn-primary">Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full pt-20" style={{ paddingBottom: '4rem' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
