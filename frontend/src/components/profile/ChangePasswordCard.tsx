import { useState } from 'react';
import styles from './ChangePasswordCard.module.css';

function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: Integrar com backend quando disponível
    console.log('Alterar senha', {
      currentPassword,
      newPassword,
      confirmPassword
    });
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
