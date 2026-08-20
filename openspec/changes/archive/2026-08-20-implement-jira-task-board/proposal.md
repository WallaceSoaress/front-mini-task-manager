## Why

O frontend ainda nao entrega as telas obrigatorias de tarefas da prova tecnica. Esta mudanca cria a experiencia principal de gestao de tarefas com uma organizacao visual inspirada no Jira, respeitando os status, campos e regras reais da API do Mini Task Manager.

## What Changes

- Adicionar uma tela privada de tarefas com board responsivo organizado por status.
- Exibir cards de tarefas com titulo, prioridade, responsavel, time, prazo, identificacao e indicadores visuais inspirados no Jira.
- Implementar filtros por status, responsavel e prioridade, usando os parametros suportados pela API.
- Implementar listagem paginada/refetch das tarefas.
- Implementar criacao, edicao, visualizacao de detalhes e exclusao de tarefas.
- Carregar usuarios e times para associar responsavel e time nos formularios.
- Validar formularios com as regras da prova, incluindo a regra de que tarefa concluida exige responsavel.
- Organizar a implementacao em camadas reutilizaveis de tela, componentes, estado, contratos, validacoes e comunicacao com a API.
- Utilizar a camada de dados do projeto para consultas, mutacoes, cache, invalidacao e estados de loading/erro.
- Manter autenticacao por cookie HttpOnly, sem armazenamento de token em storage acessivel por JavaScript.
- Garantir layout responsivo para desktop, notebook, tablet e mobile.

## Capabilities

### New Capabilities
- `task-management-board`: Experiencia privada de gerenciamento de tarefas, incluindo board visual, filtros, CRUD, detalhes, validacoes, paginacao e responsividade.

### Modified Capabilities
- Nenhuma.

## Impact

- Afeta principalmente `src/pages/private`, `src/components`, `src/hooks`, `src/interfaces`, `src/services`, `src/validations` e rotas privadas.
- Reutiliza a API existente: `GET/POST /tasks`, `GET/PUT/DELETE /tasks/{id}`, `GET /users` e `GET /teams`.
- Nao requer alteracoes no backend.
- Nao adiciona novas dependencias; usa as bibliotecas ja disponiveis no projeto.
