import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Loader2, Download, ExternalLink } from 'lucide-react';

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/');
                setBookings(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching advertiser bookings:", error);
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
                    <h1>My Bookings</h1>
                    <p>Track your active and historical advertisement slots.</p>
                </div>
                <button className="btn btn-secondary flex items-center gap-2">
                    <Download size={18} /> Export History
                </button>
            </div>

            <div className="card p-0 overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={40} />
                    </div>
                ) : (
                    <div className="table-container" style={{ margin: 0 }}>
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '1.25rem' }}>Booking ID</th>
                                    <th>Location</th>
                                    <th>City</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Total Cost</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1.25rem', fontWeight: 600 }}>#{booking.id}</td>
                                        <td>{booking.adspace_details?.location}</td>
                                        <td>{booking.adspace_details?.city}</td>
                                        <td>{booking.startDate}</td>
                                        <td>{booking.endDate}</td>
                                        <td style={{ fontWeight: 700 }}>${parseFloat(booking.totalPrice).toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${
                                                booking.status === 'active' ? 'badge-success' : 
                                                booking.status === 'pending' ? 'badge-warning' : 
                                                booking.status === 'completed' ? 'badge-info' : 'badge-danger'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="flex items-center gap-1 text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                                                Details <ExternalLink size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-20 text-muted">
                                            No bookings found. Start exploring ad spaces!
                                        </td>
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
