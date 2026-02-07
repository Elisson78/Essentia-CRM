'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user, router]);

    if (loading) return <div>Chargement...</div>;

    if (!user || user.role !== 'ADMIN') {
        return <div>Accès refusé</div>;
    }

    return (
        <DashboardLayout role="ADMIN" userName={user.name} onLogout={logout}>
            {children}
        </DashboardLayout>
    );
}
