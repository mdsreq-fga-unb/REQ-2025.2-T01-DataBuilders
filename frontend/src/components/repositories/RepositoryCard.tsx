import LanguageIndicator from './LanguageIndicator';
import styles from './RepositoryCard.module.css';

interface RepositoryCardProps {
  title: string;
  description: string;
  language: string;
  updatedDate: string;
  stars: number;
  readmeStatus: 'ativo' | 'ativo-sem-label' | 'sem-readme';
  isFavorite: boolean; // deixei para compatibilidade, mas não será usado
  onToggleFavorite?: () => void; // não usado
  githubUrl: string;
  detailsUrl?: string; // não usado
}

function RepositoryCard({
  title,
  description,
  language,
  updatedDate,
  stars,
  readmeStatus,
  githubUrl
}: RepositoryCardProps) {

  const getReadmeStatusText = () => {
    switch (readmeStatus) {
      case 'ativo':
        return 'README Ativo';
      case 'ativo-sem-label':
        return 'README';
      case 'sem-readme':
        return 'Sem README';
      default:
        return '';
    }
  };

  const getReadmeStatusClass = () => {
    switch (readmeStatus) {
      case 'ativo':
      case 'ativo-sem-label':
        return styles.readmeActive;
      case 'sem-readme':
        return styles.readmeInactive;
      default:
        return '';
    }
  };

  return (
    <div className={styles.card}>
      {/* 🔹 Cabeçalho — removido o botão de favoritos */}
      <div className={styles.cardHeader}>
        <div className={styles.githubIcon}>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
      </div>

      {/* 🔹 Conteúdo principal */}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.metadata}>
        <LanguageIndicator language={language} />
        <span className={styles.separator}>•</span>
        <span className={styles.updatedDate}>{updatedDate}</span>
      </div>

      <div className={styles.stats}>
        <div className={styles.stars}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="#fbbf24"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className={styles.starCount}>{stars}</span>
        </div>
        <span className={`${styles.readmeStatus} ${getReadmeStatusClass()}`}>
          {getReadmeStatusText()}
        </span>
      </div>

      {/* 🔹 Botão final — Detalhes REMOVIDO */}
      <div className={styles.actions}>
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.secondaryButton}
        >
          Link para GitHub
        </a>
      </div>
    </div>
  );
}

export default RepositoryCard;