## Context

See `proposal.md` for motivation. A API ja possui `GET /auth/me` em `AuthController`, que valida a sessao por cookie HttpOnly, renova o cookie quando valido e retorna um resumo do usuario autenticado. O frontend restaura autenticacao em `authService.ts` chamando `/auth/me`, e os testes E2E mockam esse endpoint.

O objetivo tecnico e melhorar a clareza publica do contrato sem quebrar compatibilidade.

## Goals / Non-Goals

**Goals:**

- Expor `GET /auth/session` como nome principal para recuperar a sessao autenticada atual.
- Manter `GET /auth/me` como alias legado com a mesma resposta.
- Atualizar Swagger/OpenAPI para que a leitura indique claramente a finalidade da rota.
- Atualizar o frontend e os testes para usar `/auth/session` como caminho principal.

**Non-Goals:**

- Nao alterar formato de resposta do usuario autenticado.
- Nao alterar estrategia de autenticacao por cookie HttpOnly.
- Nao remover `/auth/me` nesta mudanca.
- Nao adicionar refresh token, roles granulares ou novo fluxo de login.

## Decisions

### Usar `/auth/session` como endpoint principal

`/auth/session` comunica melhor que a chamada consulta a sessao autenticada atual. A alternativa `/auth/current-user` tambem e clara, mas o usuario escolheu `/auth/session`, e ela combina bem com o modelo de cookie HttpOnly.

### Manter `/auth/me` como alias

Remover ou renomear diretamente `/auth/me` quebraria o frontend atual, testes e qualquer consumidor que ja tenha integrado a API. O backend deve aceitar os dois caminhos durante esta mudanca, apontando para a mesma logica e resposta.

### Documentar explicitamente a rota no Swagger

Como o problema percebido aparece na leitura do Swagger, a implementacao deve incluir anotacoes OpenAPI no controller de autenticacao. O resumo deve ser direto, por exemplo "Obter sessao autenticada", e a descricao deve explicar que a API usa o cookie HttpOnly para retornar o usuario atual.

### Migrar o frontend para o caminho novo

O frontend deve chamar `/auth/session` ao restaurar autenticacao. Os mocks E2E devem acompanhar esse caminho para evitar que a rota antiga continue sendo o contrato principal do app.

## Risks / Trade-offs

- Risco: manter dois endpoints para a mesma operacao pode parecer duplicado. -> Mitigacao: documentar `/auth/session` como principal e tratar `/auth/me` como compatibilidade.
- Risco: testes ou mocks antigos ainda interceptarem apenas `/auth/me`. -> Mitigacao: atualizar helpers e specs E2E relacionados a autenticacao.
- Risco: Swagger listar ambos e gerar alguma confusao. -> Mitigacao: dar descricao clara para `/auth/session` e, se viavel, marcar `/auth/me` como endpoint legado/compatibilidade na descricao.

## Migration Plan

1. Adicionar `GET /auth/session` no backend usando a mesma logica de resposta e renovacao de cookie de `/auth/me`.
2. Adicionar anotacoes Swagger/OpenAPI para o endpoint novo e, se apropriado, para o legado.
3. Atualizar README da API e README do frontend para documentar `/auth/session`.
4. Alterar o frontend para restaurar sessao por `/auth/session`.
5. Atualizar mocks E2E e testes para cobrir `/auth/session` e preservar compatibilidade de `/auth/me` no backend.
6. Validar backend, frontend e documentacao.
