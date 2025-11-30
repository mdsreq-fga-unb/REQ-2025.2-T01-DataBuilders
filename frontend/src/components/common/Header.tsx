import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Header.module.css';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.headerContent}>
            <Logo />
            <nav className={styles.nav}>
              <Link to="/materiais" className={styles.navLink}>
                Materiais de Aula
              </Link>
              <Link to="/repositorios" className={styles.navLink}>
                Repositórios GitHub
              </Link>
              <Link to="/avisos" className={styles.navLink}>
                Avisos
              </Link>
              <Link to="/perfil" className={styles.navLink}>
                Perfil
              </Link>
              <Link to="/login" className={styles.loginButton}>
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

    </>
  );
}

export default Header;

