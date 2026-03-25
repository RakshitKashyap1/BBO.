import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { TrendingUp, Layout, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';

export default function OwnerDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalSpaces: 0,
        pendingBookings: 0,
        activeBookings: 0,
        totalEarnings: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(null);

    const fetchDashboardData = async () => {
        try {
            const [spacesRes, bookingsRes] = await Promise.all([
                api.get('/adspaces/?mine=true'),
                api.get('/bookings/')
            ]);

            const mySpaces = spacesRes.data.results || spacesRes.data;
            const myBookings = bookingsRes.data.results || bookingsRes.data;

            const pending = myBookings.filter(b => b.status === 'pending').length;
            const active = myBookings.filter(b => b.status === 'active').length;
            const earnings = myBookings
                .filter(b => b.status === 'completed' || b.status === 'active')
                .reduce((acc, b) => acc + parseFloat(b.totalPrice), 0);

            setStats({
                totalSpaces: mySpaces.length,
                pendingBookings: pending,
                activeBookings: active,
                totalEarnings: earnings
            });
            setRecentBookings(myBookings.slice(0, 5));
        } catch (error) {
            console.error("Error fetching owner dashboard data:", error);
            toast.error("Failed to load dashboard statistics.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleApprove = async (id) => {
        setIsProcessing(id);
        try {
            await api.put(`/bookings/${id}/approve/`);
            toast.success("Booking request approved!");
            await fetchDashboardData();
        } catch (error) {
            toast.error("Failed to approve booking. Please try again.");
        } finally {
            setIsProcessing(null);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 style={{ margin: 0 }}>Media Owner Hub</h1>
                    <p>Manage your inventory and track your revenue.</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/owner/add-adspace" className="btn btn-primary">Add New Space</Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="card stat-card">
                    <div className="stat-icon"><Layout size={24} /></div>
                    <div>
                        <div className="stat-label">My Ad Spaces</div>
                        <div className="stat-value text-gradient">{stats.totalSpaces}</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}><Clock size={24} /></div>
                    <div>
                        <div className="stat-label">Pending Approval</div>
                        <div className="stat-value">{stats.pendingBookings}</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}><TrendingUp size={24} /></div>
                    <div>
                        <div className="stat-label">Active Campaigns</div>
                        <div className="stat-value">{stats.activeBookings}</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}><CheckCircle size={24} /></div>
                    <div>
                        <div className="stat-label">Total Revenue</div>
                        <div className="stat-value">${stats.totalEarnings.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Received */}
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h3 style={{ margin: 0 }}>Recent Requests</h3>
                    <Link to="/owner/bookings" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>View All Requests</Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Spinner size="md" />
                    </div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Advertiser</th>
                                    <th>Location</th>
                                    <th>Dates</th>
                                    <th>Total Pay</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>Advertiser ID: {booking.advertiser}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Booking #{booking.id}</div>
                                        </td>
                                        <td>{booking.adspace_details?.location}</td>
                                        <td>
                                            <div className="text-sm">{booking.startDate}</div>
                                            <div className="text-xs text-muted">to {booking.endDate}</div>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>${parseFloat(booking.totalPrice).toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${booking.status === 'active' ? 'badge-success' : booking.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            {booking.status === 'pending' && (
                                                <button 
                                                    onClick={() => handleApprove(booking.id)}
                                                    className="btn btn-primary" 
                                                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}
                                                    disabled={isProcessing === booking.id}
                                                >
                                                    {isProcessing === booking.id ? <Spinner size="sm" color="white" /> : 'Approve'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {recentBookings.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-muted">No booking requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
