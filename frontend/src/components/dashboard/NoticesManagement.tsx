import NoticesManagementCard from './NoticesManagementCard';
import styles from './NoticesManagement.module.css';

interface Notice {
  id: string;
  priority: 'Urgente' | 'Info' | 'Sucesso';
  title: string;
  description: string;
  publishedAt: string;
  views: number;
}

interface NoticesManagementProps {
  notices: Notice[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function NoticesManagement({ notices, onEdit, onDelete }: NoticesManagementProps) {
  return (
    <div className={styles.noticesManagement}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.sectionTitle}>Gestão de Avisos</h3>
          <p className={styles.sectionDescription}>
            Criar, editar e deletar avisos para os alunos
          </p>
        </div>
        <button className={styles.newButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Aviso
        </button>
      </div>

      <div className="row g-4">
        {notices.map((notice) => (
          <NoticesManagementCard
            key={notice.id}
            id={notice.id}
            priority={notice.priority}
            title={notice.title}
            description={notice.description}
            publishedAt={notice.publishedAt}
            views={notice.views}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default NoticesManagement;

