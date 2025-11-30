import { createContext, useContext, useState, ReactNode } from 'react';

export interface RepositoryData {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  organization: string;
  isActive: boolean;
  updatedDate?: string;
  dateValue?: Date;
  readmeStatus?: 'ativo' | 'ativo-sem-label' | 'sem-readme';
  isFavorite?: boolean;
  topic?: string;
  hasRecentCommits?: boolean;
}

interface RepositoriesContextType {
  repositories: RepositoryData[];
  addRepository: (repo: Omit<RepositoryData, 'id'>) => void;
  removeRepository: (id: string) => void;
  updateRepository: (id: string, repo: Partial<RepositoryData>) => void;
}

const RepositoriesContext = createContext<RepositoriesContextType | undefined>(undefined);

export function RepositoriesProvider({ children }: { children: ReactNode }) {
  const [repositories, setRepositories] = useState<RepositoryData[]>([
    {
      id: '1',
      name: 'avl-tree-implementation',
      description: 'Implementação completa de árvore AVL em Python com visualização gráfica e testes unitários abrangentes.',
      url: 'https://github.com/unb/arvores-avl',
      language: 'Python',
      stars: 156,
      organization: 'UnB - Estruturas de Dados',
      isActive: true,
      updatedDate: '10/12/2024',
      dateValue: new Date('2024-12-10'),
      readmeStatus: 'ativo',
      isFavorite: false,
      topic: 'arvores',
      hasRecentCommits: true
    },
    {
      id: '2',
      name: 'hash-table-cpp',
      description: 'Implementação eficiente de tabela hash em C++ com diferentes métodos de resolução de colisões e análise de performance.',
      url: 'https://github.com/unb/estruturas-hash',
      language: 'C++',
      stars: 203,
      organization: 'UnB - Estruturas de Dados',
      isActive: true,
      updatedDate: '05/12/2024',
      dateValue: new Date('2024-12-05'),
      readmeStatus: 'ativo-sem-label',
      isFavorite: false,
      topic: 'hash',
      hasRecentCommits: true
    },
    {
      id: '3',
      name: 'dijkstra-algorithm-java',
      description: 'Implementação otimizada do algoritmo de Dijkstra em Java com interface gráfica para visualização de grafos.',
      url: 'https://github.com/unb/algoritmos-grafos',
      language: 'Java',
      stars: 89,
      organization: 'UnB - Estruturas de Dados',
      isActive: true,
      updatedDate: '08/12/2024',
      dateValue: new Date('2024-12-08'),
      readmeStatus: 'ativo',
      isFavorite: true,
      topic: 'grafos',
      hasRecentCommits: true
    }
  ]);

  const addRepository = (repo: Omit<RepositoryData, 'id'>) => {
    const newRepo: RepositoryData = {
      ...repo,
      id: Date.now().toString(),
      stars: repo.stars || 0,
      isActive: repo.isActive ?? true,
      updatedDate: new Date().toLocaleDateString('pt-BR'),
      dateValue: new Date(),
      readmeStatus: 'ativo',
      isFavorite: false,
      hasRecentCommits: true
    };
    setRepositories(prev => [...prev, newRepo]);
  };

  const removeRepository = (id: string) => {
    setRepositories(prev => prev.filter(repo => repo.id !== id));
  };

  const updateRepository = (id: string, updates: Partial<RepositoryData>) => {
    setRepositories(prev =>
      prev.map(repo => (repo.id === id ? { ...repo, ...updates } : repo))
    );
  };

  return (
    <RepositoriesContext.Provider value={{ repositories, addRepository, removeRepository, updateRepository }}>
      {children}
    </RepositoriesContext.Provider>
  );
}

export function useRepositories() {
  const context = useContext(RepositoriesContext);
  if (context === undefined) {
    throw new Error('useRepositories must be used within a RepositoriesProvider');
  }
  return context;
}

