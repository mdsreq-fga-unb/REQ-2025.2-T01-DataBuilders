import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import styles from './ContentManagementCard.module.css';

interface Statistic {
  label: string;
  value: string | number;
}

interface ContentManagementCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  statistics: Statistic[];
  primaryButton: {
    text: string;
    link: string;
    variant?: 'blue' | 'grey' | 'orange';
  };
  secondaryButton: {
    text: string;
    link: string;
    variant?: 'blue' | 'grey' | 'orange';
  };
  iconColor?: string;
  iconBackground?: string;
}

function ContentManagementCard({
  icon,
  title,
  description,
  statistics,
  primaryButton,
  secondaryButton,
  iconColor,
  iconBackground
}: ContentManagementCardProps) {
  const iconStyle: CSSProperties | undefined = iconColor || iconBackground
    ? ({
        '--icon-color': iconColor,
        '--icon-bg': iconBackground
      } as CSSProperties)
    : undefined;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconContainer} style={iconStyle}>
          {icon}
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={styles.statistics}>
        {statistics.map((stat, index) => (
          <div key={index} className={styles.statistic}>
            <span className={styles.statLabel}>{stat.label}:</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <Link
          to={primaryButton.link}
          className={`${styles.button} ${styles[`button${primaryButton.variant || 'blue'}`]}`}
        >
          {primaryButton.text}
        </Link>
        <Link
          to={secondaryButton.link}
          className={`${styles.button} ${styles.buttonOutlined} ${styles[`buttonOutlined${secondaryButton.variant || 'blue'}`]}`}
        >
          {secondaryButton.text}
        </Link>
      </div>
    </div>
  );
}

export default ContentManagementCard;

