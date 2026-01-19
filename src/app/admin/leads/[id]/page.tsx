'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import styles from '@/app/demande-devis/Form.module.css';

export default function LeadDetailsPage() {
    const { user, loading: authLoading, logout } = useAuth();
    const { id } = useParams();
    const router = useRouter();

    const [lead, setLead] = useState<any>(null);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'ADMIN')) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);
            fetch(`/api/leads/${id}`, {
                headers: { 'is-admin': 'true' }
            })
                .then(async res => {
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Erreur lors du chargement');
                    return data;
                })
                .then(data => {
                    setLead(data.lead);
                    setAssignments(data.assignments);
                })
                .catch(err => {
                    console.error('Fetch error:', err);
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    // Simplified for now: list of companies
    useEffect(() => {
        fetch('/api/admin/companies')
            .then(res => res.json())
            .then(data => setCompanies(data))
            .catch(e => console.error('Error fetching companies:', e));
    }, []);

    const updateStatus = async (newStatus: string) => {
        setUpdating(true);
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                const updated = await res.json();
                setLead(prev => ({ ...prev, status: updated.status }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setUpdating(false);
        }
    };

    const assignToCompany = async (companyId: number) => {
        setUpdating(true);
        try {
            const res = await fetch('/api/leads/assignments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lead_id: id, entreprise_id: companyId })
            });
            if (res.ok) {
                // Refresh assignments
                const data = await fetch(`/api/leads/${id}`, { headers: { 'is-admin': 'true' } }).then(r => r.json());
                setAssignments(data.assignments);
            } else {
                const err = await res.json();
                alert(err.error);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setUpdating(false);
        }
    };

    if (authLoading || loading) return <div style={{ padding: '40px' }}>Chargement...</div>;

    if (error) return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="ADMIN" userName={user?.name || 'Admin'} onLogout={logout} />
            <main style={{ marginLeft: '260px', flex: 1, padding: '40px' }}>
                <div style={{ padding: '20px', background: '#FFF5F5', color: '#C53030', borderRadius: '8px', border: '1px solid #FED7D7' }}>
                    <strong>Erreur :</strong> {error}
                    <button onClick={() => router.back()} style={{ display: 'block', marginTop: '10px', color: '#D52B1E', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        Retour au dashboard
                    </button>
                </div>
            </main>
        </div>
    );

    if (!lead) return <div style={{ padding: '40px' }}>Lead introuvable.</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="ADMIN" userName={user.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <div style={{ marginBottom: '20px' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#D52B1E', fontWeight: 'bold', cursor: 'pointer' }}>
                        ← Retour à la liste
                    </button>
                </div>

                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', margin: 0 }}>{lead.title} <span style={{ fontSize: '16px', color: '#999' }}>#{lead.id}</span></h1>
                        <p style={{ color: '#666', marginTop: '5px' }}>Publié le {new Date(lead.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>Valeur Lead</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#D52B1E' }}>CHF {lead.lead_price}</div>
                        </div>
                        <select
                            value={lead.status}
                            onChange={(e) => updateStatus(e.target.value)}
                            disabled={updating}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}
                        >
                            <option value="NOUVEAU">NOUVEAU</option>
                            <option value="EN_COURS">EN COURS</option>
                            <option value="TERMINE">TERMINÉ</option>
                            <option value="ANNULE">ANNULÉ</option>
                        </select>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {/* Détails du projet */}
                        <section style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <h2 style={{ fontSize: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px' }}>Détails du projet</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#999', textTransform: 'uppercase' }}>Catégorie</label>
                                    <p style={{ fontWeight: '600', fontSize: '16px' }}>{lead.category}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#999', textTransform: 'uppercase' }}>Ville</label>
                                    <p style={{ fontWeight: '600', fontSize: '16px' }}>{lead.city}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#999', textTransform: 'uppercase' }}>Ampleur</label>
                                    <p style={{ fontWeight: '600', fontSize: '16px' }}>{lead.project_type || 'simple'}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#999', textTransform: 'uppercase' }}>Valeur de vente</label>
                                    <p style={{ fontWeight: '600', fontSize: '16px', color: '#D52B1E' }}>CHF {lead.lead_price}</p>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#999', textTransform: 'uppercase' }}>Début estimé</label>
                                    <p style={{ fontWeight: '600' }}>{lead.estimated_start_date ? new Date(lead.estimated_start_date).toLocaleDateString() : 'Non défini'}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#999', textTransform: 'uppercase' }}>Fin souhaitée</label>
                                    <p style={{ fontWeight: '600' }}>{lead.estimated_deadline ? new Date(lead.estimated_deadline).toLocaleDateString() : 'Non défini'}</p>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', color: '#999', textTransform: 'uppercase' }}>Description</label>
                                <p style={{ lineHeight: '1.6', color: '#444' }}>{lead.description || 'Aucune description fournie.'}</p>
                            </div>
                        </section>

                        {/* Assignations & Historique d'achats */}
                        <section style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <h2 style={{ fontSize: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px' }}>Historique d'Achats & Assignations</h2>
                            {assignments.length === 0 ? (
                                <p style={{ color: '#999', fontStyle: 'italic' }}>Aucune entreprise n'a encore acheté ce lead.</p>
                            ) : (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                                            <th style={{ padding: '10px 0', fontSize: '13px', color: '#999' }}>Entreprise</th>
                                            <th style={{ fontSize: '13px', color: '#999' }}>Paiement</th>
                                            <th style={{ fontSize: '13px', color: '#999' }}>ID Transac.</th>
                                            <th style={{ fontSize: '13px', color: '#999' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignments.map(a => (
                                            <tr key={a.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                                <td style={{ padding: '15px 0', fontWeight: 'bold' }}>{a.company_name}</td>
                                                <td>
                                                    <span style={{
                                                        background: a.payment_status === 'PAID' ? '#F0FFF4' : '#FFF5F5',
                                                        color: a.payment_status === 'PAID' ? '#38A169' : '#C53030',
                                                        padding: '3px 8px',
                                                        borderRadius: '4px',
                                                        fontSize: '11px',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {a.payment_status === 'PAID' ? 'PAYÉ' : 'EN ATTENTE'}
                                                    </span>
                                                </td>
                                                <td style={{ fontSize: '12px', color: '#666' }}>{a.payment_id || '-'}</td>
                                                <td style={{ fontSize: '12px', color: '#666' }}>{new Date(a.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px dotted #eee' }}>
                                <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Assigner manuellement (Action Administrateur)</h3>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <select id="assign-select" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                        <option value="">Sélectionner une entreprise...</option>
                                        {companies.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => {
                                            const sel = document.getElementById('assign-select') as HTMLSelectElement;
                                            if (sel.value) assignToCompany(parseInt(sel.value));
                                        }}
                                        disabled={updating}
                                        style={{ background: '#D52B1E', color: 'white', padding: '10px 25px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                                    >
                                        Assigner
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {/* Client Info */}
                        <section style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Contact Client</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#999' }}>Nom</label>
                                    <p style={{ fontWeight: '600' }}>{lead.client_name}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#999' }}>Email</label>
                                    <p style={{ fontWeight: '600' }}>{lead.client_email}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#999' }}>Téléphone</label>
                                    <p style={{ fontWeight: '600' }}>{lead.client_phone || 'Non renseigné'}</p>
                                </div>
                            </div>
                        </section>

                        {/* Revenu Potentiel */}
                        <div style={{ background: '#F0FFF4', border: '1px solid #C6F6D5', padding: '20px', borderRadius: '16px', color: '#2F855A' }}>
                            <p style={{ fontSize: '14px', margin: 0, fontWeight: '800' }}>Revenu de ce Lead</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>CHF {(lead.lead_price * assignments.filter(a => a.payment_status === 'PAID').length).toFixed(2)}</p>
                            <p style={{ fontSize: '12px', marginTop: '5px' }}>Recette générée par les ventes actuelles.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
