import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';
import CategoriesSection from '@/components/CategoriesSection';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Trouvez l'artisan idéal pour vos travaux en Suisse – Sans stress.</h1>
          <p>
            Ne perdez plus des heures à chercher. Décrivez votre projet et recevez jusqu'à 3 offres comparatives d'entreprises locales qualifiées.
            <br />
            <strong>Gratuit • Sans engagement • Réponse sous 48h</strong>
          </p>

          <div className={styles.heroCtaWrapper}>
            <Link href="/demande-devis" className={styles.btnHero}>
              RECEVOIR MES DEVIS GRATUITS
            </Link>
            <span className={styles.ctaSubtext}>2 minutes suffisent</span>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <span className={styles.checkIcon}>✓</span> Artisans Vérifiés
            </div>
            <div className={styles.trustBadge}>
              <span className={styles.checkIcon}>✓</span> 100% Gratuit
            </div>
            <div className={styles.trustBadge}>
              <span className={styles.checkIcon}>✓</span> +500 Projets réalisés
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - NEW */}
      <section className={styles.socialProof}>
        <div className={styles.socialProofContent}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>+2'000</span>
            <span className={styles.statLabel}>Devis envoyés ce mois</span>
          </div>
          <div className={styles.testimonial}>
            <p>"J'ai trouvé un peintre à Lausanne en 24h. Le travail était impeccable et le prix juste. Merci DevisMaison."</p>
            <div className={styles.testimonialAuthor}>
              <strong>Sophie M.</strong>, Genève <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section - NEW */}
      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Pourquoi passer par DevisMaison ?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>⏱️</div>
            <h3>Gain de Temps</h3>
            <p>Fini les appels sans réponse. Une seule demande, plusieurs professionnels disponibles.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🛡️</div>
            <h3>Qualité Suisse</h3>
            <p>Nous vérifions l'assurance et le registre du commerce de chaque partenaire.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>💰</div>
            <h3>Prix Justes</h3>
            <p>Mettez les artisans en concurrence et économisez jusqu'à 30% sur vos travaux.</p>
          </div>
        </div>
      </section>

      {/* Comment ça marche - Optimized Copy */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>Vos travaux en 3 étapes simples</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3>Décrivez votre besoin</h3>
            <p>Remplissez notre formulaire intelligent pour préciser votre projet (type de travaux, surface, budget).</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3>Comparaison Rapide</h3>
            <p>Nous sélectionnons les 3 meilleures entreprises disponibles dans votre région.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3>Liberté de Choix</h3>
            <p>Recevez vos devis, comparez les prix et les avis, et choisissez (ou non) sans pression.</p>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <CategoriesSection />

      {/* Final CTA - NEW */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaContent}>
          <h2>Prêt à lancer votre projet ?</h2>
          <p>Rejoignez les milliers de Suisses qui ont simplifié leurs travaux.</p>
          <Link href="/demande-devis" className={styles.btnHero}>
            DEMANDER UN DEVIS MAINTENANT
          </Link>
        </div>
      </section>

      {/* Trust Block - Revised */}
      <section className={styles.trust}>
        <div className={styles.trustText}>
          "La solution la plus simple pour vos travaux en Suisse : qualité helvétique et prix justes."
        </div>
      </section>

      {/* Footer Enhanced */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                DEVIS MAISON
              </span>
            </div>
            <p>La plateforme de référence pour vos projets de construction et rénovation en Suisse. Qualité, rapidité et transparence.</p>
          </div>

          <div className={styles.footerColumn}>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/renovation">Rénovation</Link></li>
              <li><Link href="/services/construction">Construction</Link></li>
              <li><Link href="/services/peinture">Peinture</Link></li>
              <li><Link href="/services/electricite">Électricité</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Entreprise</h4>
            <ul>
              <li><Link href="/about">À propos</Link></li>
              <li><Link href="/pro">Espace Pro</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.newsletter}>
              <h4>Restez informé</h4>
              <p>Inscrivez-vous pour recevoir nos conseils et actualités.</p>
              <div className={styles.newsletterInput}>
                <input type="email" placeholder="Votre email" />
                <button>OK</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} DevisMaison. Pensez à la Suisse.</p>
          <div className={styles.socialLinks}>
            <Link href="#">LinkedIn</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Facebook</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
