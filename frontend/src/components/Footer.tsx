import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Coluna 1: Logo e Descrição */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className={styles.logo}>
              <Logo />
            </div>
            <p className={styles.description}>
              Plataforma educacional para a disciplina Estruturas de Dados 2, ministrada pelo Professor Mauricio Serrano na Universidade de Brasília.
            </p>
            <div className={styles.socialIcons}>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a 
                href="mailto:mauricio.serrano@unb.br" 
                className={styles.socialIcon}
                aria-label="Email"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="col-12 col-md-6 col-lg-4">
            <h3 className={styles.columnTitle}>Links Rápidos</h3>
            <ul className={styles.linksList}>
              <li>
                <Link to="/materiais" className={styles.footerLink}>
                  Materiais de Aula
                </Link>
              </li>
              <li>
                <Link to="/repositorios" className={styles.footerLink}>
                  Repositórios GitHub
                </Link>
              </li>
              <li>
                <Link to="/cronograma" className={styles.footerLink}>
                  Cronograma
                </Link>
              </li>
              <li>
                <Link to="/avaliacoes" className={styles.footerLink}>
                  Avaliações
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="col-12 col-md-6 col-lg-4">
            <h3 className={styles.columnTitle}>Contato</h3>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>Prof. Maurício Serrano</p>
              <p className={styles.contactItem}>Universidade de Brasília</p>
              <p className={styles.contactItem}>Departamento de Ciência da Computação</p>
              <a 
                href="mailto:mauricio.serrano@unb.br" 
                className={styles.contactEmail}
              >
                mauricio.serrano@unb.br
              </a>
            </div>
          </div>
        </div>

        {/* Linha inferior: Copyright e Links Legais */}
        <div className={`row ${styles.bottomBar}`}>
          <div className="col-12 col-md-6">
            <div className={styles.copyright}>
              © 2025 Data Builders. Todos os direitos reservados.
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className={styles.legalLinks}>
              <Link to="/privacidade" className={styles.legalLink}>
                Política de Privacidade
              </Link>
              <Link to="/termos" className={styles.legalLink}>
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

