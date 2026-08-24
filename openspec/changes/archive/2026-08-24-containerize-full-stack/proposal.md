## Why

A entrega local ainda exige passos separados para subir API, banco e frontend, o que aumenta o risco de divergência entre ambientes e torna a validação integrada mais trabalhosa. A mudança propõe um caminho único com Docker Compose para executar a aplicação completa de forma reproduzível.

## What Changes

- Adicionar containerização do frontend React/Vite, incluindo build de produção e servidor HTTP para arquivos estáticos.
- Atualizar a orquestração Docker Compose para subir PostgreSQL, API Spring Boot e frontend em conjunto.
- Configurar variáveis de ambiente necessárias para comunicação entre frontend, API e banco no ambiente Docker local.
- Documentar comandos de execução, parada, rebuild e validação do ambiente integrado.
- Preservar o fluxo atual de desenvolvimento local sem Docker.

## Capabilities

### New Capabilities

- `full-stack-containerization`: execução local integrada da aplicação completa com Docker Compose.

### Modified Capabilities

- Nenhuma.

## Impact

- Repositório da API: `Dockerfile`, `docker-compose.yml`, variáveis de ambiente e README.
- Repositório do frontend: novo Dockerfile, possível configuração de servidor estático, variáveis `VITE_*`, `.dockerignore` e README.
- Ambiente local: Docker Desktop e Docker Compose passam a ser o caminho recomendado para validação integrada.
- Integração: CORS, cookies HttpOnly e URL pública da API precisam permanecer compatíveis com o navegador em `localhost`.
