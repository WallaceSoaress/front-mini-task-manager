## 1. Frontend Docker

- [x] 1.1 Adicionar `.dockerignore` no frontend e verificar que `node_modules`, `dist`, relatórios de teste e arquivos locais nao entram no contexto Docker.
- [x] 1.2 Criar Dockerfile multi-stage do frontend com etapa de build via Yarn e servidor estatico final, verificando que `docker build` conclui com sucesso.
- [x] 1.3 Configurar o build do frontend para receber `VITE_API_BASE_URL=http://localhost:8080`, verificando que o bundle usa a URL publica da API acessivel pelo navegador.

## 2. Orquestracao Docker Compose

- [x] 2.1 Atualizar o `docker-compose.yml` da API para incluir o servico `front` com contexto `../front-mini-task-manager`, verificando que `docker compose config` resolve os caminhos corretamente.
- [x] 2.2 Manter dependencias entre `postgres` e `api` com health check, verificando que a API sobe somente apos o banco estar saudavel.
- [x] 2.3 Expor o frontend na porta documentada e configurar a API com `CORS_ALLOWED_ORIGINS=http://localhost:5173`, verificando que login e chamadas protegidas continuam usando cookies com credenciais.

## 3. Documentacao

- [x] 3.1 Atualizar o README da API com o fluxo integrado API + banco + frontend, verificando que os comandos de subir, listar, parar e limpar volumes estao documentados.
- [x] 3.2 Atualizar o README do frontend para apontar o Compose integrado como opcao de execucao, verificando que o fluxo sem Docker continua documentado.
- [x] 3.3 Documentar a exigencia de manter os repositórios lado a lado em `prova-tecnica/`, verificando que o caminho relativo usado pelo Compose fica explicito.

## 4. Validacao Integrada

- [x] 4.1 Executar `docker compose up --build` na raiz da API e verificar que os servicos `postgres`, `api` e `front` ficam em execucao.
- [x] 4.2 Verificar `http://localhost:8080/actuator/health`, `http://localhost:8080/swagger/index.html` e o frontend em `http://localhost:5173`.
- [ ] 4.3 Validar no navegador o fluxo cadastro ou login, criacao de time e criacao de tarefa, confirmando comunicacao completa entre frontend, API e banco.
