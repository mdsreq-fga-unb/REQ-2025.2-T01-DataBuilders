import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
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
  contentUrl?: string; 
}

interface MaterialsContextType {
  materials: MaterialData[];
  isLoading: boolean;
  addMaterial: (material: Omit<MaterialData, 'id' | 'date' | 'dateValue' | 'downloads' | 'version' | 'professor'>) => Promise<void>;
  removeMaterial: (id: string) => Promise<void>;
  updateMaterial: (id: string, material: Partial<MaterialData>) => Promise<void>;
  versionMaterial: (id: string) => Promise<void>;
  registerDownload: (id: string) => Promise<void>;
}

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

export function MaterialsProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMaterials = useCallback(async () => {
    try {
      const response = await api.get('/materials');
      
      const formattedData = response.data.map((item: any) => ({
        ...item,
        dateValue: new Date(item.dateValue),
      }));

      setMaterials(formattedData);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const addMaterial = async (materialData: any) => {
    try {
      const response = await api.post('/materials', materialData);
      
      const newMaterial = {
        ...response.data,
        dateValue: new Date(response.data.dateValue)
      };

      setMaterials(prev => [newMaterial, ...prev]);
    } catch (error) {
      console.error("Erro ao criar:", error);
      throw error;
    }
  };

  const removeMaterial = async (id: string) => {
    try {
      setMaterials(prev => prev.filter(m => m.id !== id));
      
      await api.delete(`/materials/${id}`);
    } catch (error) {
      console.error("Erro ao remover:", error);
      fetchMaterials(); 
    }
  };

  const updateMaterial = async (id: string, updates: Partial<MaterialData>) => {
    try {
      const response = await api.put(`/materials/${id}`, updates);
      
      const updatedItem = {
        ...response.data,
        dateValue: new Date(response.data.dateValue)
      };

      setMaterials(prev => prev.map(m => m.id === id ? updatedItem : m));
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  const versionMaterial = async (id: string) => {
    try {
      const response = await api.patch(`/materials/${id}/version`);
      
      const updatedItem = {
        ...response.data,
        dateValue: new Date(response.data.dateValue)
      };

      setMaterials(prev => prev.map(m => m.id === id ? updatedItem : m));
    } catch (error) {
      console.error("Erro ao versionar:", error);
    }
  };

  const registerDownload = async (id: string) => {
    try {
      const response = await api.post(`/materials/${id}/download`);
      
      setMaterials(prev => prev.map(m => 
        m.id === id ? { ...m, downloads: response.data.downloads } : m
      ));
    } catch (error) {
      console.error("Erro ao registrar download", error);
    }
  };

  return (
    <MaterialsContext.Provider value={{ 
      materials, 
      isLoading, 
      addMaterial, 
      removeMaterial, 
      updateMaterial, 
      versionMaterial,
      registerDownload 
    }}>
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