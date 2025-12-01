import { useState, useEffect, useMemo } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
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

  // Source of truth: remoteResults when searching; else local repositories
  const source = query.trim() ? (remoteResults ?? []) : repositories.map(r => ({
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

  // Sort/return minimal metadata only
  const list = useMemo(() => {
    const arr = [...source];
    if (sortBy === 'stars') arr.sort((a,b) => b.stars - a.stars);
    else if (sortBy === 'date') arr.sort((a,b) => (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0));
    // relevance: keep API order or local fallback
    return arr;
  }, [source, sortBy]);

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Repositórios GitHub' }]} />
      <section className={styles.repositoriesSection}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1>Repositórios</h1>
            <p>Busque código e materiais da disciplina</p>
          </div>

          <div>
            <RepositorySearchBar value={query} onChange={setQuery} />
            <div style={{ marginTop: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
              <select value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="todas">Todas as linguagens</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C">C</option>
                <option value="TypeScript">TypeScript</option>
              </select>

              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="checkbox" checked={hasReadme} onChange={e => setHasReadme(e.target.checked)} />
                Tem README
              </label>

              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
                <option value="relevancia">Relevância</option>
                <option value="stars">Mais stars</option>
                <option value="date">Mais recentes</option>
              </select>
            </div>

            {loading && <div style={{ marginTop: 8 }}>Buscando...</div>}
            {error && <div style={{ marginTop: 8, color: 'crimson' }}>{error}</div>}
          </div>

          <div className="row g-4 mt-4">
            {list.length === 0 ? (
              <div>Nenhum repositório encontrado.</div>
            ) : (
              list.map((repo: any) => (
                <div key={repo.id} className="col-12 col-md-6 col-lg-4">
                  {list.length === 0 ? (
                    <div>Nenhum repositório encontrado.</div>
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
              ))
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
