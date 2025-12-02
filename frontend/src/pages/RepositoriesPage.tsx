import { useState, useEffect, useMemo } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { FilterDropdown } from '../components/materials';
import { RepositorySearchBar } from '../components/repositories';
import RepositoryCard from '../components/repositories/RepositoryCard';
import { useRepositories } from '../context/RepositoriesContext';
import styles from './RepositoriesPage.module.css';

type ApiItem = {
  id: number;
  name: string;
  full_name: string;
  owner: string | null;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number | null;
  readmeExists: boolean;
  updated_at: string | null;
};

function mapApiToCard(item: ApiItem) {
  return {
    id: String(item.id),
    title: item.name,
    owner: item.owner ?? '',
    description: item.description ?? '',
    language: item.language ?? '',
    stars: item.stargazers_count ?? 0,
    url: item.html_url,
    readmeExists: item.readmeExists,
    updatedAt: item.updated_at ? new Date(item.updated_at) : undefined
  };
}

export default function RepositoriesPage() {
  const { repositories } = useRepositories(); // fallback local list if needed

  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('todas');
  const [hasReadme, setHasReadme] = useState(false);
  const [sortBy, setSortBy] = useState<'relevancia' | 'stars' | 'date'>('relevancia');

  const [remoteResults, setRemoteResults] = useState<ReturnType<typeof mapApiToCard>[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? '';

  function mapSortLocalToApi(s: typeof sortBy): string | undefined {
    if (s === 'stars') return 'stars';
    if (s === 'date') return 'updated';
    return undefined; // relevance -> omit sort param
  }

  useEffect(() => {
    if (!query.trim()) {
      setRemoteResults(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const delay = 500;
    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('q', query);
        if (language !== 'todas') params.set('language', language);
        if (hasReadme) params.set('has_readme', 'true');
        const sortParam = mapSortLocalToApi(sortBy);
        if (sortParam) params.set('sort', sortParam);
        params.set('per_page', '40');
        params.set('page', '1');

        const url = `${API_BASE}/api/repos/search?${params.toString()}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        const payload = await res.json();
        const items = Array.isArray(payload.items) ? payload.items : payload.items ?? [];
        const mapped = (items as ApiItem[]).map(mapApiToCard);
        setRemoteResults(mapped);
        setLoading(false);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError('Erro ao buscar repositórios');
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, language, hasReadme, sortBy, API_BASE]);

  // Converter repositórios locais para formato de card
  const localRepos = useMemo(() => {
    return repositories.map(r => ({
      id: r.id,
      title: r.name,
      owner: r.organization,
      description: r.description,
      language: r.language,
      stars: r.stars,
      url: r.url,
      readmeExists: r.readmeStatus !== 'sem-readme',
      updatedAt: r.dateValue
    }));
  }, [repositories]);

  // Busca local: filtrar repositórios locais pela query e filtros
  const filteredLocalRepos = useMemo(() => {
    let filtered = [...localRepos];
    
    // Filtrar por query se houver
    if (query.trim()) {
      const queryLower = query.toLowerCase();
      filtered = filtered.filter(repo => {
        return (
          repo.title.toLowerCase().includes(queryLower) ||
          repo.description.toLowerCase().includes(queryLower) ||
          repo.language.toLowerCase().includes(queryLower) ||
          (repo.owner && repo.owner.toLowerCase().includes(queryLower))
        );
      });
    }
    
    // Filtrar por linguagem
    if (language !== 'todas') {
      filtered = filtered.filter(repo => repo.language === language);
    }
    
    // Filtrar por README
    if (hasReadme) {
      filtered = filtered.filter(repo => repo.readmeExists);
    }
    
    return filtered;
  }, [localRepos, query, language, hasReadme]);

  // Filtrar resultados remotos pelos filtros (caso a API não tenha aplicado)
  const filteredRemoteResults = useMemo(() => {
    if (!remoteResults) return [];
    
    let filtered = [...remoteResults];
    
    // Filtrar por linguagem (caso a API não tenha aplicado)
    if (language !== 'todas') {
      filtered = filtered.filter(repo => repo.language === language);
    }
    
    // Filtrar por README (caso a API não tenha aplicado)
    if (hasReadme) {
      filtered = filtered.filter(repo => repo.readmeExists);
    }
    
    return filtered;
  }, [remoteResults, language, hasReadme]);

  // Combinar resultados remotos e locais
  const combinedResults = useMemo(() => {
    const remote = filteredRemoteResults;
    const local = filteredLocalRepos;
    
    // Se há query, combinar resultados (remover duplicatas por URL ou nome)
    if (query.trim()) {
      const seenIds = new Set<string>();
      const seenUrls = new Set<string>();
      const combined: typeof remote = [];
      
      // Adicionar remotos primeiro
      remote.forEach(repo => {
        const url = repo.url || '';
        const id = repo.id || '';
        if ((url && !seenUrls.has(url)) || (id && !seenIds.has(id))) {
          if (url) seenUrls.add(url);
          if (id) seenIds.add(id);
          combined.push(repo);
        }
      });
      
      // Adicionar locais que não estão nos remotos
      local.forEach(repo => {
        const url = repo.url || '';
        const id = repo.id || '';
        const isDuplicate = (url && seenUrls.has(url)) || (id && seenIds.has(id));
        if (!isDuplicate) {
          if (url) seenUrls.add(url);
          if (id) seenIds.add(id);
          combined.push(repo);
        }
      });
      
      return combined;
    }
    
    // Sem query, mostrar apenas locais (já filtrados)
    return local;
  }, [filteredRemoteResults, filteredLocalRepos, query]);

  // Aplicar ordenação
  const list = useMemo(() => {
    let arr = [...combinedResults];
    
    // Ordenação
    if (sortBy === 'stars') {
      arr.sort((a, b) => b.stars - a.stars);
    } else if (sortBy === 'date') {
      arr.sort((a, b) => {
        const aTime = a.updatedAt?.getTime() ?? 0;
        const bTime = b.updatedAt?.getTime() ?? 0;
        return bTime - aTime;
      });
    }
    // relevância: manter ordem (remotos primeiro se houver query)
    
    return arr;
  }, [combinedResults, sortBy]);

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Repositórios GitHub' }]} />
      <section className={styles.repositoriesSection}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Repositórios</h1>
            <p className={styles.pageDescription}>Busque código e materiais da disciplina</p>
          </div>

          <div className={styles.separatorLine}></div>

          <div className={styles.filtersSection}>
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-lg-8">
                <RepositorySearchBar value={query} onChange={setQuery} />
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-12 col-md-6 col-lg-3">
                <FilterDropdown
                  label="Linguagem"
                  value={language}
                  options={[
                    { value: 'todas', label: 'Todas as linguagens' },
                    { value: 'Python', label: 'Python' },
                    { value: 'Java', label: 'Java' },
                    { value: 'C++', label: 'C++' },
                    { value: 'JavaScript', label: 'JavaScript' },
                    { value: 'C', label: 'C' },
                    { value: 'TypeScript', label: 'TypeScript' }
                  ]}
                  onChange={setLanguage}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <FilterDropdown
                  label="Ordenar por"
                  value={sortBy}
                  options={[
                    { value: 'relevancia', label: 'Relevância' },
                    { value: 'stars', label: 'Mais stars' },
                    { value: 'date', label: 'Mais recentes' }
                  ]}
                  onChange={(value) => setSortBy(value as any)}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className={styles.checkboxWrapper}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={hasReadme}
                      onChange={e => setHasReadme(e.target.checked)}
                      className={styles.checkbox}
                    />
                    <span>Tem README</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.clearFilters}>
              <button
                onClick={() => {
                  setQuery('');
                  setLanguage('todas');
                  setHasReadme(false);
                  setSortBy('relevancia');
                }}
                className={styles.clearFiltersLink}
                disabled={
                  query === '' &&
                  language === 'todas' &&
                  !hasReadme &&
                  sortBy === 'relevancia'
                }
              >
                Limpar todos os filtros
              </button>
            </div>

            {loading && <div className={styles.loadingMessage}>Buscando...</div>}
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>

          <div className="row g-4 mt-4">
            {list.length === 0 ? (
              <div className="col-12">
                <div className={styles.noResults}>
                  <p>Nenhum repositório encontrado.</p>
                </div>
              </div>
            ) : (
              list.map((repo: any) => {
                const updatedAtDate = repo.updatedAt ? new Date(repo.updatedAt) : (repo.dateValue ? new Date(repo.dateValue) : new Date());
                const updatedDateStr = updatedAtDate.toLocaleDateString('pt-BR');

                const readmeStatus: 'ativo' | 'ativo-sem-label' | 'sem-readme' = repo.readmeExists
                  ? 'ativo'
                  : 'sem-readme';

                return (
                  <div key={repo.id} className="col-12 col-md-6 col-lg-4">
                    <RepositoryCard
                      title={repo.title}
                      description={repo.description || ''}
                      language={repo.language || ''}
                      updatedDate={updatedDateStr}
                      stars={repo.stars ?? 0}
                      readmeStatus={readmeStatus}
                      isFavorite={repo.isFavorite ?? false}
                      onToggleFavorite={() => {
                        console.log('toggle favorite', repo.id);
                      }}
                      githubUrl={repo.githubUrl || repo.url || repo.html_url || '#'}
                      detailsUrl={`/repos/${encodeURIComponent(repo.id ?? repo.title)}`}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}