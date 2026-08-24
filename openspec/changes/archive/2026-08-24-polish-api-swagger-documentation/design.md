## Context

See `proposal.md` for motivation. A API usa Springdoc OpenAPI/Swagger e ja possui `@Operation` no `AuthController`, mas `UserController`, `TeamController` e `TaskController` ainda nao possuem summaries explicitos. O endpoint `GET /auth/session` ja e usado pelo frontend, enquanto `GET /auth/me` permanece apenas como alias legado no backend e na spec principal.

## Goals / Non-Goals

**Goals:**

- Padronizar tags, summaries e descricoes OpenAPI nos controllers principais da API.
- Remover `GET /auth/me` do backend, Swagger, README e spec principal.
- Manter `GET /auth/session` como contrato unico para recuperar a sessao autenticada.
- Verificar por testes ou inspecao automatizada que os summaries esperados aparecem no contrato OpenAPI.

**Non-Goals:**

- Nao alterar payloads, validacoes, regras de negocio ou persistencia.
- Nao alterar rotas do frontend, pois ele ja consome `/auth/session`.
- Nao adicionar novos endpoints alem da remocao do legado.

## Decisions

### Remover `/auth/me` em vez de ocultar no Swagger

Como o usuario pediu para remover o endpoint legado, a implementacao deve apagar o mapping `GET /auth/me`, nao apenas esconder a operacao no Swagger. A alternativa de marcar como deprecated manteria a duplicidade visivel e nao resolveria totalmente o problema de leitura.

### Usar `@Tag` por controller e `@Operation` por endpoint

Cada controller deve ter uma tag descritiva e cada metodo deve ter `summary` e `description`. Isso mantem a documentacao perto do contrato HTTP e evita depender de nomes internos de metodos Java.

### Validar summaries no contrato gerado

O teste ideal deve consultar `/v3/api-docs` ou inspecionar anotacoes OpenAPI para garantir que os summaries esperados existam. Isso evita regressao futura onde um endpoint novo aparece no Swagger sem texto claro.

## Risks / Trade-offs

- Risco: consumidores externos antigos ainda chamarem `/auth/me`. -> Mitigacao: registrar a mudanca como breaking e documentar migracao para `/auth/session`.
- Risco: summaries ficarem inconsistentes entre README e Swagger. -> Mitigacao: atualizar ambos no mesmo change e validar os nomes principais.
- Risco: excesso de texto no Swagger. -> Mitigacao: manter summaries curtos e descricoes objetivas.

## Migration Plan

1. Remover o metodo/mapping `GET /auth/me` do `AuthController`.
2. Atualizar ou remover testes de compatibilidade do endpoint legado.
3. Adicionar `@Tag` e `@Operation` nos controllers de usuarios, times e tarefas.
4. Revisar `AuthController` para manter somente os endpoints atuais com summaries claros.
5. Atualizar README da API e spec principal `login-routing`.
6. Validar backend e OpenSpec.
