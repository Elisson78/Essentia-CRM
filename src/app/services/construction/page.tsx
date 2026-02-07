import Link from 'next/link';
import styles from '../ServicePage.module.css';
import Header from '@/components/Header';
import { Hammer } from 'lucide-react';

export default function ConstructionPage() {
    return (
        <div className={styles.container}>
            <Header />

            {/* Hero Section */}
            <div
                className={styles.hero}
                style={{ backgroundImage: "url('/images/service_construction_hero.png')" }}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Construire en Suisse n'a jamais été aussi simple.</h1>
                    <p className={styles.heroSubtitle}>Du terrassement aux finitions, trouvez les partenaires fiables pour votre projet de vie.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        COMPARER 3 DEVIS GRATUITS
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.section}>
                <div className={styles.twoColumn}>
                    <div className={styles.textColumn}>
                        <h2>Votre partenaire de confiance pour bâtir solide</h2>
                        <p>
                            Bâtir est un investissement majeur. Ne laissez rien au hasard. Nos partenaires constructeurs respectent les normes suisses les plus strictes (SIA) et s'engagent sur les délais.
                        </p>
                        <p>
                            Nous vérifions chaque entreprise pour garantir la pérennité de votre ouvrage.
                        </p>

                        <div className={styles.servicesGrid}>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Construction de maison individuelle</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Extensions & Surélévations</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Garages et annexes</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Maçonnerie générale</div>
                        </div>
                    </div>
                    <div className={styles.imageColumn}>
                        <div className={styles.iconContainer}>
                            <Hammer size={120} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2>Lancez votre chantier avec les bons pros</h2>
                    <p>Recevez jusqu'à 3 offres comparatives sous 48h. Gratuit et sans engagement.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        DÉMARRER MON PROJET
                    </Link>
                </div>
            </div>
        </div>
    );
}
