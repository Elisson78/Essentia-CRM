'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function ClientDashboard() {
    const { user, loading, logout } = useAuth();
    const [leads, setLeads] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user) {
            fetch('/api/leads')
                .then(res => res.json())
                .then(data => {
                    setLeads(data.filter((l: any) => l.client_id === user.id));
                });
        }
    }, [user]);

    if (loading || !user) return <div style={{ padding: '40px' }}>Chargement...</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="CLIENT" userName={user.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <header style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px', color: '#1a1a1a' }}>Mes demandes de devis</h1>
                    <p style={{ color: '#666' }}>Bienvenue sur votre espace personnel, {user.name} !</p>
                </header>

                <div style={{ maxWidth: '900px' }}>
                    {leads.length === 0 ? (
                        <div style={{ padding: '60px', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px solid #eee' }}>
                            <p style={{ color: '#666', fontSize: '18px' }}>Vous n'avez pas encore envoyé de demande.</p>
                            <button
                                onClick={() => router.push('/demande-devis')}
                                style={{ marginTop: '20px', padding: '12px 24px', background: '#D52B1E', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Demander un devis maintenant
                            </button>
                        </div>
                    ) : (
                        leads.map((lead: any) => (
                            <div key={lead.id} style={{
                                padding: '24px',
                                border: '1px solid #eee',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                background: 'white',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '20px' }}>{lead.title}</h3>
                                    <span style={{
                                        background: '#D52B1E',
                                        color: 'white',
                                        padding: '5px 15px',
                                        borderRadius: '20px',
                                        fontSize: '13px',
                                        fontWeight: '700'
                                    }}>
                                        {lead.status}
                                    </span>
                                </div>
                                <p style={{ color: '#666', marginTop: '12px', fontSize: '15px' }}>
                                    <span style={{ marginRight: '15px' }}>📍 {lead.city}</span>
                                    <span>📁 {lead.category}</span>
                                </p>
                                <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #D52B1E' }}>
                                    <p style={{ fontSize: '14px', margin: 0, color: '#444', lineHeight: '1.6' }}>
                                        <strong>Statut de votre demande :</strong> Votre projet est visible par nos entreprises partenaires locales. Vous recevrez des notifications dès qu'une entreprise consulte vos coordonnées.
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
