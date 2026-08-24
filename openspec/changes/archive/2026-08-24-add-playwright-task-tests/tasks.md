## 1. Configuracao Playwright

- [x] 1.1 Adicionar `@playwright/test` como dependencia de desenvolvimento e verificar que o lockfile/package manifest registram a dependencia corretamente
- [x] 1.2 Criar `playwright.config.ts` com `baseURL`, `webServer` para Vite e projeto Chromium inicial, verificando que `npx playwright test --list` executa sem erro de configuracao
- [x] 1.3 Adicionar scripts E2E ao `package.json` e verificar que o comando listado executa a descoberta dos testes

## 2. Estrutura de testes e mocks

- [x] 2.1 Criar estrutura `tests/e2e` com helpers/factories para usuario autenticado, usuarios, times, tarefas e respostas paginadas, verificando que os helpers compilam com TypeScript
- [x] 2.2 Implementar helpers de `page.route()` para `/auth/me`, `/users`, `/teams`, `/tasks`, `/tasks/:id` e `/auth/logout`, verificando em um teste smoke que a tela privada carrega com dados mockados
- [x] 2.3 Criar helpers de interacao reutilizaveis somente onde reduzirem duplicacao, como abrir o modal de criacao e preencher formulario de tarefa, verificando que os testes continuam legiveis

## 3. Cobertura da tela de tarefas

- [x] 3.1 Automatizar redirecionamento de usuario nao autenticado para `/login` e verificar a URL final e campos de login visiveis
- [x] 3.2 Automatizar carregamento do board com tarefas mockadas e verificar colunas, contadores, cards e dados principais exibidos
- [x] 3.3 Automatizar estado vazio e erro de listagem, verificando mensagens e acao de tentar novamente quando aplicavel
- [x] 3.4 Automatizar filtros de status, responsavel, prioridade e limpar filtros, verificando os parametros enviados para `GET /tasks`
- [x] 3.5 Automatizar criacao de tarefa valida, verificando que o payload de `POST /tasks` contem titulo, descricao, status, prioridade, `teamId`, `responsibleId` e `dueDate` preenchidos
- [x] 3.6 Automatizar validacoes do formulario de tarefa para titulo obrigatorio, prazo passado e status `DONE` sem responsavel, verificando mensagens junto ao modal
- [x] 3.7 Automatizar erro de backend ao criar tarefa, verificando que o modal permanece aberto e a mensagem da API e exibida
- [x] 3.8 Automatizar abertura de detalhes, edicao basica e exclusao com confirmacao, verificando chamadas `PUT /tasks/:id` e `DELETE /tasks/:id`
- [x] 3.9 Automatizar paginacao quando a resposta indicar proxima pagina, verificando que `page` muda no `GET /tasks`

## 4. Acessibilidade e seletores

- [x] 4.1 Verificar se `getByLabel` funciona nos campos de `TaskFormModal` e `TaskFilters`; se nao funcionar, adicionar `htmlFor`/`id` ou `aria-label` e verificar seletores estaveis nos testes
- [x] 4.2 Verificar se mensagens de erro relevantes podem ser localizadas por role/texto estavel; se necessario, adicionar `role="alert"` sem alterar o layout

## 5. Validacao final

- [x] 5.1 Executar `npm run build` e verificar ausencia de erros
- [x] 5.2 Executar a suite Playwright em modo headless e verificar que todos os testes passam sem `waitForTimeout`
- [x] 5.3 Revisar os testes para garantir independencia entre casos, ausencia de XPath/classes CSS frageis e nomes claros descrevendo comportamento esperado
