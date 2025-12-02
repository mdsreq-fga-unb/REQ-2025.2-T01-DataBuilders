import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { FilterDropdown } from '../components/materials';
import { NoticeCard } from '../components/notices';
import { type PriorityType } from '../components/notices';
import { useNotices, type NoticeData } from '../context/NoticesContext';
import styles from './NoticesPage.module.css';

function NoticesPage() {
  const [priority, setPriority] = useState('todas');
  const [category, setCategory] = useState('todas');
  const [period, setPeriod] = useState('todos');
  
  // Estados para modais
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeData | null>(null);
  const [deletingNoticeId, setDeletingNoticeId] = useState<string | null>(null);

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
    { value: '2025-2', label: '2025.2' },
    { value: '2025-1', label: '2025.1' },
    { value: '2024-2', label: '2024.2' },
    { value: '2024-1', label: '2024.1' },
    { value: '2023-2', label: '2023.2' }
  ];

  const { notices, removeNotice, updateNotice } = useNotices();

  // Estado para formulário de edição
  const [editForm, setEditForm] = useState<{
    title: string;
    description: string;
    priorityType: PriorityType;
    category: string;
    period: string;
  }>({
    title: '',
    description: '',
    priorityType: 'geral',
    category: '',
    period: ''
  });

  const handleEdit = (id: string) => {
    const notice = notices.find(n => n.id === id);
    if (notice) {
      setEditingNotice(notice);
      setEditForm({
        title: notice.title,
        description: notice.description,
        priorityType: notice.priorityType,
        category: notice.category || '',
        period: notice.period || ''
      });
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (!editingNotice) return;
    
    if (!editForm.title.trim() || !editForm.description.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    updateNotice(editingNotice.id, {
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      priorityType: editForm.priorityType,
      category: editForm.category || undefined,
      period: editForm.period || undefined
    });

    alert('Aviso atualizado com sucesso!');
    setShowEditModal(false);
    setEditingNotice(null);
    setEditForm({ title: '', description: '', priorityType: 'geral' as PriorityType, category: '', period: '' });
  };

  const handleDelete = (id: string) => {
    const notice = notices.find(n => n.id === id);
    if (notice) {
      setDeletingNoticeId(id);
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    if (deletingNoticeId) {
      removeNotice(deletingNoticeId);
      alert('Aviso excluído com sucesso!');
      setShowDeleteModal(false);
      setDeletingNoticeId(null);
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
  }, [notices, priority, category, period]);

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
              filteredNotices.map((notice) => {
                return (
                  <NoticeCard
                    key={notice.id}
                    {...notice}
                    onEdit={() => handleEdit(notice.id)}
                    onDelete={() => handleDelete(notice.id)}
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

      {/* Modal de Editar Aviso */}
      {showEditModal && editingNotice && (
        <div className={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Editar Aviso</h2>
              <button className={styles.closeButton} onClick={() => setShowEditModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Título *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Digite o título do aviso"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Descrição *</label>
                <textarea
                  className={styles.textarea}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Digite a descrição do aviso"
                  rows={4}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Prioridade</label>
                <select
                  className={styles.select}
                  value={editForm.priorityType}
                  onChange={(e) => setEditForm({ ...editForm, priorityType: e.target.value as any })}
                >
                  <option value="urgente">Urgente</option>
                  <option value="importante">Importante</option>
                  <option value="informativo">Informativo</option>
                  <option value="geral">Geral</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Categoria</label>
                <select
                  className={styles.select}
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="prova">Prova</option>
                  <option value="material">Material</option>
                  <option value="horario">Horário</option>
                  <option value="exercicio">Exercício</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Período</label>
                <select
                  className={styles.select}
                  value={editForm.period}
                  onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                >
                  <option value="">Selecione um período</option>
                  <option value="2025-2">2025.2</option>
                  <option value="2025-1">2025.1</option>
                  <option value="2024-2">2024.2</option>
                  <option value="2024-1">2024.1</option>
                  <option value="2023-2">2023.2</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={() => setShowEditModal(false)}>
                Cancelar
              </button>
              <button className={styles.saveButton} onClick={handleSaveEdit}>
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmar Exclusão */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Confirmar Exclusão</h2>
              <button className={styles.closeButton} onClick={() => setShowDeleteModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja excluir este aviso? Esta ação não pode ser desfeita.</p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className={styles.deleteButton} onClick={confirmDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default NoticesPage;

