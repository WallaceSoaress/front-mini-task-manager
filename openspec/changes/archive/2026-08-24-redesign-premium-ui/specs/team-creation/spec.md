## ADDED Requirements

### Requirement: Experiencia visual premium de times
O sistema SHALL apresentar a tela de times e o cadastro de time com hierarquia visual, contraste, espacamento e estados de interacao refinados, preservando os fluxos existentes de listagem, criacao, selecao de membros e exclusao.

#### Scenario: Tela de times com hierarquia clara
- **WHEN** o usuario autenticado abre a tela de times
- **THEN** titulo, descricao, acao principal, lista, estados e mensagens aparecem organizados por importancia visual e com texto legivel

#### Scenario: Cards de time refinados
- **WHEN** a listagem exibe times cadastrados
- **THEN** cards, contagem de membros, badges de membros e acoes usam contraste, alinhamento e espacamento suficientes para leitura rapida

#### Scenario: Formulario de time refinado
- **WHEN** o formulario de novo time e aberto
- **THEN** campos, lista de membros, mensagens auxiliares, erros e acoes apresentam visual consistente, legivel e responsivo

#### Scenario: Estado vazio de times orienta acao
- **WHEN** nao ha times cadastrados
- **THEN** o estado vazio comunica a situacao com destaque suficiente e apresenta a acao de criar time de forma evidente
