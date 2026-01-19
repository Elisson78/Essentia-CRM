'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import styles from './Form.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DemandeDevis() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        title: '',
        category: '',
        city: '',
        description: '',
        project_type: 'simple',
        estimated_start_date: '',
        estimated_deadline: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
            }));
        }
    }, [user]);

    const nextStep = () => {
        if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
            setMessage({ type: 'error', text: 'Veuillez remplir tous les champs de contact.' });
            return;
        }
        if (step === 2 && (!formData.title || !formData.category || !formData.city || !formData.description || !formData.project_type || !formData.estimated_start_date || !formData.estimated_deadline)) {
            setMessage({ type: 'error', text: 'Veuillez remplir tous les détails de votre projet.' });
            return;
        }
        setMessage(null);
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setMessage(null);
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user && formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas.' });
            return;
        }
        if (!user && formData.password.length < 6) {
            setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 6 caractères.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    client_id: user?.id || null
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Votre demande a été envoyée avec succès ! Redirection en cours...' });

                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                setTimeout(() => {
                    router.push('/client/dashboard');
                }, 2000);

            } else {
                throw new Error(data.error || 'Une erreur est survenue');
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
            setLoading(false);
        }
    };

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link href="/" style={{ color: '#D52B1E', fontWeight: 'bold' }}>← Retour à l'accueil</Link>
            </div>

            <div className={styles.container}>
                <div className={styles.progressContainer}>
                    <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>1</div>
                    <div className={styles.progressLine}></div>
                    <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>2</div>
                    <div className={styles.progressLine}></div>
                    <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>3</div>
                </div>

                <h1 className={styles.title}>
                    {step === 1 && "Vos Coordonnées"}
                    {step === 2 && "Votre Projet"}
                    {step === 3 && (user ? "Confirmation" : "Création de Compte")}
                </h1>
                <p className={styles.subTitle}>
                    {step === 1 && "Entrez vos informations de contact."}
                    {step === 2 && "Détaillez vos besoins pour recevoir des devis précis."}
                    {step === 3 && (user ? "Vérifiez vos informations." : "Définissez un mot de passe pour suivre vos devis.")}
                </p>

                {message && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    {step === 1 && (
                        <div className={styles.stepContent}>
                            <div className={styles.formGroup}>
                                <label>Nom complet</label>
                                <input
                                    type="text"
                                    placeholder="Jean Dupont"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="nom@exemple.ch"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Téléphone</label>
                                <input
                                    type="tel"
                                    placeholder="+41 7x xxx xx xx"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="button" className={styles.submitBtn} onClick={nextStep}>
                                Continuer
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={styles.stepContent}>
                            <div className={styles.formGroup}>
                                <label>Nom du projet</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Rénovation salle de bain"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className={styles.formGroup}>
                                    <label>Type de travaux</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Sélectionnez</option>
                                        <option value="Rénovation">Rénovation</option>
                                        <option value="Peinture">Peinture</option>
                                        <option value="Électricité">Électricité</option>
                                        <option value="Jardinage">Jardinage</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Ville</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Lausanne"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Ampleur do projet</label>
                                <select
                                    value={formData.project_type}
                                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                                    required
                                >
                                    <option value="simple">Rénovation simple (CHF 30)</option>
                                    <option value="medium">Reforme média (CHF 50)</option>
                                    <option value="large">Reforme grande (CHF 80)</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className={styles.formGroup}>
                                    <label>Date de début estimée</label>
                                    <input
                                        type="date"
                                        value={formData.estimated_start_date}
                                        onChange={(e) => setFormData({ ...formData, estimated_start_date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Délai souhaité</label>
                                    <input
                                        type="date"
                                        value={formData.estimated_deadline}
                                        onChange={(e) => setFormData({ ...formData, estimated_deadline: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description du projet</label>
                                <textarea
                                    rows={4}
                                    placeholder="Expliquez ce que vous souhaitez réaliser..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" className={`${styles.submitBtn} ${styles.btnSecondary}`} onClick={prevStep}>
                                    Retour
                                </button>
                                <button type="button" className={styles.submitBtn} onClick={nextStep}>
                                    Continuer
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.stepContent}>
                            {user ? (
                                <div style={{ marginBottom: '20px', padding: '20px', background: '#F0FFF4', borderRadius: '8px', border: '1px solid #C6F6D5' }}>
                                    <p style={{ margin: 0, color: '#2F855A', fontWeight: '600' }}>Vous êtes déjà connecté en tant que {user.name}. Votre demande sera liée à votre compte.</p>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.formGroup}>
                                        <label>Choisissez un mot de passe</label>
                                        <input
                                            type="password"
                                            placeholder="Min. 6 caractères"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Confirmez le mot de passe</label>
                                        <input
                                            type="password"
                                            placeholder="Répétez le mot de passe"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
                                        Ce mot de passe vous permettra d'accéder à votre tableau de bord pour suivre vos devis.
                                    </p>
                                </>
                            )}

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" className={`${styles.submitBtn} ${styles.btnSecondary}`} onClick={prevStep} disabled={loading}>
                                    Retour
                                </button>
                                <button type="button" className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Traitement...' : 'Finaliser ma demande'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
