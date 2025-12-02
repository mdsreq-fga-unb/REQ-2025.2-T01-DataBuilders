### UC01: Consultar e Filtrar Repositórios

| Campo | Detalhe |
| :--- | :--- |
| **RF Associado** | RF01 - Buscar repositórios em diferentes organizações do GitHub |
| **Nome do Caso de Uso** | **UC01: Consultar e Filtrar Repositórios** |
| **Atores** | Aluno da Disciplina (Usuário Público) |
| **Pré-Condição** | O sistema deve estar operacional e conectado à API do GitHub (via DC_GITHUB_API_SERVICE). |
| **Pós-Condição** | Os resultados da busca são exibidos na interface, atendendo aos filtros e ordenação selecionados pelo aluno. |

#### Fluxo Principal de Sucesso

1.  O **Aluno** acessa a interface de busca de repositórios.
2.  O **Sistema** exibe o campo de busca, os painéis de filtros avançados (linguagem, README) e as opções de ordenação (estrelas, data).
3.  O **Aluno** insere um termo de busca e aplica pelo menos um filtro (Critérios de Aceitação da US01).
4.  O **Sistema** envia a requisição formatada à API do GitHub (via DC_GITHUB_API_SERVICE).
5.  O **Sistema** recebe os dados, aplica a lógica de cache (RNF08) e exibe a lista paginada de repositórios.
6.  O **Aluno** visualiza os metadados (nome, dono, link, linguagem, estrelas) e pode clicar no link para acessar o repositório.

#### Fluxos de Exceção

| ID | Ponto de Falha | Ação do Sistema (Tratamento de Erro) |
| :---: | :--- | :--- |
| **UC01-E1** | **Rate Limit da API Atingido** | O Sistema utiliza o conteúdo do cache disponível (RNF08, RNF11); se não houver cache válido, exibe mensagem de indisponibilidade temporária (RNF15). |
| **UC01-E2** | **Parâmetros de Busca Inválidos** | O Sistema notifica o Aluno com uma mensagem clara sobre o erro na sintaxe e não executa a busca (RNF15). |
| **UC01-E3** | **Nenhum Resultado Encontrado** | O Sistema exibe uma mensagem informativa ("Nenhum repositório encontrado") e sugere a remoção de filtros. |




### UC03: Gerenciar Sessão de Usuário (Autenticação)

| Campo | Detalhe |
| :--- | :--- |
| **RF Associado** | RF03 - Autenticar usuários |
| **Nome do Caso de Uso** | **UC03: Gerenciar Sessão de Usuário** |
| **Atores** | Professor/Administrador, Monitor |
| **Pré-Condição** | O Usuário possui uma conta ativa no sistema (RF04). |
| **Pós-Condição** | A sessão do Usuário é iniciada e as permissões de acesso são carregadas; ou a sessão é encerrada com segurança. |

#### Fluxo Principal de Sucesso (Login)

1.  O **Usuário** acessa a tela de Login (Critério de Aceitação da US03).
2.  O **Usuário** insere suas credenciais (usuário e senha).
3.  O **Sistema** valida as credenciais e o status da conta (via DC_AUTH_MODULE).
4.  O **Sistema** inicia a sessão e carrega o papel do usuário (Professor ou Monitor), definindo o nível de permissão.
5.  O **Sistema** redireciona o Usuário para a área restrita, exibindo o dashboard conforme suas permissões.

#### Fluxo Alternativo (Logout)

1.  O **Usuário** clica no botão "Logout" na área restrita (Critério de Aceitação da US03).
2.  O **Sistema** invalida o token de sessão do Usuário com segurança.
3.  O **Sistema** redireciona o Usuário para a página de Login.

#### Fluxos de Exceção

| ID | Ponto de Falha | Ação do Sistema (Tratamento de Erro) |
| :---: | :--- | :--- |
| **UC03-E1** | **Credenciais Inválidas** | O Sistema exibe uma mensagem genérica de erro (ex: "Usuário ou senha inválidos") e registra a tentativa de falha de login (RNF12). |
| **UC03-E2** | **Conta Desativada (RF06)** | O Sistema rejeita o login e informa que a conta está inativa; registra a tentativa no Log de Auditoria (RNF12). |




### UC10: Rastrear e Reverter Versões de Conteúdo

| Campo | Detalhe |
| :--- | :--- |
| **RF Associado** | RF10 - Versionamento de Conteúdo |
| **Nome do Caso de Uso** | **UC10: Rastrear e Reverter Versões de Conteúdo** |
| **Atores** | Professor/Administrador, Monitor |
| **Pré-Condição** | O Material de Aula já existe e já foi editado (RF08). O Ator está autenticado (RF03). |
| **Pós-Condição** | O histórico de versões é visualizado ou o conteúdo ativo é substituído por uma versão anterior. |

#### Fluxo Principal de Sucesso (Visualizar Histórico)

1.  O **Ator** acessa a página de edição de um Material de Aula (RF08).
2.  O **Ator** clica no botão "Histórico de Versões".
3.  O **Sistema** (via DC_VERSIONING_SERVICE) exibe a lista de versões, mostrando: **quem** alterou, **quando** alterou e um **resumo** da alteração (Critérios de Aceitação da US10).
4.  O **Ator** pode selecionar duas versões para comparação visual das mudanças.

#### Fluxo Alternativo (Reverter Versão)

1.  O **Ator** localiza a versão desejada no Histórico de Versões.
2.  O **Ator** clica na opção "Reverter para esta versão" (Critério de Aceitação da US10).
3.  O **Sistema** solicita uma confirmação e um motivo para a reversão.
4.  O **Sistema** cria uma **nova versão** do conteúdo (idêntica à versão antiga revertida) e registra o Ator e o motivo como a nova alteração (RNF12).
5.  O **Sistema** exibe a mensagem de sucesso e redireciona para a página de visualização/edição.

#### Fluxos de Exceção

| ID | Ponto de Falha | Ação do Sistema (Tratamento de Erro) |
| :---: | :--- | :--- |
| **UC10-E1** | **Falha no Salvamento da Reversão** | O Sistema informa o erro ao Ator, mantém o conteúdo atual e registra a falha no log de auditoria (RNF15). |
| **UC10-E2** | **Versão Original Corrompida** | O Sistema identifica o erro, bloqueia a reversão para aquela versão específica e notifica o Ator e o Administrador (RNF15). |


