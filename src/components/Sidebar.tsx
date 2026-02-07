'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
    role: 'ADMIN' | 'CLIENT' | 'ENTREPRISE';
    userName: string;
    onLogout: () => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ role, userName, onLogout, isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();

    const getLinks = () => {
        switch (role) {
            case 'ADMIN':
                return [
                    { label: 'Tableau de Bord', href: '/admin/dashboard' },
                    { label: 'Gérer les Leads', href: '/admin/leads' },
                    { label: 'Entreprises', href: '/admin/companies' },
                    { label: 'Types de travaux', href: '/admin/categories' },
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
        <>
            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
                onClick={onClose}
            />

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.logoArea}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/logo-brand.png"
                                alt="DevisMaison Logo"
                                width={140}
                                height={56}
                                priority
                            />
                        </Link>
                        {/* Close button for mobile */}
                        <button
                            onClick={onClose}
                            style={{
                                display: 'none', // Hidden on desktop
                                background: 'transparent',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                            className="mobile-close-btn" // We'll target this in CSS media query
                        >
                            ×
                        </button>
                    </div>
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
                            onClick={onClose} // Close sidebar on navigation (mobile)
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

            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-close-btn {
                        display: block !important;
                    }
                }
            `}</style>
        </>
    );
}
