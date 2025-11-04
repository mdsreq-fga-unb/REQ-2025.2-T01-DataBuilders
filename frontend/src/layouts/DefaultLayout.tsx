import type { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

