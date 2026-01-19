'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
    role: 'ADMIN' | 'CLIENT' | 'ENTREPRISE';
    userName: string;
    onLogout: () => void;
}

export default function Sidebar({ role, userName, onLogout }: SidebarProps) {
    const pathname = usePathname();

    const getLinks = () => {
        switch (role) {
            case 'ADMIN':
                return [
                    { label: 'Tableau de Bord', href: '/admin/dashboard' },
                    { label: 'Gérer les Leads', href: '/admin/leads' },
                    { label: 'Entreprises', href: '/admin/companies' },
                    { label: 'Utilisateurs', href: '/admin/users' },
                    { label: 'Plans & Abonnements', href: '/admin/subscriptions' },
                    { label: 'Paramètres', href: '/admin/settings' },
                ];
            case 'ENTREPRISE':
                return [
                    { label: 'Opportunités', href: '/entreprise/dashboard' },
                    { label: 'Mes Devis', href: '#' },
                    { label: 'Profil Entreprise', href: '#' },
                    { label: 'Facturation', href: '#' },
                ];
            case 'CLIENT':
                return [
                    { label: 'Mes Demandes', href: '/client/dashboard' },
                    { label: 'Nouvelle Demande', href: '/demande-devis' },
                    { label: 'Mon Profil', href: '/client/profile' },
                ];
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoArea}>
                <div className={styles.logo}>DevisMaison</div>
            </div>

            <div style={{ padding: '0 30px', margin: '20px 0' }}>
                <p style={{ fontSize: '11px', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800', marginBottom: '4px' }}>
                    Espace {role.toLowerCase()}
                </p>
                <p style={{ fontSize: '15px', fontWeight: '800', color: '#2d3748' }}>{userName}</p>
            </div>

            <nav className={styles.nav}>
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className={styles.footer}>
                <button onClick={onLogout} className={styles.logoutBtn}>
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}
