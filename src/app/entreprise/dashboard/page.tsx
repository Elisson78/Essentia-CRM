'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function CompanyDashboard() {
    const { user, loading, logout } = useAuth();
    const [leads, setLeads] = useState([]);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user && user.role === 'ENTREPRISE') {
            fetch('/api/leads', {
                headers: { 'company-id': user.id.toString() }
            })
                .then(res => res.json())
                .then(data => setLeads(data));
        }
    }, [user]);

    const handleBuyLead = async (leadId: number) => {
        if (!user) return;
        try {
            const res = await fetch(`/api/leads/${leadId}/pay`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company_id: user.id,
                    email: user.email
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else if (res.ok) {
                // Refresh leads to show updated status/contacts (fallback)
                const updatedRes = await fetch('/api/leads', {
                    headers: { 'company-id': user.id.toString() }
                });
                const dataLeads = await updatedRes.json();
                setLeads(dataLeads);
            }
        } catch (error) {
            console.error('Error buying lead:', error);
        }
    };

    if (loading || !user) return <div style={{ padding: '40px' }}>Chargement...</div>;

    if (user.role !== 'ENTREPRISE') {
        return <div style={{ padding: '40px' }}>Accès refusé. Réservé aux entreprises.</div>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="ENTREPRISE" userName={user.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <header style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px' }}>Opportunités de Chantiers</h1>
                    <p style={{ color: '#666' }}>Trouvez de nouveaux contrats qualifiés en Suisse.</p>
                </header>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ background: '#FFF5F5', border: '1px solid #FED7D7', padding: '15px 20px', borderRadius: '10px', color: '#C53030', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                        <span>💰 Gagnez jusqu'à 10x plus de leads qualifiés avec DevisMaison</span>
                    </div>
                    <button
                        onClick={async () => {
                            setUpdating(true);
                            try {
                                const res = await fetch('/api/stripe/portal', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ userId: user.id })
                                });
                                const data = await res.json();
                                if (data.url) window.location.href = data.url;
                                else alert('Vous n\'avez pas encore d\'abonnement actif.');
                            } catch (err) {
                                console.error('Error opening portal:', err);
                            } finally {
                                setUpdating(false);
                            }
                        }}
                        style={{ marginLeft: '20px', background: 'white', border: '1px solid #ddd', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        ⚙️ Gérer mon abonnement
                    </button>
                </div>

                <div style={{ display: 'grid', gap: '25px' }}>
                    {leads.map((lead: any) => (
                        <div key={lead.id} style={{
                            padding: '30px',
                            border: '1px solid #eee',
                            borderRadius: '16px',
                            background: 'white',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <h3 style={{ fontSize: '22px', margin: 0 }}>{lead.category}</h3>
                                <span style={{ fontSize: '14px', color: '#999' }}>Posté le {new Date(lead.created_at).toLocaleDateString()}</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                                <div>🏗️ Ampleur : <strong>{lead.project_type === 'large' ? 'Reforme grande' : lead.project_type === 'medium' ? 'Reforme média' : 'Rénovation simple'}</strong></div>
                                <div>📍 Ville : <strong>{lead.city}</strong></div>
                                <div>📅 Début : <strong>{lead.estimated_start_date ? new Date(lead.estimated_start_date).toLocaleDateString() : 'Non défini'}</strong></div>
                                <div>🏁 Fin : <strong>{lead.estimated_deadline ? new Date(lead.estimated_deadline).toLocaleDateString() : 'Non défini'}</strong></div>
                            </div>

                            <p style={{ margin: '0 0 25px 0', color: '#4a5568', lineHeight: '1.6', fontSize: '16px' }}>{lead.description}</p>

                            {lead.payment_status === 'PAID' && (
                                <div style={{ background: '#EBF8FF', border: '1px solid #BEE3F8', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>👤 Contact Client :</p>
                                    <p style={{ margin: 0 }}>📧 {lead.client_email}</p>
                                    <p style={{ margin: 0 }}>📞 {lead.client_phone}</p>
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid #f5f5f5' }}>
                                <div style={{ background: '#F0FFF4', color: '#38A169', padding: '8px 18px', borderRadius: '30px', fontSize: '14px', fontWeight: '700' }}>
                                    Prix : CHF {lead.lead_price}
                                </div>
                                {lead.payment_status === 'PAID' ? (
                                    <span style={{ color: '#38A169', fontWeight: 'bold' }}>✅ Lead débloqué</span>
                                ) : (
                                    <button
                                        onClick={() => handleBuyLead(lead.id)}
                                        style={{
                                            background: '#D52B1E',
                                            color: 'white',
                                            padding: '12px 25px',
                                            borderRadius: '10px',
                                            fontWeight: '800',
                                            border: 'none',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 14px 0 rgba(213, 43, 30, 0.39)'
                                        }}>
                                        Acheter ce lead (CHF {lead.lead_price})
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
