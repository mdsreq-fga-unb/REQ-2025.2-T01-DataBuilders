# Requisitos de Software

## Lista de Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve implementar para atender às necessidades do produto, incluindo integrações, processos e interações do usuário com o sistema.

### RF01 - Buscar repositórios em diferentes organizações do GitHub
Permitir buscas por termos gerais e por filtros suportados pela biblioteca `@octokit/rest`.

### RF02 - Consultar materiais de aula
Permitir que usuários consultem os materiais de aula do professor para seus estudos.

### RF03 - Autenticar usuários
Fornecer tela de login para administradores/professores e monitores, com suporte a logout e diferentes permissões de acesso (papéis).

### RF04 - Criar contas de usuários
Permitir que administrador/professor crie contas para monitores.

### RF05 - Editar contas de usuários
Permitir que administrador/professor edite contas e altere permissões de monitores.

### RF06 - Deletar contas de usuários
Permitir que administrador/professor desative contas para monitores.

### RF07 - Publicar materiais de aula
Permitir que administrador/professor e monitores possam criar e postar itens de conteúdo.

### RF08 - Editar materiais de aula
Permitir que administrador/professor e monitores possam editar os itens de conteúdo.

### RF09 - Deletar materiais de aula
Permitir que administrador/professor e monitores possam deletar os itens de conteúdo.

### RF10 - Versionar conteúdo
Manter um histórico de versões do conteúdo (quem alterou, o que foi alterado e quando), com interface para visualização e reversão de versões.

### RF11 - Favoritar repositórios
Permitir ao usuário salvar uma referência a um repositório do GitHub no sistema, incluindo os metadados essenciais.

### RF12 - Publicar avisos
Permitir que administrador/professor e monitores possam criar e postar avisos.

### RF13 - Editar avisos
Permitir que administrador/professor e monitores possam editar avisos.

### RF14 - Deletar avisos
Permitir que administrador/professor e monitores possam deletar avisos.


## Lista de Requisitos Não Funcionais

Os requisitos não funcionais especificam as qualidades e restrições do sistema, como desempenho, segurança e usabilidade, que são essenciais para garantir a qualidade do software. Para a classificação, foi utilizado o modelo URPS+.

### Usabilidade

#### RNF01 - Permitir visualização pública de conteúdo
Permitir a visualização pública dos módulos de conteúdo que forem publicados.

#### RNF02 - Implementar navegação estruturada
Implementar navegação com breadcrumbs e páginas por módulo com lista paginada de itens.

#### RNF03 - Estruturar organização de conteúdo
Estruturar o conteúdo em módulos e submódulos, com títulos, descrição, ordem, tipo (aula, leitura, etc.) e corpo em formato markdown.

#### RNF04 - Implementar paginação e filtros
Todas as listagens importantes devem suportar paginação, ordenação por campos relevantes e filtros, com limites máximos por página definidos.

#### RNF05 - Documentar parâmetros de busca
Apresentar texto explicando o que cada parâmetro de busca faz, com exemplos práticos.

#### RNF06 - Estruturar página principal
Apresentar uma descrição clara do objetivo do site, chamadas para ação (ex: buscar repositórios) e links de acesso (ex: "Como contribuir").

#### RNF07 - Garantir interface acessível
A interface deve ser acessível e intuitiva, garantindo suporte a teclado, labels claros para todos os elementos e mensagens de feedback para as ações do usuário. A aplicação deve ter um design responsivo, adaptando-se a diferentes tamanhos de tela.

### Desempenho

#### RNF08 - Implementar cache de respostas
Implementar uma camada de cache para respostas de busca e metadados de repositórios, armazenando apenas respostas bem-sucedidas.

#### RNF09 - Garantir disponibilidade 24/7
Rodar 24/7.

#### RNF10 - Suportar 80 usuários simultâneos
Aguentar 80 usuários ao mesmo tempo.

#### RNF11 - Garantir eficiência do sistema
O sistema deve ser projetado para responder eficientemente, mesmo sob condições adversas. Para isso, uma camada de cache deve ser implementada para que o sistema possa servir conteúdo previamente buscado caso a API do GitHub esteja indisponível.

### Confiabilidade

#### RNF12 - Implementar auditoria de ações
O sistema deve manter um registro detalhado de ações críticas para fins de rastreabilidade. É necessário registrar quem criou, desativou ou alterou uma conta, incluindo os timestamps dessas ações. Além disso, deve-se manter um log simples de quem realizou alterações no conteúdo e quando, abrangendo as modificações feitas tanto por professores quanto por monitores.

#### RNF13 - Implementar monitoramento do sistema
O sistema deve incluir capacidades de monitoramento para garantir sua operação saudável. É necessário coletar métricas sobre a utilização do cache (hits/misses, expirações) e emitir alertas quando os limites de uso da API do GitHub estiverem próximos de serem atingidos.

#### RNF14 - Gerenciar flags de conteúdo
Implementar uma interface administrativa para aplicar e remover flags configuráveis por item (ex: editável por monitores, em destaque, arquivado).

#### RNF15 - Garantir robustez e segurança
O sistema precisa ser robusto e seguro, havendo um tratamento de erros claro para parâmetros de busca inválidos, atingimento dos limites de requisição (rate limit) da API do GitHub ou indisponibilidade do serviço. Em termos de segurança, o armazenamento de tokens sensíveis do GitHub (quando logado via OAuth) no cache é estritamente proibido.

### Suportabilidade

#### RNF16 - Implementar autenticação OAuth
Permitir autenticação via GitHub para que o token do usuário seja utilizado em suas buscas, aumentando a quota disponível.

#### RNF17 - Garantir compatibilidade de navegadores
Ser compatível com certos navegadores e suas versões.

#### RNF18 - Garantir manutenibilidade do sistema
O sistema deve ser de fácil manutenção e configuração. Ele deve permitir a configuração com tokens da API do GitHub para aumentar as requisições e mitigar bloqueios por rate limit. O comportamento de funcionalidades chave, como paginação e filtros, deve ser devidamente documentado para desenvolvedores e consumidores internos.
