import styles from './LanguageIndicator.module.css';

interface LanguageIndicatorProps {
  language: string;
}

function LanguageIndicator({ language }: LanguageIndicatorProps) {
  const languageColors: Record<string, string> = {
    Python: '#3572A5',
    Java: '#ED8B00',
    'C++': '#00599C',
    JavaScript: '#F7DF1E',
    C: '#A8B9CC'
  };

  const color = languageColors[language] || '#6c757d';

  return (
    <div className={styles.container}>
      <span className={styles.dot} style={{ backgroundColor: color }}></span>
      <span className={styles.language}>{language}</span>
    </div>
  );
}

export default LanguageIndicator;

