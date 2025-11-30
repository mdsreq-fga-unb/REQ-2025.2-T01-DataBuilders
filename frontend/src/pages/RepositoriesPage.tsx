import { useState, useMemo } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { FilterDropdown } from '../components/materials';
import { RepositorySearchBar, FilterCheckbox, RepositoryCard } from '../components/repositories';
import { useRepositories } from '../context/RepositoriesContext';
import styles from './RepositoriesPage.module.css';

function RepositoriesPage() {
  const { repositories } = useRepositories();
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('todas');
  const [minStars, setMinStars] = useState('qualquer');
  const [topic, setTopic] = useState('todos');
  const [updated, setUpdated] = useState('qualquer');
  const [sortBy, setSortBy] = useState('relevancia');
  const [hasReadme, setHasReadme] = useState(false);
  const [hasRecentCommits, setHasRecentCommits] = useState(false);

  const languageOptions = [
    { value: 'todas', label: 'Todas as linguagens' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'C', label: 'C' }
  ];

  const minStarsOptions = [
    { value: 'qualquer', label: 'Qualquer quantidade' },
    { value: '10', label: '10+ stars' },
    { value: '50', label: '50+ stars' },
    { value: '100', label: '100+ stars' },
    { value: '200', label: '200+ stars' }
  ];

  const topicOptions = [
    { value: 'todos', label: 'Todos os tópicos' },
    { value: 'arvores', label: 'Árvores' },
    { value: 'grafos', label: 'Grafos' },
    { value: 'hash', label: 'Hash' },
    { value: 'ordenacao', label: 'Ordenação' }
  ];

  const updatedOptions = [
    { value: 'qualquer', label: 'Qualquer período' },
    { value: '7dias', label: 'Últimos 7 dias' },
    { value: '30dias', label: 'Últimos 30 dias' },
    { value: '3meses', label: 'Últimos 3 meses' }
  ];

  const sortOptions = [
    { value: 'relevancia', label: 'Relevância' },
    { value: 'mais-stars', label: 'Mais stars' },
    { value: 'menos-stars', label: 'Menos stars' },
    { value: 'mais-recentes', label: 'Mais recentes' },
    { value: 'mais-antigos', label: 'Mais antigos' },
    { value: 'a-z', label: 'A-Z' }
  ];

  // Converter repositórios do contexto para o formato esperado pela página
  const allRepositories = repositories
    .filter(repo => repo.isActive)
    .map(repo => ({
      title: repo.name,
      description: repo.description,
      language: repo.language,
      updatedDate: repo.updatedDate || new Date().toLocaleDateString('pt-BR'),
      dateValue: repo.dateValue || new Date(),
      stars: repo.stars,
      readmeStatus: repo.readmeStatus || 'ativo',
      isFavorite: repo.isFavorite || false,
      githubUrl: repo.url,
      topic: repo.topic,
      hasRecentCommits: repo.hasRecentCommits
    }));

  const handleToggleFavorite = (index: number) => {
    // TODO: Implementar lógica de favoritos
    console.log('Toggle favorite:', index);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setLanguage('todas');
    setMinStars('qualquer');
    setTopic('todos');
    setUpdated('qualquer');
    setSortBy('relevancia');
    setHasReadme(false);
    setHasRecentCommits(false);
  };

  const filteredAndSortedRepositories = useMemo(() => {
    let filtered = [...allRepositories];

    // Filtro por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(repo =>
        repo.title.toLowerCase().includes(query) ||
        repo.description.toLowerCase().includes(query)
      );
    }

    // Filtro por linguagem
    if (language !== 'todas') {
      filtered = filtered.filter(repo => repo.language === language);
    }

    // Filtro por stars mínimas
    if (minStars !== 'qualquer') {
      const minStarsValue = parseInt(minStars);
      filtered = filtered.filter(repo => repo.stars >= minStarsValue);
    }

    // Filtro por tópico
    if (topic !== 'todos') {
      filtered = filtered.filter(repo => repo.topic === topic);
    }

    // Filtro por atualizado
    if (updated !== 'qualquer') {
      const now = new Date();
      const daysAgo = updated === '7dias' ? 7 : updated === '30dias' ? 30 : 90;
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(repo => repo.dateValue >= cutoffDate);
    }

    // Filtro por README
    if (hasReadme) {
      filtered = filtered.filter(repo => repo.readmeStatus !== 'sem-readme');
    }

    // Filtro por commits recentes
    if (hasRecentCommits) {
      filtered = filtered.filter(repo => repo.hasRecentCommits === true);
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'mais-stars':
          return b.stars - a.stars;
        case 'menos-stars':
          return a.stars - b.stars;
        case 'mais-recentes':
          return b.dateValue.getTime() - a.dateValue.getTime();
        case 'mais-antigos':
          return a.dateValue.getTime() - b.dateValue.getTime();
        case 'a-z':
          return a.title.localeCompare(b.title, 'pt-BR');
        case 'relevancia':
        default:
          // Ordenação por relevância (stars + data recente)
          const scoreA = a.stars + (a.dateValue.getTime() / 1000000);
          const scoreB = b.stars + (b.dateValue.getTime() / 1000000);
          return scoreB - scoreA;
      }
    });

    return filtered;
  }, [searchQuery, language, minStars, topic, updated, sortBy, hasReadme, hasRecentCommits]);

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Repositórios GitHub' }
      ]} />

      <section className={styles.repositoriesSection}>
        <div className="container">
          <div className={styles.pageHeader}>
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <h1 className={styles.pageTitle}>Repositórios GitHub</h1>
                <p className={styles.pageDescription}>
                  Explore projetos e códigos relacionados à disciplina Estruturas de Dados 2
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <div className={styles.headerActions}>
                  <div className={styles.infoButton}>
                    Total: {filteredAndSortedRepositories.length} repositórios
                  </div>
                  <button className={styles.favoritesButton}>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="#fbbf24"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Favoritos
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.separatorLine}></div>

          <div className={styles.filtersSection}>
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-lg-10">
                <RepositorySearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-12 col-md-6 col-lg">
                <FilterDropdown
                  label="Linguagem"
                  value={language}
                  options={languageOptions}
                  onChange={setLanguage}
                />
              </div>
              <div className="col-12 col-md-6 col-lg">
                <FilterDropdown
                  label="Stars Mínimas"
                  value={minStars}
                  options={minStarsOptions}
                  onChange={setMinStars}
                />
              </div>
              <div className="col-12 col-md-6 col-lg">
                <FilterDropdown
                  label="Tópico"
                  value={topic}
                  options={topicOptions}
                  onChange={setTopic}
                />
              </div>
              <div className="col-12 col-md-6 col-lg">
                <FilterDropdown
                  label="Atualizado"
                  value={updated}
                  options={updatedOptions}
                  onChange={setUpdated}
                />
              </div>
              <div className="col-12 col-md-6 col-lg">
                <FilterDropdown
                  label="Ordenar por"
                  value={sortBy}
                  options={sortOptions}
                  onChange={setSortBy}
                />
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-12 col-md-6">
                <div className={styles.checkboxesContainer}>
                  <FilterCheckbox
                    label="Tem README"
                    checked={hasReadme}
                    onChange={setHasReadme}
                  />
                  <FilterCheckbox
                    label="Commits recentes"
                    checked={hasRecentCommits}
                    onChange={setHasRecentCommits}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className={styles.clearFilters}>
                  <button 
                    onClick={handleClearFilters}
                    className={styles.clearFiltersLink}
                    disabled={
                      searchQuery === '' &&
                      language === 'todas' &&
                      minStars === 'qualquer' &&
                      topic === 'todos' &&
                      updated === 'qualquer' &&
                      sortBy === 'relevancia' &&
                      !hasReadme &&
                      !hasRecentCommits
                    }
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            {filteredAndSortedRepositories.length > 0 ? (
              filteredAndSortedRepositories.map((repo, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <RepositoryCard
                    {...repo}
                    onToggleFavorite={() => handleToggleFavorite(index)}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className={styles.noResults}>
                  <p>Nenhum repositório encontrado com os filtros selecionados.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default RepositoriesPage;

