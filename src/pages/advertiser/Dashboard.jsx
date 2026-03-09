/**
 * @file Dashboard.jsx
 * @description The main landing page for authenticated Advertisers.
 * It displays key performance metrics and a summary of recent bookings.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { TrendingUp, Calendar, CreditCard, Activity, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/');
                setBookings(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="animate-fade-in">
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 style={{ margin: 0 }}>Welcome back, {user?.name}</h1>
                    <p>Here's what's happening with your campaigns today.</p>
                </div>
                <Link to="/search" className="btn btn-primary">Book New Space</Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                
                <div className="card stat-card">
                    <div className="stat-icon"><Activity size={24} /></div>
                    <div>
                        <div className="stat-label">Active Campaigns</div>
                        <div className="stat-value text-gradient">{bookings.length}</div>
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
                        <div className="stat-value">${bookings.reduce((acc, b) => acc + parseFloat(b.totalPrice || 0), 0).toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h3 style={{ margin: 0 }}>Recent Bookings</h3>
                    <Link to="/advertiser/bookings" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>View All</Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
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
                                {bookings.map(booking => {
                                    const space = booking.adspace_details;
                                    return (
                                        <tr key={booking.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img 
                                                        src={`https://images.unsplash.com/photo-1542289139-441639c0d4dd?auto=format&fit=crop&q=80&w=800`} 
                                                        alt={space?.location} 
                                                        style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                                                    />
                                                    <div>
                                                        <div style={{ fontWeight: 500 }}>{space?.location}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {booking.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{space?.city}</td>
                                            <td>{booking.startDate}</td>
                                            <td>{booking.endDate}</td>
                                            <td>
                                                <span className={`badge ${booking.status === 'active' || booking.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td style={{ fontWeight: 600 }}>${parseFloat(booking.totalPrice).toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                                
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-muted">No recent bookings found.</td>
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

