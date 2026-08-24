## ADDED Requirements

### Requirement: Experiencia visual premium de tarefas
O sistema SHALL apresentar a tela de tarefas com hierarquia visual, contraste, espacamento e estados de interacao refinados, preservando os fluxos existentes de board, filtros, CRUD e paginacao.

#### Scenario: Tela de tarefas com hierarquia clara
- **WHEN** o usuario autenticado abre a tela de tarefas
- **THEN** titulo, descricao, filtros, acao principal, colunas, cards e estados de feedback aparecem organizados por importancia visual e com texto legivel

#### Scenario: Board e cards refinados
- **WHEN** o board exibe colunas e cards de tarefa
- **THEN** colunas, contadores, chips, metadados e cards usam contraste, espacamento e estados de hover/focus que facilitam escanear status, prioridade, time, responsavel e prazo

#### Scenario: Estado vazio orienta acao
- **WHEN** nao ha tarefas ou o usuario precisa cadastrar um time antes de criar tarefas
- **THEN** o estado vazio comunica a situacao com destaque suficiente e apresenta a proxima acao sem parecer apagado

#### Scenario: Filtros permanecem eficientes
- **WHEN** o usuario usa filtros em desktop, tablet ou mobile
- **THEN** os campos e a acao de limpar filtros permanecem alinhados, legiveis, acessiveis e visualmente integrados ao restante da tela
