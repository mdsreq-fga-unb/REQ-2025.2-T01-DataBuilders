import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import styles from './MaterialsManagementTable.module.css';

interface Material {
  id: string;
  title: string;
  type: 'Slides' | 'PDF' | 'Video';
  version: string;
  downloads: number;
  status: 'Publicado' | 'Rascunho';
  updatedAt: string;
  icon: React.ReactNode;
}

interface MaterialsManagementTableProps {
  materials: Material[];
  onEdit: (id: string) => void;
  onVersion: (id: string) => void;
  onDelete: (id: string) => void;
}

function MaterialsManagementTable({
  materials,
  onEdit,
  onVersion,
  onDelete
}: MaterialsManagementTableProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Slides':
        return '#2563eb';
      case 'PDF':
        return '#dc2626';
      case 'Video':
        return '#9333ea';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicado':
        return '#16a34a';
      case 'Rascunho':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'Slides':
        return '#eff6ff';
      case 'PDF':
        return '#fee2e2';
      case 'Video':
        return '#f3e8ff';
      default:
        return '#f1f5f9';
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div>
          <h3 className={styles.sectionTitle}>Gestão de Materiais</h3>
          <p className={styles.sectionDescription}>
            Criar, editar, deletar e versionar materiais de aula
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.filterButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtros
          </button>
          <Link to="/materiais/novo" className={styles.newButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Adicionar Material
          </Link>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>MATERIAL</th>
              <th>TIPO</th>
              <th>VERSÃO</th>
              <th>DOWNLOADS</th>
              <th>STATUS</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td>
                  <div className={styles.materialCell}>
                    <div
                      className={styles.materialIcon}
                      style={
                        {
                          '--icon-bg': getIconBackground(material.type),
                          '--icon-color': getTypeColor(material.type)
                        } as CSSProperties
                      }
                    >
                      {material.icon}
                    </div>
                    <div>
                      <div className={styles.materialTitle}>{material.title}</div>
                      <div className={styles.materialUpdated}>
                        Atualizado {material.updatedAt}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={styles.typeBadge}
                    style={{ backgroundColor: getTypeColor(material.type) }}
                  >
                    {material.type}
                  </span>
                </td>
                <td>
                  <span className={styles.version}>{material.version}</span>
                </td>
                <td>
                  <span className={styles.downloads}>{material.downloads}</span>
                </td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(material.status) }}
                  >
                    {material.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionLink}
                      onClick={() => onEdit(material.id)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.actionLink}
                      onClick={() => onVersion(material.id)}
                    >
                      Versionar
                    </button>
                    <button
                      className={`${styles.actionLink} ${styles.deleteLink}`}
                      onClick={() => onDelete(material.id)}
                    >
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaterialsManagementTable;

