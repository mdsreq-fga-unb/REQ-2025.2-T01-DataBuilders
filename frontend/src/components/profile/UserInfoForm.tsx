import { useState } from 'react';
import styles from './UserInfoForm.module.css';

interface UserInfoFormProps {
  fullName: string;
  email: string;
  userType: string;
  department: string;
}

function UserInfoForm({ fullName: initialFullName, email: initialEmail, userType: initialUserType, department: initialDepartment }: UserInfoFormProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [userType, setUserType] = useState(initialUserType);
  const [department, setDepartment] = useState(initialDepartment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar as informações
    console.log('Salvando informações:', { fullName, email, userType, department });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Informações do Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>Nome Completo</label>
          <input
            type="text"
            id="fullName"
            className={styles.input}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="userType" className={styles.label}>Tipo de Usuário</label>
          <select
            id="userType"
            className={styles.select}
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Professor">Professor</option>
            <option value="Aluno">Aluno</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="department" className={styles.label}>Departamento</label>
          <input
            type="text"
            id="department"
            className={styles.input}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Salvar Informações
        </button>
      </form>
    </div>
  );
}

export default UserInfoForm;

