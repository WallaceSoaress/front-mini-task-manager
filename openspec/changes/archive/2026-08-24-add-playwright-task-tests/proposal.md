## Why

O frontend ainda nao possui Playwright configurado nem testes automatizados para os fluxos privados de tarefas. Isso deixa criacao, validacoes, filtros, estados de API e autorizacao dependentes de verificacao manual, aumentando o risco de regressao em pontos criticos da prova tecnica.

## What Changes

- Configurar Playwright com TypeScript para executar testes contra o app Vite.
- Criar uma suite inicial de testes da tela de tarefas usando seletores acessiveis e `page.route()` para controlar autenticacao e respostas da API.
- Cobrir happy path, validacoes de formulario, erro de backend, filtros, estados de listagem e redirecionamento de usuario nao autenticado.
- Adicionar scripts de teste E2E ao projeto.
- Documentar pontos do frontend que precisam de seletores/labels mais estaveis quando necessario.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- Nenhuma. Esta mudanca adiciona cobertura automatizada para comportamentos ja especificados, sem alterar requisitos funcionais do produto.

## Impact

- Afeta configuracao de testes, dependencias de desenvolvimento e novos arquivos de spec Playwright.
- Pode sugerir pequenos ajustes de acessibilidade/seletores em componentes de tarefas para aumentar estabilidade dos testes.
- Nao altera contrato da API, rotas de produto ou comportamento esperado pelo usuario final.
