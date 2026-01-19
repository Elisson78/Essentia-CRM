'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function AdminCompaniesPage() {
    const { user, loading, logout } = useAuth();
    const [companies, setCompanies] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetch('/api/admin/companies')
                .then(res => res.json())
                .then(data => setCompanies(data));
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
                <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', color: '#1a1a1a' }}>Entreprises Partenaires</h1>
                        <p style={{ color: '#666' }}>Gestion des prestataires de services.</p>
                    </div>
                </header>

                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#fcfcfc', borderBottom: '1px solid #eee' }}>
                            <tr>
                                <th style={{ padding: '20px', textAlign: 'left', fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Logo</th>
                                <th style={{ padding: '20px', textAlign: 'left', fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Entreprise</th>
                                <th style={{ padding: '20px', textAlign: 'left', fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</th>
                                <th style={{ padding: '20px', textAlign: 'left', fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Description</th>
                                <th style={{ padding: '20px', textAlign: 'right', fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company: any) => (
                                <tr key={company.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ width: '45px', height: '45px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', color: '#D52B1E', overflow: 'hidden' }}>
                                            {company.logo_url && !company.logo_url.includes('logo_') ? (
                                                <img src={company.logo_url} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                company.name.charAt(0)
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '15px' }}>{company.name}</div>
                                        <div style={{ fontSize: '12px', color: '#999' }}>ID: #{company.id}</div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ fontSize: '14px', color: '#444', fontWeight: '500' }}>{company.email}</div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>{company.phone || 'Pas de téléphone'}</div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#666', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {company.description || 'Néant'}
                                        </p>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => router.push(`/admin/companies/${company.id}`)}
                                                title="Voir le profil"
                                                style={{ background: '#fcfcfc', border: '1px solid #ddd', padding: '8px 15px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold', color: '#4a5568' }}
                                            >
                                                Visualiser
                                            </button>
                                            <button
                                                onClick={() => router.push(`/admin/companies/${company.id}`)}
                                                style={{ background: '#D52B1E', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                                            >
                                                Gérer
                                            </button>
                                        </div>
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
