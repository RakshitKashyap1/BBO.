import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages to import
import Home from './pages/public/Home';
import Search from './pages/public/Search';
import AdDetails from './pages/public/AdDetails';
import Login from './pages/public/Login';

// Advertiser Pages
import AdvertiserDashboard from './pages/advertiser/Dashboard';

// Mock Page Builder Utility to avoid 30 files...
const MockPage = ({ title }) => (
    <div className="animate-fade-in">
        <h1 className="mb-8">{title}</h1>
        <div className="card">
            <p>This is the <strong>{title}</strong> page for the demo.</p>
        </div>
    </div>
);

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/ad/:id" element={<AdDetails />} />
                        <Route path="/login" element={<Login />} />
                        {/* Using mock page for register */}
                        <Route path="/register" element={<MockPage title="Register" />} />
                    </Route>

                    {/* Advertiser Secured Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['advertiser']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
                            <Route path="/advertiser/bookings" element={<MockPage title="My Bookings" />} />
                            <Route path="/advertiser/campaigns" element={<MockPage title="My Campaigns" />} />
                            <Route path="/advertiser/upload-creative" element={<MockPage title="Upload Creative" />} />
                            <Route path="/advertiser/reports" element={<MockPage title="Campaign Reports" />} />
                            <Route path="/advertiser/profile" element={<MockPage title="Advertiser Profile" />} />
                        </Route>
                    </Route>

                    {/* Owner Secured Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/owner/dashboard" element={<MockPage title="Owner Dashboard" />} />
                            <Route path="/owner/adspaces" element={<MockPage title="Manage Ad Spaces" />} />
                            <Route path="/owner/add-adspace" element={<MockPage title="Add New Ad Space" />} />
                            <Route path="/owner/bookings" element={<MockPage title="Received Bookings" />} />
                            <Route path="/owner/earnings" element={<MockPage title="Earnings Report" />} />
                            <Route path="/owner/profile" element={<MockPage title="Owner Profile" />} />
                        </Route>
                    </Route>

                    {/* Admin Secured Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/admin/dashboard" element={<MockPage title="Admin Dashboard" />} />
                            <Route path="/admin/users" element={<MockPage title="Manage Users" />} />
                            <Route path="/admin/adspaces" element={<MockPage title="Manage All Ad Spaces" />} />
                            <Route path="/admin/bookings" element={<MockPage title="All Bookings" />} />
                            <Route path="/admin/payments" element={<MockPage title="Payments Control" />} />
                            <Route path="/admin/reports" element={<MockPage title="System Reports" />} />
                        </Route>
                    </Route>

                    {/* Fallback 404 */}
                    <Route path="*" element={<div className="container" style={{ paddingTop: '10rem' }}><h1 className="text-center">404 - Not Found</h1></div>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
