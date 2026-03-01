import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockAdSpaces } from '../../data/mockData';
import { MapPin, Calendar, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const space = mockAdSpaces.find(s => s.id === id);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    if (!space) {
        return <div className="container pt-20 text-center"><h2>Ad Space not found</h2></div>;
    }

    // Calculate price dynamically
    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (diffDays > 0 ? diffDays : 1) * space.pricePerDay;
    };

    const total = calculateTotal();

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <Link to="/search" className="btn btn-secondary mb-6" style={{ padding: '0.4rem 0.8rem' }}>
                <ChevronLeft size={16} /> Back to Search
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                    <img src={space.image} alt={space.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} className="mb-6 shadow-md" />

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="mb-2">{space.title}</h1>
                            <p className="flex items-center gap-2" style={{ fontSize: '1.125rem' }}>
                                <MapPin size={18} /> {space.location}
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
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Format</span>
                                <strong>1920x1080px</strong>
                            </div>
                            <div>
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Est. Impressions</span>
                                <strong>1.2M / week</strong>
                            </div>
                            <div>
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Min. Booking</span>
                                <strong>{space.minDays} Days</strong>
                            </div>
                            <div>
                                <span className="text-muted" style={{ display: 'block', fontSize: '0.875rem' }}>Illumination</span>
                                <strong>24/7 LED</strong>
                            </div>
                        </div>
                    </div>

                    <h3>Features</h3>
                    <ul className="flex-col gap-2 mt-4">
                        <li className="flex items-center gap-2 text-muted"><CheckCircle2 size={16} className="text-success" /> Prime location with high footfall</li>
                        <li className="flex items-center gap-2 text-muted"><CheckCircle2 size={16} className="text-success" /> Real-time content updates via cloud</li>
                        <li className="flex items-center gap-2 text-muted"><CheckCircle2 size={16} className="text-success" /> Performance analytics included</li>
                    </ul>
                </div>

                {/* Booking Sidebar */}
                <div>
                    <div className="card" style={{ position: 'sticky', top: '90px' }}>
                        <h3 className="mb-6">Book this Space</h3>

                        <div className="mb-6 pb-6 border-b" style={{ borderBottom: '1px solid var(--border)' }}>
                            <div className="flex items-end gap-1">
                                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>${space.pricePerDay.toLocaleString()}</span>
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

                        {startDate && endDate && total > 0 && (
                            <div className="mb-6 p-4 rounded bg-panel" style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-panel-hover)' }}>
                                <div className="flex justify-between mb-2 text-sm text-muted">
                                    <span>${space.pricePerDay} x {(total / space.pricePerDay)} days</span>
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
                                <button className="btn btn-primary w-full" disabled={!startDate || !endDate}>
                                    Proceed to Payment
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
