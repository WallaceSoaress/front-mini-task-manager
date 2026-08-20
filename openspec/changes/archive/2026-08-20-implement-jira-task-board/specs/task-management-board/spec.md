## Purpose

Define a experiencia privada de gerenciamento de tarefas do Mini Task Manager, com board visual inspirado no Jira, CRUD completo, filtros, detalhes, validacoes da prova tecnica e layout responsivo.

## ADDED Requirements

### Requirement: Board privado de tarefas
O sistema SHALL exibir uma tela privada de tarefas organizada como board visual por status.

#### Scenario: Usuario autenticado acessa tarefas
- **WHEN** o usuario autenticado abre a rota privada principal de tarefas
- **THEN** o sistema exibe um board com colunas para `TODO`, `IN_PROGRESS` e `DONE`

#### Scenario: Colunas mostram contadores
- **WHEN** as tarefas sao carregadas
- **THEN** cada coluna exibe a quantidade de tarefas daquele status

#### Scenario: Design segue referencia visual
- **WHEN** o board e renderizado em desktop
- **THEN** o sistema apresenta colunas, cabecalhos, contadores e cards compactos em uma linha visual inspirada no Jira sem exigir equivalencia pixel a pixel

### Requirement: Card de tarefa
O sistema SHALL representar cada tarefa como um card com informacoes essenciais para triagem rapida.

#### Scenario: Card exibe dados principais
- **WHEN** uma tarefa aparece no board
- **THEN** o card mostra titulo, status, prioridade, time, responsavel quando existir, prazo quando existir e identificacao da tarefa

#### Scenario: Card sem responsavel
- **WHEN** uma tarefa nao possui responsavel
- **THEN** o card indica o responsavel como nao atribuido sem quebrar o layout

#### Scenario: Card com prazo
- **WHEN** uma tarefa possui data limite
- **THEN** o card exibe a data em formato legivel e destaca visualmente prazos vencidos ou proximos quando aplicavel

### Requirement: Filtros de tarefas
O sistema SHALL permitir filtrar tarefas por status, responsavel e prioridade.

#### Scenario: Usuario aplica filtros
- **WHEN** o usuario escolhe status, responsavel ou prioridade nos filtros
- **THEN** o sistema recarrega a lista usando os parametros correspondentes da API

#### Scenario: Usuario limpa filtros
- **WHEN** o usuario remove os filtros aplicados
- **THEN** o sistema volta a exibir a listagem sem esses filtros

### Requirement: Listagem paginada
O sistema SHALL suportar a listagem paginada de tarefas retornada pela API.

#### Scenario: Existem mais tarefas que a pagina atual
- **WHEN** a resposta da API indicar mais paginas disponiveis
- **THEN** o sistema permite carregar ou navegar para outra pagina sem perder os filtros atuais

#### Scenario: Pagina nao possui tarefas
- **WHEN** a API retorna uma pagina vazia
- **THEN** o sistema exibe um estado vazio claro e uma acao para criar tarefa quando apropriado

### Requirement: Criacao de tarefa
O sistema SHALL permitir criar tarefas vinculadas a um time, com status, prioridade, titulo, descricao, prazo e responsavel opcional.

#### Scenario: Usuario cria tarefa valida
- **WHEN** o usuario preenche os campos obrigatorios e envia o formulario de criacao
- **THEN** o sistema cria a tarefa, fecha o formulario e atualiza o board

#### Scenario: Usuario envia formulario incompleto
- **WHEN** campos obrigatorios estao ausentes ou invalidos
- **THEN** o sistema impede a submissao e mostra mensagens de validacao junto aos campos

### Requirement: Edicao de tarefa
O sistema SHALL permitir editar os dados de uma tarefa existente.

#### Scenario: Usuario salva alteracoes validas
- **WHEN** o usuario altera dados de uma tarefa e salva
- **THEN** o sistema atualiza a tarefa, fecha o formulario e reflete a alteracao no board

#### Scenario: Edicao falha na API
- **WHEN** a API rejeita a atualizacao
- **THEN** o sistema mantem o usuario no formulario e mostra uma mensagem de erro acionavel

### Requirement: Regra de conclusao com responsavel
O sistema SHALL impedir que uma tarefa seja marcada como concluida sem responsavel atribuido.

#### Scenario: Usuario tenta concluir sem responsavel
- **WHEN** o usuario seleciona status `DONE` sem responsavel no formulario
- **THEN** o sistema bloqueia a submissao e informa que tarefas concluidas exigem responsavel

#### Scenario: API rejeita conclusao invalida
- **WHEN** a API retorna erro porque a tarefa concluida nao possui responsavel
- **THEN** o sistema mostra a mensagem de erro e preserva os dados preenchidos

### Requirement: Detalhes de tarefa
O sistema SHALL permitir visualizar detalhes completos de uma tarefa.

#### Scenario: Usuario abre detalhes
- **WHEN** o usuario seleciona uma tarefa no board
- **THEN** o sistema mostra titulo, descricao, status, prioridade, responsavel, time, criador, prazo, criacao e ultima atualizacao quando disponiveis

#### Scenario: Usuario fecha detalhes
- **WHEN** o usuario fecha a visualizacao de detalhes
- **THEN** o sistema retorna ao board mantendo filtros e pagina atual

### Requirement: Exclusao de tarefa
O sistema SHALL permitir excluir uma tarefa mediante confirmacao.

#### Scenario: Usuario confirma exclusao
- **WHEN** o usuario confirma a exclusao de uma tarefa
- **THEN** o sistema remove a tarefa pela API e atualiza o board

#### Scenario: Usuario cancela exclusao
- **WHEN** o usuario cancela a confirmacao
- **THEN** nenhuma requisicao de exclusao e enviada

### Requirement: Estados de feedback
O sistema SHALL tratar estados de carregamento, erro, vazio e submissao em andamento.

#### Scenario: Dados estao carregando
- **WHEN** o sistema aguarda resposta da API
- **THEN** a interface mostra feedback de carregamento sem travar a navegacao geral

#### Scenario: Consulta falha
- **WHEN** a consulta de tarefas falha
- **THEN** o sistema mostra uma mensagem de erro e oferece acao para tentar novamente

#### Scenario: Submissao em andamento
- **WHEN** uma criacao, edicao ou exclusao esta em andamento
- **THEN** o sistema evita submissao duplicada e mostra feedback visual no controle acionado

### Requirement: Responsividade
O sistema SHALL adaptar a experiencia de tarefas para desktop, notebook, tablet e mobile.

#### Scenario: Desktop ou notebook
- **WHEN** a viewport possui largura suficiente
- **THEN** o board exibe colunas lado a lado com rolagem horizontal controlada quando necessario

#### Scenario: Tablet
- **WHEN** a viewport possui largura intermediaria
- **THEN** o board preserva cards legiveis e permite navegar entre colunas sem sobreposicao de conteudo

#### Scenario: Mobile
- **WHEN** a viewport e estreita
- **THEN** o sistema apresenta as colunas em uma experiencia compacta, como abas ou rolagem horizontal, mantendo filtros e acoes acessiveis
