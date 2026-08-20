## Why

A aplicacao ja consome times para criar e filtrar tarefas, mas ainda precisa permitir que o usuario cadastre novos times pela interface. Essa funcionalidade fecha o fluxo esperado de gerenciamento em equipe sem exigir manipulacao manual de dados ou atualizacao da pagina.

## What Changes

- Adicionar uma tela privada de listagem de times com acao `Novo Time`.
- Abrir um formulario responsivo para cadastro de time a partir da listagem.
- Permitir informar `name` e selecionar membros existentes por dados amigaveis vindos de `GET /users`.
- Enviar o cadastro para `POST /teams` usando o contrato existente `{ name, memberIds }`.
- Atualizar automaticamente a listagem de times apos sucesso e manter o formulario aberto com erro quando a API rejeitar a requisicao.
- Preservar autenticacao por cookie HttpOnly e a arquitetura atual de services, hooks, validacoes e componentes.

## Capabilities

### New Capabilities
- `team-creation`: Define a experiencia privada de listagem e cadastro de times com selecao de membros, validacao e atualizacao automatica da lista.

### Modified Capabilities

## Impact

- Front-end: rotas privadas, pagina de times, componentes de listagem/formulario, interfaces de time, service de times, hooks de dados e schema de validacao.
- API: usa endpoints existentes `GET /teams`, `POST /teams` e `GET /users`; nao ha previsao de alteracao de contrato no backend.
- Dependencias: sem novas bibliotecas previstas.
