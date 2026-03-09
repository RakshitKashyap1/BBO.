import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function ReceivedBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/bookings/');
            setBookings(response.data.results || response.data);
        } catch (error) {
            console.error("Error fetching received bookings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            if (action === 'approve') {
                await api.put(`/bookings/${id}/approve/`);
            } else if (action === 'complete') {
                await api.put(`/bookings/${id}/complete/`);
            }
            fetchBookings();
        } catch (error) {
            alert(`Failed to ${action} booking`);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1>Received Bookings</h1>
                <p>Manage requests from advertisers for your ad spaces.</p>
            </div>

            <div className="card p-0">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={40} />
                    </div>
                ) : (
                    <div className="table-container" style={{ margin: 0 }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Advertiser</th>
                                    <th>Space</th>
                                    <th>Dates</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>#{booking.id}</td>
                                        <td>User {booking.advertiser}</td>
                                        <td>{booking.adspace_details?.location}</td>
                                        <td>
                                            {booking.startDate} <br/>
                                            <small className="text-muted">to {booking.endDate}</small>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>${parseFloat(booking.totalPrice).toLocaleString()}</td>
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
                                            <div className="flex gap-2">
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleAction(booking.id, 'approve')} className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '10px' }}>
                                                            <CheckCircle size={14} className="mr-1" /> Approve
                                                        </button>
                                                        <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '10px' }}>
                                                            <XCircle size={14} className="mr-1" /> Reject
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === 'active' && (
                                                    <button onClick={() => handleAction(booking.id, 'complete')} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '10px' }}>
                                                        Mark Completed
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-20 text-muted">No booking requests received yet.</td>
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
