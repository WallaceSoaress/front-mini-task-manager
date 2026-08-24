## Purpose

Define a experiencia privada de cadastro de times, permitindo que usuarios autenticados criem times com nome e membros selecionados a partir dos usuarios existentes.

## Requirements

### Requirement: Listagem privada de times
O sistema SHALL disponibilizar uma tela privada para listar times existentes.

#### Scenario: Usuario autenticado acessa times
- **WHEN** o usuario autenticado abre a tela de times
- **THEN** o sistema exibe a listagem de times retornada por `GET /teams`

#### Scenario: Listagem de times vazia
- **WHEN** a API retorna uma lista vazia de times
- **THEN** o sistema exibe um estado vazio com uma acao para cadastrar um novo time

#### Scenario: Falha ao carregar times
- **WHEN** a consulta de times falha
- **THEN** o sistema mostra uma mensagem de erro e permite tentar carregar novamente

### Requirement: Acao Novo Time
O sistema SHALL exibir uma acao `Novo Time` no header da tela de times.

#### Scenario: Usuario abre formulario de novo time
- **WHEN** o usuario seleciona a acao `Novo Time`
- **THEN** o sistema abre um formulario de cadastro de time sem sair da tela de listagem

#### Scenario: Acao em mobile
- **WHEN** a tela de times e exibida em viewport estreita
- **THEN** a acao `Novo Time` permanece acessivel sem sobrepor ou cortar conteudo

### Requirement: Formulario de cadastro de time
O sistema SHALL permitir cadastrar um time informando nome e membros.

#### Scenario: Formulario exibe campos esperados
- **WHEN** o formulario de cadastro e aberto
- **THEN** o sistema exibe um campo obrigatorio para `name` e um controle de selecao de membros

#### Scenario: Nome ausente
- **WHEN** o usuario tenta enviar o formulario sem informar o nome do time
- **THEN** o sistema bloqueia a submissao e mostra mensagem de validacao junto ao campo

#### Scenario: Membros opcionais
- **WHEN** o usuario envia um time sem selecionar membros
- **THEN** o sistema permite a submissao usando `memberIds` como lista vazia ou omitida conforme o contrato aceito pela API

### Requirement: Selecao de membros por usuarios existentes
O sistema SHALL permitir selecionar membros a partir dos usuarios disponiveis retornados pela API, com interacao de multiplas escolhas por clique simples e sem depender de teclas modificadoras do navegador.

#### Scenario: Usuarios disponiveis carregam
- **WHEN** o formulario precisa apresentar membros disponiveis
- **THEN** o sistema usa `GET /users` para obter os usuarios selecionaveis

#### Scenario: Usuario seleciona membros
- **WHEN** o usuario escolhe mais de um membro pelo nome visivel usando cliques simples
- **THEN** o formulario mantem todos os membros escolhidos selecionados e registra internamente os respectivos IDs em `memberIds`

#### Scenario: Usuario alterna selecao de membro
- **WHEN** o usuario clica em um membro ja selecionado
- **THEN** o formulario remove somente esse membro de `memberIds` e preserva os demais membros selecionados

#### Scenario: Usuario envia time sem membros
- **WHEN** nenhum membro esta selecionado
- **THEN** o formulario preserva `memberIds` como lista vazia e permite cadastrar o time se o nome for valido

#### Scenario: Falha ao carregar usuarios
- **WHEN** a consulta de usuarios falha
- **THEN** o formulario informa que nao foi possivel carregar membros e ainda permite cadastrar o time sem membros se o nome for valido

### Requirement: Cadastro integrado com a API
O sistema SHALL cadastrar times usando o endpoint existente `POST /teams`.

#### Scenario: Cadastro bem-sucedido
- **WHEN** o usuario envia um nome valido e membros selecionados
- **THEN** o sistema envia `POST /teams` com `name` e `memberIds`

#### Scenario: Apos cadastro bem-sucedido
- **WHEN** a API retorna sucesso ao cadastrar o time
- **THEN** o sistema fecha o formulario, mostra feedback de sucesso e atualiza a listagem de times sem recarregar a pagina manualmente

#### Scenario: Cadastro rejeitado pela API
- **WHEN** a API rejeita o cadastro do time
- **THEN** o sistema mantem o formulario aberto, preserva os dados preenchidos e mostra uma mensagem de erro acionavel

### Requirement: Exclusao segura de time
O sistema SHALL permitir excluir times pela API somente quando nao existirem demandas vinculadas ao time.

#### Scenario: Usuario solicita exclusao de time
- **WHEN** o usuario autenticado aciona a exclusao de um time na tela de times
- **THEN** o sistema solicita confirmacao antes de enviar qualquer requisicao de exclusao

#### Scenario: Usuario confirma exclusao sem demandas vinculadas
- **WHEN** o usuario confirma a exclusao de um time que nao possui demandas vinculadas
- **THEN** o sistema envia a exclusao para a API, remove o time da listagem e mostra feedback de sucesso sem recarregar a pagina

#### Scenario: Usuario cancela exclusao
- **WHEN** o usuario cancela a confirmacao de exclusao
- **THEN** o sistema nao envia requisicao de exclusao e mantem a listagem inalterada

#### Scenario: Time possui demandas vinculadas
- **WHEN** a API identifica que o time possui uma ou mais demandas vinculadas
- **THEN** o sistema bloqueia a exclusao no backend, mantem o time existente e retorna uma mensagem de erro para exibicao no frontend

#### Scenario: Exclusao falha na API
- **WHEN** a API rejeita a exclusao por erro de negocio, permissao ou falha inesperada
- **THEN** o sistema mantem a listagem consistente e mostra uma mensagem de erro acionavel ao usuario

### Requirement: Responsividade do cadastro de time
O sistema SHALL adaptar a listagem e o formulario de time para desktop, tablet e mobile.

#### Scenario: Desktop ou notebook
- **WHEN** a viewport possui largura suficiente
- **THEN** a listagem e o formulario usam espacamento, colunas e acoes alinhados ao padrao visual atual

#### Scenario: Tablet
- **WHEN** a viewport possui largura intermediaria
- **THEN** os campos, selecao de membros e acoes continuam legiveis e sem sobreposicao

#### Scenario: Mobile
- **WHEN** a viewport e estreita
- **THEN** o formulario ocupa largura adequada, empilha campos e mantem acoes de salvar e cancelar acessiveis
