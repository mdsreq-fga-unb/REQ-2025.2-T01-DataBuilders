import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  courseTitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

function HeroSection({ courseTitle, description, ctaText, ctaLink }: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className={styles.title}>
              {courseTitle}
            </h1>
            <p className={styles.description}>
              {description}
            </p>
            <Link to={ctaLink} className={styles.ctaButton}>
              {ctaText}
            </Link>
          </div>

          <div className="col-lg-5">
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.iconContainer}>
                  <svg 
                    width="180" 
                    height="180" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M14 2V8H20" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M16 13H8" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M16 17H8" 
                      stroke="white" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>
                  Aprendizado Prático
                </h3>
                <p className={styles.cardDescription}>
                  Teoria e prática integradas para dominar estruturas de dados avançadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

