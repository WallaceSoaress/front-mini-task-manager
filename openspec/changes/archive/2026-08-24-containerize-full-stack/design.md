## Context

A API ja possui `Dockerfile` multi-stage Maven/Java 21 e `docker-compose.yml` com PostgreSQL e API. O frontend React/Vite ainda nao possui Dockerfile nem servico no Compose; ele depende de `VITE_API_BASE_URL` para compor chamadas HTTP no navegador.

Os repositórios ficam lado a lado:

```text
prova-tecnica/
  api-mini-task-manager/
  front-mini-task-manager/
```

Essa organizacao favorece manter o Compose integrado na raiz da API, apontando o build do frontend para `../front-mini-task-manager`.

## Goals / Non-Goals

**Goals:**

- Subir PostgreSQL, API e frontend com um unico `docker compose up --build`.
- Manter portas locais previsiveis para avaliacao: API em `8080`, PostgreSQL em `5432` e frontend em `5173`.
- Garantir que o frontend em container chame a API por uma URL acessivel ao navegador.
- Preservar o caminho atual de desenvolvimento local sem Docker.

**Non-Goals:**

- Publicar a aplicacao em ambiente remoto.
- Introduzir proxy reverso completo para producao.
- Trocar o mecanismo de autenticacao por cookie HttpOnly.
- Unificar os dois repositórios em monorepo.

## Decisions

### Compose integrado na API

Manter o Compose na raiz da API e adicionar um servico `front` com `build.context: ../front-mini-task-manager`.

Racional: a API ja concentra banco e backend, e o Compose atual ja conhece as variaveis do banco e da aplicacao. Como os repositórios estao lado a lado, o contexto relativo resolve a integracao sem mover arquivos.

Alternativa considerada: criar um terceiro repositório ou pasta raiz apenas para orquestracao. Isso deixaria a separacao mais pura, mas aumentaria o custo operacional da prova e exigiria entregar mais um artefato.

### Frontend com build estatico

Adicionar um Dockerfile multi-stage no frontend: uma etapa Node para instalar dependencias e executar `yarn build`, seguida por uma imagem leve de servidor estatico.

Racional: evita rodar o servidor de desenvolvimento Vite em Docker como se fosse producao e entrega arquivos estaticos mais proximos do artefato final.

Alternativa considerada: usar `npm run dev -- --host 0.0.0.0` no container. Isso simplifica o Dockerfile, mas torna a avaliacao dependente de servidor dev e hot reload, que nao sao necessarios para a entrega.

### URL da API para o navegador

Configurar o build do frontend com `VITE_API_BASE_URL=http://localhost:8080`.

Racional: embora containers consigam resolver `api:8080` internamente, o codigo do frontend roda no navegador do usuario. Portanto a URL precisa ser acessivel pelo host.

Alternativa considerada: usar `http://api:8080`. Isso falharia no navegador fora da rede Docker.

### CORS e cookies

Manter `CORS_ALLOWED_ORIGINS=http://localhost:5173`, `AUTH_COOKIE_SECURE=false` e `AUTH_COOKIE_SAME_SITE=Lax` para o ambiente local em HTTP.

Racional: o frontend usa `credentials: "include"` e a API autentica por cookie HttpOnly. Essas configuracoes sao necessarias para o fluxo local continuar funcionando.

## Risks / Trade-offs

- Porta local ocupada -> documentar portas usadas e orientar troca via Compose quando necessario.
- Build do frontend fixa `VITE_API_BASE_URL` no artefato estatico -> exigir rebuild quando a URL da API mudar.
- Compose na API referencia caminho relativo do frontend -> documentar que os repositórios devem estar lado a lado em `prova-tecnica/`.
- Volume do PostgreSQL persiste dados entre execucoes -> documentar `docker compose down -v` para limpar o banco local.

## Migration Plan

1. Adicionar Dockerfile e `.dockerignore` ao frontend.
2. Atualizar o `docker-compose.yml` da API com o servico `front`.
3. Ajustar variaveis do Compose para API, banco e frontend.
4. Atualizar READMEs com execucao integrada e validacao.
5. Validar `docker compose up --build`, health check da API e acesso ao frontend.
