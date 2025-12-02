import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import NoticePriorityBadge from '../components/notices/NoticePriorityBadge';
import NoticePriorityTag from '../components/notices/NoticePriorityTag';
import { useNotices } from '../context/NoticesContext';
import styles from './NoticeDetailPage.module.css';

function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notices } = useNotices();
  const [isCompleted, setIsCompleted] = useState(false);

  const notice = notices.find(n => n.id === id);

  useEffect(() => {
    if (notice) {
      // Verificar se o aviso está marcado como concluído no localStorage
      const completedNotices = JSON.parse(localStorage.getItem('completedNotices') || '[]');
      setIsCompleted(completedNotices.includes(notice.id));
    }
  }, [notice]);

  useEffect(() => {
    if (!notice) {
      // Se o aviso não foi encontrado, redirecionar após um breve delay
      const timer = setTimeout(() => {
        navigate('/avisos');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notice, navigate]);

  const handleMarkAsCompleted = () => {
    if (!notice) return;

    const completedNotices = JSON.parse(localStorage.getItem('completedNotices') || '[]');
    
    if (isCompleted) {
      // Remover da lista de concluídos
      const updated = completedNotices.filter((nId: string) => nId !== notice.id);
      localStorage.setItem('completedNotices', JSON.stringify(updated));
      setIsCompleted(false);
    } else {
      // Adicionar à lista de concluídos
      if (!completedNotices.includes(notice.id)) {
        completedNotices.push(notice.id);
        localStorage.setItem('completedNotices', JSON.stringify(completedNotices));
        setIsCompleted(true);
      }
    }
  };

  if (!notice) {
    return (
      <DefaultLayout>
        <div className={styles.notFound}>
          <h2>Aviso não encontrado</h2>
          <p>Redirecionando para a página de avisos...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Avisos', path: '/avisos' },
        { label: notice.title }
      ]} />

      <section className={styles.detailSection}>
        <div className="container">
          <div className={styles.header}>
            <Link to="/avisos" className={styles.backButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voltar para Avisos
            </Link>
          </div>

          <div className={`${styles.noticeDetail} ${styles[notice.priorityType]}`}>
            <div className={styles.detailHeader}>
              <div className={styles.prioritySection}>
                <NoticePriorityBadge type={notice.priorityType} />
                <NoticePriorityTag level={notice.priorityLevel} />
              </div>
              <div className={styles.completionSection}>
                <button
                  className={`${styles.completeButton} ${isCompleted ? styles.completed : ''}`}
                  onClick={handleMarkAsCompleted}
                >
                  {isCompleted ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Concluído
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      Marcar como Concluído
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.detailContent}>
              <h1 className={styles.title}>{notice.title}</h1>
              
              <div className={styles.metadata}>
                <div className={styles.metadataItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{notice.author}</span>
                </div>
                <div className={styles.metadataItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{notice.date} às {notice.time}</span>
                </div>
                {notice.category && (
                  <div className={styles.metadataItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className={styles.categoryBadge}>{notice.category}</span>
                  </div>
                )}
                {notice.period && (
                  <div className={styles.metadataItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{notice.period}</span>
                  </div>
                )}
              </div>

              <div className={styles.description}>
                <h2 className={styles.descriptionTitle}>Descrição</h2>
                <p className={styles.descriptionText}>{notice.description}</p>
              </div>

              {isCompleted && (
                <div className={styles.completionBanner}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Você marcou este aviso como concluído</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default NoticeDetailPage;

