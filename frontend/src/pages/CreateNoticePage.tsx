import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { useNotices } from '../context/NoticesContext';
import type { PriorityType, PriorityLevel } from '../components/notices';
import styles from './CreateNoticePage.module.css';

function CreateNoticePage() {
  const navigate = useNavigate();
  const { addNotice } = useNotices();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priorityType: 'informativo' as PriorityType,
    priorityLevel: 'baixa' as PriorityLevel,
    category: '',
    period: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorityTypeOptions = [
    { value: 'urgente', label: 'Urgente' },
    { value: 'importante', label: 'Importante' },
    { value: 'informativo', label: 'Informativo' },
    { value: 'geral', label: 'Geral' }
  ];

  const priorityLevelOptions = [
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Média' },
    { value: 'baixa', label: 'Baixa' }
  ];

  const categoryOptions = [
    { value: '', label: 'Selecione uma categoria' },
    { value: 'prova', label: 'Prova' },
    { value: 'material', label: 'Material' },
    { value: 'horario', label: 'Horário' },
    { value: 'exercicio', label: 'Exercício' }
  ];

  const periodOptions = [
    { value: '', label: 'Selecione um período' },
    { value: '2024-2', label: '2024.2' },
    { value: '2024-1', label: '2024.1' },
    { value: '2023-2', label: '2023.2' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addNotice({
        title: formData.title,
        description: formData.description,
        priorityType: formData.priorityType,
        priorityLevel: formData.priorityLevel,
        author: 'Prof. Maurício Serrano',
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        dateValue: new Date(),
        category: formData.category || undefined,
        period: formData.period || undefined
      });

      navigate('/avisos');
    } catch (error) {
      console.error('Erro ao salvar aviso:', error);
      setErrors({ submit: 'Erro ao salvar o aviso. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/avisos');
  };

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Avisos', path: '/avisos' },
        { label: 'Novo Aviso' }
      ]} />

      <div className={styles.createNoticePage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Criar Novo Aviso</h1>
            <p className={styles.pageDescription}>
              Crie um novo aviso ou comunicado para a disciplina
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {errors.submit && (
              <div className={styles.errorMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.submit}
              </div>
            )}

            <div className="row g-4">
              <div className="col-12">
                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.label}>
                    Título <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                    placeholder="Ex: Alteração na Data da Prova"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                </div>
              </div>

              <div className="col-12">
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>
                    Descrição <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                    placeholder="Descreva o aviso..."
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="priorityType" className={styles.label}>
                    Tipo de Prioridade
                  </label>
                  <select
                    id="priorityType"
                    name="priorityType"
                    className={styles.select}
                    value={formData.priorityType}
                    onChange={handleChange}
                  >
                    {priorityTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="priorityLevel" className={styles.label}>
                    Nível de Prioridade
                  </label>
                  <select
                    id="priorityLevel"
                    name="priorityLevel"
                    className={styles.select}
                    value={formData.priorityLevel}
                    onChange={handleChange}
                  >
                    {priorityLevelOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    Categoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    className={styles.select}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="period" className={styles.label}>
                    Período
                  </label>
                  <select
                    id="period"
                    name="period"
                    className={styles.select}
                    value={formData.period}
                    onChange={handleChange}
                  >
                    {periodOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Publicar Aviso'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CreateNoticePage;