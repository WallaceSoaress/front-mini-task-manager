## MODIFIED Requirements

### Requirement: Criacao de tarefa
O sistema SHALL permitir criar tarefas vinculadas a um time, com status, prioridade, titulo, descricao, prazo e responsavel opcional, enviando para a API os valores definidos pelo contrato de `POST /tasks`, validando campos atuais do formulario e permitindo selecionar responsavel somente entre membros do time escolhido.

#### Scenario: Usuario cria tarefa valida
- **WHEN** o usuario preenche os campos obrigatorios e envia o formulario de criacao com prazo vazio, data atual ou data futura
- **THEN** o sistema envia `title`, `description`, `status`, `priority`, `responsibleId`, `teamId` e `dueDate` conforme o contrato da API, cria a tarefa, fecha o formulario e atualiza o board sem recarregar a pagina

#### Scenario: Usuario envia formulario incompleto
- **WHEN** campos obrigatorios estao ausentes ou invalidos
- **THEN** o sistema impede a submissao e mostra mensagens de validacao junto aos campos

#### Scenario: Usuario corrige campo invalido
- **WHEN** o usuario altera um campo que estava com erro de validacao
- **THEN** o sistema atualiza o estado do formulario para refletir o novo valor e remove a mensagem de erro daquele campo quando ele estiver valido

#### Scenario: Usuario corrige titulo invalido
- **WHEN** o usuario preenche ou altera o titulo apos uma validacao invalida
- **THEN** o sistema reavalia o valor atual do campo e remove a mensagem `Informe o titulo.` quando o titulo estiver valido

#### Scenario: Valores visuais diferem dos valores da API
- **WHEN** o usuario seleciona status, prioridade, responsavel ou time por labels amigaveis
- **THEN** o sistema envia os valores internos esperados pela API, incluindo enums reais de status/prioridade e IDs para responsavel e time

#### Scenario: Usuario escolhe time antes de responsavel
- **WHEN** o formulario de criacao ou edicao de tarefa e exibido
- **THEN** o campo `Time` aparece antes do campo `Responsavel`

#### Scenario: Responsaveis filtrados pelo time
- **WHEN** o usuario seleciona um time
- **THEN** o campo `Responsavel` lista somente os membros daquele time e mantem a opcao de nao atribuir responsavel

#### Scenario: Troca de time invalida responsavel anterior
- **WHEN** o usuario troca o time selecionado e o responsavel atual nao pertence ao novo time
- **THEN** o sistema limpa o responsavel selecionado antes da submissao

#### Scenario: Prazo informado
- **WHEN** o usuario informa uma data de prazo valida
- **THEN** o sistema envia `dueDate` em formato de data aceito pela API

#### Scenario: Prazo visual em formato local
- **WHEN** o campo de prazo exibe ou recebe uma data em formato local
- **THEN** o sistema envia a data para a API no formato `YYYY-MM-DD`

#### Scenario: Prazo anterior ao dia atual
- **WHEN** o usuario informa uma data anterior ao dia atual
- **THEN** o sistema bloqueia a submissao e informa que o prazo deve ser a data atual ou uma data futura

#### Scenario: API recebe prazo passado
- **WHEN** a API recebe uma criacao ou atualizacao de tarefa com prazo anterior ao dia atual
- **THEN** a API rejeita a requisicao com erro de validacao ou regra de negocio

#### Scenario: Criacao rejeitada pela API
- **WHEN** a API rejeita a criacao da tarefa
- **THEN** o sistema mantem o formulario aberto, preserva os dados preenchidos e mostra uma mensagem de erro acionavel
