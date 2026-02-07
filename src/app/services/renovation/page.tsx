import Link from 'next/link';
import Image from 'next/image';
import styles from '../ServicePage.module.css';
import Header from '@/components/Header';
import { PaintRoller } from 'lucide-react';

// Image import (this will need to be the actual generated image path or URL)
// For now, assume it's placed in public/images/renovation-hero.png
// I will need to move the generated image to this location.

export default function RenovationPage() {
    return (
        <div className={styles.container}>
            <Header />

            {/* Hero Section */}
            <div
                className={styles.hero}
                style={{ backgroundImage: "url('/images/service_renovation_hero.png')" }}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Rénovez votre bien immobilier en toute sérénité.</h1>
                    <p className={styles.heroSubtitle}>Appartement, maison ou immeuble : confiez votre projet à des entreprises suisses vérifiées.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        COMPARER 3 DEVIS GRATUITS
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.section}>
                <div className={styles.twoColumn}>
                    <div className={styles.textColumn}>
                        <h2>Pourquoi choisir DevisMaison pour votre rénovation ?</h2>
                        <p>
                            La rénovation ne doit pas être un cauchemar. Chez DevisMaison, nous sélectionnons pour vous les experts de la transformation.
                            Gros œuvre, isolation, finitions : comparez les meilleurs sans perdre de temps.
                        </p>
                        <p>
                            Nos partenaires sont audités sur la qualité de leurs finitions et le respect des délais.
                        </p>

                        <div className={styles.servicesGrid}>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Rénovation complète</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Cuisine & Salle de bain</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Isolation thermique</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Pose de sols et murs</div>
                        </div>
                    </div>
                    <div className={styles.imageColumn}>
                        <div className={styles.iconContainer}>
                            <PaintRoller size={120} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust / CTA Section */}
            <div className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2>Prêt à transformer votre intérieur ?</h2>
                    <p>Recevez jusqu'à 3 offres comparatives sous 48h. Gratuit et sans engagement.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        DÉMARRER MON PROJET
                    </Link>
                </div>
            </div>
        </div>
    );
}
