import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import {
  HeroSection,
  HighlightCard,
  SectionHeader,
  FilterGroup,
  Breadcrumb
} from '../components';
import RepositoryCard from '../components/home/RepositoryCard';
import NoticeCard from '../components/home/NoticeCard';
import { useRepositories } from '../context/RepositoriesContext';
import { useNotices } from '../context/NoticesContext';
import styles from './HomePage.module.css';

function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const { repositories } = useRepositories();
  const { notices } = useNotices();

  // Converter repositórios do contexto para o formato esperado
  const repositoriesList = useMemo(() => {
    return repositories
      .filter(repo => repo.isActive)
      .slice(0, 6) // Limitar a 6 repositórios
      .map(repo => ({
        title: repo.name,
        stars: repo.stars,
        description: repo.description,
        language: repo.language,
        githubUrl: repo.url
      }));
  }, [repositories]);

  const filterOptions = useMemo(() => {
    const languages = new Set(repositoriesList.map(r => r.language));
    return ['Todos', ...Array.from(languages)];
  }, [repositoriesList]);

  const filteredRepositories = useMemo(() => {
    return selectedFilter === 'Todos' 
      ? repositoriesList 
      : repositoriesList.filter(repo => repo.language === selectedFilter);
  }, [selectedFilter, repositoriesList]);

  // Pegar os 4 avisos mais recentes
  const recentNotices = useMemo(() => {
    return [...notices]
      .sort((a, b) => b.dateValue.getTime() - a.dateValue.getTime())
      .slice(0, 4)
      .map(notice => {
        const getType = (priorityType: string): 'warning' | 'info' | 'success' | 'extra' => {
          switch (priorityType) {
            case 'urgente': return 'warning';
            case 'importante': return 'info';
            case 'informativo': return 'info';
            case 'geral': return 'success';
            default: return 'info';
          }
        };

        const formatTime = (date: Date, time: string) => {
          const now = new Date();
          const diff = now.getTime() - date.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const days = Math.floor(hours / 24);
          if (days > 0) return `Publicado há ${days} ${days === 1 ? 'dia' : 'dias'}`;
          if (hours > 0) return `Publicado há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
          return 'Publicado agora';
        };

        const getIcon = (priorityType: string) => {
          switch (priorityType) {
            case 'urgente':
              return (
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18C1.64538 18.3024 1.55299 18.6453 1.552 19C1.55101 19.3547 1.64148 19.6981 1.81445 20.0017C1.98742 20.3052 2.23675 20.5581 2.53769 20.7342C2.83862 20.9104 3.18082 21.0035 3.53 21H20.47C20.8192 21.0035 21.1614 20.9104 21.4623 20.7342C21.7633 20.5581 22.0126 20.3052 22.1855 20.0017C22.3585 19.6981 22.449 19.3547 22.448 19C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5318 3.56631 13.2807 3.32312 12.9812 3.15448C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98584 11.0188 3.15448C10.7193 3.32312 10.4682 3.56631 10.29 3.86V3.86Z" />
                  <path d="M12 9V13" />
                  <path d="M12 17H12.01" />
                </svg>
              );
            case 'importante':
            case 'informativo':
              return (
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16V12" />
                  <path d="M12 8H12.01" />
                </svg>
              );
            case 'geral':
            default:
              return (
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              );
          }
        };

        return {
          type: getType(notice.priorityType),
          title: notice.title,
          description: notice.description,
          publishedTime: formatTime(notice.dateValue, notice.time),
          author: notice.author,
          icon: getIcon(notice.priorityType)
        };
      });
  }, [notices]);

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ label: 'Home' }]} />
      
      <HeroSection
        courseTitle="Estruturas de Dados 2"
        description="Explore algoritmos avançados, estruturas de dados complexas e desenvolva soluções eficientes com o Professor Maurício Serrano na UnB."
        ctaText="Acessar Materiais"
        ctaLink="/materiais"
      />

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Destaques Recentes
          </h2>
          
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
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
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
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
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
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
        </div>
      </section>

      <section className={styles.repositoriesSection}>
        <div className="container">
          <SectionHeader
            title="Repositórios GitHub"
            subtitle="Explore implementações práticas e projetos da disciplina"
          />
          
          <FilterGroup
            options={filterOptions}
            selected={selectedFilter}
            onChange={setSelectedFilter}
          />
          
          <div className="row g-4">
            {filteredRepositories.length > 0 ? (
              filteredRepositories.map((repo, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <RepositoryCard
                    title={repo.title}
                    stars={repo.stars}
                    description={repo.description}
                    language={repo.language}
                    githubUrl={repo.githubUrl}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center text-muted">Nenhum repositório encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.noticesSection}>
        <div className="container">
          <SectionHeader
            title="Avisos Recentes"
            subtitle="Fique por dentro das últimas informações da disciplina"
          />
          
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className={styles.noticesList}>
                {recentNotices.length > 0 ? (
                  recentNotices.map((notice, index) => (
                    <NoticeCard
                      key={index}
                      type={notice.type}
                      title={notice.title}
                      description={notice.description}
                      publishedTime={notice.publishedTime}
                      author={notice.author}
                      icon={notice.icon}
                    />
                  ))
                ) : (
                  <p className="text-center text-muted">Nenhum aviso disponível.</p>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.viewAllButton}>
            <Link to="/avisos" className={styles.buttonLink}>
              Ver Todos os Avisos
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default HomePage;
