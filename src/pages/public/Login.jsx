import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Monitor, User, Megaphone, ShieldCheck, Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [role, setRole] = useState('advertiser');
    const [email, setEmail] = useState('advertiser@bbo.com');
    const [password, setPassword] = useState('advertiser123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setError('');
        if (selectedRole === 'advertiser') {
            setEmail('advertiser@bbo.com');
            setPassword('advertiser123');
        } else if (selectedRole === 'owner') {
            setEmail('owner@bbo.com');
            setPassword('owner123');
        } else {
            setEmail('admin@bbo.com');
            setPassword('admin123');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            toast.success(`Successfully logged in as ${role}`);
            if (role === 'advertiser') navigate('/advertiser/dashboard');
            else if (role === 'owner') navigate('/owner/dashboard');
            else navigate('/admin/dashboard');
        } else {
            setError(result.error);
            toast.error(result.error || "Login failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="container animate-fade-in flex items-center justify-center pt-20" style={{ minHeight: '80vh' }}>
            <div className="card w-full" style={{ maxWidth: '450px', margin: 'auto' }}>
                
                <div className="text-center mb-8">
                    <Monitor size={48} className="text-primary mb-4 mx-auto" style={{ margin: '0 auto 1rem' }} />
                    <h2>Welcome Back</h2>
                    <p>Login to your account</p>
                </div>

                {error && (
                    <div className="badge badge-warning w-full mb-6 p-3" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', width: '100%', borderRadius: 'var(--radius-md)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-6">
                        <label className="form-label" style={{ marginBottom: '1rem' }}>Select Persona (Auto-fills Credentials)</label>
                        <div className="grid grid-cols-1 gap-3">
                            <label
                                className={`card p-3 flex items-center gap-3 cursor-pointer transition ${role === 'advertiser' ? 'border-primary' : ''}`}
                                style={{ borderColor: role === 'advertiser' ? 'var(--primary)' : 'var(--border)', padding: '0.75rem' }}
                                onClick={() => handleRoleSelect('advertiser')}
                            >
                                <div style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'advertiser' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'advertiser' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                    <Megaphone size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '0.9rem', margin: 0 }}>Advertiser</h3>
                                </div>
                                {role === 'advertiser' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>}
                            </label>

                            <label
                                className={`card p-3 flex items-center gap-3 cursor-pointer transition ${role === 'owner' ? 'border-primary' : ''}`}
                                style={{ borderColor: role === 'owner' ? 'var(--primary)' : 'var(--border)', padding: '0.75rem' }}
                                onClick={() => handleRoleSelect('owner')}
                            >
                                <div style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'owner' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'owner' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                    <User size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '0.9rem', margin: 0 }}>Media Owner</h3>
                                </div>
                                {role === 'owner' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>}
                            </label>

                            <label
                                className={`card p-3 flex items-center gap-3 cursor-pointer transition ${role === 'admin' ? 'border-primary' : ''}`}
                                style={{ borderColor: role === 'admin' ? 'var(--primary)' : 'var(--border)', padding: '0.75rem' }}
                                onClick={() => handleRoleSelect('admin')}
                            >
                                <div style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'admin' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'admin' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                    <ShieldCheck size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '0.9rem', margin: 0 }}>Administrator</h3>
                                </div>
                                {role === 'admin' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>}
                            </label>
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group mb-8">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.875rem' }} disabled={isLoading}>
                        {isLoading ? <Spinner size="sm" color="white" /> : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

