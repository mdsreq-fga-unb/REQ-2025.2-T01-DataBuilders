import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <div className={styles.logoBox}>
        DB
      </div>
      <span className={styles.logoText}>
        Data Builders
      </span>
    </div>
  );
}

export default Logo;

