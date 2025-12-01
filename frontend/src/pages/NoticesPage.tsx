import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { FilterDropdown } from '../components/materials';
import { NoticeCard } from '../components/notices';
import { useNotices } from '../context/NoticesContext';
import styles from './NoticesPage.module.css';

function NoticesPage() {
  const [priority, setPriority] = useState('todas');
  const [category, setCategory] = useState('todas');
  const [period, setPeriod] = useState('todos');

  const priorityOptions = [
    { value: 'todas', label: 'Todas as prioridades' },
    { value: 'urgente', label: 'Urgente' },
    { value: 'importante', label: 'Importante' },
    { value: 'informativo', label: 'Informativo' },
    { value: 'geral', label: 'Geral' }
  ];

  const categoryOptions = [
    { value: 'todas', label: 'Todas as categorias' },
    { value: 'prova', label: 'Prova' },
    { value: 'material', label: 'Material' },
    { value: 'horario', label: 'Horário' },
    { value: 'exercicio', label: 'Exercício' }
  ];

  const periodOptions = [
    { value: 'todos', label: 'Todos os períodos' },
    { value: '2024-2', label: '2024.2' },
    { value: '2024-1', label: '2024.1' },
    { value: '2023-2', label: '2023.2' }
  ];

  const { notices, removeNotice, updateNotice } = useNotices();

  const handleMarkAsRead = (index: number) => {
    // TODO: Implementar lógica de marcar como lido
    console.log('Mark as read:', index);
  };

  const handleEdit = (index: number) => {
    const notice = notices[index];
    if (notice) {
      const newTitle = prompt('Editar título:', notice.title);
      if (newTitle && newTitle.trim()) {
        updateNotice(notice.id, { title: newTitle.trim() });
      }
    }
  };

  const handleDelete = (index: number) => {
    const notice = notices[index];
    if (notice && window.confirm('Tem certeza que deseja excluir este aviso?')) {
      removeNotice(notice.id);
    }
  };

  const handleClearFilters = () => {
    setPriority('todas');
    setCategory('todas');
    setPeriod('todos');
  };

  const filteredNotices = useMemo(() => {
    // Criar uma nova referência para garantir atualização imediata
    let filtered = notices.map(n => ({ ...n }));

    // Filtro por prioridade
    if (priority !== 'todas') {
      filtered = filtered.filter(notice => notice.priorityType === priority);
    }

    // Filtro por categoria
    if (category !== 'todas') {
      filtered = filtered.filter(notice => notice.category === category);
    }

    // Filtro por período
    if (period !== 'todos') {
      filtered = filtered.filter(notice => notice.period === period);
    }

    // Ordenação: mais recentes primeiro
    filtered.sort((a, b) => b.dateValue.getTime() - a.dateValue.getTime());

    return filtered;
  }, [priority, category, period]);

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Avisos' }
      ]} />

      <section className={styles.noticesSection}>
        <div className="container">
          <div className={styles.pageHeader}>
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <h1 className={styles.pageTitle}>Avisos e Comunicados</h1>
                <p className={styles.pageDescription}>
                  Informações importantes sobre a disciplina Estruturas de Dados 2
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <div className={styles.headerActions}>
                  <div className={styles.infoButton}>
                    Total: {filteredNotices.length} avisos
                  </div>
                  <Link to="/avisos/novo" className={styles.newNoticeButton}>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Novo Aviso
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.separatorLine}></div>

          <div className={styles.filtersSection}>
            <div className="row g-2 align-items-center">
              <div className="col-auto">
                <div className={styles.filterWrapper}>
                  <FilterDropdown
                    value={priority}
                    options={priorityOptions}
                    onChange={setPriority}
                    hideLabel={true}
                  />
                </div>
              </div>
              <div className="col-auto">
                <div className={styles.filterWrapper}>
                  <FilterDropdown
                    value={category}
                    options={categoryOptions}
                    onChange={setCategory}
                    hideLabel={true}
                  />
                </div>
              </div>
              <div className="col-auto">
                <div className={styles.filterWrapper}>
                  <FilterDropdown
                    value={period}
                    options={periodOptions}
                    onChange={setPeriod}
                    hideLabel={true}
                  />
                </div>
              </div>
              <div className="col-auto ms-auto">
                <div className={styles.clearFilters}>
                  <button 
                    onClick={handleClearFilters}
                    className={styles.clearFiltersLink}
                    disabled={
                      priority === 'todas' &&
                      category === 'todas' &&
                      period === 'todos'
                    }
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.noticesList}>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice, index) => {
                const noticeIndex = notices.findIndex(n => n.id === notice.id);
                return (
                  <NoticeCard
                    key={notice.id}
                    {...notice}
                    onMarkAsRead={() => handleMarkAsRead(noticeIndex)}
                    onEdit={() => handleEdit(noticeIndex)}
                    onDelete={() => handleDelete(noticeIndex)}
                  />
                );
              })
            ) : (
              <div className={styles.noResults}>
                <p>Nenhum aviso encontrado com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default NoticesPage;

