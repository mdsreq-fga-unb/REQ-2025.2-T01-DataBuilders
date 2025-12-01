import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { useRepositories, type RepositoryData } from '../context/RepositoriesContext';
import styles from './RepositoriesManagementPage.module.css';

type Repository = RepositoryData;

interface Organization {
  id: string;
  name: string;
  url: string;
  description: string;
  repositoryCount: number;
  isActive: boolean;
}

function RepositoriesManagementPage() {
  const navigate = useNavigate();
  const { repositories, addRepository, removeRepository, updateRepository } = useRepositories();
  const [activeTab, setActiveTab] = useState<'repositories' | 'organizations'>('repositories');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Repository | Organization | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: '',
    organization: '',
    url: ''
  });

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'UnB - Estruturas de Dados',
      url: 'https://github.com/unb-estruturas-dados',
      description: 'Organização oficial da disciplina Estruturas de Dados 2',
      repositoryCount: 12,
      isActive: true
    },
    {
      id: '2',
      name: 'UnB - Algoritmos',
      url: 'https://github.com/unb-algoritmos',
      description: 'Repositórios de algoritmos e estruturas de dados avançadas',
      repositoryCount: 8,
      isActive: true
    }
  ]);

  const handleAddRepository = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', language: '', organization: '', url: '' });
    setShowAddModal(true);
  };

  const handleSaveRepository = () => {
    if (!formData.name || !formData.description || !formData.language || !formData.organization) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingItem && 'language' in editingItem) {
      // Editar repositório existente
      updateRepository(editingItem.id, {
        name: formData.name,
        description: formData.description,
        language: formData.language,
        organization: formData.organization,
        url: formData.url || `https://github.com/${formData.organization}/${formData.name}`
      });
    } else {
      // Adicionar novo repositório
      addRepository({
        name: formData.name,
        description: formData.description,
        language: formData.language,
        organization: formData.organization,
        url: formData.url || `https://github.com/${formData.organization}/${formData.name}`,
        stars: 0,
        isActive: true
      });
    }

    setShowAddModal(false);
    setFormData({ name: '', description: '', language: '', organization: '', url: '' });
    setEditingItem(null);
  };

  const handleAddOrganization = () => {
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleEdit = (item: Repository | Organization) => {
    setEditingItem(item);
    if ('language' in item) {
      setFormData({
        name: item.name,
        description: item.description,
        language: item.language,
        organization: item.organization,
        url: item.url
      });
      setShowAddModal(true);
    }
  };

  const handleDelete = (id: string, type: 'repository' | 'organization') => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      if (type === 'repository') {
        removeRepository(id);
      } else {
        setOrganizations(prev => prev.filter(org => org.id !== id));
      }
    }
  };

  const handleToggleActive = (id: string, type: 'repository' | 'organization') => {
    if (type === 'repository') {
      const repo = repositories.find(r => r.id === id);
      if (repo) {
        updateRepository(id, { isActive: !repo.isActive });
      }
    } else {
      setOrganizations(prev =>
        prev.map(org => (org.id === id ? { ...org, isActive: !org.isActive } : org))
      );
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Gerenciar Repositórios' }
      ]} />

      <div className={styles.repositoriesManagementPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <h1 className={styles.pageTitle}>Gerenciar Repositórios e Organizações</h1>
                <p className={styles.pageDescription}>
                  Gerencie os repositórios GitHub e organizações vinculadas à disciplina
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <div className={styles.headerActions}>
                  {activeTab === 'repositories' ? (
                    <button onClick={handleAddRepository} className={styles.addButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Adicionar Repositório
                    </button>
                  ) : (
                    <button onClick={handleAddOrganization} className={styles.addButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Adicionar Organização
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'repositories' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('repositories')}
            >
              Repositórios ({repositories.length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'organizations' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('organizations')}
            >
              Organizações ({organizations.length})
            </button>
          </div>

          {/* Modal para Adicionar/Editar Repositório */}
          {showAddModal && activeTab === 'repositories' && (
            <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h2>{editingItem ? 'Editar Repositório' : 'Adicionar Novo Repositório'}</h2>
                  <button className={styles.modalClose} onClick={() => setShowAddModal(false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <div className={styles.formGroup}>
                    <label htmlFor="repo-name" className={styles.label}>
                      Nome <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="repo-name"
                      className={styles.input}
                      placeholder="Ex: arvores-avl"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="repo-description" className={styles.label}>
                      Descrição <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="repo-description"
                      className={styles.textarea}
                      placeholder="Descreva o repositório..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="repo-language" className={styles.label}>
                      Linguagem <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="repo-language"
                      className={styles.select}
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    >
                      <option value="">Selecione uma linguagem</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C++">C++</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="C">C</option>
                      <option value="TypeScript">TypeScript</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="repo-organization" className={styles.label}>
                      Organização <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="repo-organization"
                      className={styles.input}
                      placeholder="Ex: UnB - Estruturas de Dados"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="repo-url" className={styles.label}>
                      URL (opcional)
                    </label>
                    <input
                      type="url"
                      id="repo-url"
                      className={styles.input}
                      placeholder="https://github.com/..."
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>
                </div>
                <div className={styles.modalFooter}>
                  <button className={styles.cancelButton} onClick={() => setShowAddModal(false)}>
                    Cancelar
                  </button>
                  <button className={styles.saveButton} onClick={handleSaveRepository}>
                    {editingItem ? 'Salvar Alterações' : 'Adicionar Repositório'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className={styles.content}>
            {activeTab === 'repositories' ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Linguagem</th>
                      <th>Organização</th>
                      <th>Stars</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repositories.map(repo => (
                      <tr key={repo.id}>
                        <td>
                          <div className={styles.nameCell}>
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.link}
                            >
                              {repo.name}
                            </a>
                          </div>
                        </td>
                        <td>
                          <span className={styles.description}>{repo.description}</span>
                        </td>
                        <td>
                          <span className={styles.language}>{repo.language}</span>
                        </td>
                        <td>
                          <span className={styles.organization}>{repo.organization}</span>
                        </td>
                        <td>
                          <div className={styles.stars}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            {repo.stars}
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() => handleToggleActive(repo.id, 'repository')}
                            className={`${styles.statusBadge} ${repo.isActive ? styles.statusActive : styles.statusInactive}`}
                          >
                            {repo.isActive ? 'Ativo' : 'Inativo'}
                          </button>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              onClick={() => handleEdit(repo)}
                              className={styles.actionButton}
                              title="Editar"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(repo.id, 'repository')}
                              className={`${styles.actionButton} ${styles.deleteButton}`}
                              title="Excluir"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>URL</th>
                      <th>Repositórios</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.map(org => (
                      <tr key={org.id}>
                        <td>
                          <div className={styles.nameCell}>
                            <strong>{org.name}</strong>
                          </div>
                        </td>
                        <td>
                          <span className={styles.description}>{org.description}</span>
                        </td>
                        <td>
                          <a
                            href={org.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                          >
                            {org.url}
                          </a>
                        </td>
                        <td>
                          <span className={styles.repositoryCount}>{org.repositoryCount} repositórios</span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleToggleActive(org.id, 'organization')}
                            className={`${styles.statusBadge} ${org.isActive ? styles.statusActive : styles.statusInactive}`}
                          >
                            {org.isActive ? 'Ativo' : 'Inativo'}
                          </button>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              onClick={() => handleEdit(org)}
                              className={styles.actionButton}
                              title="Editar"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(org.id, 'organization')}
                              className={`${styles.actionButton} ${styles.deleteButton}`}
                              title="Excluir"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default RepositoriesManagementPage;