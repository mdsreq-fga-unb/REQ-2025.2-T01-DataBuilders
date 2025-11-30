import styles from './TechnologyTag.module.css';

interface TechnologyTagProps {
  language: string;
}

function TechnologyTag({ language }: TechnologyTagProps) {
  const colors: Record<string, { bg: string; text: string }> = {
    Python: {
      bg: '#dbeafe',
      text: '#1e40af'
    },
    Java: {
      bg: '#fed7aa',
      text: '#9a3412'
    },
    'C++': {
      bg: '#e9d5ff',
      text: '#6b21a8'
    }
  };

  const color = colors[language] || { bg: '#e5e7eb', text: '#374151' };

  return (
    <span 
      className={styles.tag}
      style={{ 
        backgroundColor: color.bg,
        color: color.text
      }}
    >
      {language}
    </span>
  );
}

export default TechnologyTag;


