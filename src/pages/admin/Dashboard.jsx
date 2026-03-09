import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, BarChart3, ShieldCheck, DollarSign, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBookings: 0,
        totalRevenue: 0,
        pendingApprovals: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // In a real app, we might have a specific admin stats endpoint
                const [usersRes, bookingsRes] = await Promise.all([
                    api.get('/users/'),
                    api.get('/bookings/')
                ]);

                const bookings = bookingsRes.data.results || bookingsRes.data;
                const users = usersRes.data.results || usersRes.data;
                const totalRevenue = bookings.reduce((acc, b) => acc + parseFloat(b.totalPrice), 0);
                const platformFees = totalRevenue * 0.05; // 5% platform fee assumption

                setStats({
                    totalUsers: users.length,
                    totalBookings: bookings.length,
                    totalRevenue: platformFees,
                    pendingApprovals: bookings.filter(b => b.status === 'pending').length
                });
            } catch (error) {
                console.error("Error fetching admin dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 style={{ margin: 0 }}>System Administration</h1>
                <p>Global overview of the BillBoardOrganiser platform.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}><Users size={24} /></div>
                    <div>
                        <div className="stat-label">Total Users</div>
                        <div className="stat-value">{stats.totalUsers}</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}><BarChart3 size={24} /></div>
                    <div>
                        <div className="stat-label">Total Bookings</div>
                        <div className="stat-value">{stats.totalBookings}</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}><DollarSign size={24} /></div>
                    <div>
                        <div className="stat-label">Platform Earnings</div>
                        <div className="stat-value">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}><ShieldCheck size={24} /></div>
                    <div>
                        <div className="stat-label">System Health</div>
                        <div className="stat-value" style={{ fontSize: '1.2rem', color: 'var(--success)' }}>Optimal</div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="mb-4">Operational Status</h3>
                    {isLoading ? (
                        <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" /></div>
                    ) : (
                        <ul className="flex-col gap-4">
                            <li className="flex justify-between items-center p-3 rounded bg-panel">
                                <span>Pending Approval Queue</span>
                                <span className="badge badge-warning">{stats.pendingApprovals} bookings</span>
                            </li>
                            <li className="flex justify-between items-center p-3 rounded bg-panel">
                                <span>User Growth (MTD)</span>
                                <span className="text-success" style={{ fontWeight: 600 }}>+12%</span>
                            </li>
                            <li className="flex justify-between items-center p-3 rounded bg-panel">
                                <span>Server Latency</span>
                                <span className="text-muted">42ms</span>
                            </li>
                        </ul>
                    )}
                </div>

                <div className="card bg-gradient" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white' }}>
                    <h3 className="mb-4" style={{ color: 'white' }}>Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>Export Financials</button>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>System Logs</button>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>User Audit</button>
                        <button className="btn" style={{ background: 'white', color: 'var(--primary)', border: 'none' }}>Platform Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
