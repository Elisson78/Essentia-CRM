'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Auth.module.css';
import Link from 'next/link';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'CLIENT'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                // Redirection vers login après inscription réussie
                router.push('/login');
            } else {
                throw new Error(data.error || 'Erreur lors de l’inscription');
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
                <h1 className={styles.title}>Inscription</h1>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Nom complet</label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: Jean Dupont"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
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
                    <div className={styles.formGroup}>
                        <label>Je suis :</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="CLIENT">Un particulier (cherche un devis)</option>
                            <option value="ENTREPRISE">Une entreprise (fait les travaux)</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Création...' : 'Créer mon compte'}
                    </button>
                </form>

                <p className={styles.switch}>
                    Déjà un compte ? <Link href="/login">Se connecter</Link>
                </p>
            </div>
        </div>
    );
}
