import styles from './NoticePriorityTag.module.css';

export type PriorityLevel = 'alta' | 'media' | 'baixa';

interface NoticePriorityTagProps {
  level: PriorityLevel;
}

function NoticePriorityTag({ level }: NoticePriorityTagProps) {
  const levelConfig = {
    alta: {
      label: 'Alta Prioridade',
      className: styles.alta
    },
    media: {
      label: 'Média Prioridade',
      className: styles.media
    },
    baixa: {
      label: 'Baixa Prioridade',
      className: styles.baixa
    }
  };

  const config = levelConfig[level];

  return (
    <span className={`${styles.tag} ${config.className}`}>
      {config.label}
    </span>
  );
}

export default NoticePriorityTag;

