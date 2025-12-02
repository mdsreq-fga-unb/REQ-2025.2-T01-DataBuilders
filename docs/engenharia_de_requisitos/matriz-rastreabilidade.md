| ID Requisito | Tipo | Descrição do Requisito (Resumo) | ID Caso de Uso (UC) | ID Componente de Design (DC) | ID Caso de Teste (CT) |
| :---: | :---: | :--- | :---: | :---: | :---: |
| **RF01** | Funcional | Buscar repositórios no GitHub (com filtros). | UC_BUSCA_REPO | DC_GITHUB_API_SERVICE | CT_BUSCA_FILTRO |
| **RF02** | Funcional | Consultar materiais de aula. | UC_CONSULTA_CONTEUDO | DC_CONTENT_MODULE | CT_VISUALIZACAO_CONTEUDO |
| **RF03** | Funcional | Autenticar usuários (login/logout/permissões). | UC_AUTENTICAR | DC_AUTH_MODULE | CT_LOGIN_PERMISSAO |
| **RF04** | Funcional | Criar contas de usuários (Admin/Monitor). | UC_GERENCIAR_USUARIO | DC_USER_MANAGER | CT_CRIAR_MONITOR |
| **RF05** | Funcional | Editar contas de usuários e permissões. | UC_GERENCIAR_USUARIO | DC_USER_MANAGER | CT_EDITAR_PERMISSAO |
| **RF06** | Funcional | Deletar/Desativar contas de usuários. | UC_GERENCIAR_USUARIO | DC_USER_MANAGER | CT_DESATIVAR_CONTA |
| **RF07** | Funcional | Publicar materiais de aula. | UC_PUBLICAR_CONTEUDO | DC_CONTENT_MANAGER | CT_POSTAR_CONTEUDO |
| **RF08** | Funcional | Editar materiais de aula. | UC_EDITAR_CONTEUDO | DC_CONTENT_MANAGER | CT_EDITAR_CONTEUDO |
| **RF09** | Funcional | Deletar materiais de aula. | UC_DELETAR_CONTEUDO | DC_CONTENT_MANAGER | CT_DELETAR_CONTEUDO |
| **RF10** | Funcional | Versionar conteúdo (histórico, visualização, reversão). | UC_VERSIONAR_CONTEUDO | DC_VERSIONING_SERVICE | CT_REVERTER_VERSAO |
| **RF11** | Funcional | Favoritar repositórios. | UC_FAVORITAR_REPO | DC_FAVORITES_MODEL | CT_SALVAR_FAVORITO |
| **RF12** | Funcional | Publicar avisos. | UC_PUBLICAR_AVISO | DC_ANNOUNCEMENT_MANAGER | CT_POSTAR_AVISO |
| **RF13** | Funcional | Editar avisos. | UC_EDITAR_AVISO | DC_ANNOUNCEMENT_MANAGER | CT_EDITAR_AVISO |
| **RF14** | Funcional | Deletar avisos. | UC_DELETAR_AVISO | DC_ANNOUNCEMENT_MANAGER | CT_DELETAR_AVISO |
| **RNF01** | Usabilidade | Permitir visualização pública de conteúdo. | - | DC_FRONTEND_ROUTING | CT_ACESSO_PUBLICO |
| **RNF07** | Usabilidade | Garantir interface acessível e responsiva. | - | DC_UI_LIBRARY | CT_RESPONSIVIDADE |
| **RNF08** | Desempenho | Implementar cache de respostas (busca/metadados). | - | DC_CACHE_SERVICE | CT_CACHE_HIT_TEST |
| **RNF10** | Desempenho | Suportar 80 usuários simultâneos. | - | DC_INFRA_CONFIG | CT_TESTE_CARGA_80 |
| **RNF12** | Confiabilidade | Implementar auditoria de ações críticas (quem, quando). | - | DC_AUDIT_LOG_SERVICE | CT_LOG_USUARIO |
| **RNF15** | Confiabilidade | Garantir robustez, segurança e tratamento de erros. | - | DC_ERROR_HANDLER | CT_RATE_LIMIT_ERRO |