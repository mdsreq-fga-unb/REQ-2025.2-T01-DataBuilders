import { useState, useMemo } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { SearchBar, FilterDropdown, MaterialCard } from '../components/materials';
import { useMaterials } from '../context/MaterialsContext';
import styles from './MaterialsPage.module.css';

function MaterialsPage() {
  const { materials } = useMaterials();
  const [searchQuery, setSearchQuery] = useState('');
  const [materialType, setMaterialType] = useState('todos');
  const [topic, setTopic] = useState('todos');
  const [period, setPeriod] = useState('todos');
  const [sortBy, setSortBy] = useState('mais-recentes');

  const materialTypeOptions = [
    { value: 'todos', label: 'Todos os tipos' },
    { value: 'slides', label: 'Slides' },
    { value: 'video', label: 'Vídeo' },
    { value: 'pdf', label: 'PDF' },
    { value: 'codigo', label: 'Código' }
  ];

  const topicOptions = [
    { value: 'todos', label: 'Todos os tópicos' },
    { value: 'arvores', label: 'Árvores' },
    { value: 'grafos', label: 'Grafos' },
    { value: 'hash', label: 'Hash' },
    { value: 'ordenacao', label: 'Ordenação' }
  ];

  const periodOptions = [
    { value: 'todos', label: 'Todos os períodos' },
    { value: '2025-2', label: '2025.2' },
    { value: '2025-1', label: '2025.1' },
    { value: '2024-2', label: '2024.2' },
    { value: '2024-1', label: '2024.1' },
    { value: '2023-2', label: '2023.2' }
  ];

  const sortOptions = [
    { value: 'mais-recentes', label: 'Mais recentes' },
    { value: 'mais-antigos', label: 'Mais antigos' },
    { value: 'mais-downloads', label: 'Mais downloads' },
    { value: 'a-z', label: 'A-Z' }
  ];

  // Filtrar apenas materiais publicados
  const allMaterials = materials
    .filter(material => material.status === 'Publicado')
    .map(material => ({
      id: material.id,
      type: material.type,
      title: material.title,
      description: material.description,
      professor: material.professor,
      date: material.date,
      dateValue: material.dateValue,
      downloads: material.downloads,
      version: material.version,
      isFavorite: material.isFavorite,
      additionalInfo: material.additionalInfo,
      actionButtonText: material.actionButtonText || 'Visualizar',
      actionButtonLink: material.actionButtonLink || '#',
      topic: material.topic,
      period: material.period
    }));

  const handleToggleFavorite = (index: number) => {
    // TODO: Implementar lógica de favoritos
    console.log('Toggle favorite:', index);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setMaterialType('todos');
    setTopic('todos');
    setPeriod('todos');
    setSortBy('mais-recentes');
  };

  const filteredAndSortedMaterials = useMemo(() => {
    let filtered = [...allMaterials];

    // Filtro por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(query) ||
        material.description.toLowerCase().includes(query) ||
        material.professor.toLowerCase().includes(query)
      );
    }

    // Filtro por tipo
    if (materialType !== 'todos') {
      filtered = filtered.filter(material => material.type === materialType);
    }

    // Filtro por tópico
    if (topic !== 'todos') {
      filtered = filtered.filter(material => material.topic === topic);
    }

    // Filtro por período
    if (period !== 'todos') {
      filtered = filtered.filter(material => material.period === period);
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'mais-recentes':
          return b.dateValue.getTime() - a.dateValue.getTime();
        case 'mais-antigos':
          return a.dateValue.getTime() - b.dateValue.getTime();
        case 'mais-downloads':
          return b.downloads - a.downloads;
        case 'a-z':
          return a.title.localeCompare(b.title, 'pt-BR');
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, materialType, topic, period, sortBy]);

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Materiais de Aula' }
      ]} />

      <section className={styles.materialsSection}>
        <div className="container">
          <div className={styles.pageHeader}>
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <h1 className={styles.pageTitle}>Materiais de Aula</h1>
                <p className={styles.pageDescription}>
                  Acesse todos os recursos da disciplina Estruturas de Dados 2
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <div className={styles.headerActions}>
                  <div className={styles.infoButton}>
                    Total: {filteredAndSortedMaterials.length} materiais
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
              <div className="col-12 col-lg-8">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-12 col-md-6 col-lg-3">
                <FilterDropdown
                  label="Tipo de Material"
                  value={materialType}
                  options={materialTypeOptions}
                  onChange={setMaterialType}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <FilterDropdown
                  label="Tópico"
                  value={topic}
                  options={topicOptions}
                  onChange={setTopic}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <FilterDropdown
                  label="Período"
                  value={period}
                  options={periodOptions}
                  onChange={setPeriod}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <FilterDropdown
                  label="Ordenar por"
                  value={sortBy}
                  options={sortOptions}
                  onChange={setSortBy}
                />
              </div>
            </div>

            <div className={styles.clearFilters}>
              <button 
                onClick={handleClearFilters}
                className={styles.clearFiltersLink}
                disabled={
                  searchQuery === '' &&
                  materialType === 'todos' &&
                  topic === 'todos' &&
                  period === 'todos' &&
                  sortBy === 'mais-recentes'
                }
              >
                Limpar todos os filtros
              </button>
            </div>
          </div>

          <div className="row g-4 mt-4">
            {filteredAndSortedMaterials.length > 0 ? (
              filteredAndSortedMaterials.map((material, index) => (
                <div key={material.id} className="col-12 col-md-6 col-lg-4">
                  <MaterialCard
                    {...material}
                    id={material.id}
                    onToggleFavorite={() => handleToggleFavorite(index)}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className={styles.noResults}>
                  <p>Nenhum material encontrado com os filtros selecionados.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default MaterialsPage;

