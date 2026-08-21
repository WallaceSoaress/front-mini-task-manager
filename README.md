# Mini Task Manager Frontend

Frontend React do desafio tecnico Mini Task Manager.

A aplicacao consome a API Spring Boot, usa autenticacao por cookie HttpOnly e entrega as telas privadas de tarefas e times solicitadas na prova tecnica.

## Escopo entregue

- Login integrado com `POST /auth/login`.
- Identificacao da sessao autenticada por `GET /auth/me`.
- Rotas publicas e privadas.
- Board de tarefas inspirado no Jira.
- Filtros por status, responsavel e prioridade.
- Listagem paginada de tarefas.
- Criacao, edicao, detalhes e exclusao de tarefas.
- Cadastro de times com selecao de membros.
- Exclusao de times com confirmacao e tratamento de bloqueio da API.
- Requisicoes autenticadas com `credentials: "include"`.
- Sem armazenamento de JWT em `localStorage` ou `sessionStorage`.

## Decisoes tecnicas

- React com TypeScript e Vite para uma base simples e rapida.
- React Router para separar rotas publicas e privadas.
- Context API para estado de autenticacao.
- TanStack Query para consultas, mutations, cache e invalidacao de listagens.
- React Hook Form e Yup para formularios e validacoes.
- Styled Components com tema centralizado para estilos.
- Services dedicados para chamadas HTTP, evitando requisicoes diretas dentro das paginas.

## Configuracao

Crie um `.env` baseado no `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

A API precisa permitir CORS com credenciais para a origem do frontend, por padrao:

```text
http://localhost:5173
```

## Como executar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Como testar o fluxo principal

1. Suba a API em `http://localhost:8080`.
2. Cadastre ou autentique um usuario pela API.
3. Abra o frontend em `http://localhost:5173`.
4. Faca login.
5. Crie um time em `Times`.
6. Crie uma tarefa associada a esse time.
7. Verifique o board, filtros, detalhes, edicao e exclusao de tarefas.
8. Tente excluir um time com tarefa vinculada e confirme que a API bloqueia a exclusao.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Observacoes

- O cookie de autenticacao e criado pela API como HttpOnly.
- O frontend nunca le o token diretamente.
- Ao atualizar a pagina, o estado autenticado e recuperado por `GET /auth/me`.
- As listagens sao atualizadas por invalidacao de queries, sem `window.location.reload()`.
