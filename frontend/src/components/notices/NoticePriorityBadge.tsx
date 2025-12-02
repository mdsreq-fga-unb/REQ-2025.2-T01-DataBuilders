import styles from './NoticePriorityBadge.module.css';

export type PriorityType = 'urgente' | 'importante' | 'informativo' | 'geral';

interface NoticePriorityBadgeProps {
  type: PriorityType;
}

function NoticePriorityBadge({ type }: NoticePriorityBadgeProps) {
  const typeConfig = {
    urgente: {
      label: 'URGENTE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18C1.64538 18.3024 1.55299 18.6453 1.552 19C1.55101 19.3547 1.64148 19.6981 1.81445 20.0017C1.98742 20.3052 2.23675 20.5581 2.53769 20.7342C2.83862 20.9104 3.18082 21.0035 3.53 21H20.47C20.8192 21.0035 21.1614 20.9104 21.4623 20.7342C21.7633 20.5581 22.0126 20.3052 22.1855 20.0017C22.3585 19.6981 22.449 19.3547 22.448 19C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5318 3.56631 13.2807 3.32312 12.9812 3.15448C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98584 11.0188 3.15448C10.7193 3.32312 10.4682 3.56631 10.29 3.86V3.86Z" />
          <path d="M12 9V13" />
          <path d="M12 17H12.01" />
        </svg>
      ),
      className: styles.urgente
    },
    importante: {
      label: 'IMPORTANTE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      className: styles.importante
    },
    informativo: {
      label: 'INFORMATIVO',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16V12" />
          <path d="M12 8H12.01" />
        </svg>
      ),
      className: styles.informativo
    },
    geral: {
      label: 'GERAL',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
          <path d="M14 2V8H20" />
        </svg>
      ),
      className: styles.geral
    }
  };

  const config = typeConfig[type];

  return (
    <div className={`${styles.badge} ${config.className}`}>
      <span className={styles.icon}>{config.icon}</span>
      <span className={styles.label}>{config.label}</span>
    </div>
  );
}

export default NoticePriorityBadge;

