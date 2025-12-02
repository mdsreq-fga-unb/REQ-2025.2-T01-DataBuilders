# 1. Diagrama de Caso de Uso

O diagrama de caso de uso do **ConnectCare** representa as principais interações entre os diferentes tipos de usuários (pacientes, profissionais de saúde, agentes comunitários, organizações parceiras e administradores) e as funcionalidades essenciais do sistema. Ele serve como uma visão geral das capacidades do sistema e das responsabilidades de cada ator.

---

# 2. Contexto 

O **ConnectCare** é uma plataforma criada para melhorar o acesso à saúde em comunidades vulneráveis, como a Vila Esperança — um local remoto com infraestrutura limitada, escassez de profissionais de saúde e baixa disponibilidade de internet. Apesar dessas dificuldades, a comunidade possui forte senso de colaboração, o que possibilitou a criação de uma solução voltada para ampliar o alcance dos serviços médicos locais.

A missão do ConnectCare é **reduzir desigualdades no acesso à saúde**, oferecendo funcionalidades que auxiliem tanto pacientes quanto profissionais, organizações parceiras e administradores.  
Ele facilita o agendamento de consultas, acompanhamento de prontuários, campanhas de saúde e monitoramento de indicadores sociais e operacionais.

### Objetivo Principal
Garantir acesso facilitado e eficiente a serviços de saúde para comunidades vulneráveis, promovendo impacto social positivo por meio da tecnologia.

### Objetivos Específicos
- Expandir o acesso aos serviços, permitindo localizar e agendar consultas facilmente.
- Automatizar processos de atendimento, como filas e prontuários digitais.
- Divulgar e promover campanhas de saúde comunitária.
- Fortalecer a comunicação entre pacientes e profissionais.
- Monitorar impacto social e operacional por meio de métricas e relatórios.

### Objetivos do Aplicativo
- Mapear e listar serviços de saúde próximos.
- Facilitar consultas online e presenciais.
- Gerenciar dados médicos e prontuários.
- Apoiar campanhas comunitárias.
- Gerar relatórios de impacto.

### Resultados Esperados
- Redução no tempo de espera por consultas.
- Maior engajamento em campanhas de saúde.
- Dados estruturados para decisões estratégicas.

---

# 3. Diagrama de Caso de Uso

![uc-image](uc.png)
[Acesse o diagrama de caso de uso no Miro](https://miro.com/app/board/uXjVJDF_XEY=/?moveToWidget=3458764649842494919&cot=14)

# 4. Especificações de Caso de Uso

---

## 1. Agendar Consultas e Exames

### 1.1 Breve Descrição
Este caso de uso permite ao paciente localizar unidades de saúde e agendar atendimentos (consultas ou exames) com base em filtros como localização e disponibilidade. O sistema verifica a agenda em tempo real, registra a solicitação e gera uma confirmação automática para o usuário.

### 1.2 Atores
- Paciente

---

### 2. Fluxo de Eventos

#### 2.1 Fluxo Principal
Este caso de uso é iniciado quando o paciente escolhe a opção “Buscar Serviços de Saúde”.

**2.1.1** O sistema apresenta a interface de busca com filtros por tipo de atendimento, localização geográfica [RN01] e opção de visualizar o mapa interativo [FA01].  
**2.1.2** O paciente define os filtros desejados e confirma a busca.  
**2.1.3** O sistema apresenta a lista de unidades de saúde e horários disponíveis.  
**2.1.4** O paciente seleciona o horário e a unidade desejada.  
**2.1.5** O sistema apresenta o resumo do agendamento (local, data, profissional).  
**2.1.6** O paciente confirma o agendamento.  
**2.1.7** O sistema verifica a disponibilidade final da vaga [RN02][FE01].  
**2.1.8** O sistema registra o agendamento, envia notificação e atualiza a agenda da unidade [RN03].  
**2.1.9** O sistema exibe mensagem de sucesso.  
**2.1.10** O caso de uso é encerrado.

---

#### 2.2 Fluxos Alternativos

**2.2.1 [FA01] Visualizar Mapa Interativo**  
No passo 2.1.1, o paciente opta por visualizar os serviços no mapa.

**2.2.1.1** O sistema exibe o mapa da região com pinos das unidades de saúde.  
**2.2.1.2** O paciente seleciona um pino.  
**2.2.1.3** O sistema apresenta os detalhes da unidade selecionada.  
(Retorna ao passo 2.1.4.)

---

#### 2.3 Fluxos de Exceção

**2.3.1 [FE01] Horário Indisponível**  
No passo 2.1.7, o sistema identifica que o horário foi ocupado simultaneamente.  
O sistema informa a indisponibilidade e retorna ao passo 2.1.3.

---

### 3. Requisitos Especiais
**3.1** O caso de uso deve funcionar em modo simplificado para conexões de baixa velocidade.

---

### 4. Regras de Negócio

**[RN01] Sugestão por Geolocalização**  
O sistema deve priorizar unidades num raio de até 5 km.

**[RN02] Bloqueio de Concorrência**  
O sistema deve bloquear o horário durante a confirmação, evitando overbooking.

**[RN03] Notificação Obrigatória**  
Todo agendamento confirmado deve gerar notificação contendo data, horário e documentos necessários.

---

### 5. Precondições
**5.1** O paciente deve estar autenticado.

---

### 6. Pós-condições
**6.1** O agendamento deve constar na agenda da unidade e no histórico do paciente.

---

### 7. Pontos de Extensão
**7.1** Visualizar Mapas (no passo 2.1.1).  
**7.2** Receber Notificações (no passo 2.1.8).

---

---

## 2. Atualizar Prontuário do Paciente

### 1.1 Breve Descrição
Este caso de uso permite ao profissional de saúde registrar diagnósticos, prescrições, resultados de exames e orientações no prontuário digital do paciente.

### 1.2 Atores
- Profissional de Saúde

---

### 2. Fluxo de Eventos

#### 2.1 Fluxo Principal
Este caso de uso é iniciado quando o profissional seleciona um atendimento em andamento.

**2.1.1** O sistema apresenta os dados básicos do paciente.  
**2.1.2** O profissional solicita acesso aos detalhes clínicos.  
**2.1.3** O sistema exibe o histórico médico completo (Extensão: Acessar Prontuário e/ou Histórico).  
**2.1.4** O profissional insere as novas informações clínicas (diagnóstico, prescrição, orientações) [RN01].  
**2.1.5** O profissional confirma a atualização.  
**2.1.6** O sistema valida os dados inseridos [FE01].  
**2.1.7** O sistema grava as alterações no prontuário digital e gera log de auditoria [RN02].  
**2.1.8** O sistema exibe mensagem de sucesso.  
**2.1.9** O caso de uso é encerrado.

---

#### 2.2 Fluxos Alternativos
Não se aplica.

---

#### 2.3 Fluxos de Exceção

**2.3.1 [FE01] Dados Clínicos Inválidos**  
O sistema identifica campos obrigatórios em branco ou inconsistentes e retorna ao passo 2.1.4.

**2.3.2 [FE02] Falha de Sincronização**  
O sistema não possui conexão e salva os dados localmente de forma criptografada.

---

### 3. Requisitos Especiais
**3.1** O sistema deve garantir conformidade com a LGPD e sigilo médico.

---

### 4. Regras de Negócio

**[RN01] Registro de Medicamentos**  
O sistema deve permitir seleção de medicamentos a partir de base padronizada.

**[RN02] Rastreabilidade da Alteração**  
Toda atualização deve registrar ID do profissional, data, hora e geolocalização.

---

### 5. Precondições
**5.1** O profissional deve estar autenticado.  
**5.2** O atendimento deve estar com status "Em andamento".

---

### 6. Pós-condições
**6.1** O prontuário reflete as novas informações clínicas.

---

### 7. Pontos de Extensão
**7.1** Acessar Prontuário e/ou Histórico (no passo 2.1.3).

---

---

## 3. Registrar Campanhas, Mutirões ou Ações

### 1.1 Breve Descrição
Este caso de uso permite às organizações parceiras cadastrarem iniciativas de saúde comunitária (como vacinação, palestras e mutirões). A ação é registrada com detalhes relevantes e divulgada de forma segmentada para os usuários.

### 1.2 Atores
- Organização Parceira

---

### 2. Fluxo de Eventos

#### 2.1 Fluxo Principal
Este caso de uso é iniciado quando a organização parceira seleciona a opção “Nova Iniciativa”.

**2.1.1** O sistema apresenta o formulário de cadastro de iniciativas.  
**2.1.2** A organização preenche os dados da campanha (título, descrição, local, data) [RN01].  
**2.1.3** A organização define os critérios de segmentação do público-alvo [RN02].  
**2.1.4** A organização confirma o registro.  
**2.1.5** O sistema valida as informações e a elegibilidade da organização [FE01].  
**2.1.6** O sistema registra a campanha e agenda o disparo de divulgações.  
**2.1.7** O sistema exibe mensagem de campanha criada com sucesso.  
**2.1.8** O caso de uso é encerrado.

---

#### 2.2 Fluxos Alternativos
Não se aplica.

---

#### 2.3 Fluxos de Exceção

**2.3.1 [FE01] Localização Inválida**  
O sistema não consegue validar o endereço informado para o mutirão, solicita correção e retorna ao passo 2.1.2.

---

### 3. Requisitos Especiais
Não se aplica.

---

### 4. Regras de Negócio

**[RN01] Período de Vigência**  
A data de fim não pode ser anterior à data de início, nem anterior à data atual.

**[RN02] Segmentação de Público**  
O sistema deve permitir segmentação por idade, gênero, região e condições de saúde.

---

### 5. Precondições
**5.1** A organização parceira deve ter cadastro ativo e validado.

---

### 6. Pós-condições
**6.1** A campanha torna-se visível para os usuários que atendem aos critérios de segmentação.

---

### 7. Pontos de Extensão
Não se aplica.

---

---

## 4. Fornecer Feedbacks

### 1.1 Breve Descrição
Este caso de uso permite ao paciente avaliar o atendimento e a usabilidade do sistema, atribuindo notas e comentários. O envio da avaliação gera pontos de fidelidade.

### 1.2 Atores
- Paciente

---

### 2. Fluxo de Eventos

#### 2.1 Fluxo Principal
Este caso de uso pode ser iniciado de forma automática após um atendimento ou manualmente pelo histórico.

**2.1.1** O sistema apresenta a tela de avaliação.  
**2.1.2** O paciente atribui uma nota de 1 a 5.  
**2.1.3** O paciente insere comentários (opcional).  
**2.1.4** O paciente confirma o envio do feedback.  
**2.1.5** O sistema registra a avaliação e calcula a pontuação de recompensa [RN01].  
**2.1.6** O sistema credita os pontos no perfil do usuário.  
**2.1.7** O sistema exibe mensagem de agradecimento com o saldo de pontos.  
**2.1.8** O caso de uso é encerrado.

---

#### 2.2 Fluxos Alternativos
Não se aplica.

---

#### 2.3 Fluxos de Exceção
Não se aplica.

---

### 3. Requisitos Especiais
**3.1** A interface deve ser gamificada para promover engajamento.

---

### 4. Regras de Negócio

**[RN01] Cálculo de Recompensa**  
Cada avaliação completa gera 50 pontos, com limite diário de 200.

**[RN02] Monitoramento de Qualidade**  
Notas abaixo de 3 devem gerar alerta automático para o Administrador.

---

### 5. Precondições
**5.1** O paciente deve ter concluído um atendimento.

---

### 6. Pós-condições
**6.1** O feedback é registrado nos indicadores da unidade, e o saldo de pontos do paciente é atualizado.

---

### 7. Pontos de Extensão
Não se aplica.

---

---

## 5. Registrar Paciente

### 1.1 Breve Descrição
Este caso de uso permite que novos usuários criem um perfil no sistema. O cadastro inclui dados pessoais e informações básicas de saúde que auxiliam na triagem inicial.

### 1.2 Atores
- Paciente (Usuário não logado)

---

### 2. Fluxo de Eventos

#### 2.1 Fluxo Principal
O caso de uso inicia quando o usuário seleciona a opção “Criar Conta”.

**2.1.1** O sistema solicita Nome, CPF, Data de Nascimento e Endereço.  
**2.1.2** O usuário informa os dados.  
**2.1.3** O sistema solicita informações básicas de saúde (alergias, condições crônicas).  
**2.1.4** O usuário preenche ou seleciona a opção “Não possuo/Não sei informar”.  
**2.1.5** O usuário cria uma senha e confirma o cadastro.  
**2.1.6** O sistema valida a unicidade do CPF [FE01].  
**2.1.7** O sistema cria o perfil do paciente e gera prontuário digital inicial [RN01].  
**2.1.8** O sistema exibe mensagem de boas-vindas.  
**2.1.9** O caso de uso é encerrado.

---

#### 2.2 Fluxos Alternativos
Não se aplica.

---

#### 2.3 Fluxos de Exceção

**2.3.1 [FE01] Usuário Já Cadastrado**  
O CPF já existe no sistema.  
O sistema informa o erro e direciona à recuperação de senha.

---

### 3. Requisitos Especiais
**3.1** O processo deve ser otimizado para mínima digitação.

---

### 4. Regras de Negócio

**[RN01] Criação de Prontuário**  
Cada novo cadastro deve gerar um ID único de prontuário vinculado ao CPF.

---

### 5. Precondições
**5.1** O usuário não deve estar logado.

---

### 6. Pós-condições
**6.1** O usuário passa a ter credenciais e acesso ao sistema.

---

### 7. Pontos de Extensão
Não se aplica.
