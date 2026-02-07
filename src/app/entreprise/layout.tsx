'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EntrepriseLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user, router]);

    if (loading) return <div>Chargement...</div>;

    return (
        <DashboardLayout role="ENTREPRISE" userName={user?.name || 'Entreprise'} onLogout={logout}>
            {children}
        </DashboardLayout>
    );
}
