import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts';
import { Breadcrumb, DashboardStatCard, DashboardTabs, MaterialsManagementTable, NoticesManagement, UsersManagementTable } from '../components';
import { useMaterials, type MaterialType } from '../context/MaterialsContext';
import { useNotices } from '../context/NoticesContext';
import { type PriorityType } from '../components/notices';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('materials');
  const { materials: contextMaterials, addMaterial, updateMaterial, removeMaterial, versionMaterial } = useMaterials();
  const { notices: contextNotices, addNotice, updateNotice, removeNotice } = useNotices();

  // Estados para modais
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState<'material' | 'notice' | 'user' | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Estados para edição
  const [editingMaterial, setEditingMaterial] = useState<string | null>(null);
  const [editingNotice, setEditingNotice] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  // Estados para formulários
  const [materialForm, setMaterialForm] = useState<{
    title: string;
    description: string;
    type: MaterialType;
    status: 'Publicado' | 'Rascunho';
    topic: string;
    period: string;
  }>({
    title: '',
    description: '',
    type: 'slides',
    status: 'Publicado',
    topic: '',
    period: ''
  });

  const [noticeForm, setNoticeForm] = useState<{
    title: string;
    description: string;
    priority: PriorityType;
  }>({
    title: '',
    description: '',
    priority: 'geral'
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    type: 'Monitor',
    permissions: ''
  });

  const tabs = [
    { id: 'materials', label: 'Gestão de Materiais' },
    { id: 'notices', label: 'Gestão de Avisos' },
    { id: 'users', label: 'Gestão de Usuários' }
  ];

  // Converter materiais do contexto para formato da tabela
  const materials = contextMaterials.map(m => {
    let type: 'Slides' | 'PDF' | 'Video' = 'Slides';
    if (m.type === 'video') type = 'Video';
    else if (m.type === 'pdf') type = 'PDF';
    else if (m.type === 'codigo') type = 'Slides'; // Fallback para codigo
    
    return {
      id: m.id,
      title: m.title,
      type,
      version: m.version,
      downloads: m.downloads,
      status: m.status || 'Publicado' as const,
      updatedAt: m.updatedAt || 'agora',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    };
  });

  const handleEdit = (id: string) => {
    const material = contextMaterials.find(m => m.id === id);
    if (material) {
      setEditingMaterial(id);
      setMaterialForm({
        title: material.title,
        description: material.description,
        type: material.type,
        status: material.status || 'Publicado',
        topic: material.topic || '',
        period: material.period || ''
      });
      setShowMaterialModal(true);
    }
  };

  const handleVersion = async (id: string) => {
    try {
      await versionMaterial(id);
      alert('Material versionado com sucesso!');
    } catch (error) {
      alert('Erro ao versionar material');
    }
  };

  const handleDelete = (id: string) => {
    setDeleteType('material');
    setDeleteId(id);
    setShowDeleteModal(true);
  };


  const handleSaveMaterial = async () => {
    if (!materialForm.title || !materialForm.description) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      if (editingMaterial) {
        await updateMaterial(editingMaterial, {
          title: materialForm.title,
          description: materialForm.description,
          type: materialForm.type,
          status: materialForm.status,
          topic: materialForm.topic || undefined,
          period: materialForm.period || undefined
        });
        alert('Material atualizado com sucesso!');
      } else {
        await addMaterial({
          title: materialForm.title,
          description: materialForm.description,
          type: materialForm.type,
          status: materialForm.status,
          topic: materialForm.topic || undefined,
          period: materialForm.period || undefined,
          isFavorite: false,
          contentUrl: undefined
        });
        alert('Material criado com sucesso!');
      }
      setShowMaterialModal(false);
      setEditingMaterial(null);
      setMaterialForm({ title: '', description: '', type: 'slides' as MaterialType, status: 'Publicado' as const, topic: '', period: '' });
    } catch (error) {
      alert('Erro ao salvar material');
    }
  };

  // Converter avisos do contexto para formato da tabela
  const notices = contextNotices.map(n => {
    let priority: 'Urgente' | 'Importante' | 'Info' | 'Geral' = 'Geral';
    if (n.priorityType === 'urgente') priority = 'Urgente';
    else if (n.priorityType === 'importante') priority = 'Importante';
    else if (n.priorityType === 'informativo') priority = 'Info';
    else if (n.priorityType === 'geral') priority = 'Geral';
    
    return {
      id: n.id,
      priority,
      title: n.title,
      description: n.description,
      publishedAt: n.date,
      views: 0
    };
  });

  const handleEditNotice = (id: string) => {
    const notice = contextNotices.find(n => n.id === id);
    if (notice) {
      setEditingNotice(id);
      setNoticeForm({
        title: notice.title,
        description: notice.description,
        priority: notice.priorityType
      });
      setShowNoticeModal(true);
    }
  };

  const handleDeleteNotice = (id: string) => {
    setDeleteType('notice');
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleNewNotice = () => {
    setEditingNotice(null);
    setNoticeForm({ title: '', description: '', priority: 'geral' });
    setShowNoticeModal(true);
  };

  const handleSaveNotice = () => {
    if (!noticeForm.title || !noticeForm.description) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingNotice) {
      updateNotice(editingNotice, {
        title: noticeForm.title,
        description: noticeForm.description,
        priorityType: noticeForm.priority
      });
      alert('Aviso atualizado com sucesso!');
    } else {
      addNotice({
        title: noticeForm.title,
        description: noticeForm.description,
        priorityType: noticeForm.priority,
        priorityLevel: noticeForm.priority === 'urgente' ? 'alta' : noticeForm.priority === 'importante' ? 'media' : 'baixa',
        author: 'Prof. Mauricio Serrano',
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        dateValue: new Date()
      });
      alert('Aviso criado com sucesso!');
    }
    setShowNoticeModal(false);
    setEditingNotice(null);
    setNoticeForm({ title: '', description: '', priority: 'geral' as PriorityType });
  };

  const [users, setUsers] = useState<Array<{
    id: string;
    name: string;
    email: string;
    initials: string;
    avatarColor: string;
    type: string;
    permissions: string;
    lastAccess: string;
    status: 'Ativo' | 'Pendente' | 'Inativo';
  }>>([
    {
      id: '1',
      name: 'Prof. Maurício Serrano',
      email: 'mauricio.serrano@unb.br',
      initials: 'MS',
      avatarColor: '#2563eb',
      type: 'Professor',
      permissions: 'Admin Completo',
      lastAccess: 'Agora',
      status: 'Ativo'
    },
    {
      id: '2',
      name: 'Ana Silva',
      email: 'ana.silva@aluno.unb.br',
      initials: 'AS',
      avatarColor: '#16a34a',
      type: 'Monitor',
      permissions: 'Materiais, Avisos',
      lastAccess: 'Há 2 horas',
      status: 'Ativo'
    },
    {
      id: '3',
      name: 'João Oliveira',
      email: 'joao.oliveira@aluno.unb.br',
      initials: 'JO',
      avatarColor: '#f97316',
      type: 'Monitor',
      permissions: 'Materiais',
      lastAccess: 'Ontem',
      status: 'Pendente'
    }
  ]);

  const handleEditUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setEditingUser(id);
      setUserForm({
        name: user.name,
        email: user.email,
        type: user.type,
        permissions: user.permissions
      });
      setShowUserModal(true);
    }
  };

  const handleUserPermissions = (id: string) => {
    console.log('Gerenciar permissões do usuário:', id);
  };

  const handleActivateUser = (id: string) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === id ? { ...user, status: 'Ativo' } : user
    ));
  };

  const handleDeactivateUser = (id: string) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === id ? { ...user, status: 'Inativo' } : user
    ));
  };

  const handleDeleteUser = (id: string) => {
    setDeleteType('user');
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteId || !deleteType) return;

    if (deleteType === 'material') {
      removeMaterial(deleteId);
      alert('Material excluído com sucesso!');
    } else if (deleteType === 'notice') {
      removeNotice(deleteId);
      alert('Aviso excluído com sucesso!');
    } else if (deleteType === 'user') {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== deleteId));
      alert('Usuário excluído com sucesso!');
    }

    setShowDeleteModal(false);
    setDeleteType(null);
    setDeleteId(null);
  };

  const handleNewUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', type: 'Monitor', permissions: '' });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingUser) {
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === editingUser ? { ...user, ...userForm } : user
      ));
      alert('Usuário atualizado com sucesso!');
    } else {
      const initials = userForm.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      const colors = ['#2563eb', '#16a34a', '#f97316', '#9333ea', '#dc2626'];
      const avatarColor = colors[users.length % colors.length];
      
      setUsers(prevUsers => [...prevUsers, {
        id: Date.now().toString(),
        name: userForm.name,
        email: userForm.email,
        initials,
        avatarColor,
        type: userForm.type,
        permissions: userForm.permissions,
        lastAccess: 'Agora',
        status: 'Pendente' as const
      }]);
      alert('Usuário criado com sucesso!');
    }
    setShowUserModal(false);
    setEditingUser(null);
    setUserForm({ name: '', email: '', type: 'Monitor', permissions: '' });
  };

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Dashboard' }]} />
      
      <div className={styles.dashboardPage}>
        <div className="container">
          {/* Page Header */}
          <div className="row align-items-center mb-4">
            <div className="col-12 col-lg-8">
              <h1 className={styles.pageTitle}>Dashboard Administrativo</h1>
              <p className={styles.pageDescription}>
                Gerencie conteúdos, usuários e monitore estatísticas da plataforma
              </p>
            </div>
            <div className="col-12 col-lg-4">
              <div className={styles.headerActions}>
                <Link to="/materiais/novo" className={styles.quickActionsButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Novo Conteúdo
                </Link>
                <Link to="/repositorios/gerenciar" className={styles.exportButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Gerenciar Repositórios
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row g-4 mb-4">
            <DashboardStatCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              }
              value="0"
              label="Total de Downloads"
              accentColor="#2563eb"
              iconBackground="#eff6ff"
            />
            <DashboardStatCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
              value="0"
              label="Usuários Ativos"
              accentColor="#16a34a"
              iconBackground="#dcfce7"
            />
            <DashboardStatCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              }
              value="24"
              label="Materiais Publicados"
              accentColor="#f59e0b"
              iconBackground="#fef3c7"
              detail="3 novos hoje"
              detailIcon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              }
            />
          </div>

          {/* Tabs */}
          <DashboardTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'materials' && (
              <MaterialsManagementTable
                materials={materials}
                onEdit={handleEdit}
                onVersion={handleVersion}
                onDelete={handleDelete}
              />
            )}
            {activeTab === 'notices' && (
              <NoticesManagement
                notices={notices}
                onEdit={handleEditNotice}
                onDelete={handleDeleteNotice}
                onNew={handleNewNotice}
              />
            )}
            {activeTab === 'users' && (
              <UsersManagementTable
                users={users}
                onEdit={handleEditUser}
                onPermissions={handleUserPermissions}
                onActivate={handleActivateUser}
                onDeactivate={handleDeactivateUser}
                onDelete={handleDeleteUser}
                onNew={handleNewUser}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal de Editar Material */}
      {showMaterialModal && (
        <div className={styles.modalOverlay} onClick={() => setShowMaterialModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingMaterial ? 'Editar Material' : 'Novo Material'}</h2>
              <button className={styles.modalClose} onClick={() => setShowMaterialModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Título <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={materialForm.title}
                  onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Descrição <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  value={materialForm.description}
                  onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tipo</label>
                <select
                  className={styles.select}
                  value={materialForm.type}
                  onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value as any })}
                >
                  <option value="slides">Slides</option>
                  <option value="video">Vídeo</option>
                  <option value="pdf">PDF</option>
                  <option value="codigo">Código</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <select
                  className={styles.select}
                  value={materialForm.status}
                  onChange={(e) => setMaterialForm({ ...materialForm, status: e.target.value as any })}
                >
                  <option value="Publicado">Publicado</option>
                  <option value="Rascunho">Rascunho</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={() => setShowMaterialModal(false)}>
                Cancelar
              </button>
              <button className={styles.saveButton} onClick={handleSaveMaterial}>
                {editingMaterial ? 'Salvar Alterações' : 'Criar Material'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Aviso */}
      {showNoticeModal && (
        <div className={styles.modalOverlay} onClick={() => setShowNoticeModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingNotice ? 'Editar Aviso' : 'Novo Aviso'}</h2>
              <button className={styles.modalClose} onClick={() => setShowNoticeModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Título <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Descrição <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  rows={4}
                  value={noticeForm.description}
                  onChange={(e) => setNoticeForm({ ...noticeForm, description: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Prioridade</label>
                <select
                  className={styles.select}
                  value={noticeForm.priority}
                  onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value as any })}
                >
                  <option value="geral">Geral</option>
                  <option value="informativo">Informativo</option>
                  <option value="importante">Importante</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={() => setShowNoticeModal(false)}>
                Cancelar
              </button>
              <button className={styles.saveButton} onClick={handleSaveNotice}>
                {editingNotice ? 'Salvar Alterações' : 'Criar Aviso'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Usuário */}
      {showUserModal && (
        <div className={styles.modalOverlay} onClick={() => setShowUserModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
              <button className={styles.modalClose} onClick={() => setShowUserModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Nome <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  className={styles.input}
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tipo</label>
                <select
                  className={styles.select}
                  value={userForm.type}
                  onChange={(e) => setUserForm({ ...userForm, type: e.target.value })}
                >
                  <option value="Professor">Professor</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Permissões</label>
                <input
                  type="text"
                  className={styles.input}
                  value={userForm.permissions}
                  onChange={(e) => setUserForm({ ...userForm, permissions: e.target.value })}
                  placeholder="Ex: Materiais, Avisos"
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={() => setShowUserModal(false)}>
                Cancelar
              </button>
              <button className={styles.saveButton} onClick={handleSaveUser}>
                {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Confirmar Exclusão</h2>
              <button className={styles.modalClose} onClick={() => setShowDeleteModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja excluir este {deleteType === 'material' ? 'material' : deleteType === 'notice' ? 'aviso' : 'usuário'}? Esta ação não pode ser desfeita.</p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className={styles.deleteButton} onClick={handleConfirmDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default DashboardPage;

