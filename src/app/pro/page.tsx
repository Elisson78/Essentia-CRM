import Link from 'next/link';
import Image from 'next/image';
import styles from './Pro.module.css';
import ProHeader from '@/components/ProHeader';

export default function ProPage() {
    return (
        <div className={styles.container}>
            {/* Header */}
            <ProHeader />

            {/* Hero Section Pro */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Développez votre entreprise avec des leads qualifiés</h1>
                    <p>Accédez à des projets de rénovation vérifiés dans votre région.</p>

                    <Link href="/register?role=ENTREPRISE" className={styles.btnHero}>
                        Trouver des chantiers
                    </Link>
                </div>
            </section>

            {/* Intelligent Lead Generation Section */}
            <section className={styles.statsSection}>
                <h2>Génération de Leads Intelligente</h2>
                <p className={styles.subTitle}>Rendu possible par la numérisation</p>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>2x</div>
                        <p className={styles.statLabel}>Cycles de vente plus rapides</p>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>10x</div>
                        <p className={styles.statLabel}>Plus de leads qualifiés</p>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>50%</div>
                        <p className={styles.statLabel}>Commerciaux plus efficaces</p>
                    </div>
                </div>
            </section>

            {/* Your Competitive Advantage Section */}
            <section className={styles.advantageSection}>
                <h2>Votre Avantage Compétitif</h2>
                <div className={styles.advantageGrid}>
                    <div className={styles.advantageCard}>
                        <div className={styles.cardIcon}>✅</div>
                        <h3>Leads Qualifiés</h3>
                        <p>Recevez des informations exclusives sur des projets de construction lucratifs adaptés à vos besoins.</p>
                    </div>
                    <div className={styles.advantageCard}>
                        <div className={styles.cardIcon}>⏱️</div>
                        <h3>Plus de temps pour vendre</h3>
                        <p>Tous les leads sont enrichis de détails supplémentaires, vous permettant de les contacter immédiatement.</p>
                    </div>
                    <div className={styles.advantageCard}>
                        <div className={styles.cardIcon}>📈</div>
                        <h3>Pipeline de vente complet</h3>
                        <p>Une base solide de leads qualifiés pour votre succès commercial à long terme.</p>
                    </div>
                    <div className={styles.advantageCard}>
                        <div className={styles.cardIcon}>💰</div>
                        <h3>Plus de revenus</h3>
                        <p>Améliorez votre taux de réussite en recevant des leads qualifiés au moment opportun.</p>
                    </div>
                </div>
            </section>

            {/* Footer Simplified for Pro Page */}
            <footer style={{ padding: '40px', textAlign: 'center', color: '#666', fontSize: '14px', borderTop: '1px solid #eee' }}>
                <p>&copy; {new Date().getFullYear()} DevisMaison Pro. <Link href="/">Retour au site client</Link></p>
            </footer>
        </div>
    );
}
