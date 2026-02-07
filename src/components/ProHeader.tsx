'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from '../app/pro/Pro.module.css';

export default function ProHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Image
                    src="/logo-brand.png"
                    alt="DevisMaison Logo"
                    width={140}
                    height={35}
                    style={{ objectFit: 'contain' }}
                />
            </div>

            {/* Desktop Navigation */}
            <div className={styles.navActions}>
                <Link href="/" className={styles.btnLink} style={{ color: '#666' }}>
                    Espace Client
                </Link>
                <Link href="/register?role=ENTREPRISE" className={`${styles.btnLink} ${styles.btnInscription}`}>
                    Inscription Entreprise
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu">
                {isMenuOpen ? <X size={28} color="#2d3748" /> : <Menu size={28} color="#2d3748" />}
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobileHeader}>
                    <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image
                            src="/logo-brand.png"
                            alt="DevisMaison Logo"
                            width={125}
                            height={50}
                        />
                    </div>
                    <button onClick={toggleMenu} style={{ background: 'none', border: 'none' }}>
                        <X size={28} color="#2d3748" />
                    </button>
                </div>

                <nav className={styles.mobileNav}>
                    <Link href="/" className={styles.mobileLink} onClick={toggleMenu}>
                        Espace Client
                    </Link>
                    <Link href="/register?role=ENTREPRISE" className={`${styles.btnLink} ${styles.btnInscription}`} onClick={toggleMenu} style={{ textAlign: 'center', marginTop: '20px' }}>
                        Inscription Entreprise
                    </Link>
                    <Link href="/login" className={styles.mobileLink} onClick={toggleMenu}>
                        Connexion
                    </Link>
                </nav>
            </div>
        </header>
    );
}
