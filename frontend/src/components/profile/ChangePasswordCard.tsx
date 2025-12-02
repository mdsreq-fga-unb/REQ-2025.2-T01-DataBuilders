import { useState } from 'react';
import { changePassword } from '../../services/user';
import styles from './ChangePasswordCard.module.css';

function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Preencha todos os campos');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('A confirmação não coincide');
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Senha alterada com sucesso');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha ao alterar senha';
      alert(msg);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Alterar Senha</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="currentPassword">
          Senha Atual
        </label>
        <input
          id="currentPassword"
          type="password"
          className={styles.input}
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          placeholder="Digite sua senha atual"
        />

        <label className={styles.label} htmlFor="newPassword">
          Nova Senha
        </label>
        <input
          id="newPassword"
          type="password"
          className={styles.input}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="Digite a nova senha"
        />

        <label className={styles.label} htmlFor="confirmPassword">
          Confirmar Nova Senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={styles.input}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirme a nova senha"
        />

        <button type="submit" className={styles.submitButton}>
          Alterar Senha
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordCard;
