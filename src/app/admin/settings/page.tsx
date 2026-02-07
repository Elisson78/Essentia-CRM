'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminSettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading || !user) return <div style={{ padding: '40px' }}>Chargement...</div>;

    if (user.role !== 'ADMIN') {
        return <div style={{ padding: '40px' }}>Accès refusé.</div>;
    }

    return (
        <div style={{ padding: '40px' }}>
            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px', color: '#1a1a1a' }}>Paramètres</h1>
                <p style={{ color: '#666' }}>Configuration globale de la plateforme.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <section style={{ background: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #eee' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Branding & Design</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>Logo URL</label>
                            <input disabled value="/logo.png" style={{ background: '#f9f9f9', width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>Couleur Primaire</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <div style={{ width: '30px', height: '30px', background: '#D52B1E', borderRadius: '4px' }}></div>
                                <span>#D52B1E (Rouge Suisse)</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ background: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #eee' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Email (SMTP)</h2>
                    <p style={{ color: '#999', fontStyle: 'italic' }}>Configuration bientôt disponible...</p>
                </section>
            </div>
        </div>
    );
}
