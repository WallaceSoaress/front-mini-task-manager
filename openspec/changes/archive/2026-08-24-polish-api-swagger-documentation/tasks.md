## 1. Autenticacao

- [x] 1.1 Remover `GET /auth/me` do `AuthController`, verificando que a busca por `/auth/me` no backend retorna apenas historico/documentacao arquivada ou nenhuma referencia ativa.
- [x] 1.2 Manter `GET /auth/session` como unica rota de sessao autenticada, verificando que ela continua retornando o usuario atual com `id`, `name`, `email` e `role`.
- [x] 1.3 Atualizar testes de autenticacao para remover expectativas de `/auth/me`, verificando que `/auth/session` permanece coberto.

## 2. Swagger/OpenAPI

- [x] 2.1 Adicionar `@Tag` e `@Operation` claros no `UserController`, verificando que `GET /users` aparece com summary e descricao de listagem de usuarios.
- [x] 2.2 Adicionar `@Tag` e `@Operation` claros no `TeamController`, verificando summaries para criar, listar e excluir times.
- [x] 2.3 Adicionar `@Tag` e `@Operation` claros no `TaskController`, verificando summaries para criar, listar, buscar por ID, atualizar e excluir tarefas.
- [x] 2.4 Revisar `AuthController`, verificando que os endpoints restantes possuem summaries curtos e descricoes coerentes.
- [x] 2.5 Adicionar ou atualizar teste automatizado que valida os summaries/tags principais do contrato OpenAPI ou das anotacoes, verificando que todos os endpoints principais estao documentados.

## 3. Documentacao e Specs

- [x] 3.1 Atualizar README da API removendo `/auth/me` e deixando `/auth/session` como unica rota de sessao autenticada, verificando que a lista de endpoints nao mostra o legado.
- [x] 3.2 Atualizar a spec principal `login-routing` removendo o cenario de compatibilidade com `/auth/me`, verificando que o requisito aponta somente para `/auth/session`.
- [x] 3.3 Criar/sincronizar a spec principal `api-documentation` no archive, verificando que ela registra a expectativa de summaries claros no Swagger.

## 4. Validacao

- [x] 4.1 Executar `mvn test` no backend e verificar que todos os testes passam.
- [x] 4.2 Executar `npm run build` no frontend e verificar que nenhuma documentacao ou spec quebre a compilacao.
- [x] 4.3 Executar testes E2E relevantes do frontend, verificando que o app continua usando `/auth/session` e nao depende de `/auth/me`.
- [x] 4.4 Executar `openspec validate polish-api-swagger-documentation --strict` e verificar que o change esta valido.
