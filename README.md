# Mini Task Manager Frontend

Frontend React do desafio técnico Mini Task Manager.

A aplicação consome a API Spring Boot do projeto, usa autenticação por cookie HttpOnly e entrega as telas de cadastro, login, tarefas e times.

## Tecnologias

- React 19.
- TypeScript.
- Vite.
- React Router.
- TanStack Query.
- React Hook Form.
- Yup.
- Styled Components.
- Playwright.
- ESLint.

## Funcionalidades

- Cadastro de usuário.
- Login, sessão atual e logout.
- Rotas públicas e privadas.
- Board de tarefas inspirado no Jira.
- Filtros por status, responsável e prioridade.
- Paginação de tarefas.
- Criação, detalhes, edição e exclusão de tarefas.
- Validação de tarefa concluída com responsável obrigatório.
- Responsáveis filtrados pelos membros do time selecionado.
- Cadastro e exclusão de times.
- Requisições autenticadas com `credentials: "include"`.
- Sem armazenamento de JWT em `localStorage` ou `sessionStorage`.

## Estrutura

```text
src/
  components/     layout, tarefas e times
  hooks/          autenticação e consultas/mutations
  interfaces/     contratos TypeScript
  pages/          telas públicas e privadas
  routes/         rotas públicas e privadas
  services/       clientes HTTP da API
  styles/         tema e estilos globais
  validations/    validações de formulários
tests/e2e/        testes Playwright
```

## Pré-requisitos

- Node.js compatível com Vite 8.
- npm.
- API Mini Task Manager em execução para testar o fluxo integrado.

## Configuração

Crie um `.env` baseado em `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

A API deve permitir CORS com credenciais para:

```text
http://localhost:5173
```

## Executando

Instale as dependências:

```bash
npm install
```

Inicie o frontend:

```bash
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm run test:e2e
npm run test:e2e:ui
```

## Build

```bash
npm run build
```

O build executa TypeScript e Vite:

```text
tsc -b && vite build
```

## Testes

```bash
npm run test:e2e
```

Os testes Playwright cobrem os principais fluxos de cadastro, autenticação, listagem, filtros, criação, validações, detalhes, edição, exclusão e paginação de tarefas.

## Integração com a API

Base configurável:

```text
VITE_API_BASE_URL=http://localhost:8080
```

Endpoints consumidos:

```text
POST   /auth/register
POST   /auth/login
GET    /auth/me
POST   /auth/logout
GET    /users
GET    /teams
POST   /teams
DELETE /teams/{id}
GET    /tasks
GET    /tasks/{id}
POST   /tasks
PUT    /tasks/{id}
DELETE /tasks/{id}
```

Filtros enviados para `GET /tasks`:

```text
status
responsibleId
priority
page
size
sort
```

## Autenticação

O frontend não lê nem armazena o JWT. A API envia o token em cookie HttpOnly e o navegador o inclui nas chamadas autenticadas.

Fluxo:

```text
Login -> API envia cookie HttpOnly -> frontend usa credentials: "include" -> GET /auth/me recupera a sessão ao recarregar
```

## Telas

- Login.
- Cadastro.
- Tarefas.
- Times.

Fluxo principal:

```text
Cadastro/Login -> Tarefas -> Filtros -> Criação -> Detalhes -> Edição -> Conclusão -> Exclusão
```

## Regras no Frontend

- Título da tarefa é obrigatório.
- Time da tarefa é obrigatório.
- Prazo não pode ser anterior ao dia atual.
- Tarefa `DONE` exige responsável.
- Responsável deve pertencer ao time selecionado.
- Ao trocar o time, responsável incompatível é limpo antes do envio.

A API permanece como fonte de verdade para regras de domínio.

## Decisões Técnicas

- React com TypeScript e Vite para simplicidade e velocidade.
- React Router para rotas públicas e privadas.
- Context API para autenticação.
- TanStack Query para cache, loading, erros e invalidação de listagens.
- React Hook Form e Yup para formulários.
- Styled Components para estilo com tema centralizado.
- Services dedicados para chamadas HTTP.
- Playwright para validar fluxos principais.

## Trade-offs

- React com Vite foi escolhido para manter a entrega simples, rápida e fácil de executar localmente.
- O frontend valida formulários para melhorar a experiência do usuário, mas a API continua sendo a fonte de verdade para regras de domínio.
- Os testes automatizados usam Playwright E2E para cobrir os fluxos principais em vez de uma suíte grande de testes unitários de componentes.
- O frontend fica em repositório separado da API para facilitar a entrega independente dos links solicitados.

## Como Validar o Fluxo Integrado

1. Suba a API em `http://localhost:8080`.
2. Inicie o frontend com `npm run dev`.
3. Acesse `http://localhost:5173`.
4. Cadastre um usuário ou faça login.
5. Crie um time.
6. Crie uma tarefa associada ao time.
7. Valide filtros, detalhes, edição, conclusão e exclusão.

## Limitações Conhecidas

- A tela de times cria e exclui times, mas não edita membros depois da criação.
- Não há autorização granular por papel ou dono da tarefa no frontend; essa evolução depende das regras da API.

## O que ficou de fora e por quê

- Edição de membros de times: ficou fora para priorizar o fluxo obrigatório de criação de times e gerenciamento de tarefas.
- Dashboard analítico: ficou fora por não ser requisito obrigatório da prova.
- Autorização visual por perfil ou dono da tarefa: ficou fora porque depende de regras granulares na API.
- Ambiente publicado: ficou fora porque a entrega foi preparada para execução local integrada com a API.

## Ambiente publicado

Não há ambiente publicado para este frontend. A forma de avaliação prevista é a execução local descrita neste README.
