'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import styles from '@/app/demande-devis/Form.module.css'; // Reusing form styles

export default function ProfilePage() {
    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    ...formData
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
                // Mettre à jour la session locale
                localStorage.setItem('user', JSON.stringify(data.user));
                // Optionnel : recharger la page pour voir les changements partout si nécessaire, 
                // ou laisser useAuth se synchroniser (mais useAuth lit localStorage seulement au mount dans ma version actuelle)
                window.location.reload();
            } else {
                throw new Error(data.error || 'Erreur lors de la mise à jour');
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) return <div style={{ padding: '40px' }}>Chargement...</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role={user.role} userName={user.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <header style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px' }}>Mon Profil</h1>
                    <p style={{ color: '#666' }}>Gérer vos informations personnelles.</p>
                </header>

                <div style={{ maxWidth: '600px', background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    {message && (
                        <div className={`${styles.message} ${styles[message.type]}`} style={{ marginBottom: '20px' }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>Nom complet</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Téléphone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading} style={{ marginTop: '10px' }}>
                            {loading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
