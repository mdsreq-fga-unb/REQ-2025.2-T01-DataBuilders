# User Stories

## Requisitos Funcionais

### US01 - Buscar Repositórios do GitHub
**Como** um aluno da disciplina de Estruturas de Dados 2, **eu quero** buscar repositórios em diferentes organizações do GitHub com filtros avançados **para que** eu possa encontrar exemplos de algoritmos e códigos relevantes para meus estudos.

**Critérios de Aceitação:**
- Posso buscar por termos gerais no campo de busca
- Posso filtrar por linguagem de programação
- Posso filtrar por presença de README
- Posso ordenar os resultados por relevância, estrelas ou data
- Vejo metadados úteis como nome, dono, link, linguagem e contagem de estrelas
- Posso acessar diretamente o repositório clicando no link

---

### US02 - Consultar Materiais de Aula
**Como** um aluno da disciplina, **eu quero** consultar os materiais de aula disponibilizados pelo professor **para que** eu possa estudar e me preparar para as aulas e provas.  

---

### US03 - Autenticar usuários
**Como** um professor ou monitor, **eu quero** fazer login no sistema com minhas credenciais **para que** eu possa acessar funcionalidades administrativas e gerenciar conteúdo.

**Critérios de Aceitação:**
- Posso fazer login com usuário e senha
- Posso fazer logout com segurança
- Tenho diferentes níveis de permissão baseado no meu papel (professor/monitor)

---

### US04 - Gerenciar contas de usuários
**Como** um professor administrador, **eu quero** criar e gerenciar contas para monitores **para que** eu possa delegar responsabilidades e controlar o acesso ao sistema.

**Critérios de Aceitação:**
- Posso criar novas contas para monitores
- Posso desativar contas (soft delete)
- Posso alterar permissões dos monitores
- Tenho interface administrativa para essas operações

---

### US05 - Publicar materiais de aula
**Como** um professor ou monitor, **eu quero** criar e publicar materiais de aula **para que** os alunos tenham acesso aos conteúdos didáticos.  

---

### US06 - Editar materiais de aula
**Como** um professor ou monitor, **eu quero** editar materiais de aula já publicados **para que** eu possa atualizar e melhorar o conteúdo conforme necessário.  

---

### US07 - Deletar materiais de aula
**Como** um professor ou monitor, **eu quero** deletar materiais de aula **para que** eu possa remover conteúdos desatualizados ou incorretos.  

---

### US08 - Versionamento de Conteúdo
**Como** um professor ou monitor, **eu quero** ter um histórico de versões do conteúdo **para que** eu possa rastrear mudanças e reverter alterações quando necessário.

**Critérios de Aceitação:**
- Vejo quem alterou o conteúdo
- Vejo o que foi alterado
- Vejo quando foi alterado
- Posso reverter para versões anteriores

---

### US09 - Favoritar repositórios
**Como** um aluno, **eu quero** salvar referências a repositórios do GitHub **para que** eu possa acessar rapidamente recursos úteis para meus estudos.  

---

### US10 - Publicar Avisos
**Como** um professor ou monitor, **eu quero** criar e publicar avisos importantes **para que** os alunos sejam informados sobre atualizações e eventos.  

---

### US11 - Editar Avisos
**Como** um professor ou monitor, **eu quero** editar avisos já publicados **para que** eu possa atualizar informações conforme necessário.  

---

### US12 - Deletar Avisos
**Como** um professor ou monitor, **eu quero** deletar avisos **para que** eu possa remover informações desatualizadas.  

---

## Requisitos Não Funcionais

### US-RNF-01 - Permitir visualização pública de conteúdo
**Como** um visitante do site, **eu quero** visualizar conteúdo público sem necessidade de login **para que** eu possa conhecer a plataforma antes de me cadastrar.  

---

### US-RNF-02 - Implementar navegação estruturada
**Como** um usuário do sistema, **eu quero** navegar de forma estruturada com breadcrumbs **para que** eu possa entender onde estou e voltar facilmente.  

---

### US-RNF-03 - Estruturar organização de conteúdo
**Como** um usuário do sistema, **eu quero** que o conteúdo seja bem organizado em módulos **para que** eu possa encontrar informações rapidamente.  

---

### US-RNF-04 - Implementar paginação e filtros
**Como** um usuário do sistema, **eu quero** que as listagens tenham paginação e filtros **para que** eu possa navegar eficientemente por grandes volumes de dados.  

---

### US-RNF-05 - Documentar parâmetros de busca
**Como** um usuário do sistema  
**Eu quero** ter explicações claras sobre os parâmetros de busca  
**Para que** eu possa usar as funcionalidades corretamente  

---

### US-RNF-06 - Estruturar página principal
**Como** um visitante  
**Eu quero** uma página principal clara sobre o objetivo do site  
**Para que** eu possa entender rapidamente o que a plataforma oferece  

---

### US-RNF-07 - Garantir interface acessível
**Como** um usuário com necessidades especiais  
**Eu quero** uma interface acessível e responsiva  
**Para que** eu possa usar o sistema independentemente do dispositivo ou limitações  

---

### US-RNF-08 - Implementar cache de respostas
**Como** um usuário do sistema  
**Eu quero** que as buscas sejam rápidas mesmo com muitos dados  
**Para que** eu tenha uma experiência fluida  

---

### US-RNF-09 - Garantir disponibilidade 24/7
**Como** um usuário do sistema  
**Eu quero** que o sistema esteja sempre disponível  
**Para que** eu possa acessar quando precisar  

---

### US-RNF-10 - Suportar 80 usuários simultâneos
**Como** um usuário do sistema  
**Eu quero** que o sistema funcione bem mesmo com muitos usuários simultâneos  
**Para que** eu tenha uma experiência consistente  

---

### US-RNF-11 - Garantir eficiência do sistema
**Como** um usuário do sistema  
**Eu quero** que o sistema responda rapidamente mesmo em condições adversas  
**Para que** eu possa trabalhar sem interrupções  

---

### US-RNF-12 - Implementar auditoria de ações
**Como** um administrador do sistema  
**Eu quero** ter registro detalhado de ações críticas  
**Para que** eu possa rastrear mudanças e manter a segurança  

---

### US-RNF-13 - Implementar monitoramento do sistema
**Como** um administrador do sistema  
**Eu quero** monitorar a saúde do sistema  
**Para que** eu possa prevenir problemas e garantir a estabilidade  

---

### US-RNF-14 - Gerenciar flags de conteúdo
**Como** um administrador do sistema  
**Eu quero** configurar flags para conteúdo (destaque, arquivado, etc.)  
**Para que** eu possa organizar e controlar a exibição do conteúdo  

---

### US-RNF-15 - Garantir robustez e segurança
**Como** um usuário do sistema  
**Eu quero** que o sistema seja robusto e seguro  
**Para que** eu possa confiar na plataforma para minhas atividades acadêmicas  

---

### US-RNF-16 - Implementar autenticação OAuth
**Como** um usuário do sistema  
**Eu quero** fazer login usando minha conta do GitHub  
**Para que** eu possa ter acesso a mais recursos de busca  

---

### US-RNF-17 - Garantir compatibilidade de navegadores
**Como** um usuário do sistema  
**Eu quero** que o sistema funcione no meu navegador preferido  
**Para que** eu possa usar a plataforma sem problemas técnicos  

---

### US-RNF-18 - Garantir manutenibilidade do sistema
**Como** um desenvolvedor  
**Eu quero** que o sistema seja fácil de manter e configurar  
**Para que** eu possa fazer melhorias e correções rapidamente  

---
