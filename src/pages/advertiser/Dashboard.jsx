import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockBookings, mockAdSpaces } from '../../data/mockData';
import { TrendingUp, Calendar, CreditCard, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { user } = useAuth();

    // Filter bookings for the current advertiser
    const activeBookings = mockBookings.filter(b => b.advertiserId === user.id);

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 style={{ margin: 0 }}>Welcome back, {user.name}</h1>
                    <p>Here's what's happening with your campaigns today.</p>
                </div>
                <Link to="/search" className="btn btn-primary">Book New Space</Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="card stat-card">
                    <div className="stat-icon"><Activity size={24} /></div>
                    <div>
                        <div className="stat-label">Active Campaigns</div>
                        <div className="stat-value text-gradient">{activeBookings.length}</div>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}><TrendingUp size={24} /></div>
                    <div>
                        <div className="stat-label">Total Impressions</div>
                        <div className="stat-value">4.2M</div>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}><Calendar size={24} /></div>
                    <div>
                        <div className="stat-label">Days Live</div>
                        <div className="stat-value">124</div>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}><CreditCard size={24} /></div>
                    <div>
                        <div className="stat-label">Total Spend &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="stat-value">$36.2k</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h3 style={{ margin: 0 }}>Recent Bookings</h3>
                    <Link to="/advertiser/bookings" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>View All</Link>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Space Details</th>
                                <th>Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeBookings.map(booking => {
                                const space = mockAdSpaces.find(s => s.id === booking.spaceId);
                                return (
                                    <tr key={booking.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img src={space?.image} alt={space?.title} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{space?.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {booking.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{space?.location}</td>
                                        <td>{booking.startDate}</td>
                                        <td>{booking.endDate}</td>
                                        <td>
                                            <span className={`badge ${booking.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>${booking.totalCost.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                            {activeBookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-muted">No recent bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
