/**
 * @file Search.jsx
 * @description The marketplace page where users can browse and search for available advertisement spaces.
 * It features a search bar that filters the displayed list of billboards in real-time.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Search as SearchIcon, MapPin, Filter, Loader2 } from 'lucide-react';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [adSpaces, setAdSpaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAdSpaces = async () => {
            try {
                const response = await api.get('/adspaces/');
                setAdSpaces(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching ad spaces:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAdSpaces();
    }, []);

    const filteredSpaces = adSpaces.filter(space =>
        (space.location?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (space.city?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (space.type?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1>Explore Ad Spaces</h1>
                    <p>Find the perfect location for your next campaign</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div style={{ position: 'relative' }} className="w-full md:w-64">
                        <SearchIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search locations..."
                            className="form-input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-secondary">
                        <Filter size={18} /> Filters
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 size={40} className="animate-spin text-primary" />
                    <p>Loading advertisement spaces...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpaces.map(space => (
                        <Link to={`/ad/${space.id}`} key={space.id} className="card p-0 overflow-hidden" style={{ padding: 0, textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                            <img 
                                src={`https://images.unsplash.com/photo-1542289139-441639c0d4dd?auto=format&fit=crop&q=80&w=800`} 
                                alt={space.location} 
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid var(--border)' }} 
                            />
                            
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: 0 }}>{space.location}</h3>
                                    <span className={`badge ${space.type === 'Digital' ? 'badge-info' : 'badge-warning'}`}>{space.type}</span>
                                </div>
                                <p className="flex items-center gap-1 text-sm mt-1 mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    <MapPin size={14} /> {space.city}
                                </p>

                                <div className="mt-auto pt-4 border-t" style={{ borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>${parseFloat(space.basePricePerDay).toLocaleString()}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/day</span>
                                    </div>
                                    <span className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>View Details</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {filteredSpaces.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p style={{ fontSize: '1.25rem' }}>No ad spaces found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

