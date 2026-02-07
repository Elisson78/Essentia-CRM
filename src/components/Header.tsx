'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>DevisMaison</div>

            {/* Desktop Navigation */}
            <div className={styles.navDesktop}>
                <Link href="/pro" className={`${styles.btnLink} ${styles.btnPro}`}>
                    Espace Pro
                </Link>
                <Link href="/login" className={`${styles.btnLink} ${styles.btnConnexion}`}>
                    Connexion
                </Link>
                <Link href="/register" className={`${styles.btnLink} ${styles.btnInscription}`}>
                    Inscription
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu">
                {isMenuOpen ? <X size={28} color="#2d3748" /> : <Menu size={28} color="#2d3748" />}
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobileHeader}>
                    <div className={styles.logo}>DevisMaison</div>
                    <button onClick={toggleMenu} style={{ background: 'none', border: 'none' }}>
                        <X size={28} color="#2d3748" />
                    </button>
                </div>

                <nav className={styles.mobileNav}>
                    <Link href="/pro" className={styles.mobileLink} onClick={toggleMenu}>
                        Espace Pro
                    </Link>
                    <Link href="/demande-devis" className={styles.mobileLink} onClick={toggleMenu} style={{ color: '#D52B1E' }}>
                        Demander un devis
                    </Link>
                    <Link href="/login" className={styles.mobileLink} onClick={toggleMenu}>
                        Connexion
                    </Link>
                    <Link href="/register" className={`${styles.btnLink} ${styles.btnInscription}`} onClick={toggleMenu} style={{ textAlign: 'center', marginTop: '20px' }}>
                        Inscription
                    </Link>
                </nav>
            </div>
        </header>
    );
}
