import DefaultLayout from '../layouts/DefaultLayout';
import HeroSection from '../components/HeroSection';
import HighlightCard from '../components/HighlightCard';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <DefaultLayout>
      <HeroSection
        courseTitle="Estruturas de Dados 2"
        description="Explore algoritmos avançados, estruturas de dados complexas e desenvolva soluções eficientes com o Professor Maurício Serrano na UnB."
        ctaText="Acessar Materiais"
        ctaLink="/materiais"
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Destaques Recentes
          </h2>
          
          <div className={styles.cardsGrid}>
            <HighlightCard
              type="warning"
              title="Último Aviso"
              description="Prova P2 marcada para 15/12. Revisar árvores AVL e grafos."
              timestamp="Há 2 horas"
              icon={
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path 
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                  />
                </svg>
              }
            />
            
            <HighlightCard
              type="success"
              title="Novo Material"
              description="Slides sobre Algoritmos de Ordenação Avançados disponíveis."
              timestamp="Ontem"
              icon={
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M9 12L11 14L15 10" 
                    stroke="white" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            
            <HighlightCard
              type="info"
              title="Repositório Atualizado"
              description="Implementação de Heap Binário em Python adicionada ao GitHub."
              timestamp="2 dias atrás"
              icon={
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default HomePage;

