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
import { Toaster } from 'react-hot-toast';
import Spinner from './components/common/Spinner';
import api from './services/api';
import { User, Layers, Calendar, CreditCard, PieChart } from 'lucide-react';

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

// Generic Data Manager for formerly MockPages
const DataDashboard = ({ title, icon: Icon, endpoint, columns }) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get(endpoint);
                setData(res.data.results || res.data);
            } catch (err) {
                setError(`Failed to load ${title.toLowerCase()}`);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [endpoint, title]);

    if (loading) return <div className="h-full flex items-center justify-center"><Spinner size="lg" /></div>;
    if (error) return <div className="card border-danger text-danger p-8 text-center"><h2>Error</h2><p>{error}</p></div>;

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <div className="stat-icon"><Icon size={24} /></div>
                <h1 className="m-0">{title}</h1>
            </div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr><td colSpan={columns.length} className="text-center py-8">No records found</td></tr>
                        ) : (
                            data.map((row, i) => (
                                <tr key={row.id || i}>
                                    {columns.map(c => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

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
            <Toaster position="top-right" />
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
                            <Route path="/admin/users" element={
                                <DataDashboard 
                                    title="Platform Users" 
                                    icon={User} 
                                    endpoint="/users/" 
                                    columns={[
                                        { key: 'id', label: 'ID' },
                                        { key: 'name', label: 'Name' },
                                        { key: 'email', label: 'Email' },
                                        { key: 'role', label: 'Role', render: (u) => <span className={`badge ${u.role === 'admin' ? 'badge-primary' : u.role === 'owner' ? 'badge-warning' : 'badge-info'}`}>{u.role}</span> }
                                    ]}
                                />
                            } />
                            <Route path="/admin/adspaces" element={
                                <DataDashboard 
                                    title="Global Ad Spaces" 
                                    icon={Layers} 
                                    endpoint="/adspaces/" 
                                    columns={[
                                        { key: 'title', label: 'Billboard' },
                                        { key: 'city', label: 'City' },
                                        { key: 'basePricePerDay', label: 'Price/Day', render: (a) => `$${a.basePricePerDay}` },
                                        { key: 'availabilityStatus', label: 'Status', render: (a) => <span className={`badge ${a.availabilityStatus === 'available' ? 'badge-success' : 'badge-warning'}`}>{a.availabilityStatus}</span> }
                                    ]}
                                />
                            } />
                            <Route path="/admin/bookings" element={
                                <DataDashboard 
                                    title="System Bookings" 
                                    icon={Calendar} 
                                    endpoint="/bookings/" 
                                    columns={[
                                        { key: 'id', label: 'Ref' },
                                        { key: 'startDate', label: 'Starts' },
                                        { key: 'endDate', label: 'Ends' },
                                        { key: 'totalPrice', label: 'Total', render: (b) => `$${b.totalPrice}` },
                                        { key: 'status', label: 'Status', render: (b) => <span className={`badge ${b.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{b.status}</span> }
                                    ]}
                                />
                            } />
                            <Route path="/admin/payments" element={
                                <DataDashboard 
                                    title="Payment Transactions" 
                                    icon={CreditCard} 
                                    endpoint="/payments/" 
                                    columns={[
                                        { key: 'id', label: 'ID' },
                                        { key: 'amount', label: 'Amount', render: (p) => `$${p.amount}` },
                                        { key: 'payment_method', label: 'Method' },
                                        { key: 'status', label: 'Status', render: (p) => <span className={`badge ${p.status === 'successful' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span> }
                                    ]}
                                />
                            } />
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

