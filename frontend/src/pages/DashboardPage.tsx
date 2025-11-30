import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts';
import { Breadcrumb, DashboardStatCard, DashboardTabs, MaterialsManagementTable, NoticesManagement, UsersManagementTable } from '../components';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('materials');

  const tabs = [
    { id: 'materials', label: 'Gestão de Materiais' },
    { id: 'notices', label: 'Gestão de Avisos' },
    { id: 'users', label: 'Gestão de Usuários' }
  ];

  const materials = [
    {
      id: '1',
      title: 'Introdução a Árvores',
      type: 'Slides' as const,
      version: 'v2.1',
      downloads: 247,
      status: 'Publicado' as const,
      updatedAt: 'há 2 horas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      id: '2',
      title: 'Algoritmos de Ordenação',
      type: 'PDF' as const,
      version: 'v1.3',
      downloads: 189,
      status: 'Rascunho' as const,
      updatedAt: 'ontem',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        </svg>
      )
    },
    {
      id: '3',
      title: 'Implementação de Grafos',
      type: 'Video' as const,
      version: 'v1.0',
      downloads: 342,
      status: 'Publicado' as const,
      updatedAt: 'há 3 dias',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    }
  ];

  const handleEdit = (id: string) => {
    console.log('Editar material:', id);
  };

  const handleVersion = (id: string) => {
    console.log('Versionar material:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deletar material:', id);
  };

  const notices = [
    {
      id: '1',
      priority: 'Urgente' as const,
      title: 'Alteração na Data da Prova',
      description: 'A prova de Estruturas de Dados 2 foi reagendada para o dia 25/11. Verifiquem o cronograma atualizado.',
      publishedAt: 'hoje',
      views: 892
    },
    {
      id: '2',
      priority: 'Info' as const,
      title: 'Novos Materiais Disponíveis',
      description: 'Foram adicionados novos slides sobre algoritmos de ordenação. Confiram na seção de materiais.',
      publishedAt: 'há 2 dias',
      views: 654
    },
    {
      id: '3',
      priority: 'Sucesso' as const,
      title: 'Repositório Atualizado',
      description: 'O repositório GitHub da disciplina foi atualizado com novos exemplos de código.',
      publishedAt: 'há 1 semana',
      views: 423
    }
  ];

  const handleEditNotice = (id: string) => {
    console.log('Editar aviso:', id);
  };

  const handleDeleteNotice = (id: string) => {
    console.log('Deletar aviso:', id);
  };

  const users = [
    {
      id: '1',
      name: 'Prof. Maurício Serrano',
      email: 'mauricio.serrano@unb.br',
      initials: 'MS',
      avatarColor: '#2563eb',
      type: 'Professor',
      permissions: 'Admin Completo',
      lastAccess: 'Agora',
      status: 'Ativo' as const
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
      status: 'Ativo' as const
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
      status: 'Pendente' as const
    }
  ];

  const handleEditUser = (id: string) => {
    console.log('Editar usuário:', id);
  };

  const handleUserPermissions = (id: string) => {
    console.log('Gerenciar permissões do usuário:', id);
  };

  const handleActivateUser = (id: string) => {
    console.log('Ativar usuário:', id);
  };

  const handleDeactivateUser = (id: string) => {
    console.log('Desativar usuário:', id);
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
              value="1,247"
              label="Total de Downloads"
              accentColor="#2563eb"
              iconBackground="#eff6ff"
              changeIndicator={{
                text: '+12% este mês',
                positive: true
              }}
            />
            <DashboardStatCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
              value="156"
              label="Usuários Ativos"
              accentColor="#16a34a"
              iconBackground="#dcfce7"
              changeIndicator={{
                text: '+8% esta semana',
                positive: true
              }}
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
              />
            )}
            {activeTab === 'users' && (
              <UsersManagementTable
                users={users}
                onEdit={handleEditUser}
                onPermissions={handleUserPermissions}
                onActivate={handleActivateUser}
                onDeactivate={handleDeactivateUser}
              />
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default DashboardPage;

