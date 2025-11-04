import styles from './NoticeCard.module.css';

interface NoticeCardProps {
  type: 'warning' | 'info' | 'success' | 'extra';
  title: string;
  description: string;
  publishedTime: string;
  author: string;
  icon: React.ReactNode;
}

function NoticeCard({ type, title, description, publishedTime, author, icon }: NoticeCardProps) {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.metadata}>
            {publishedTime} • {author}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;


