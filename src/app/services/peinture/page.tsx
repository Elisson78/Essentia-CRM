import Link from 'next/link';
import styles from '../ServicePage.module.css';
import Header from '@/components/Header';
import { Brush } from 'lucide-react';

export default function PeinturePage() {
    return (
        <div className={styles.container}>
            <Header />

            {/* Hero Section */}
            <div
                className={styles.hero}
                style={{ backgroundImage: "url('/images/service_painting_hero.png')" }}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Redonnez des couleurs à votre intérieur.</h1>
                    <p className={styles.heroSubtitle}>Peintres qualifiés pour des finitions impeccables. Prix fixes, sans surprise.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        COMPARER 3 DEVIS GRATUITS
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.section}>
                <div className={styles.twoColumn}>
                    <div className={styles.textColumn}>
                        <h2>Des finitions parfaites, sans trace</h2>
                        <p>
                            Une peinture de qualité change tout. Que ce soit pour rafraîchir un appartement avant vente ou personnaliser votre nouveau chez-vous, nos artisans garantissent un résultat sans trace et durable.
                        </p>
                        <p>
                            Nous sélectionnons des peintres méticuleux qui protègent vos sols et meubles.
                        </p>

                        <div className={styles.servicesGrid}>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Peinture intérieure & extérieure</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Papiers peints et décors</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Façades</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Crépis et enduits</div>
                        </div>
                    </div>
                    <div className={styles.imageColumn}>
                        <div className={styles.iconContainer}>
                            <Brush size={120} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2>Besoin d'un coup de pinceau ?</h2>
                    <p>Recevez jusqu'à 3 offres comparatives sous 48h. Gratuit et sans engagement.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        DÉMARRER MON PROJET
                    </Link>
                </div>
            </div>
        </div>
    );
}
