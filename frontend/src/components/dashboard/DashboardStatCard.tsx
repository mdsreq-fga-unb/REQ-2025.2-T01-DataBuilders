import type { CSSProperties } from 'react';
import styles from './DashboardStatCard.module.css';

interface DashboardStatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accentColor: string;
  iconBackground: string;
  changeIndicator?: {
    text: string;
    positive: boolean;
  };
  detail?: string;
  detailIcon?: React.ReactNode;
}

function DashboardStatCard({
  icon,
  value,
  label,
  accentColor,
  iconBackground,
  changeIndicator,
  detail,
  detailIcon
}: DashboardStatCardProps) {
  const style = {
    '--icon-color': accentColor,
    '--icon-bg': iconBackground
  } as CSSProperties;

  return (
    <div className="col-12 col-md-4">
      <div className={styles.card} style={style}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
            {changeIndicator && (
              <span className={`${styles.changeIndicator} ${changeIndicator.positive ? styles.positive : styles.negative}`}>
                {changeIndicator.positive ? '↑' : '↓'} {changeIndicator.text}
              </span>
            )}
            {detail && (
              <span className={styles.detail}>
                {detailIcon && <span className={styles.detailIcon}>{detailIcon}</span>}
                {detail}
              </span>
            )}
          </div>
          <div className={styles.iconWrapper}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatCard;


