import type { CSSProperties } from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accentColor: string;
  iconBackground: string;
}

function StatCard({ icon, value, label, accentColor, iconBackground }: StatCardProps) {
  const style = {
    '--icon-color': accentColor,
    '--icon-bg': iconBackground
  } as CSSProperties;

  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className={styles.card} style={style}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
          </div>
          <div className={styles.iconWrapper}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;

