'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export default function UsersAdminPage() {
    const { user: currentUser, loading: authLoading, logout } = useAuth();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !currentUser) router.push('/login');
    }, [currentUser, authLoading, router]);

    useEffect(() => {
        if (currentUser && currentUser.role === 'ADMIN') {
            fetchUsers();
        }
    }, [currentUser]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (userId: number, newRole: string) => {
        setUpdatingId(userId);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, role: newRole })
            });

            if (res.ok) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            } else {
                alert('Erreur lors de la mise à jour du rôle.');
            }
        } catch (err) {
            console.error('Erro ao atualizar role:', err);
        } finally {
            setUpdatingId(null);
        }
    };

    if (authLoading || loading) return <div style={{ padding: '40px' }}>Chargement...</div>;
    if (currentUser?.role !== 'ADMIN') return <div style={{ padding: '40px' }}>Accès refusé.</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="ADMIN" userName={currentUser.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <header style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px', color: '#1a1a1a' }}>Gestion des Utilisateurs</h1>
                    <p style={{ color: '#666' }}>Contrôlez les accès et les rôles de tous les membres de la plateforme.</p>
                </header>

                <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '20px', textAlign: 'left', color: '#4a5568', fontSize: '14px' }}>Nom</th>
                                <th style={{ padding: '20px', textAlign: 'left', color: '#4a5568', fontSize: '14px' }}>Email</th>
                                <th style={{ padding: '20px', textAlign: 'left', color: '#4a5568', fontSize: '14px' }}>Date d'inscription</th>
                                <th style={{ padding: '20px', textAlign: 'center', color: '#4a5568', fontSize: '14px' }}>Rôle / Accès</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '15px 20px', fontWeight: '600' }}>{u.name || 'Sans nom'}</td>
                                    <td style={{ padding: '15px 20px', color: '#666' }}>{u.email}</td>
                                    <td style={{ padding: '15px 20px', color: '#999', fontSize: '13px' }}>
                                        {new Date(u.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <select
                                                value={u.role}
                                                onChange={(e) => updateRole(u.id, e.target.value)}
                                                disabled={updatingId === u.id}
                                                style={{
                                                    padding: '8px 12px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e2e8f0',
                                                    background: u.role === 'ADMIN' ? '#FED7D7' : u.role === 'ENTREPRISE' ? '#C6F6D5' : '#EBF8FF',
                                                    color: u.role === 'ADMIN' ? '#C53030' : u.role === 'ENTREPRISE' ? '#2F855A' : '#2B6CB0',
                                                    fontWeight: 'bold',
                                                    cursor: updatingId === u.id ? 'wait' : 'pointer',
                                                    outline: 'none'
                                                }}
                                            >
                                                <option value="CLIENT">👤 CLIENT</option>
                                                <option value="ENTREPRISE">🏢 ENTREPRISE</option>
                                                <option value="ADMIN">🛡️ ADMIN</option>
                                            </select>
                                            {updatingId === u.id && (
                                                <span style={{ fontSize: '10px', display: 'block', color: '#D52B1E', position: 'absolute', width: '100%', top: '-15px' }}>
                                                    Mise à jour...
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                            Aucun utilisateur trouvé.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
