import { createContext, useContext, useState, ReactNode } from 'react';

export type MaterialType = 'slides' | 'video' | 'pdf' | 'codigo' | 'material complementar' | 'plano de ensino' | 'lista' | 'livros';

export interface MaterialData {
  id: string;
  type: MaterialType;
  title: string;
  description: string;
  professor: string;
  date: string;
  dateValue: Date;
  downloads: number;
  version: string;
  isFavorite: boolean;
  additionalInfo?: string;
  actionButtonText?: string;
  actionButtonLink?: string;
  topic?: string;
  period?: string;
  status?: 'Publicado' | 'Rascunho';
  updatedAt?: string;
}

interface MaterialsContextType {
  materials: MaterialData[];
  addMaterial: (material: Omit<MaterialData, 'id'>) => void;
  removeMaterial: (id: string) => void;
  updateMaterial: (id: string, material: Partial<MaterialData>) => void;
  versionMaterial: (id: string) => void;
}

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

export function MaterialsProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<MaterialData[]>([
    {
      id: '1',
      type: 'slides',
      title: 'Árvores AVL - Conceitos e Implementação',
      description: 'Slides completos sobre árvores AVL, incluindo operações de inserção, remoção e balanceamento automático.',
      professor: 'Prof. Mauricio Serrano',
      date: '10/12/2024',
      dateValue: new Date('2024-12-10'),
      downloads: 156,
      version: 'v2.1',
      isFavorite: false,
      topic: 'arvores',
      period: '2024-2',
      status: 'Publicado',
      updatedAt: 'há 2 horas'
    },
    {
      id: '2',
      type: 'video',
      title: 'Algoritmo de Dijkstra - Aula Prática',
      description: 'Videoaula demonstrando a implementação e execução do algoritmo de Dijkstra para encontrar caminhos mínimos.',
      professor: 'Prof. Maurício Serrano',
      date: '08/12/2024',
      dateValue: new Date('2024-12-08'),
      downloads: 89,
      version: 'v1.0',
      isFavorite: true,
      additionalInfo: '45min',
      actionButtonText: 'Assistir',
      topic: 'grafos',
      period: '2024-2',
      status: 'Publicado',
      updatedAt: 'há 3 dias'
    },
    {
      id: '3',
      type: 'pdf',
      title: 'Tabelas Hash - Teoria e Aplicações',
      description: 'Apostila completa sobre estruturas de hash, funções de dispersão e métodos de resolução de colisões.',
      professor: 'Prof. Mauricio Serrano',
      date: '05/12/2024',
      dateValue: new Date('2024-12-05'),
      downloads: 203,
      version: 'v1.2',
      isFavorite: false,
      additionalInfo: '24 páginas',
      topic: 'hash',
      period: '2024-2',
      status: 'Publicado',
      updatedAt: 'há 5 dias'
    },
    {
      id: '4',
      type: 'codigo',
      title: 'Implementações de QuickSort',
      description: 'Código fonte completo do QuickSort em Python, Java e C++ com análise de complexidade e otimizações.',
      professor: 'Prof. Maurício Serrano',
      date: '03/12/2024',
      dateValue: new Date('2024-12-03'),
      downloads: 134,
      version: 'v1.1',
      isFavorite: true,
      additionalInfo: '3 linguagens',
      actionButtonText: 'Ver Código',
      topic: 'ordenacao',
      period: '2024-2',
      status: 'Rascunho',
      updatedAt: 'ontem'
    }
  ]);

  const addMaterial = (material: Omit<MaterialData, 'id'>) => {
    const newMaterial: MaterialData = {
      ...material,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      dateValue: new Date(),
      downloads: 0,
      isFavorite: false,
      status: material.status || 'Publicado',
      updatedAt: 'agora'
    };
    setMaterials(prev => [...prev, newMaterial]);
  };

  const removeMaterial = (id: string) => {
    setMaterials(prev => prev.filter(material => material.id !== id));
  };

  const updateMaterial = (id: string, updates: Partial<MaterialData>) => {
    setMaterials(prev =>
      prev.map(material => 
        material.id === id 
          ? { ...material, ...updates, updatedAt: 'agora' }
          : material
      )
    );
  };

  const versionMaterial = (id: string) => {
    setMaterials(prev =>
      prev.map(material => {
        if (material.id === id) {
          const currentVersion = material.version;
          const versionMatch = currentVersion.match(/v(\d+)\.(\d+)/);
          if (versionMatch) {
            const major = parseInt(versionMatch[1]);
            const minor = parseInt(versionMatch[2]) + 1;
            return {
              ...material,
              version: `v${major}.${minor}`,
              updatedAt: 'agora',
              date: new Date().toLocaleDateString('pt-BR'),
              dateValue: new Date()
            };
          }
          return { ...material, version: 'v1.1', updatedAt: 'agora' };
        }
        return material;
      })
    );
  };

  return (
    <MaterialsContext.Provider value={{ materials, addMaterial, removeMaterial, updateMaterial, versionMaterial }}>
      {children}
    </MaterialsContext.Provider>
  );
}

export function useMaterials() {
  const context = useContext(MaterialsContext);
  if (context === undefined) {
    throw new Error('useMaterials must be used within a MaterialsProvider');
  }
  return context;
}

