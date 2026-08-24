## Why

O endpoint `GET /auth/me` funciona tecnicamente, mas o nome fica pouco claro no Swagger e na leitura rapida dos endpoints. Um endpoint mais descritivo melhora a avaliacao da API e comunica melhor que a chamada recupera a sessao autenticada atual.

## What Changes

- Adicionar o endpoint `GET /auth/session` para retornar os dados do usuario autenticado pela sessao/cookie HttpOnly atual.
- Manter `GET /auth/me` funcionando como compatibilidade, sem quebrar o frontend ou consumidores existentes.
- Atualizar o frontend para restaurar a sessao usando `GET /auth/session`.
- Melhorar a documentacao Swagger/OpenAPI da rota de sessao autenticada com resumo e descricao claros.
- Atualizar a documentacao dos endpoints para explicar que `/auth/session` recupera a sessao atual.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `login-routing`: adiciona a rota semantica `GET /auth/session` para recuperacao da sessao autenticada e preserva compatibilidade com `GET /auth/me`.

## Impact

- Backend API: controller de autenticacao, documentacao OpenAPI/Swagger e README da API.
- Frontend: servico de autenticacao e testes E2E que mockam a recuperacao da sessao.
- Compatibilidade: `GET /auth/me` permanece disponivel para nao quebrar usos existentes.
