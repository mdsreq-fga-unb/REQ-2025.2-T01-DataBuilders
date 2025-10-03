# Requisitos de Software

## 7.1 Lista de Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve implementar para atender às necessidades do produto, incluindo integrações, processos e interações do usuário com o sistema.

### RF01 - Buscar repositórios em diferentes organizações do GitHub
Permitir buscas por termos gerais e por filtros suportados pela biblioteca `@octokit/rest`.

- RF - Listagem de Repositórios
Retornar uma lista de repositórios com metadados básicos, como nome, dono, link, linguagem e contagem de estrelas.

- RF - Interface de Busca
Apresentar um campo de busca principal de texto.

- RF - Aplicação de Filtros
Permitir a configuração de filtros visuais, como linguagem, presença de README, ordenação e paginação.

- RF - Exibição de Resultados
Exibir, por resultado, metadados úteis e um link direto para o repositório.

- RF - Busca Full-Text Local
Indexar READMEs e conteúdos cacheados para permitir busca local por relevância, retornando snippets e rankeamento.

### RF02 - Consultar materiais de aula
Permitir que usuários consultem os materiais de aula do professor para seus estudos.

### RF03 - Autenticar e Autorizar
Fornecer tela de login para administradores/professores e monitores, com suporte a logout e diferentes permissões de acesso (papéis).

### RF04 - Gerir contas
Permitir que administrador/professor crie contas para monitores via interface administrativa, desative (soft delete) e altere as permissões dos monitores.

### RF05 - Publicar materiais de aulas
Permitir que administrador/professor e monitores possam criar e postar itens de conteúdo.

### RF06 - Editar materiais de aulas
Permitir que administrador/professor e monitores possam editar os itens de conteúdo.

### RF07 - Deletar materiais de aulas
Permitir que administrador/professor e monitores possam deletar os itens de conteúdo.

### RF08 - Versionamento de Conteúdo
Manter um histórico de versões do conteúdo (quem alterou, o que foi alterado e quando), com interface para visualização e reversão de versões.

### RF09 - Favoritar Referência
Permitir ao usuário salvar uma referência a um repositório do GitHub no sistema, incluindo os metadados essenciais.

### RF10 - Publicar avisos
Permitir que administrador/professor e monitores possam criar e postar avisos.

### RF11 - Editar avisos
Permitir que administrador/professor e monitores possam editar avisos.

### RF12 - Deletar avisos
Permitir que administrador/professor e monitores possam deletar avisos.


## 7.2 Lista de Requisitos Não Funcionais

Os requisitos não funcionais especificam as qualidades e restrições do sistema, como desempenho, segurança e usabilidade, que são essenciais para garantir a qualidade do software. Para a classificação, foi utilizado o modelo URPS+.

### Usabilidade

#### RNF - Visualização Pública de Conteúdo
Permitir a visualização pública dos módulos de conteúdo que forem publicados.

#### RNF - Navegação Estruturada (Breadcrumbs)
Implementar navegação com breadcrumbs e páginas por módulo com lista paginada de itens.

#### RNF - Organização de Conteúdo
Estruturar o conteúdo em módulos e submódulos, com títulos, descrição, ordem, tipo (aula, leitura, etc.) e corpo em formato markdown.

#### RNF - Paginação, Ordenação e Filtros em Listagens
Todas as listagens importantes devem suportar paginação, ordenação por campos relevantes e filtros, com limites máximos por página definidos.

#### RNF - Documentação de Parâmetros
Apresentar texto explicando o que cada parâmetro de busca faz, com exemplos práticos.

#### RNF - Conteúdo da Página Principal
Apresentar uma descrição clara do objetivo do site, chamadas para ação (ex: buscar repositórios) e links de acesso (ex: "Como contribuir").

#### RNF - Interface Acessível
A interface deve ser acessível e intuitiva, garantindo suporte a teclado, labels claros para todos os elementos e mensagens de feedback para as ações do usuário. A aplicação deve ter um design responsivo, adaptando-se a diferentes tamanhos de tela.

### Desempenho

#### RNF - Cache de Respostas
Implementar uma camada de cache para respostas de busca e metadados de repositórios, armazenando apenas respostas bem-sucedidas.

#### RNF - Disponibilidade
Rodar 24/7.

#### RNF - Suporte
Aguentar 80 usuários ao mesmo tempo.

#### RNF - Eficiência
O sistema deve ser projetado para responder eficientemente, mesmo sob condições adversas. Para isso, uma camada de cache deve ser implementada para que o sistema possa servir conteúdo previamente buscado caso a API do GitHub esteja indisponível.

### Confiabilidade

#### RNF - Auditoria
O sistema deve manter um registro detalhado de ações críticas para fins de rastreabilidade. É necessário registrar quem criou, desativou ou alterou uma conta, incluindo os timestamps dessas ações. Além disso, deve-se manter um log simples de quem realizou alterações no conteúdo e quando, abrangendo as modificações feitas tanto por professores quanto por monitores.

#### RNF - Monitoramento
O sistema deve incluir capacidades de monitoramento para garantir sua operação saudável. É necessário coletar métricas sobre a utilização do cache (hits/misses, expirações) e emitir alertas quando os limites de uso da API do GitHub estiverem próximos de serem atingidos.

#### RNF - Gestão de Flags de Conteúdo
Implementar uma interface administrativa para aplicar e remover flags configuráveis por item (ex: editável por monitores, em destaque, arquivado).

#### RNF - Robustez
O sistema precisa ser robusto e seguro, havendo um tratamento de erros claro para parâmetros de busca inválidos, atingimento dos limites de requisição (rate limit) da API do GitHub ou indisponibilidade do serviço. Em termos de segurança, o armazenamento de tokens sensíveis do GitHub (quando logado via OAuth) no cache é estritamente proibido.

### Suportabilidade

#### RNF - Autenticação com GitHub (OAuth)
Permitir autenticação via GitHub para que o token do usuário seja utilizado em suas buscas, aumentando a quota disponível.

#### RNF - Compatibilidade
Ser compatível com certos navegadores e suas versões.

#### RNF - Manutenibilidade
O sistema deve ser de fácil manutenção e configuração. Ele deve permitir a configuração com tokens da API do GitHub para aumentar as requisições e mitigar bloqueios por rate limit. O comportamento de funcionalidades chave, como paginação e filtros, deve ser devidamente documentado para desenvolvedores e consumidores internos.
