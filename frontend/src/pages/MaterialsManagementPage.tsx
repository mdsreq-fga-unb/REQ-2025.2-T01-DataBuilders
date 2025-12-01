import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb, MaterialsManagementTable } from '../components';
import { useMaterials } from '../context/MaterialsContext';
import styles from './MaterialsManagementPage.module.css';

function MaterialsManagementPage() {
  const navigate = useNavigate();
  const { materials, removeMaterial, updateMaterial, versionMaterial } = useMaterials();
  const [editingMaterial, setEditingMaterial] = useState<string | null>(null);

  const getTypeLabel = (type: string): 'Slides' | 'PDF' | 'Video' => {
    switch (type) {
      case 'slides': return 'Slides';
      case 'pdf': return 'PDF';
      case 'video': return 'Video';
      default: return 'Slides';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'slides':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case 'pdf':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
        );
      case 'video':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
        );
    }
  };

  const formatUpdatedAt = (dateValue: Date, updatedAt?: string) => {
    if (updatedAt) return updatedAt;
    const now = new Date();
    const diff = now.getTime() - dateValue.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
    if (hours > 0) return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    return 'agora';
  };

  const tableMaterials = materials.map(material => ({
    id: material.id,
    title: material.title,
    type: getTypeLabel(material.type),
    version: material.version,
    downloads: material.downloads,
    status: (material.status || 'Publicado') as 'Publicado' | 'Rascunho',
    updatedAt: formatUpdatedAt(material.dateValue, material.updatedAt),
    icon: getIcon(material.type)
  }));

  const handleEdit = (id: string) => {
    // TODO: Implementar modal de edição ou redirecionar para página de edição
    const material = materials.find(m => m.id === id);
    if (material) {
      setEditingMaterial(id);
      // Por enquanto, apenas mostra um prompt simples
      const newTitle = prompt('Editar título:', material.title);
      if (newTitle && newTitle.trim()) {
        updateMaterial(id, { title: newTitle.trim() });
      }
      setEditingMaterial(null);
    }
  };

  const handleVersion = (id: string) => {
    if (window.confirm('Deseja criar uma nova versão deste material?')) {
      versionMaterial(id);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este material?')) {
      removeMaterial(id);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Perfil', path: '/perfil' },
        { label: 'Gerenciar Materiais' }
      ]} />

      <div className={styles.materialsManagementPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <h1 className={styles.pageTitle}>Gerenciar Materiais de Aula</h1>
                <p className={styles.pageDescription}>
                  Gerencie todos os materiais da disciplina, edite, versiona ou exclua conforme necessário
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <div className={styles.headerActions}>
                  <Link to="/materiais/novo" className={styles.addButton}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Novo Material
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <MaterialsManagementTable
              materials={tableMaterials}
              onEdit={handleEdit}
              onVersion={handleVersion}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MaterialsManagementPage;

