/**
 * @file App.jsx
 * @description The main component of the application. 
 * It sets up the Routing, Authentication Context, and Layout structures.
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts - Wrapper components that provide consistent UI (Header, Footer, Sidebar)
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages to import - Actual page content components
import Home from './pages/public/Home';
import Search from './pages/public/Search';
import AdDetails from './pages/public/AdDetails';
import Login from './pages/public/Login';

// Advertiser Pages
import AdvertiserDashboard from './pages/advertiser/Dashboard';
import AdvertiserBookings from './pages/advertiser/Bookings';

// Owner Pages
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerBookings from './pages/owner/Bookings';
import OwnerAdSpaces from './pages/owner/AdSpaces';
import OwnerAddAdSpace from './pages/owner/AddAdSpace';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';

/**
 * MockPage: A utility component used to render a placeholder page for routes 
 * that haven't been fully individualised yet.
 * @param {string} title - The title of the page to display.
 */
const MockPage = ({ title }) => (
    <div className="animate-fade-in">
        <h1 className="mb-8">{title}</h1>
        <div className="card">
            <p>This is the <strong>{title}</strong> page for the demo.</p>
        </div>
    </div>
);

/**
 * App: The root React component.
 * It manages:
 * 1. AuthProvider: Provides authentication state to all child components.
 * 2. BrowserRouter: Enables client-side routing.
 * 3. Routes: Defines the mapping between URL paths and components.
 */
export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* 
                        Public Routes 
                        Wrapped in PublicLayout (Global Header/Footer).
                        Available to everyone.
                    */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/ad/:id" element={<AdDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<MockPage title="Register" />} />
                    </Route>

                    {/* 
                        Advertiser Secured Routes 
                        Requires a logged-in user with the 'advertiser' role.
                        Wrapped in DashboardLayout (Sidebar/Top Nav).
                    */}
                    <Route element={<ProtectedRoute allowedRoles={['advertiser']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
                            <Route path="/advertiser/bookings" element={<AdvertiserBookings />} />
                            <Route path="/advertiser/campaigns" element={<MockPage title="My Campaigns" />} />
                            <Route path="/advertiser/upload-creative" element={<MockPage title="Upload Creative" />} />
                            <Route path="/advertiser/reports" element={<MockPage title="Campaign Reports" />} />
                            <Route path="/advertiser/profile" element={<MockPage title="Advertiser Profile" />} />
                        </Route>
                    </Route>

                    {/* 
                        Owner Secured Routes 
                        Requires a logged-in user with the 'owner' role.
                        Wrapped in DashboardLayout.
                    */}
                    <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                            <Route path="/owner/adspaces" element={<OwnerAdSpaces />} />
                            <Route path="/owner/add-adspace" element={<OwnerAddAdSpace />} />
                            <Route path="/owner/bookings" element={<OwnerBookings />} />
                            <Route path="/owner/earnings" element={<MockPage title="Earnings Report" />} />
                            <Route path="/owner/profile" element={<MockPage title="Owner Profile" />} />
                        </Route>
                    </Route>

                    {/* 
                        Admin Secured Routes 
                        Requires a logged-in user with the 'admin' role.
                        Wrapped in DashboardLayout.
                    */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<MockPage title="Manage Users" />} />
                            <Route path="/admin/adspaces" element={<MockPage title="Manage All Ad Spaces" />} />
                            <Route path="/admin/bookings" element={<MockPage title="All Bookings" />} />
                            <Route path="/admin/payments" element={<MockPage title="Payments Control" />} />
                            <Route path="/admin/reports" element={<MockPage title="System Reports" />} />
                        </Route>
                    </Route>

                    {/* 
                        Fallback 404 Route
                        Handles any paths that do not match the defined routes above.
                    */}
                    <Route path="*" element={<div className="container" style={{ paddingTop: '10rem' }}><h1 className="text-center">404 - Not Found</h1></div>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

