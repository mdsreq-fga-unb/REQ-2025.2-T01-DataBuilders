import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { Breadcrumb } from '../components';
import { useMaterials } from '../context/MaterialsContext';
import styles from './CreateContentPage.module.css';

type MaterialType = 'slides' | 'video' | 'pdf' | 'codigo';

function CreateContentPage() {
  const navigate = useNavigate();
  const { addMaterial } = useMaterials();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'slides' as MaterialType,
    topic: '',
    period: '',
    file: null as File | null,
    version: 'v1.0',
    additionalInfo: '',
    isPublic: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topicOptions = [
    { value: '', label: 'Selecione um tópico' },
    { value: 'arvores', label: 'Árvores' },
    { value: 'grafos', label: 'Grafos' },
    { value: 'hash', label: 'Hash' },
    { value: 'ordenacao', label: 'Ordenação' },
    { value: 'heap', label: 'Heap' },
    { value: 'outros', label: 'Outros' }
  ];

  const periodOptions = [
    { value: '', label: 'Selecione um período' },
    { value: '2025-2', label: '2025.2' },
    { value: '2025-1', label: '2025.1' },
    { value: '2024-2', label: '2024.2' },
    { value: '2024-1', label: '2024.1' },
    { value: '2023-2', label: '2023.2' },
    { value: '2023-1', label: '2023.1' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isPublic: e.target.checked }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }

    if (!formData.topic) {
      newErrors.topic = 'Selecione um tópico';
    }

    if (!formData.period) {
      newErrors.period = 'Selecione um período';
    }

    if (!formData.file) {
      newErrors.file = 'É necessário anexar um arquivo';
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
      // Adicionar material ao contexto
      addMaterial({
        type: formData.type,
        title: formData.title,
        description: formData.description,
        isFavorite: false,
        additionalInfo: formData.additionalInfo || undefined,
        actionButtonText: formData.type === 'video' ? 'Assistir' : formData.type === 'codigo' ? 'Ver Código' : 'Visualizar',
        actionButtonLink: '#',
        topic: formData.topic,
        period: formData.period,
        status: formData.isPublic ? 'Publicado' : 'Rascunho',
        updatedAt: 'agora',
        contentUrl: formData.file ? URL.createObjectURL(formData.file) : undefined
      });
      
      // Redirecionar para a página de materiais após sucesso
      navigate('/materiais');
    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error);
      setErrors({ submit: 'Erro ao salvar o conteúdo. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/materiais');
  };

  return (
    <DefaultLayout>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Materiais de Aula', path: '/materiais' },
        { label: 'Cadastrar Conteúdo' }
      ]} />

      <div className={styles.createContentPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Cadastrar Novo Conteúdo</h1>
            <p className={styles.pageDescription}>
              Adicione novos materiais de aula para a disciplina
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
              {/* Título */}
              <div className="col-12">
                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.label}>
                    Título do Material <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                    placeholder="Ex: Árvores AVL - Conceitos e Implementação"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                </div>
              </div>

              {/* Descrição */}
              <div className="col-12">
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>
                    Descrição <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                    placeholder="Descreva o conteúdo do material..."
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                </div>
              </div>

              {/* Tipo e Tópico */}
              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="type" className={styles.label}>
                    Tipo de Material <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    className={styles.select}
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="slides">Slides</option>
                    <option value="video">Vídeo</option>
                    <option value="pdf">PDF</option>
                    <option value="codigo">Código</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="topic" className={styles.label}>
                    Tópico <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    className={`${styles.select} ${errors.topic ? styles.inputError : ''}`}
                    value={formData.topic}
                    onChange={handleChange}
                  >
                    {topicOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.topic && <span className={styles.errorText}>{errors.topic}</span>}
                </div>
              </div>

              {/* Período e Versão */}
              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="period" className={styles.label}>
                    Período <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="period"
                    name="period"
                    className={`${styles.select} ${errors.period ? styles.inputError : ''}`}
                    value={formData.period}
                    onChange={handleChange}
                  >
                    {periodOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.period && <span className={styles.errorText}>{errors.period}</span>}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.formGroup}>
                  <label htmlFor="version" className={styles.label}>
                    Versão
                  </label>
                  <input
                    type="text"
                    id="version"
                    name="version"
                    className={styles.input}
                    placeholder="v1.0"
                    value={formData.version}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Informação Adicional */}
              <div className="col-12">
                <div className={styles.formGroup}>
                  <label htmlFor="additionalInfo" className={styles.label}>
                    Informação Adicional
                  </label>
                  <input
                    type="text"
                    id="additionalInfo"
                    name="additionalInfo"
                    className={styles.input}
                    placeholder="Ex: 45min, 24 páginas, 3 linguagens"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                  <span className={styles.helperText}>
                    Informações extras sobre o material (duração, páginas, etc.)
                  </span>
                </div>
              </div>

              {/* Upload de Arquivo */}
              <div className="col-12">
                <div className={styles.formGroup}>
                  <label htmlFor="file" className={styles.label}>
                    Arquivo <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.fileUploadWrapper}>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      className={styles.fileInput}
                      onChange={handleFileChange}
                      accept=".pdf,.pptx,.ppt,.mp4,.zip,.py,.java,.cpp,.js,.ts"
                    />
                    <label htmlFor="file" className={styles.fileLabel}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span>{formData.file ? formData.file.name : 'Selecione um arquivo'}</span>
                    </label>
                  </div>
                  {errors.file && <span className={styles.errorText}>{errors.file}</span>}
                  {formData.file && (
                    <div className={styles.fileInfo}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>{(formData.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Publicar Imediatamente */}
              <div className="col-12">
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={handleCheckboxChange}
                      className={styles.checkbox}
                    />
                    <span>Publicar imediatamente</span>
                  </label>
                  <span className={styles.helperText}>
                    Se desmarcado, o material ficará como rascunho
                  </span>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
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
                {isSubmitting ? 'Salvando...' : 'Salvar Conteúdo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CreateContentPage;