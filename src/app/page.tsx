import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>DevisMaison</div>
        <div className={styles.navActions}>
          <Link href="/login" className={`${styles.btnLink} ${styles.btnConnexion}`}>
            Connexion
          </Link>
          <Link href="/register" className={`${styles.btnLink} ${styles.btnInscription}`}>
            Inscription
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Comparez jusqu’à 3 devis pour vos travaux en Suisse</h1>
          <p>Gratuit • Sans engagement • Entreprises locales vérifiées</p>
          <Link href="/demande-devis" className={styles.btnHero}>
            Demander un devis
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

      {/* Comment ça marche */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3>Décrivez votre projet</h3>
            <p>Remplissez notre formulaire simple en 2 minutes.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3>Recevez des devis</h3>
            <p>Jusqu'à 3 entreprises locales qualifiées vous contactent.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3>Choisissez le meilleur</h3>
            <p>Comparez les offres et économisez sur vos travaux.</p>
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className={styles.trust}>
        <div className={styles.trustText}>
          "La solution la plus simple pour vos travaux en Suisse : qualité helvétique et prix justes."
        </div>
      </section>

      {/* Footer Enhanced */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <span className={styles.logo}>DevisMaison</span>
            <p>La plateforme de référence pour vos projets de construction et rénovation en Suisse. Qualité, rapidité et transparence.</p>
          </div>

          <div className={styles.footerColumn}>
            <h4>Services</h4>
            <ul>
              <li><Link href="#">Rénovation</Link></li>
              <li><Link href="#">Construction</Link></li>
              <li><Link href="#">Peinture</Link></li>
              <li><Link href="#">Électricité</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Société</h4>
            <ul>
              <li><Link href="#">À propos</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Carrières</Link></li>
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
