## MODIFIED Requirements

### Requirement: Criacao de tarefa
O sistema SHALL permitir criar tarefas vinculadas a um time, com status, prioridade, titulo, descricao, prazo e responsavel opcional, enviando para a API os valores definidos pelo contrato de `POST /tasks`.

#### Scenario: Usuario cria tarefa valida
- **WHEN** o usuario preenche os campos obrigatorios e envia o formulario de criacao
- **THEN** o sistema envia `title`, `description`, `status`, `priority`, `responsibleId`, `teamId` e `dueDate` conforme o contrato da API, cria a tarefa, fecha o formulario e atualiza o board sem recarregar a pagina

#### Scenario: Usuario envia formulario incompleto
- **WHEN** campos obrigatorios estao ausentes ou invalidos
- **THEN** o sistema impede a submissao e mostra mensagens de validacao junto aos campos

#### Scenario: Usuario corrige campo invalido
- **WHEN** o usuario altera um campo que estava com erro de validacao
- **THEN** o sistema atualiza o estado do formulario para refletir o novo valor e remove a mensagem de erro daquele campo quando ele estiver valido

#### Scenario: Valores visuais diferem dos valores da API
- **WHEN** o usuario seleciona status, prioridade, responsavel ou time por labels amigaveis
- **THEN** o sistema envia os valores internos esperados pela API, incluindo enums reais de status/prioridade e IDs para responsavel e time

#### Scenario: Prazo informado
- **WHEN** o usuario informa uma data de prazo valida
- **THEN** o sistema envia `dueDate` em formato de data aceito pela API

#### Scenario: Criacao rejeitada pela API
- **WHEN** a API rejeita a criacao da tarefa
- **THEN** o sistema mantem o formulario aberto, preserva os dados preenchidos e mostra uma mensagem de erro acionavel
