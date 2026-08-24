## 1. Backend API

- [x] 1.1 Adicionar `GET /auth/session` no controller de autenticacao reutilizando a mesma logica de `GET /auth/me`, verificando que a resposta mantem `id`, `name`, `email` e `role`.
- [x] 1.2 Manter `GET /auth/me` como alias legado, verificando que consumidores antigos continuam recebendo a mesma resposta autenticada.
- [x] 1.3 Adicionar documentacao Swagger/OpenAPI para `GET /auth/session` com resumo e descricao claros, verificando visualmente ou por JSON OpenAPI que a rota comunica "sessao autenticada".
- [x] 1.4 Adicionar ou atualizar teste de backend para `GET /auth/session` e compatibilidade de `GET /auth/me`, verificando que ambos exigem autenticacao e retornam o usuario atual.

## 2. Frontend

- [x] 2.1 Atualizar o servico de autenticacao para restaurar sessao usando `/auth/session`, verificando que o login e o reload autenticado continuam funcionando.
- [x] 2.2 Atualizar mocks E2E que interceptam `/auth/me` para usar `/auth/session` como rota principal, verificando que os testes de login, cadastro, tarefas e times continuam passando.
- [x] 2.3 Preservar compatibilidade conceitual com `/auth/me` apenas no backend, verificando que o frontend nao depende mais do endpoint legado.

## 3. Documentacao

- [x] 3.1 Atualizar o README da API para listar `GET /auth/session` como endpoint principal de sessao autenticada e mencionar `/auth/me` como compatibilidade, verificando que a lista de endpoints fica autoexplicativa.
- [x] 3.2 Atualizar o README do frontend para explicar que a restauracao de sessao usa `GET /auth/session`, verificando que nao ha referencias obsoletas a `/auth/me` como rota principal.

## 4. Validacao

- [x] 4.1 Executar os testes do backend e verificar que a API compila e os fluxos de autenticacao passam.
- [x] 4.2 Executar `npm run build` no frontend e verificar que a alteracao de endpoint compila sem erros.
- [x] 4.3 Executar testes E2E relevantes do frontend (`register`, `tasks`, `teams` e fluxo de login quando existir) e verificar que a restauracao da sessao usa `/auth/session`.
- [x] 4.4 Validar o change com `openspec validate improve-auth-session-endpoint --strict`.
