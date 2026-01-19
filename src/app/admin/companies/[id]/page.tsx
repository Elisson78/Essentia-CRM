'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function CompanyDetailsPage() {
    const { user, loading: authLoading, logout } = useAuth();
    const { id } = useParams();
    const router = useRouter();

    const [company, setCompany] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'ADMIN')) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`/api/admin/companies/${id}`)
                .then(async res => {
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Erreur lors du chargement');
                    return data;
                })
                .then(data => setCompany(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await fetch(`/api/admin/companies/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(company)
            });
            if (res.ok) {
                alert('Entreprise mise à jour avec succès !');
                router.push('/admin/companies');
            } else {
                const data = await res.json();
                alert(data.error);
            }
        } catch (err) {
            alert('Erreur lors de la mise à jour');
        } finally {
            setUpdating(false);
        }
    };

    if (authLoading || loading) return <div style={{ padding: '40px' }}>Chargement...</div>;
    if (error) return <div style={{ padding: '40px', color: 'red' }}>Erreur: {error}</div>;
    if (!company) return <div style={{ padding: '40px' }}>Entreprise introuvable.</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="ADMIN" userName={user.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <div style={{ marginBottom: '20px' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#D52B1E', fontWeight: 'bold', cursor: 'pointer' }}>
                        ← Retour à la liste
                    </button>
                </div>

                <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <h1 style={{ marginBottom: '30px', fontSize: '24px' }}>Modifier l'Entreprise</h1>

                    <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Nom de l'entreprise</label>
                            <input
                                value={company.name}
                                onChange={e => setCompany({ ...company, name: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Email (non modifiable)</label>
                                <input
                                    value={company.email}
                                    disabled
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#f9f9f9' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Téléphone</label>
                                <input
                                    value={company.phone || ''}
                                    onChange={e => setCompany({ ...company, phone: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Description / Spécialités</label>
                            <textarea
                                value={company.description || ''}
                                onChange={e => setCompany({ ...company, description: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
                            />
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                            <button
                                type="submit"
                                disabled={updating}
                                style={{ background: '#D52B1E', color: 'white', padding: '12px 30px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                {updating ? 'Mise à jour...' : 'Sauvegarder les modifications'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                style={{ background: 'white', border: '1px solid #ddd', padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
