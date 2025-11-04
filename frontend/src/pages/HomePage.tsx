import { useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import {
  HeroSection,
  HighlightCard,
  SectionHeader,
  FilterGroup,
  RepositoryCard,
  NoticeCard
} from '../components';
import styles from './HomePage.module.css';

function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const repositories = [
    {
      title: 'Árvores AVL',
      stars: 24,
      description: 'Implementação completa de árvores AVL com operações de inserção, remoção e balanceamento.',
      language: 'Python',
      githubUrl: '#'
    },
    {
      title: 'Algoritmos de Grafos',
      stars: 18,
      description: 'Dijkstra, Floyd-Warshall, DFS e BFS implementados em Java com exemplos práticos.',
      language: 'Java',
      githubUrl: '#'
    },
    {
      title: 'Estruturas de Hash',
      stars: 15,
      description: 'Tabelas hash com diferentes métodos de resolução de colisões em C++.',
      language: 'C++',
      githubUrl: '#'
    },
    {
      title: 'Heap e Priority Queue',
      stars: 12,
      description: 'Implementação de heap binário e fila de prioridade com aplicações práticas.',
      language: 'Python',
      githubUrl: '#'
    },
    {
      title: 'Árvores B e B+',
      stars: 9,
      description: 'Estruturas de dados para sistemas de banco de dados e indexação eficiente.',
      language: 'Java',
      githubUrl: '#'
    },
    {
      title: 'Algoritmos de Ordenação',
      stars: 21,
      description: 'QuickSort, MergeSort, HeapSort e RadixSort com análise de complexidade.',
      language: 'C++',
      githubUrl: '#'
    }
  ];

  const filterOptions = ['Todos', 'Python', 'Java', 'C++'];

  const filteredRepositories = selectedFilter === 'Todos' 
    ? repositories 
    : repositories.filter(repo => repo.language === selectedFilter);

  return (
    <DefaultLayout>
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
            {filteredRepositories.map((repo, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <RepositoryCard
                  title={repo.title}
                  stars={repo.stars}
                  description={repo.description}
                  language={repo.language}
                  githubUrl={repo.githubUrl}
                />
              </div>
            ))}
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
                <NoticeCard
                  type="warning"
                  title="Prova P2 - Data Confirmada"
                  description="A segunda prova da disciplina está marcada para o dia 15 de dezembro de 2024. Conteúdo: Árvores AVL, Grafos (DFS, BFS, Dijkstra) e Estruturas de Hash. Revisão na aula anterior."
                  publishedTime="Publicado há 2 horas"
                  author="Prof. Maurício Serrano"
                  icon={
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
                  }
                />
                
                <NoticeCard
                  type="info"
                  title="Novos Materiais Disponíveis"
                  description="Slides sobre Algoritmos de Ordenação Avançados foram adicionados à seção de materiais. Incluem implementações de QuickSort otimizado, MergeSort iterativo e análise de complexidade detalhada."
                  publishedTime="Publicado ontem"
                  author="Prof. Maurício Serrano"
                  icon={
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
                  }
                />
                
                <NoticeCard
                  type="success"
                  title="Projeto Final - Prazo Estendido"
                  description="O prazo para entrega do projeto final foi estendido até 20 de dezembro. Lembrem-se de incluir documentação completa e testes unitários. Dúvidas podem ser esclarecidas no horário de atendimento."
                  publishedTime="Publicado há 2 dias"
                  author="Prof. Maurício Serrano"
                  icon={
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
                  }
                />
                
                <NoticeCard
                  type="extra"
                  title="Atendimento Extra"
                  description="Atendimento extra para dúvidas sobre o projeto final na próxima quinta-feira, das 14h às 16h, sala 205 do CIC. Não é necessário agendamento prévio."
                  publishedTime="Publicado há 3 dias"
                  author="Prof. Maurício Serrano"
                  icon={
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
                      <path d="M6 9L12 15L18 9" />
                    </svg>
                  }
                />
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

