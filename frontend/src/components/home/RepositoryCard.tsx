import TechnologyTag from './TechnologyTag';
import styles from './RepositoryCard.module.css';

interface RepositoryCardProps {
  title: string;
  stars: number;
  description: string;
  language: string;
  githubUrl: string;
}

function RepositoryCard({ title, stars, description, language, githubUrl }: RepositoryCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.stars}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span className={styles.starCount}>{stars}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <TechnologyTag language={language} />
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          Ver no GitHub
        </a>
      </div>
    </div>
  );
}

export default RepositoryCard;


