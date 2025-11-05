import { useState, useMemo } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { FilterDropdown } from '../components/materials';
import { NoticeCard } from '../components/notices';
import type { PriorityType, PriorityLevel } from '../components/notices';
import styles from './NoticesPage.module.css';

interface Notice {
  priorityType: PriorityType;
  priorityLevel: PriorityLevel;
  title: string;
  description: string;
  author: string;
  date: string;
  time: string;
  dateValue: Date;
  category?: string;
  period?: string;
}

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

  const allNotices: Notice[] = [
    {
      priorityType: 'urgente',
      priorityLevel: 'alta',
      title: 'Alteração na Data da Prova Final',
      description: 'A prova final da disciplina foi reagendada para o dia 20/12/2024 às 14h00. Local: Sala AT-109. Favor confirmar presença.',
      author: 'Prof. Mauricio Serrano',
      date: '15/12/2024',
      time: '09:30',
      dateValue: new Date('2024-12-15T09:30:00'),
      category: 'prova',
      period: '2024-2'
    },
    {
      priorityType: 'importante',
      priorityLevel: 'media',
      title: 'Material Complementar Disponível',
      description: 'Novos exercícios sobre árvores AVL e B+ foram adicionados na seção de materiais. Recomendo a prática antes da prova.',
      author: 'Prof. Mauricio Serrano',
      date: '12/12/2024',
      time: '16:45',
      dateValue: new Date('2024-12-12T16:45:00'),
      category: 'material',
      period: '2024-2'
    },
    {
      priorityType: 'informativo',
      priorityLevel: 'baixa',
      title: 'Horário de Atendimento Alterado',
      description: 'A partir desta semana, o horário de atendimento será às terças e quintas, das 14h às 16h, na sala do professor.',
      author: 'Prof. Mauricio Serrano',
      date: '10/12/2024',
      time: '11:20',
      dateValue: new Date('2024-12-10T11:20:00'),
      category: 'horario',
      period: '2024-2'
    },
    {
      priorityType: 'geral',
      priorityLevel: 'baixa',
      title: 'Lista de Exercícios 4 Disponível',
      description: 'A quarta lista de exercícios sobre algoritmos de ordenação está disponível na seção de materiais. Prazo de entrega: 18/12/2024.',
      author: 'Prof. Mauricio Serrano',
      date: '08/12/2024',
      time: '14:15',
      dateValue: new Date('2024-12-08T14:15:00'),
      category: 'exercicio',
      period: '2024-2'
    }
  ];

  const handleMarkAsRead = (index: number) => {
    // TODO: Implementar lógica de marcar como lido
    console.log('Mark as read:', index);
  };

  const handleEdit = (index: number) => {
    // TODO: Implementar lógica de editar
    console.log('Edit:', index);
  };

  const handleDelete = (index: number) => {
    // TODO: Implementar lógica de deletar
    console.log('Delete:', index);
  };

  const handleClearFilters = () => {
    setPriority('todas');
    setCategory('todas');
    setPeriod('todos');
  };

  const filteredNotices = useMemo(() => {
    let filtered = [...allNotices];

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
                  <button className={styles.newNoticeButton}>
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
                  </button>
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
              filteredNotices.map((notice, index) => (
                <NoticeCard
                  key={index}
                  {...notice}
                  onMarkAsRead={() => handleMarkAsRead(index)}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleDelete(index)}
                />
              ))
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

