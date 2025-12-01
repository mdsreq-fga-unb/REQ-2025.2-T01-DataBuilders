import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

export type MaterialType = 'slides' | 'video' | 'pdf' | 'codigo';

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
  const [materials, setMaterials] = useState<MaterialData[]>([]);

  function mapBackendMaterial(m: any): MaterialData {
    const createdAt = m.createdAt ? new Date(m.createdAt) : new Date();
    const format = String(m.format || 'slides') as MaterialType;
    return {
      id: String(m.id),
      type: ['slides','video','pdf','codigo'].includes(format) ? format : 'slides',
      title: String(m.title || ''),
      description: m.description ? String(m.description) : '',
      professor: 'Prof. Mauricio Serrano',
      date: createdAt.toLocaleDateString('pt-BR'),
      dateValue: createdAt,
      downloads: 0,
      version: 'v1.0',
      isFavorite: false,
      additionalInfo: undefined,
      actionButtonText: 'Visualizar',
      actionButtonLink: m.contentUrl ? String(m.contentUrl) : '#',
      topic: undefined,
      period: '2024-2',
      status: m.deleted ? 'Rascunho' : 'Publicado',
      updatedAt: undefined,
    };
  }

  useEffect(() => {
    api.get('/materials')
      .then((res) => {
        const arr = Array.isArray(res) ? res : [];
        const mapped = arr.map(mapBackendMaterial);
        setMaterials(mapped);
      })
      .catch(() => {
        setMaterials([]);
      });
  }, []);

  const addMaterial = async (material: Omit<MaterialData, 'id'>) => {
    const payload = {
      title: material.title,
      description: material.description,
      contentUrl: material.actionButtonLink,
      format: material.type,
    };
    const created = await api.post('/materials', payload);
    const mapped = mapBackendMaterial(created);
    setMaterials(prev => [mapped, ...prev]);
  };

  const removeMaterial = async (id: string) => {
    await api.delete(`/materials/${id}`);
    setMaterials(prev => prev.filter(material => material.id !== id));
  };

  const updateMaterial = async (id: string, updates: Partial<MaterialData>) => {
    const payload: any = {};
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.type !== undefined) payload.format = updates.type;
    if (updates.actionButtonLink !== undefined) payload.contentUrl = updates.actionButtonLink;
    const updated = await api.put(`/materials/${id}`, payload);
    setMaterials(prev => prev.map(m => (m.id === id ? { ...m, ...mapBackendMaterial(updated) } : m)));
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

