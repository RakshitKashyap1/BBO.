/**
 * @file AdDetails.jsx
 * @description Displays detailed information about a specific advertisement space.
 * It allows users to select dates and see a dynamic price calculation before booking.
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { MapPin, Calendar, CheckCircle2, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';

export default function AdDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [space, setSpace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchSpaceDetails = async () => {
            try {
                const response = await api.get(`/adspaces/${id}/`);
                setSpace(response.data);
            } catch (err) {
                console.error("Error fetching ad space details:", err);
                setError("Ad Space not found");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSpaceDetails();
    }, [id]);

    const handleBook = async () => {
        if (!startDate || !endDate) return;
        setIsBooking(true);
        setError(null);
        try {
            await api.post('/bookings/', {
                adspace: id,
                startDate: startDate,
                endDate: endDate
            });
            setSuccess(true);
            toast.success("Booking created successfully!");
            setTimeout(() => {
                navigate('/advertiser/bookings');
            }, 1500);
        } catch (err) {
            console.error("Booking failed:", err);
            const errorMsg = err.response?.data?.details?.non_field_errors?.[0] || err.response?.data?.error || "Failed to create booking. Please try again.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsBooking(false);
        }
    };

    const calculateTotal = () => {
        if (!startDate || !endDate || !space) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (diffDays > 0 ? diffDays : 1) * parseFloat(space.basePricePerDay);
    };

    if (isLoading) {
        return (
            <div className="container py-20 flex flex-col items-center justify-center gap-4">
                <Spinner size="lg" />
                <p>Loading details...</p>
            </div>
        );
    }

    if (error || !space) {
        return (
            <div className="container pt-20 text-center">
                <h2>{error || "Ad Space not found"}</h2>
                <Link to="/search" className="btn btn-secondary mt-4">Return to Search</Link>
            </div>
        );
    }

    const total = calculateTotal();

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <Link to="/search" className="btn btn-secondary mb-6" style={{ padding: '0.4rem 0.8rem' }}>
                <ChevronLeft size={16} /> Back to Search
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2">
                    <img 
                        src={`https://images.unsplash.com/photo-1555239962-921cb96f9db1?auto=format&fit=crop&q=80&w=800`} 
                        alt={space.location} 
                        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
                        className="mb-6 shadow-md" 
                    />

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="mb-2">{space.location}</h1>
                            <p className="flex items-center gap-2" style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>
                                <MapPin size={18} /> {space.city}
                            </p>
                        </div>
                        <span className={`badge ${space.type === 'Digital' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                            {space.type}
                        </span>
                    </div>

                    <div className="card mb-8">
                        <h3 className="mb-4">Space Details</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Dimensions</span>
                                <strong>{space.width}m x {space.height}m</strong>
                            </div>
                            <div>
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Est. Footfall</span>
                                <strong>{(space.footfallEstimate / 1000).toFixed(1)}k / day</strong>
                            </div>
                            <div>
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Status</span>
                                <strong>{space.availabilityStatus.charAt(0).toUpperCase() + space.availabilityStatus.slice(1)}</strong>
                            </div>
                            <div>
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Technology</span>
                                <strong>{space.type}</strong>
                            </div>
                        </div>
                    </div>

                    <h3>Features</h3>
                    <ul className="flex-col gap-2 mt-4">
                        <li className="flex items-center gap-2 text-muted"><CheckCircle2 size={16} className="text-success" /> Prime location in {space.city}</li>
                        <li className="flex items-center gap-2 text-muted"><CheckCircle2 size={16} className="text-success" /> High visibility to daily commuters</li>
                        <li className="flex items-center gap-2 text-muted"><CheckCircle2 size={16} className="text-success" /> Professional maintenance included</li>
                    </ul>
                </div>

                <div>
                    <div className="card" style={{ position: 'sticky', top: '90px' }}>
                        <h3 className="mb-6">Book this Space</h3>

                        <div className="mb-6 pb-6 border-b" style={{ borderBottom: '1px solid var(--border)' }}>
                            <div className="flex items-end gap-1">
                                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>${parseFloat(space.basePricePerDay).toLocaleString()}</span>
                                <span className="text-muted">/ day</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="date"
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div className="form-group mb-6">
                            <label className="form-label">End Date</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="date"
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 mb-4 rounded bg-red-100 text-red-700 text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center gap-2 p-3 mb-4 rounded bg-green-100 text-green-700 text-sm" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                <CheckCircle2 size={16} />
                                Booking created successfully! Redirecting...
                            </div>
                        )}

                        {startDate && endDate && total > 0 && (
                            <div className="mb-6 p-4 rounded bg-panel" style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-panel-hover)' }}>
                                <div className="flex justify-between mb-2 text-sm text-muted">
                                    <span>${parseFloat(space.basePricePerDay)} x {Math.round(total / parseFloat(space.basePricePerDay))} days</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm text-muted">
                                    <span>Platform Fee (5%)</span>
                                    <span>${(total * 0.05).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between mt-4 pt-4 border-t" style={{ borderTop: '1px solid var(--border)', fontWeight: 600 }}>
                                    <span>Total Amount</span>
                                    <span className="text-primary">${(total * 1.05).toLocaleString()}</span>
                                </div>
                            </div>
                        )}

                        {user ? (
                            user.role === 'advertiser' ? (
                                <button 
                                    className="btn btn-primary w-full flex items-center justify-center gap-2" 
                                    disabled={!startDate || !endDate || isBooking || success}
                                    onClick={handleBook}
                                >
                                    {isBooking ? <Spinner size="sm" color="white" /> : 'Confirm & Pay'}
                                </button>
                            ) : (
                                <button className="btn w-full" style={{ background: 'var(--bg-panel-hover)', color: 'var(--text-muted)', cursor: 'not-allowed' }} disabled>
                                    Only advertisers can book
                                </button>
                            )
                        ) : (
                            <Link to="/login" className="btn btn-secondary w-full">
                                Login to Book
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

