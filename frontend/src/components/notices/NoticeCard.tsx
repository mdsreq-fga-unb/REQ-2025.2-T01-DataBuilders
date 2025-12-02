import NoticePriorityBadge, { type PriorityType } from './NoticePriorityBadge';
import styles from './NoticeCard.module.css';

interface NoticeCardProps {
  priorityType: PriorityType;
  title: string;
  description: string;
  author: string;
  date: string;
  time: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function NoticeCard({
  priorityType,
  title,
  description,
  author,
  date,
  time,
  onEdit,
  onDelete
}: NoticeCardProps) {
  return (
    <div className={`${styles.card} ${styles[priorityType]}`}>
      <div className={styles.cardHeader}>
        <NoticePriorityBadge type={priorityType} />
        <div className={styles.headerActions}>
          <button
            className={styles.actionIcon}
            onClick={onEdit}
            aria-label="Editar aviso"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={styles.actionIcon}
            onClick={onDelete}
            aria-label="Deletar aviso"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.author}>{author}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.date}>{date} - {time}</span>
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;

