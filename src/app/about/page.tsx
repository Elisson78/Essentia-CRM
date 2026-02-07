import Link from 'next/link';
import Image from 'next/image';
import styles from '../services/ServicePage.module.css'; // Reusing service page styles for consistency
import Header from '@/components/Header';
import { ShieldCheck, Users, HeartHandshake } from 'lucide-react';
import aboutStyles from './About.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <Header />

            {/* Hero Section */}
            <div
                className={styles.hero}
                style={{ backgroundImage: "url('/images/about_hero.png')" }}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Notre mission : Simplifier vos travaux en Suisse.</h1>
                    <p className={styles.heroSubtitle}>Nous connectons les propriétaires exigeants avec les meilleurs artisans locaux. Qualité, confiance et transparence.</p>
                </div>
            </div>

            {/* Story Section */}
            <div className={styles.section}>
                <div className={styles.twoColumn}>
                    <div className={styles.textColumn}>
                        <h2>Une histoire de confiance</h2>
                        <p>
                            DevisMaison est née d'un constat simple : trouver un artisan fiable en Suisse est souvent un parcours du combattant. Entre les devis qui n'arrivent jamais, les prix opaques et la peur des malfaçons, il manquait un tiers de confiance.
                        </p>
                        <p>
                            Nous avons créé DevisMaison pour ramener de la sérénité dans vos projets. Pas de liste interminable, juste les 3 meilleurs pros pour votre besoin, sélectionnés avec rigueur.
                        </p>
                    </div>
                    <div className={styles.imageColumn}>
                        {/* Using the icon container style for visual consistency if image fails, or as a graphic element */}
                        <div className={styles.iconContainer} style={{ background: '#fff', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#D52B1E' }}>+500</div>
                            <div style={{ color: '#718096' }}>Projets Réalisés</div>
                            <div style={{ width: '50px', height: '2px', background: '#E2E8F0' }}></div>
                            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#D52B1E' }}>100%</div>
                            <div style={{ color: '#718096' }}>Suisse Romande</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className={aboutStyles.valuesSection}>
                <div className={aboutStyles.valuesContainer}>
                    <h2 className={aboutStyles.valuesTitle}>Nos Valeurs</h2>
                    <div className={aboutStyles.valuesGrid}>

                        <div className={aboutStyles.valueCard}>
                            <div className={aboutStyles.iconWrapper}>
                                <ShieldCheck size={48} />
                            </div>
                            <h3 className={aboutStyles.cardTitle}>Qualité Suisse 🇨🇭</h3>
                            <p className={aboutStyles.cardText}>Nous ne transigeons pas avec la qualité. Nos partenaires sont vérifiés (RC, diplômes, solvabilité).</p>
                        </div>

                        <div className={aboutStyles.valueCard}>
                            <div className={aboutStyles.iconWrapper}>
                                <Users size={48} />
                            </div>
                            <h3 className={aboutStyles.cardTitle}>Transparence</h3>
                            <p className={aboutStyles.cardText}>Pas de coûts cachés. Le service est 100% gratuit pour les particuliers. Vous comparez, vous choisissez.</p>
                        </div>

                        <div className={aboutStyles.valueCard}>
                            <div className={aboutStyles.iconWrapper}>
                                <HeartHandshake size={48} />
                            </div>
                            <h3 className={aboutStyles.cardTitle}>Humanité</h3>
                            <p className={aboutStyles.cardText}>Derrière la technologie, une équipe basée à Lausanne est là pour vous accompagner 7j/7.</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className={styles.ctaSection} style={{ marginTop: 0, background: 'white' }}>
                <div className={styles.ctaContent}>
                    <h2>Prêt à démarrer ?</h2>
                    <p>Rejoignez les centaines de propriétaires qui ont réussi leurs travaux avec DevisMaison.</p>
                    <Link href="/demande-devis" className={styles.primaryBtn}>
                        TROUVER MON ARTISAN
                    </Link>
                </div>
            </div>
        </div>
    );
}
