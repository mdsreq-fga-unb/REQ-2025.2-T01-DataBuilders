import styles from './UsersManagementTable.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  type: string;
  permissions: string;
  lastAccess: string;
  status: 'Ativo' | 'Pendente' | 'Inativo';
}

interface UsersManagementTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onPermissions: (id: string) => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
}

function UsersManagementTable({
  users,
  onEdit,
  onPermissions,
  onActivate,
  onDeactivate
}: UsersManagementTableProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Professor':
        return '#9333ea';
      case 'Monitor':
        return '#2563eb';
      case 'Aluno':
        return '#16a34a';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return '#16a34a';
      case 'Pendente':
        return '#f59e0b';
      case 'Inativo':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div>
          <h3 className={styles.sectionTitle}>Gestão de Usuários</h3>
          <p className={styles.sectionDescription}>
            Criar e editar permissões de usuários
          </p>
        </div>
        <button className={styles.newButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Novo Usuário
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>USUÁRIO</th>
              <th>TIPO</th>
              <th>PERMISSÕES</th>
              <th>ÚLTIMO ACESSO</th>
              <th>STATUS</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div
                      className={styles.avatar}
                      style={{ backgroundColor: user.avatarColor }}
                    >
                      {user.initials}
                    </div>
                    <div>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={styles.typeBadge}
                    style={{ backgroundColor: getTypeColor(user.type) }}
                  >
                    {user.type}
                  </span>
                </td>
                <td>
                  <span className={styles.permissions}>{user.permissions}</span>
                </td>
                <td>
                  <span className={styles.lastAccess}>{user.lastAccess}</span>
                </td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(user.status) }}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionLink}
                      onClick={() => onEdit(user.id)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.actionLink}
                      onClick={() => onPermissions(user.id)}
                    >
                      Permissões
                    </button>
                    {user.status === 'Ativo' && (
                      <button
                        className={`${styles.actionLink} ${styles.deactivateLink}`}
                        onClick={() => onDeactivate(user.id)}
                      >
                        Desativar
                      </button>
                    )}
                    {user.status === 'Pendente' && (
                      <button
                        className={`${styles.actionLink} ${styles.activateLink}`}
                        onClick={() => onActivate(user.id)}
                      >
                        Ativar
                      </button>
                    )}
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

export default UsersManagementTable;


