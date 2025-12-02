import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { PriorityType, PriorityLevel } from '../components/notices';

export interface NoticeData {
  id: string;
  priorityType: PriorityType;
  priorityLevel: PriorityLevel;
  title: string;
  description: string;
  author: string;
  date: string;
  time: string;
  dateValue: Date;
  category?: string;
  period?: string;
}

interface NoticesContextType {
  notices: NoticeData[];
  addNotice: (notice: Omit<NoticeData, 'id'>) => void;
  removeNotice: (id: string) => void;
  updateNotice: (id: string, notice: Partial<NoticeData>) => void;
}

const NoticesContext = createContext<NoticesContextType | undefined>(undefined);

export function NoticesProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<NoticeData[]>([
    {
      id: '1',
      priorityType: 'urgente',
      priorityLevel: 'alta',
      title: 'Alteração na Data da Prova Final',
      description: 'A prova final da disciplina foi reagendada para o dia 20/12/2024 às 14h00. Local: Sala AT-109. Favor confirmar presença.',
      author: 'Prof. Mauricio Serrano',
      date: '15/12/2024',
      time: '09:30',
      dateValue: new Date('2024-12-15T09:30:00'),
      category: 'prova',
      period: '2024-2'
    },
    {
      id: '2',
      priorityType: 'importante',
      priorityLevel: 'media',
      title: 'Material Complementar Disponível',
      description: 'Novos exercícios sobre árvores AVL e B+ foram adicionados na seção de materiais. Recomendo a prática antes da prova.',
      author: 'Prof. Mauricio Serrano',
      date: '12/12/2024',
      time: '16:45',
      dateValue: new Date('2024-12-12T16:45:00'),
      category: 'material',
      period: '2024-2'
    },
    {
      id: '3',
      priorityType: 'informativo',
      priorityLevel: 'baixa',
      title: 'Horário de Atendimento Alterado',
      description: 'A partir desta semana, o horário de atendimento será às terças e quintas, das 14h às 16h, na sala do professor.',
      author: 'Prof. Mauricio Serrano',
      date: '10/12/2024',
      time: '11:20',
      dateValue: new Date('2024-12-10T11:20:00'),
      category: 'horario',
      period: '2024-2'
    },
    {
      id: '4',
      priorityType: 'geral',
      priorityLevel: 'baixa',
      title: 'Lista de Exercícios 4 Disponível',
      description: 'A quarta lista de exercícios sobre algoritmos de ordenação está disponível na seção de materiais. Prazo de entrega: 18/12/2024.',
      author: 'Prof. Mauricio Serrano',
      date: '08/12/2024',
      time: '14:15',
      dateValue: new Date('2024-12-08T14:15:00'),
      category: 'exercicio',
      period: '2024-2'
    }
  ]);

  const addNotice = (notice: Omit<NoticeData, 'id'>) => {
    const newNotice: NoticeData = {
      ...notice,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      dateValue: new Date()
    };
    setNotices(prev => [...prev, newNotice]);
  };

  const removeNotice = (id: string) => {
    setNotices(prev => prev.filter(notice => notice.id !== id));
  };

  const updateNotice = (id: string, updates: Partial<NoticeData>) => {
    setNotices(prev =>
      prev.map(notice => 
        notice.id === id 
          ? { ...notice, ...updates }
          : notice
      )
    );
  };

  return (
    <NoticesContext.Provider value={{ notices, addNotice, removeNotice, updateNotice }}>
      {children}
    </NoticesContext.Provider>
  );
}

export function useNotices() {
  const context = useContext(NoticesContext);
  if (context === undefined) {
    throw new Error('useNotices must be used within a NoticesProvider');
  }
  return context;
}

