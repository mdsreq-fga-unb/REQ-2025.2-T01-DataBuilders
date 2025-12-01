import type { ReactNode } from 'react';
import { Header, Footer } from '../components';
import styles from './DefaultLayout.module.css';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;

