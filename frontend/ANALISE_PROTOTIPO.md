# Análise dos Protótipos - Data Builders

## 📄 PÁGINAS IDENTIFICADAS

### Páginas Principais
1. **HomePage** (`pages/HomePage.tsx`)
   - Página inicial com hero section, destaques recentes e seção de repositórios
   - Conteúdo principal agrupado em seções bem definidas

2. **NoticesPage** (`pages/NoticesPage.tsx`)
   - Página completa de "Avisos e Comunicados"
   - Estrutura: Breadcrumb > PageHeader (título + subtítulo) > Barra de filtros/ações > SearchBar + Filtros > Lista de NoticeCards > Pagination
   - Funcionalidades: Busca, filtros (Prioridade, Categoria, Período), ordenação, criação de avisos (+ Novo Aviso), ações em cards (Ver Detalhes, Marcar como Lido)
   - Total de avisos exibido na barra superior

3. **MaterialsPage** (`pages/MaterialsPage.tsx`)
   - Página completa de materiais de aula
   - Estrutura: Breadcrumb > Header da página > Sidebar de filtros + Grid de cards
   - Funcionalidades: Busca, filtros múltiplos (Tipo, Tópico, Período, Ordenação), paginação
   - Total de materiais e botão de favoritos

4. **RepositoriesPage** (`pages/RepositoriesPage.tsx`)
   - Página completa de repositórios GitHub
   - Estrutura: Breadcrumb > PageHeader (título + subtítulo + contador) > SearchBar + Filtros > Grid de RepositoryCards > Pagination
   - Funcionalidades: Busca, filtros (Linguagem, Tipo, Ordenar por), paginação
   - Layout diferente da MaterialsPage (sem sidebar, filtros horizontais)

5. **ProfilePage** (`pages/ProfilePage.tsx`)
   - Página completa de perfil do usuário com informações pessoais, estatísticas, configurações e gestão de conteúdo
   - Estrutura: ProfileHeader (avatar, nome, cargo, email, tags) > Seção de Estatísticas (cards) > Layout de 2 colunas:
     - Coluna Esquerda: Informações do Usuário (formulário editável) + Configurações Rápidas (toggles) + Alterar Senha (formulário)
     - Coluna Direita: Gestão de Conteúdo (cards de Materiais, Repositórios, Avisos)
   - Funcionalidades: Edição de dados pessoais, gerenciamento de notificações, alteração de senha, acesso rápido à gestão de materiais/repositórios/avisos

6. **DashboardPage** (`pages/DashboardPage.tsx`)
   - Página de dashboard administrativo para gerenciamento da plataforma
   - Estrutura: Breadcrumb > PageHeader (título + subtítulo + botões de ação) > Seção de Estatísticas (cards) > TabNavigation > Seção de Gestão (tabela/lista)
   - Funcionalidades: Visualização de estatísticas, gestão de materiais/avisos/usuários através de tabs, exportação de dados, ações rápidas
   - Tabs: Gestão de Materiais (ativa), Gestão de Avisos, Gestão de Usuários

7. **LoginPage** (`pages/LoginPage.tsx`)
   - Página de login/autenticação com GitHub
   - Estrutura: Fundo gradiente com formas decorativas > Card centralizado (RestrictedAccessBadge + AdminFeatureIcon + Título/Subtítulo + GitHubLoginButton + AccessInstructionsList + AlertBox + Links de suporte)
   - Funcionalidades: Autenticação via GitHub OAuth, instruções de acesso, links para alunos e suporte
   - Layout: Página autônoma sem Header/Footer padrão, card centralizado com fundo gradiente

---

## 🎨 LAYOUTS IDENTIFICADOS

### 1. **DefaultLayout** (`layouts/DefaultLayout.tsx`)
   - Layout principal que envolve todas as páginas
   - Composto por:
     - Header (navegação superior)
     - Main Content Area (conteúdo da página)
     - Footer (rodapé)

### 2. **Header/Navbar** (`layouts/Header.tsx` ou `components/Header.tsx`)
   - Barra de navegação superior com:
     - Logo (DB + "Data Builders")
     - Links de navegação: "Materiais de Aula", "Repositórios GitHub", "Avisos", "Perfil"
     - Botão "Login"
     - Breadcrumb (ex: "Home" com ícone)

### 3. **Footer** (`layouts/Footer.tsx` ou `components/Footer.tsx`)
   - Rodapé escuro (azul/negro) com:
     - 3 colunas: "Data Builders", "Links Rápidos", "Contato"
     - Logo e descrição
     - Ícones sociais (GitHub, Email)
     - Barra inferior com copyright e links de política

### 4. **AuthLayout** (`layouts/AuthLayout.tsx`)
   - Layout específico para páginas de autenticação (Login, Registro, Recuperação de senha)
   - Fundo gradiente com formas decorativas circulares
   - Card centralizado (AuthCard)
   - Sem Header/Footer padrão
   - Props: `children`, `variant?` (login|register|forgot-password)

---

## 🧩 COMPONENTES REUTILIZÁVEIS IDENTIFICADOS

### Componentes de Navegação e Estrutura

1. **Logo** (`components/Logo.tsx`)
   - Logo "DB" em quadrado azul + texto "Data Builders"
   - Reutilizável no Header e Footer

2. **NavigationLink** (`components/NavigationLink.tsx`)
   - Links de navegação do header
   - Props: `href`, `label`, `active?`

3. **Button** (`components/Button.tsx`)
   - Botão genérico reutilizável
   - Variantes: primary (azul), secondary (branco com borda)
   - Props: `variant`, `children`, `onClick`, `disabled?`

4. **FilterGroup** / **TabNavigation** (`components/FilterGroup.tsx`)
   - Grupo de botões de filtro (Todos, Python, Java, C++)
   - Estado de seleção
   - Props: `options[]`, `selected`, `onChange`

5. **Breadcrumb** (`components/Breadcrumb.tsx`)
   - Navegação de migalhas (ex: "Home > Materiais de Aula")
   - Usado em páginas internas para navegação hierárquica
   - Props: `items[]` com { label, href, icon? }

---

### Componentes de Seção

6. **SectionHeader** (`components/SectionHeader.tsx`)
   - Título + subtítulo de seções
   - Usado em "Destaques Recentes", "Repositórios GitHub", "Avisos Recentes"
   - Props: `title`, `subtitle?`

7. **HeroSection** (`components/HeroSection.tsx`)
   - Seção hero com fundo gradiente azul
   - Título do curso, descrição, botão CTA
   - Card lateral "Aprendizado Prático"
   - Props: `courseTitle`, `description`, `ctaText`, `ctaLink`

8. **PracticalLearningCard** (`components/PracticalLearningCard.tsx`)
   - Card semi-transparente no hero
   - Ícone de documento, título, descrição
   - Pode ser genérico: `InfoCard` com props

---

### Componentes de Cards e Conteúdo

9. **NoticeCard** / **AnnouncementCard** (`components/NoticeCard.tsx`)
   - Card de aviso/notificação altamente reutilizável
   - Estrutura:
     - Barra lateral colorida + ícone
     - Título
     - Descrição/conteúdo
     - Metadata (tempo, autor)
   - Variantes: warning (vermelho), info (azul), success (verde), extra (amarelo)
   - Props: `type`, `title`, `description`, `publishedTime`, `author`, `icon?`

10. **HighlightCard** (`components/HighlightCard.tsx`)
    - Cards da seção "Destaques Recentes"
    - Similar ao NoticeCard, mas com estrutura mais compacta
    - Props: `type`, `title`, `description`, `timestamp`, `icon`

11. **RepositoryCard** (`components/RepositoryCard.tsx`)
    - Card de repositório GitHub
    - Estrutura:
      - Título do repositório
      - Avaliação (estrelas + número)
      - Descrição
      - Tag de tecnologia
      - Botão "Ver no GitHub"
    - Props: `title`, `stars`, `description`, `language`, `githubUrl`

12. **StarRating** (`components/StarRating.tsx`)
    - Exibição de estrelas + número de avaliações
    - Usado dentro do RepositoryCard
    - Props: `count`, `showIcon?`

13. **TechnologyTag** (`components/TechnologyTag.tsx`)
    - Tag/badge de linguagem (Python, Java, C++)
    - Props: `language`, `color?`

14. **GitHubLinkButton** (`components/GitHubLinkButton.tsx`)
    - Botão/link para GitHub
    - Usado nos RepositoryCards
    - Props: `url`, `text?`

---

### Componentes de Layout

15. **Card** (`components/Card.tsx`)
    - Componente base genérico para cards
    - Wrapper reutilizável com padding, borda, sombra
    - Props: `children`, `variant?`, `className?`

16. **Container** (`components/Container.tsx`)
    - Container principal com max-width e padding lateral
    - Envolve seções principais
    - Props: `children`, `maxWidth?`

17. **Grid** (`components/Grid.tsx`)
    - Layout em grade para cards de repositórios
    - Grid responsivo (2-3 colunas)
    - Props: `columns?`, `gap?`, `children`

---

### Componentes do Footer

18. **FooterColumn** (`components/FooterColumn.tsx`)
    - Coluna do footer
    - Props: `title`, `children`

19. **SocialIcons** (`components/SocialIcons.tsx`)
    - Ícones sociais (GitHub, Email)
    - Props: `items[]` com { icon, url }

20. **CopyrightBar** (`components/CopyrightBar.tsx`)
    - Barra inferior do footer com copyright e links
    - Props: `copyrightText`, `links[]`

21. **FooterLink** (`components/FooterLink.tsx`)
    - Link do footer (navegação e políticas)
    - Props: `href`, `children`

---

### Componentes de Ícone e UI

22. **Icon** (`components/Icon.tsx`)
    - Componente genérico para ícones
    - Props: `name`, `size?`, `color?`, `className?`

23. **Badge** (`components/Badge.tsx`)
    - Badge genérico (pode ser usado para tags, labels, etc.)
    - Props: `variant`, `children`

---

### Componentes da Página de Materiais de Aula

24. **MaterialCard** (`components/MaterialCard.tsx`)
    - Card principal para exibir materiais (Slides, Vídeos, PDFs, Código)
    - Estrutura completa:
      - MaterialTypeBadge (topo esquerdo) - variantes: Slides (azul), Vídeo (vermelho), PDF (verde), Código (roxo)
      - FavoriteButton (topo direito) - estrela preenchida/outline
      - Título do material
      - Descrição
      - Autor (Prof. Maurício Serrano)
      - Metadata: Data, Downloads, Duração/Páginas, Versão
      - ActionButtons (Visualizar/Assistir/Ver Código + Download)
    - Props: `type`, `title`, `description`, `author`, `date`, `downloads`, `duration?`, `pages?`, `languages?`, `version`, `isFavorite`, `onFavoriteToggle`, `onView`, `onDownload`
    - **Altamente reutilizável** - componente central da MaterialsPage

25. **MaterialTypeBadge** (`components/MaterialTypeBadge.tsx`)
    - Badge com ícone indicando tipo de material
    - Variantes: slides (azul), video (vermelho), pdf (verde), codigo (roxo)
    - Props: `type`, `icon?`

26. **SearchBar** / **SearchInput** (`components/SearchBar.tsx`)
    - Barra de busca com ícone de lupa
    - Placeholder: "Pesquisar materiais..."
    - Props: `placeholder`, `value`, `onChange`, `onSearch?`

27. **FilterSection** (`components/FilterSection.tsx`)
    - Container para seção de filtros na sidebar
    - Título + lista de checkboxes
    - Props: `title`, `children`

28. **FilterCheckbox** (`components/FilterCheckbox.tsx`)
    - Checkbox com label e contador
    - Usado em filtros: Tipo de Material, Linguagem, Tópico
    - Exemplo: "Slides (12)", "Python (8)"
    - Props: `label`, `count`, `checked`, `onChange`

29. **Dropdown** / **Select** (`components/Dropdown.tsx`)
    - Dropdown para filtros e ordenação
    - Usado em: "Tipo de Material", "Tópico", "Período", "Ordenar por"
    - Props: `options[]`, `value`, `onChange`, `placeholder`

30. **Pagination** (`components/Pagination.tsx`)
    - Navegação de páginas (Anterior, números, Próximo)
    - Usado no final da lista de materiais
    - Props: `currentPage`, `totalPages`, `onPageChange`

31. **MaterialSummary** (`components/MaterialSummary.tsx`)
    - Resumo com total de materiais
    - Exemplo: "Total: 6 materiais"
    - Props: `total`, `label?`

32. **FavoriteButton** (`components/FavoriteButton.tsx`)
    - Botão de favoritar (estrela)
    - Estados: filled (amarelo) / outline (cinza)
    - Usado em MaterialCard
    - Props: `isFavorite`, `onToggle`

33. **ActionButton** (`components/ActionButton.tsx`)
    - Botão de ação principal do material
    - Variantes: "Visualizar" (Slides/PDF), "Assistir" (Vídeo), "Ver Código" (Código)
    - Props: `variant`, `label`, `onClick`, `type` (slides|video|pdf|codigo)

34. **DownloadButton** (`components/DownloadButton.tsx`)
    - Botão secundário para download
    - Estilo: branco com borda azul
    - Props: `onClick`, `disabled?`

35. **Sidebar** (`components/Sidebar.tsx` ou `layouts/Sidebar.tsx`)
    - Sidebar lateral esquerda com filtros
    - Contém: SearchBar, FilterSections
    - Props: `children`, `isOpen?` (para mobile)

36. **ClearFiltersLink** (`components/ClearFiltersLink.tsx`)
    - Link para limpar todos os filtros
    - Texto: "Limpar todos os filtros"
    - Props: `onClick`

---

### Componentes da Página de Repositórios GitHub

37. **PageHeader** (`components/PageHeader.tsx`)
    - Cabeçalho de página com título, subtítulo e informações extras
    - Usado em RepositoriesPage: "Repositórios GitHub" + subtítulo + contador
    - Pode ser reutilizado em outras páginas
    - Props: `title`, `subtitle?`, `extra?` (para contador ou botões)

38. **RepositoryCount** (`components/RepositoryCount.tsx`)
    - Contador de repositórios (ex: "Total de Repositórios: 6")
    - Pode ser genérico: `CountBadge` ou usado dentro do PageHeader
    - Props: `label`, `count`

39. **FilterDropdown** (`components/FilterDropdown.tsx`)
    - Dropdown de filtro específico para a página de repositórios
    - Botões com ícone de seta para baixo
    - Usado para: "Linguagem", "Tipo", "Ordenar por"
    - Diferente do Dropdown genérico (pode ser variante ou componente separado)
    - Props: `label`, `options[]`, `value`, `onChange`, `placeholder?`

40. **FilterRow** (`components/FilterRow.tsx`)
    - Container horizontal para múltiplos filtros
    - Usado na RepositoriesPage para alinhar FilterDropdowns horizontalmente
    - Props: `children`, `gap?`

---

## 📊 ESTRUTURA DE PASTAS PROPOSTA

```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx
      Button.module.css (ou styled-components)
    Card/
      Card.tsx
    NoticeCard/
      NoticeCard.tsx
    RepositoryCard/
      RepositoryCard.tsx
    SectionHeader/
      SectionHeader.tsx
    Logo/
      Logo.tsx
    FilterGroup/
      FilterGroup.tsx
    TechnologyTag/
      TechnologyTag.tsx
    // ... outros componentes
    
  pages/
    HomePage.tsx
    NoticesPage.tsx
    MaterialsPage.tsx
    RepositoriesPage.tsx
    ProfilePage.tsx
    LoginPage.tsx
    
  layouts/
    DefaultLayout.tsx
    Header.tsx
    Footer.tsx
    
  types/
    index.ts
    // Tipos: Notice, Repository, User, etc.
    
  hooks/
    // Custom hooks conforme necessário
    
  services/
    // API calls: notices, repositories, auth, etc.
    
  utils/
    // Formatadores de data, validadores, etc.
    
  styles/
    global.css
    // Variáveis CSS, temas, etc.
```

---

## 🎯 OBSERVAÇÕES IMPORTANTES

1. **NoticeCard é altamente reutilizável**: Aparece em diferentes contextos (HomePage, NoticesPage) com variações de tipo (warning, info, success, extra)

2. **RepositoryCard**: Estrutura consistente para todos os repositórios, apenas mudando dados

3. **SectionHeader**: Padrão repetido em múltiplas seções (mesma estrutura visual)

4. **Footer**: Estrutura bem definida e fixa, perfeita para componente de layout

5. **HeroSection**: Componente específico da HomePage, mas pode ser usado em outras páginas de destaque

6. **FilterGroup**: Reutilizável para filtros em diferentes páginas (repositórios, materiais, etc.)

7. **MaterialCard é COMPONENTE-CHAVE**: Componente central da MaterialsPage, com estrutura rica incluindo badges, favoritos, metadata variada e ações múltiplas. Precisa ser bem planejado.

8. **MaterialsPage tem layout específico**: Diferente da HomePage, usa layout com sidebar esquerdo (filtros) + área principal (grid de cards). Pode precisar de um `MaterialsLayout` ou usar o DefaultLayout com composição.

9. **Sistema de filtros complexo**: MaterialsPage tem múltiplos tipos de filtros (checkboxes com contadores, dropdowns), busca e ordenação. Vale considerar um hook customizado `useFilters` ou contexto para gerenciar estado.

10. **Pagination**: Componente importante para listagens longas (materiais, repositórios, avisos). Pode ser reutilizado em várias páginas.

11. **RepositoriesPage tem layout horizontal**: Diferente da MaterialsPage (sidebar vertical), usa filtros horizontais (FilterRow) abaixo da busca. Layout mais compacto e direto.

12. **PageHeader é reutilizável**: Pode ser usado em várias páginas (RepositoriesPage, MaterialsPage, NoticesPage) para manter consistência visual no cabeçalho das páginas.

13. **RepositoryCard já confirmado**: O componente mantém a mesma estrutura vista na HomePage (título, estrelas, descrição, tag de tecnologia, botão GitHub). Reutilizável em HomePage e RepositoriesPage.

14. **SearchBar reutilizável**: Mesmo componente de busca pode ser usado em MaterialsPage e RepositoriesPage, apenas mudando placeholder e lógica de busca.

15. **ProfilePage é um dashboard pessoal**: Combina informações estáticas, editáveis, estatísticas e configurações, sendo um excelente exemplo de página complexa com muitos componentes reutilizáveis.

16. **DashboardPage é central para administração**: Página principal para gerenciamento da plataforma, com estatísticas em destaque e gestão por tabs. Altamente funcional e bem estruturada.

17. **DashboardStatCard é diferente do StatisticCard**: Tem estrutura mais rica com tendências, períodos e cores variadas. Específico para dashboards administrativos.

18. **DataTable é componente-chave**: Usado em múltiplas seções do dashboard (Gestão de Materiais, Avisos, Usuários) e pode ser reutilizado em outras páginas de administração.

19. **TabNavigation é padrão de design eficaz**: Permite organizar múltiplas seções de gestão em uma única página, melhorando a usabilidade.

20. **LoginPage é autônoma**: Não usa o DefaultLayout padrão (sem Header/Footer), tem seu próprio AuthLayout com fundo gradiente e card centralizado.

21. **GitHubLoginButton é componente-chave**: Autenticação via GitHub OAuth é o método principal, sendo o componente central da página de login.

22. **AuthCard/AuthLayout são reutilizáveis**: Podem ser usados para outras páginas de autenticação (registro, recuperação de senha, etc.).

23. **AlertBox é versátil**: Pode ser usado em várias páginas para exibir avisos e alertas importantes aos usuários.

---

### Componentes da Página de Perfil

48. **ProfileHeader** (`components/ProfileHeader.tsx`)
    - Cabeçalho superior do perfil com avatar, nome completo, cargo, email e tags
    - Avatar circular com iniciais (ex: "MS")
    - Exibe tags informativas (ex: "Professor", "Departamento de Ciência da Computação")
    - Props: `avatarUrl?`, `initials`, `name`, `role`, `email`, `tags[]`

49. **StatisticCard** (`components/StatisticCard.tsx`)
    - Card pequeno para exibir uma estatística com ícone e valor
    - Usado para métricas: "Materiais Criados", "Alunos Ativos", "Avisos Publicados", "Repositórios"
    - Props: `title`, `value`, `icon`, `variant?`

50. **StatisticRow** (`components/StatisticRow.tsx`)
    - Container horizontal para exibir múltiplos StatisticCards em linha
    - Usado na seção de estatísticas da ProfilePage
    - Props: `children`, `gap?`

51. **ProfileForm** (`components/ProfileForm.tsx`)
    - Formulário de edição de informações do usuário
    - Contém campos: Nome Completo, Email, Tipo de Usuário (dropdown), Departamento
    - Botão "Salvar Informações"
    - Props: `initialValues`, `onSubmit`, `onCancel?`

52. **PasswordChangeForm** (`components/PasswordChangeForm.tsx`)
    - Formulário para alteração de senha
    - Campos: Senha Atual, Nova Senha, Confirmar Nova Senha
    - Botão "Alterar Senha" (variante danger/vermelho)
    - Props: `onSubmit`, `onCancel?`

53. **ToggleSwitch** (`components/ToggleSwitch.tsx`)
    - Interruptor para ativar/desativar configurações
    - Usado em: Notificações por Email, Notificações Push, Perfil Público
    - Estados: ON (azul), OFF (cinza)
    - Props: `label`, `description?`, `isChecked`, `onToggle`, `disabled?`

54. **ToggleSection** (`components/ToggleSection.tsx`)
    - Container para agrupar múltiplos ToggleSwitches
    - Título da seção (ex: "Configurações Rápidas")
    - Props: `title`, `children`

55. **ContentManagementCard** (`components/ContentManagementCard.tsx`)
    - Card genérico para gestão de conteúdo (Materiais, Repositórios, Avisos)
    - Estrutura: Ícone colorido, título, descrição, lista de estatísticas, botões de ação (gerenciar + criar/adicionar)
    - Variantes de cor: azul (Materiais), cinza escuro (Repositórios), laranja (Avisos)
    - Props: `icon`, `title`, `description`, `stats[]` (ex: [{label, value}]), `primaryAction`, `secondaryAction`, `variant?`

56. **ContentManagementGrid** (`components/ContentManagementGrid.tsx`)
    - Grid para exibir múltiplos ContentManagementCards
    - Layout vertical/coluna única na ProfilePage
    - Props: `children`, `columns?`

---

### Componentes da Página de Dashboard Administrativo

57. **DashboardStatCard** (`components/DashboardStatCard.tsx`)
    - Card de estatística para dashboard com valor, label, tendência e ícone
    - Estrutura: Ícone circular colorido, valor grande, label, indicador de tendência (↑/↗ + porcentagem + período)
    - Variantes de tendência: positiva (verde), neutra (azul)
    - Props: `value`, `label`, `trend?` (ex: {type: 'increase', value: 12, period: 'este mês'}), `icon`, `variant?`

58. **TabNavigation** (`components/TabNavigation.tsx`)
    - Navegação por tabs para diferentes seções de gestão
    - Usado no Dashboard: "Gestão de Materiais", "Gestão de Avisos", "Gestão de Usuários"
    - Props: `tabs[]` (ex: [{id, label, active?}]), `onTabChange`, `variant?`

59. **DataTable** (`components/DataTable.tsx`)
    - Tabela de dados genérica para exibir listas (materiais, avisos, usuários)
    - Estrutura: Cabeçalhos de coluna, linhas de dados, coluna de ações
    - Props: `columns[]`, `data[]`, `onRowClick?`, `actions?` (ex: [{label, onClick, variant?}])

60. **TableActions** (`components/TableActions.tsx`)
    - Coluna de ações dentro de uma DataTable
    - Links/botões de ação por linha (ex: "Editar", "Versionar", "Deletar")
    - Props: `actions[]` (ex: [{label, onClick, variant, icon?}])

61. **StatusBadge** (`components/StatusBadge.tsx`)
    - Badge para status (ex: "Publicado" verde, "Rascunho" amarelo)
    - Usado em tabelas para indicar status de materiais/avisos
    - Props: `status`, `variant?` (published, draft, archived, etc.)

62. **ExportButton** (`components/ExportButton.tsx`)
    - Botão para exportar dados (ex: "Exportar Dados")
    - Ícone de download
    - Props: `onExport`, `format?` (csv, xlsx, pdf)

63. **QuickActionsButton** (`components/QuickActionsButton.tsx`)
    - Botão para ações rápidas (ex: "+ Ações Rápidas")
    - Ícone de plus
    - Pode abrir dropdown/modal com opções rápidas
    - Props: `onClick`, `actions?`

64. **ManagementSection** (`components/ManagementSection.tsx`)
    - Seção de gestão dentro de um tab do dashboard
    - Estrutura: Título + descrição + barra de ações (filtros, botão criar) + tabela/lista
    - Props: `title`, `description`, `filterButton?`, `createButton?` (ex: {label, onClick}), `children`

65. **TrendIndicator** (`components/TrendIndicator.tsx`)
    - Indicador de tendência dentro do DashboardStatCard
    - Exibe: seta (↑/↗) + valor + período (ex: "+12% este mês")
    - Variantes: positive (verde), neutral (azul), negative (vermelho)
    - Props: `type` (increase, decrease, neutral), `value`, `period`, `variant?`

66. **FilterButton** (`components/FilterButton.tsx`)
    - Botão para abrir filtros de tabela
    - Ícone de filtro
    - Pode abrir dropdown/modal com opções de filtro
    - Props: `onClick`, `active?` (indica se filtros estão aplicados)

67. **CreateButton** (`components/CreateButton.tsx`)
    - Botão para criar novo item (ex: "+ Novo Material")
    - Variantes: azul (primário)
    - Ícone de plus
    - Props: `label`, `onClick`, `variant?`

68. **ActionLink** (`components/ActionLink.tsx`)
    - Link de ação dentro de TableActions (ex: "Editar", "Versionar", "Deletar")
    - Variantes: primary, danger (para deletar)
    - Props: `label`, `onClick`, `variant?`, `icon?`

---

### Componentes da Página de Login

69. **AuthCard** / **LoginCard** (`components/AuthCard.tsx`)
    - Card centralizado para páginas de autenticação
    - Fundo branco, sombra, cantos arredondados
    - Container principal para elementos de login
    - Props: `children`, `className?`

70. **RestrictedAccessBadge** (`components/RestrictedAccessBadge.tsx`)
    - Badge vermelho com ícone de cadeado para indicar acesso restrito
    - Texto: "ACESSO RESTRITO"
    - Usado no topo do card de login
    - Props: `label?`, `icon?`

71. **AdminFeatureIcon** (`components/AdminFeatureIcon.tsx`)
    - Ícone grande representando área administrativa (pessoa com engrenagem/asterisco)
    - Azul escuro
    - Usado para indicar natureza administrativa da página
    - Props: `size?`, `color?`

72. **GitHubLoginButton** (`components/GitHubLoginButton.tsx`)
    - Botão específico para login com GitHub
    - Preto com logo do GitHub (octocat) à esquerda + texto "Entrar com GitHub"
    - Botão primário de ação na página de login
    - Props: `onClick`, `disabled?`, `loading?`

73. **AccessInstructionsList** (`components/AccessInstructionsList.tsx`)
    - Lista numerada de instruções de acesso
    - Seção com ícone de informação + título "Instruções de Acesso"
    - Lista de passos numerados para o processo de login
    - Props: `title?`, `instructions[]` (ex: [{step, description}])

74. **AlertBox** (`components/AlertBox.tsx`)
    - Caixa de alerta/aviso
    - Usada na LoginPage: fundo amarelo, ícone de aviso, título "Acesso Restrito" + descrição
    - Variantes: warning (amarelo), info (azul), error (vermelho), success (verde)
    - Props: `type` (warning|info|error|success), `title`, `description`, `icon?`

75. **TextLink** (`components/TextLink.tsx`)
    - Link de texto simples
    - Usado na LoginPage: "Acesse o site público aqui", "Entre em contato com o administrador"
    - Props: `href`, `children`, `variant?`, `underline?`

76. **InstructionStep** (`components/InstructionStep.tsx`)
    - Item individual de instrução (usado dentro de AccessInstructionsList)
    - Número + descrição
    - Props: `number`, `description`

78. **SupportLinks** (`components/SupportLinks.tsx`)
    - Seção de links de suporte na parte inferior do card de login
    - Agrupa links como "Você é aluno?" e "Problemas com o acesso?"
    - Props: `children`, `links[]` (ex: [{label, href, text}])

---

## 📝 PRÓXIMOS PASSOS SUGERIDOS (Quando começar a implementar)

1. Criar tipos TypeScript base (Notice, Repository, etc.)
2. Implementar componentes base (Button, Card, Container)
3. Implementar componentes específicos (NoticeCard, RepositoryCard)
4. Criar layouts (DefaultLayout, Header, Footer)
5. Implementar páginas (começando pela HomePage)
6. Configurar roteamento (React Router)
7. Adicionar estilização (CSS Modules, styled-components ou Tailwind)

