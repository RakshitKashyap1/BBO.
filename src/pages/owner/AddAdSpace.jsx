import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Layout, MapPin, DollarSign, ArrowLeft, Loader2 } from 'lucide-react';

export default function AddAdSpace() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        city: '',
        type: 'Digital',
        width: '',
        height: '',
        base_price_per_day: '',
        footfall_estimate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/adspaces/', formData);
            navigate('/owner/adspaces');
        } catch (error) {
            console.error("Failed to add ad space:", error);
            alert("Error adding ad space. Please check your inputs.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
            <button onClick={() => navigate(-1)} className="btn btn-secondary mb-6 flex items-center gap-2">
                <ArrowLeft size={18} /> Back
            </button>

            <div className="card">
                <h1 className="mb-2">List New Ad Space</h1>
                <p className="text-muted mb-8">Enter the details of your billboard or digital hoarding.</p>

                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-full form-group">
                            <label className="form-label">Location / Building Name</label>
                            <div className="relative">
                                <MapPin size={18} className="absolute left-3 top-3 text-muted" style={{ transform: 'none' }} />
                                <input 
                                    type="text" 
                                    name="location"
                                    required
                                    className="form-input" 
                                    style={{ paddingLeft: '2.5rem' }} 
                                    placeholder="e.g. Alkapuri Junction"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">City</label>
                            <input 
                                type="text" 
                                name="city"
                                required
                                className="form-input" 
                                placeholder="e.g. Vadodara"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Display Type</label>
                            <select 
                                name="type"
                                className="form-input"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="Digital">Digital Billboard</option>
                                <option value="Classic">Classic Billboard</option>
                                <option value="LED">LED Screen</option>
                                <option value="Transit">Transit Ad</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Width (m)</label>
                            <input 
                                type="number" 
                                name="width"
                                step="0.1"
                                required
                                className="form-input" 
                                placeholder="10.0"
                                value={formData.width}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Height (m)</label>
                            <input 
                                type="number" 
                                name="height"
                                step="0.1"
                                required
                                className="form-input" 
                                placeholder="5.0"
                                value={formData.height}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Base Price / Day</label>
                            <div className="relative">
                                <DollarSign size={18} className="absolute left-3 top-3 text-muted" style={{ transform: 'none' }} />
                                <input 
                                    type="number" 
                                    name="base_price_per_day"
                                    required
                                    className="form-input" 
                                    style={{ paddingLeft: '2.5rem' }} 
                                    placeholder="500.00"
                                    value={formData.base_price_per_day}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Est. Daily Footfall</label>
                            <input 
                                type="number" 
                                name="footfall_estimate"
                                className="form-input" 
                                placeholder="10000"
                                value={formData.footfall_estimate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-4 border-t pt-8" style={{ borderTop: '1px solid var(--border)' }}>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary px-8 flex items-center gap-2" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'List Space'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
