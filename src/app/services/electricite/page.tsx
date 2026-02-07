import Link from 'next/link';
import styles from '../ServicePage.module.css';
import Header from '@/components/Header';
import { Zap } from 'lucide-react';

export default function ElectricitePage() {
    return (
        <div className={styles.container}>
            <Header />

            {/* Hero Section */}
            <div
                className={styles.hero}
                style={{ backgroundImage: "url('/images/service_electricity_hero.png')" }}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Mises aux normes et installations électriques certifiées.</h1>
                    <p className={styles.heroSubtitle}>La sécurité avant tout. Trouvez un électricien agréé près de chez vous en 3 clics.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        COMPARER 3 DEVIS GRATUITS
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.section}>
                <div className={styles.twoColumn}>
                    <div className={styles.textColumn}>
                        <h2>Sécurité et conformité OIBT garanties</h2>
                        <p>
                            Ne jouez pas avec la sécurité. Pour une rénovation de tableau, une installation domotique ou un simple dépannage, faites appel à des électriciens titulaires d'une autorisation d'installer (OIBT).
                        </p>
                        <p>
                            Nos électriciens partenaires sont vérifiés et assurés.
                        </p>

                        <div className={styles.servicesGrid}>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Mise en conformité OIBT</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Installation de bornes de recharge</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Éclairage LED & Domotique</div>
                            <div className={styles.serviceItem}><span className={styles.checkIcon}>✓</span> Rénovation réseau électrique</div>
                        </div>
                    </div>
                    <div className={styles.imageColumn}>
                        <div className={styles.iconContainer}>
                            <Zap size={120} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2>Une installation sûre et moderne ?</h2>
                    <p>Recevez jusqu'à 3 offres comparatives sous 48h. Gratuit et sans engagement.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        DÉMARRER MON PROJET
                    </Link>
                </div>
            </div>
        </div>
    );
}
