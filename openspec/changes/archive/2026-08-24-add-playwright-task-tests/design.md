## Context

See `proposal.md` for motivation. O projeto usa React, TypeScript e Vite, mas ainda nao possui Playwright, configuracao E2E ou estrutura de testes automatizados. A tela de tarefas depende de autenticacao via `/auth/me` e de chamadas para `/users`, `/teams` e `/tasks`, todas por `fetch` com `VITE_API_BASE_URL`.

## Goals / Non-Goals

**Goals:**

- Introduzir Playwright com TypeScript de forma integrada aos scripts do projeto.
- Criar uma suite inicial confiavel para a rota privada `/`, controlando respostas de API com `page.route()`.
- Priorizar seletores acessiveis (`getByRole`, `getByLabel`, `getByText`) e adicionar melhorias minimas de acessibilidade quando os componentes atuais dificultarem automacao estavel.
- Manter testes independentes, deterministas e sem sleeps fixos.

**Non-Goals:**

- Criar uma suite E2E completa para todos os fluxos de times nesta mudanca.
- Testar regras internas de validacao como unidade; o foco e o comportamento observado pelo usuario na UI.
- Depender de backend real, banco de dados real ou estado compartilhado entre testes.
- Alterar o contrato de API ou comportamento funcional existente.

## Decisions

1. Usar Playwright oficial com `@playwright/test`.

   A suite deve usar `playwright.config.ts` com `webServer` executando o Vite em modo dev ou preview, `baseURL` apontando para o app local e projetos de navegador inicialmente focados em Chromium.

   Alternativa considerada: Cypress. Playwright e mais alinhado ao pedido, tem boa API de rotas, assertions e auto-waiting nativos.

2. Mockar APIs por padrao.

   Os testes da tela de tarefas devem interceptar `/auth/me`, `/users`, `/teams`, `/tasks`, `/tasks/:id` e `/auth/logout` quando necessario. Isso permite validar UI, payloads e erros sem depender do backend.

   Alternativa considerada: E2E contra backend real. Essa abordagem e util para smoke, mas fragiliza a suite inicial por exigir ambiente e dados externos.

3. Organizar helpers pequenos antes de Page Objects.

   Criar helpers como `mockAuthenticatedUser`, `mockTaskDependencies`, `mockTasksPage`, `openCreateTaskModal` e factories de dados. Page Object so deve surgir se houver repeticao relevante em varias specs.

   Alternativa considerada: Page Objects completos desde o inicio. Isso adiciona estrutura antes de haver massa de testes suficiente para justificar a abstracao.

4. Cobrir primeiro a tela de tarefas e autenticacao minima.

   A suite inicial deve incluir:
   - redirecionamento para `/login` quando `/auth/me` falha;
   - carregamento do board com tarefas;
   - estado vazio e erro de listagem;
   - filtros de status/responsavel/prioridade e limpar filtros;
   - criacao de tarefa valida validando payload;
   - validacoes de titulo, prazo passado e tarefa concluida sem responsavel;
   - erro de backend ao criar mantendo o modal aberto;
   - abertura de detalhes;
   - edicao basica;
   - exclusao com confirmacao;
   - paginacao quando `last=false`.

5. Melhorar acessibilidade quando isso estabilizar os testes.

   Campos em `TaskFormModal` e `TaskFilters` ja possuem texto de label visual, mas devem ser verificados com `getByLabel`. Se a associacao implicita nao for suficiente, adicionar `htmlFor`/`id` ou `aria-label` sem mudar layout.

## Risks / Trade-offs

- [Risco] Mocks muito acoplados a detalhes de query string podem deixar testes frageis -> [Mitigacao] validar parametros relevantes com `URLSearchParams` e responder por padrao para queries nao essenciais.
- [Risco] Labels visuais sem associacao explicita podem falhar com `getByLabel` -> [Mitigacao] preferir `htmlFor`/`id` ou `aria-label` nos campos de formulario durante a implementacao.
- [Risco] `VITE_API_BASE_URL` vazio ou diferente entre ambientes pode dificultar `page.route()` -> [Mitigacao] configurar ambiente de teste com base API previsivel e usar padroes de rota glob compatíveis.
- [Risco] Testes de drag/drop do board podem ser instaveis -> [Mitigacao] deixar movimentacao por drag/drop fora da primeira suite se nao houver API ou controle acessivel confiavel.

## Migration Plan

1. Adicionar dependencias e scripts E2E.
2. Criar configuracao Playwright e estrutura `tests/e2e`.
3. Implementar helpers/factories e suite da tela de tarefas.
4. Rodar a suite localmente e ajustar seletores acessiveis minimos se necessario.
5. Documentar o comando de execucao no `package.json` ou README se houver padrao de documentacao no projeto.
