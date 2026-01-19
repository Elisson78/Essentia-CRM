'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function AdminLeadsPage() {
    const { user, loading, logout } = useAuth();
    const [leads, setLeads] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetch('/api/leads')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setLeads(data);
                    } else {
                        console.error('Expected array from /api/leads, got:', data);
                    }
                });
        }
    }, [user]);

    if (loading || !user) return <div style={{ padding: '40px' }}>Chargement...</div>;

    if (user.role !== 'ADMIN') {
        return <div style={{ padding: '40px' }}>Accès refusé.</div>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="ADMIN" userName={user.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <header style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px', color: '#1a1a1a' }}>Gestion des Leads</h1>
                    <p style={{ color: '#666' }}>Liste complète des demandes de devis et revenus associés.</p>
                </header>

                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '15px' }}>Projet</th>
                                <th>Ville</th>
                                <th>Valeur</th>
                                <th>Type</th>
                                <th>Vendu</th>
                                <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead: any) => (
                                <tr key={lead.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: 'bold' }}>{lead.title}</div>
                                        <div style={{ fontSize: '12px', color: '#999' }}>ID: #{lead.id}</div>
                                    </td>
                                    <td>{lead.city}</td>
                                    <td style={{ fontWeight: 'bold', color: '#D52B1E' }}>CHF {lead.lead_price}</td>
                                    <td style={{ fontSize: '13px' }}>{lead.project_type || 'simple'}</td>
                                    <td>
                                        <span style={{
                                            background: lead.payment_status === 'PAID' ? '#F0FFF4' : '#FFF5F5',
                                            color: lead.payment_status === 'PAID' ? '#38A169' : '#C53030',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '11px',
                                            fontWeight: 'bold'
                                        }}>
                                            {lead.payment_status === 'PAID' ? 'OUI' : 'NON'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                                        <button
                                            onClick={() => router.push(`/admin/leads/${lead.id}`)}
                                            style={{ background: 'white', border: '1px solid #ddd', padding: '6px 15px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold', color: '#4a5568' }}
                                        >
                                            Détails
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
