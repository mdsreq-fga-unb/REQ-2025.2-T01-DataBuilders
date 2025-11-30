import styles from './HighlightCard.module.css';

interface HighlightCardProps {
  type: 'warning' | 'success' | 'info';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

function HighlightCard({ type, title, description, timestamp, icon }: HighlightCardProps) {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        <div className={styles.content}>
          <h5 className={styles.title}>
            {title}
          </h5>
          <p className={styles.description}>
            {description}
          </p>
          <small className={styles.timestamp}>
            {timestamp}
          </small>
        </div>
      </div>
    </div>
  );
}

export default HighlightCard;

