'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'ADMIN' | 'CLIENT' | 'ENTREPRISE';
    userName: string;
    onLogout: () => void;
}

export default function DashboardLayout({ children, role, userName, onLogout }: DashboardLayoutProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            {/* Mobile Header */}
            <header
                className="mobile-header"
                style={{
                    display: 'none', // Hidden on desktop
                    padding: '15px 20px',
                    background: 'white',
                    borderBottom: '1px solid #edf2f7',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 90
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px' }}
                    >
                        <Menu size={24} color="#2d3748" />
                    </button>
                    <span style={{ fontWeight: '800', fontSize: '18px', color: '#D52B1E' }}>DevisMaison</span>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar
                    role={role}
                    userName={userName}
                    onLogout={onLogout}
                    isOpen={isSidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="main-content" style={{ flex: 1, background: '#f5f5f5', minHeight: '100vh', transition: 'margin 0.3s' }}>
                    {children}
                </main>
            </div>

            <style jsx>{`
                /* Desktop styles */
                .main-content {
                    margin-left: 260px;
                }

                @media (max-width: 768px) {
                    .mobile-header {
                        display: flex !important;
                    }
                    
                    .main-content {
                        margin-left: 0;
                        padding-top: 20px;
                    }
                }
            `}</style>
        </div>
    );
}
