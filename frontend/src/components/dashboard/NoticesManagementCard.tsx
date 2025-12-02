import styles from './NoticesManagementCard.module.css';

interface NoticesManagementCardProps {
  id: string;
  priority: 'Urgente' | 'Importante' | 'Info' | 'Geral';
  title: string;
  description: string;
  publishedAt: string;
  views: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function NoticesManagementCard({
  id,
  priority,
  title,
  description,
  publishedAt,
  views,
  onEdit,
  onDelete
}: NoticesManagementCardProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'Urgente':
        return {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          ),
          iconBackground: '#fef3c7',
          iconColor: '#f59e0b',
          badgeColor: '#dc2626',
          badgeText: 'Urgente'
        };
      case 'Importante':
        return {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ),
          iconBackground: '#fef3c7',
          iconColor: '#d97706',
          badgeColor: '#d97706',
          badgeText: 'Importante'
        };
      case 'Info':
        return {
          icon: (
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#2563eb"></circle>
              <text x="12" y="16" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">i</text>
            </svg>
          ),
          iconBackground: '#dbeafe',
          iconColor: '#2563eb',
          badgeColor: '#2563eb',
          badgeText: 'Info'
        };
      case 'Geral':
        return {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          ),
          iconBackground: '#d1fae5',
          iconColor: '#059669',
          badgeColor: '#059669',
          badgeText: 'Geral'
        };
      default:
        return {
          icon: null,
          iconBackground: '#f3f4f6',
          iconColor: '#6b7280',
          badgeColor: '#6b7280',
          badgeText: priority
        };
    }
  };

  const config = getPriorityConfig(priority);

  const iconStyle = {
    '--icon-bg': config.iconBackground,
    '--icon-color': config.iconColor
  } as React.CSSProperties;

  return (
    <div className="col-12 col-md-4">
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.prioritySection}>
            <div className={styles.priorityIcon} style={iconStyle}>
              {config.icon}
            </div>
            <span
              className={styles.priorityBadge}
              style={{ backgroundColor: config.badgeColor }}
            >
              {config.badgeText}
            </span>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              onClick={() => onEdit(id)}
              aria-label="Editar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              className={styles.actionButton}
              onClick={() => onDelete(id)}
              aria-label="Deletar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.metadata}>
          <span className={styles.publishedAt}>Publicado {publishedAt}</span>
          <span className={styles.views}>{views} visualizações</span>
        </div>
      </div>
    </div>
  );
}

export default NoticesManagementCard;

