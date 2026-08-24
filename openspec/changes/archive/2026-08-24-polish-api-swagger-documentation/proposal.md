## Why

O Swagger da API ainda depende de nomes tecnicos de metodos para varios endpoints, o que deixa a leitura menos profissional. Alem disso, `GET /auth/me` ficou como endpoint legado depois da criacao de `GET /auth/session` e agora pode ser removido para evitar duplicidade na documentacao.

## What Changes

- Adicionar `summary` e `description` OpenAPI claros em todos os endpoints publicos da API.
- Adicionar tags OpenAPI coerentes para autenticacao, usuarios, times e tarefas.
- Remover o endpoint legado `GET /auth/me` do backend e da documentacao.
- Manter `GET /auth/session` como unico endpoint de recuperacao da sessao autenticada.
- Atualizar testes e README para refletir a remocao de `/auth/me`.
- **BREAKING**: consumidores externos que ainda chamam `GET /auth/me` deverao migrar para `GET /auth/session`.

## Capabilities

### New Capabilities

- `api-documentation`: cobre a clareza e completude da documentacao Swagger/OpenAPI dos endpoints da API.

### Modified Capabilities

- `login-routing`: remove a compatibilidade com `GET /auth/me` e define `GET /auth/session` como unico endpoint de sessao autenticada atual.

## Impact

- Backend API: controllers de autenticacao, usuarios, times e tarefas.
- Documentacao: Swagger/OpenAPI gerado e README da API.
- Testes: testes de backend que cobrem autenticacao e documentacao dos endpoints.
- Frontend: sem alteracao funcional esperada, pois o frontend ja usa `/auth/session`.
