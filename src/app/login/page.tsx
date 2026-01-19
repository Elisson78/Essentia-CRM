'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Auth.module.css';
import Link from 'next/link';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const useRouterHook = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                // Pour le MVP, on stocke les infos utilisateur dans localStorage
                localStorage.setItem('user', JSON.stringify(data));

                // Redirection vers le dashboard approprié
                if (data.role === 'ADMIN') useRouterHook.push('/admin/dashboard');
                else if (data.role === 'ENTREPRISE') useRouterHook.push('/entreprise/dashboard');
                else useRouterHook.push('/client/dashboard');
            } else {
                throw new Error(data.error || 'Erreur de connexion');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <div className={styles.container}>
                <h1 className={styles.title}>Connexion</h1>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <p className={styles.switch}>
                    Pas encore de compte ? <Link href="/register">S'inscrire</Link>
                </p>
            </div>
        </div>
    );
}
