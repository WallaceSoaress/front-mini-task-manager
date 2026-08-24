# Mini Task Manager Frontend

Frontend React do desafio técnico Mini Task Manager.

A aplicação consome a API Spring Boot do projeto, utiliza autenticação por cookie HttpOnly e entrega as telas privadas de tarefas e times solicitadas na prova técnica.

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

## Funcionalidades Entregues

- Cadastro de usuário em `POST /auth/register`.
- Login integrado com `POST /auth/login`.
- Recuperação da sessão autenticada por `GET /auth/me`.
- Logout por `POST /auth/logout`.
- Rotas públicas e privadas.
- Board de tarefas inspirado no Jira.
- Filtros por status, responsável e prioridade.
- Listagem paginada de tarefas.
- Criação, edição, detalhes e exclusão de tarefas.
- Validação de tarefa concluída com responsável obrigatório.
- Seleção de responsável filtrada pelos membros do time escolhido.
- Cadastro de times com seleção de membros.
- Exclusão de times com confirmação e tratamento de bloqueio da API.
- Requisições autenticadas com `credentials: "include"`.
- Sem armazenamento de JWT em `localStorage` ou `sessionStorage`.

## Estrutura

```text
src/
  components/
    layout/
    tasks/
    teams/
  hooks/
    auth.tsx
    tasks/
  interfaces/
  pages/
    private/
      Home/
      Tasks/
      Teams/
    public/
      Login/
      Register/
  routes/
  services/
  styles/
  validations/
tests/
  e2e/
```

Principais responsabilidades:

- `pages`: telas públicas e privadas.
- `components`: componentes reutilizáveis de layout, tarefas e times.
- `services`: clientes HTTP para a API.
- `hooks`: estado de autenticação e consultas/mutations com TanStack Query.
- `validations`: regras de validação dos formulários.
- `interfaces`: contratos TypeScript usados pela aplicação.
- `tests/e2e`: testes de fluxo com Playwright e API mockada.

## Pré-requisitos

- Node.js compatível com Vite 8.
- npm ou Yarn.
- API Mini Task Manager executando localmente quando for testar o fluxo integrado.

O projeto possui `package-lock.json` e `yarn.lock`. Para uma instalação limpa, prefira usar um único gerenciador por ambiente.

## Configuração

Crie um arquivo `.env` baseado em `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

A API precisa permitir CORS com credenciais para a origem do frontend. Em desenvolvimento, a origem padrão do Vite é:

```text
http://localhost:5173
```

## Executando Localmente

Node:

```bash
26.0.0
```

Instale as dependências:

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

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm run test:e2e
npm run test:e2e:ui
```

Observação: a configuração do Playwright sobe o frontend em `http://127.0.0.1:5173` e aponta `VITE_API_BASE_URL` para `http://127.0.0.1:3333`, onde os testes interceptam/mockam as chamadas da API.

## Build

```bash
npm run build
```

Esse comando executa:

1. `tsc -b`
2. `vite build`

## Testes

Execute os testes E2E:

```bash
npm run test:e2e
```

Também é possível rodar somente o fluxo de tarefas:

```bash
yarn playwright test tests/e2e/tasks.spec.ts
```

Cenários cobertos atualmente:

- Redirecionamento de usuário não autenticado.
- Carregamento do board com tarefas.
- Estado vazio.
- Erro de listagem e tentativa novamente.
- Filtros por status, responsável e prioridade.
- Criação de tarefa com payload preenchido.
- Validação de título obrigatório e limpeza da mensagem ao corrigir.
- Bloqueio de prazo passado e tarefa concluída sem responsável.
- Erro da API mantendo o modal aberto.
- Detalhes, edição e exclusão de tarefa.
- Paginação.
- Responsáveis filtrados por time e limpeza de responsável inválido.
- Cadastro de usuário.

## Integração com a API

Base URL configurável:

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
GET    /tasks?page=0&size=10&sort=createdAt,desc
GET    /tasks/{id}
POST   /tasks
PUT    /tasks/{id}
DELETE /tasks/{id}
```

Filtros de tarefas:

```text
status
responsibleId
priority
page
size
sort
```

Payload de criação/edição de tarefa:

```json
{
  "title": "Implementar listagem de tarefas",
  "description": "Criar endpoint paginado com filtros",
  "status": "TODO",
  "priority": "HIGH",
  "responsibleId": "uuid-do-usuario",
  "teamId": "uuid-do-time",
  "dueDate": "2026-08-30"
}
```

Status esperados:

```text
TODO
IN_PROGRESS
DONE
```

Prioridades esperadas:

```text
LOW
MEDIUM
HIGH
```

## Autenticação

O frontend não manipula o JWT diretamente.

Fluxo:

```text
Usuário -> Login/Cadastro
Frontend -> POST /auth/login ou POST /auth/register
API -> envia JWT em cookie HttpOnly
Frontend -> chamadas com credentials: "include"
API -> valida cookie nos endpoints protegidos
Frontend -> GET /auth/me recupera usuário ao recarregar a página
```

Decisões:

- O token não é salvo em `localStorage`.
- O token não é salvo em `sessionStorage`.
- Todas as chamadas passam pelo helper `apiFetch`.
- Erros da API são normalizados em mensagens compreensíveis para a interface.

## Telas

- Login.
- Cadastro.
- Home privada.
- Tarefas.
- Times.

Fluxo principal esperado:

```text
Cadastro/Login -> Tarefas -> Filtros -> Criação -> Detalhes -> Edição -> Conclusão -> Exclusão
```

## Regras de Negócio no Frontend

- Título da tarefa é obrigatório.
- Time da tarefa é obrigatório.
- Prazo, quando informado, não pode ser anterior ao dia atual.
- Tarefa com status `DONE` exige responsável.
- Responsável deve pertencer ao time selecionado.
- Ao trocar o time, um responsável incompatível é limpo antes da submissão.

A regra crítica de conclusão também deve existir no backend, que continua sendo a fonte de verdade para validações de domínio.

## Decisões Técnicas

- React com TypeScript e Vite para uma base simples, rápida e adequada ao escopo da prova.
- React Router para separar rotas públicas e privadas.
- Context API para estado de autenticação.
- TanStack Query para cache, loading, erros, mutations e invalidação de listagens.
- React Hook Form e Yup para validações de formulário.
- Styled Components com tema centralizado para manter estilos organizados.
- Services dedicados para chamadas HTTP, evitando requisições diretas dentro das páginas.
- Playwright para validar fluxos de usuário com mocks de API previsíveis.

## Como Testar o Fluxo Integrado

1. Suba a API em `http://localhost:8080`.
2. Confirme que a API permite CORS com credenciais para `http://localhost:5173`.
3. Inicie o frontend com `npm run dev`.
4. Acesse `http://localhost:5173`.
5. Cadastre um usuário ou faça login.
6. Crie um time em `Times`.
7. Crie uma tarefa associada ao time.
8. Use filtros, detalhes, edição, conclusão e exclusão de tarefas.
9. Tente excluir um time com tarefa vinculada e confirme que a API bloqueia a exclusão.

## Limitações Conhecidas

- A gestão de membros de times acontece na criação do time; ainda não há tela para editar membros depois.
- Não há dashboard analítico; a home privada funciona como entrada simples para navegação.
- A autorização granular por papel, dono da tarefa ou membro do time depende de evolução da API.
- Os testes automatizados atuais são E2E focados nos principais fluxos; não há testes unitários de componentes.

## Melhorias Futuras

- Tela de edição de times e membros.
- Busca textual de tarefas.
- Ordenação configurável pelo usuário.
- Melhorias de acessibilidade com auditoria automatizada.
- Testes unitários para validações e componentes críticos.
- Pipeline CI executando build, lint e Playwright.
