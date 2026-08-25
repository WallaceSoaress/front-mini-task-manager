## Why

A entrega ja possui execucao local integrada com Docker Compose, mas ainda nao possui validacao automatizada no GitHub para build e testes. Adicionar CI simples reduz risco de regressao, melhora a apresentacao da prova tecnica e atende ao diferencial de automacao de build/testes sem prometer deploy automatico.

## What Changes

- Adicionar workflow de GitHub Actions no repositorio da API para executar testes Maven em push e pull request.
- Adicionar workflow de GitHub Actions no repositorio do frontend para instalar dependencias, executar lint e gerar build de producao em push e pull request.
- Documentar nos READMEs que existe CI simples para validacao automatica.
- Manter fora do escopo o CD/deploy automatico, pois nao ha ambiente publicado configurado.

## Capabilities

### New Capabilities

Nenhuma. Esta mudanca e de tooling/documentacao e nao altera comportamento funcional do sistema.

### Modified Capabilities

Nenhuma. Esta mudanca nao modifica requisitos de login, tarefas, times, API, UI ou containerizacao local.

## Impact

- API: novo arquivo `.github/workflows/ci.yml` e atualizacao do README.
- Frontend: novo arquivo `.github/workflows/ci.yml` e atualizacao do README.
- Sistemas externos: GitHub Actions executara os workflows quando os arquivos forem enviados ao GitHub.
- Dependencias: sem novas dependencias de runtime; o CI usa Java 21, Maven, Node.js e npm/yarn conforme os projetos.
