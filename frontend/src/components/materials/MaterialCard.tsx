import { Link } from 'react-router-dom';
import MaterialTypeBadge from './MaterialTypeBadge';
import styles from './MaterialCard.module.css';

export type MaterialType = 'slides' | 'video' | 'pdf' | 'codigo';

interface MaterialCardProps {
  type: MaterialType;
  title: string;
  description: string;
  professor: string;
  date: string;
  downloads: number;
  version: string;
  isFavorite: boolean;
  onToggleFavorite?: () => void;
  additionalInfo?: string; // Ex: "45min", "24 páginas", "3 linguagens"
  actionButtonText?: string; // Ex: "Visualizar", "Assistir", "Ver Código"
  actionButtonLink?: string;
  downloadLink?: string;
}

function MaterialCard({
  type,
  title,
  description,
  professor,
  date,
  downloads,
  version,
  isFavorite,
  onToggleFavorite,
  additionalInfo,
  actionButtonText = 'Visualizar',
  actionButtonLink = '#',
  downloadLink = '#'
}: MaterialCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <MaterialTypeBadge type={type} />
        <button
          className={styles.favoriteButton}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#fbbf24' : 'none'}
            stroke={isFavorite ? '#fbbf24' : '#6c757d'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.metadata}>
        <span className={styles.professor}>{professor}</span>
        <span className={styles.date}>{date}</span>
      </div>

      <div className={styles.stats}>
        <span className={styles.downloads}>{downloads} downloads</span>
        {additionalInfo && (
          <>
            <span className={styles.separator}>•</span>
            <span className={styles.additionalInfo}>{additionalInfo}</span>
          </>
        )}
      </div>

      <div className={styles.version}>
        <span className={styles.versionBadge}>{version}</span>
      </div>

      <div className={styles.actions}>
        <Link to={actionButtonLink} className={styles.primaryButton}>
          {actionButtonText}
        </Link>
        <Link to={downloadLink} className={styles.secondaryButton}>
          Download
        </Link>
      </div>
    </div>
  );
}

export default MaterialCard;

