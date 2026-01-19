'use client';

import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function SubscriptionsPage() {
    const { user, loading, logout } = useAuth();
    const [config, setConfig] = useState<any>({});
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetch('/api/admin/config')
                .then(res => res.json())
                .then(data => setConfig(data))
                .catch(err => console.error('Erro ao carregar config:', err));
        }
    }, [user]);

    const saveConfig = async (key: string, value: string) => {
        setUpdating(true);
        try {
            const res = await fetch('/api/admin/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            if (res.ok) {
                setConfig((prev: any) => ({ ...prev, [key]: value }));
            }
        } catch (err) {
            console.error('Erro ao salvar:', err);
        } finally {
            setUpdating(false);
        }
    };

    if (loading || !user) return <div style={{ padding: '40px' }}>Chargement...</div>;
    if (user.role !== 'ADMIN') return <div style={{ padding: '40px' }}>Accès refusé.</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="ADMIN" userName={user.name} onLogout={logout} />

            <main style={{ marginLeft: '260px', flex: 1, padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
                <header style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px', color: '#1a1a1a' }}>Plans & Abonnements</h1>
                    <p style={{ color: '#666' }}>Configurez votre modèle d'affaires et les prix des leads.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {/* Prix des Leads */}
                    <section style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '20px', marginBottom: '25px', color: '#2D3748', borderBottom: '2px solid #f5f5f5', paddingBottom: '10px' }}>💰 Prix par Lead (Pay-per-Lead)</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4A5568' }}>Renovação Simples (CHF)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="number"
                                        defaultValue={config.lead_price_simple}
                                        onBlur={(e) => saveConfig('lead_price_simple', e.target.value)}
                                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                    <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>CHF</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4A5568' }}>Reforma Média (CHF)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="number"
                                        defaultValue={config.lead_price_medium}
                                        onBlur={(e) => saveConfig('lead_price_medium', e.target.value)}
                                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                    <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>CHF</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4A5568' }}>Reforma Grande (CHF)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="number"
                                        defaultValue={config.lead_price_large}
                                        onBlur={(e) => saveConfig('lead_price_large', e.target.value)}
                                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                    <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>CHF</span>
                                </div>
                            </div>
                        </div>
                        {updating && <p style={{ fontSize: '12px', color: '#D52B1E', marginTop: '10px' }}>Mise à jour en cours...</p>}
                    </section>

                    {/* Abonnements (Plans Mensuels) */}
                    <section style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '20px', marginBottom: '25px', color: '#2D3748', borderBottom: '2px solid #f5f5f5', paddingBottom: '10px' }}>🚀 Abonnements Mensuels</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                            {[
                                { id: 'BASIC', name: 'Basic', price: '49', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC },
                                { id: 'PRO', name: 'Pro', price: '99', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO },
                                { id: 'ENTERPRISE', name: 'Enterprise', price: '199', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE }
                            ].map((plan) => (
                                <div key={plan.id} style={{ border: '1px solid #E2E8F0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{plan.name}</h3>
                                        <p style={{ color: '#666' }}>{plan.price} CHF / mois</p>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            setUpdating(true);
                                            try {
                                                const res = await fetch('/api/stripe/checkout', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        priceId: plan.priceId || (plan.id === 'BASIC' ? 'price_1Sd5KJQcrEas2KAG3cWqnuB4' : plan.id === 'PRO' ? 'price_1Sd5KJQcrEas2KAGssV9hdJe' : 'price_1Sd5KKQcrEas2KAGMsEmGg8b'),
                                                        userId: user.id,
                                                        userEmail: user.email
                                                    })
                                                });
                                                const data = await res.json();
                                                if (data.url) window.location.href = data.url;
                                            } catch (err) {
                                                console.error('Erro ao iniciar checkout:', err);
                                            } finally {
                                                setUpdating(false);
                                            }
                                        }}
                                        style={{ background: '#1a1a1a', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Choisir {plan.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
