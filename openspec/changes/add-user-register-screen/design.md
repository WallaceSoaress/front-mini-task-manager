## Context

A area publica atual possui uma tela de login em `src/pages/public/Login` com estado local, `styled-components`, labels acessiveis e tratamento de erro via `ApiRequestError`. O `AuthProvider` carrega usuario por `/auth/me` e autentica somente quando `signIn` chama `/auth/login`; o cadastro deve ficar fora desse fluxo para nao salvar token nem marcar usuario como autenticado.

As rotas publicas hoje sao compostas com `PublicRoutes` dentro de `/login`, o que limita a inclusao de `/register` e pode gerar aviso de rotas aninhadas. A mudanca deve preservar o comportamento de redirecionamento para usuarios autenticados e nao autenticados.

## Goals / Non-Goals

**Goals:**

- Criar uma tela de cadastro visualmente consistente com login.
- Reutilizar ou compartilhar estilos do login para evitar duplicacao visual.
- Adicionar service de cadastro que usa o `apiFetch` existente e envia somente os campos aceitos pela API.
- Validar dados antes do envio e impedir multiplos submits enquanto a requisicao estiver pendente.
- Manter o cadastro separado do estado de autenticacao.
- Adicionar cobertura E2E para o fluxo principal, validacoes e erros relevantes.

**Non-Goals:**

- Fazer login automatico apos cadastro.
- Persistir token, usuario ou sessao durante o cadastro.
- Alterar o contrato do backend.
- Introduzir nova biblioteca de formulario ou notificacao.
- Redesenhar a tela de login alem do link de navegacao necessario.

## Decisions

### Compartilhar a estrutura visual publica

Extrair ou reutilizar os estilos de `Login/styles.ts` para que Login e Register usem o mesmo shell, card, campos, mensagem e botao. A alternativa seria duplicar `PageShell`, `LoginPanel`, `Form` e `Field` em `Register/styles.ts`, mas isso aumenta o risco de divergencia visual em futuras manutencoes.

### Cadastro como pagina publica independente

Criar `src/pages/public/Register/index.tsx` com formulario proprio e navegacao para login. A pagina deve chamar um service `registerUser` ou equivalente em `authService.ts`, sem usar `useAuth().signIn` e sem alterar `user` no contexto. Isso deixa explicito que o sucesso do cadastro nao equivale a autenticacao.

### Validacao local simples

Usar validacao local no componente antes de chamar a API, coerente com o login atual e suficiente para os requisitos: obrigatorios, e-mail em formato basico e igualdade entre senha e confirmacao. A alternativa seria introduzir `react-hook-form`/`yup` nessa tela, mas o login publico atual nao usa esse padrao e a complexidade aqui e pequena.

### Redirecionamento apos feedback de sucesso

Ao receber `201 Created`, exibir mensagem de sucesso na tela de cadastro e redirecionar para `/login` apos um intervalo curto ou apos o React renderizar o feedback. A mensagem deve ser observavel para teste. Se no futuro for desejavel preservar a mensagem depois da navegacao, pode-se usar `location.state` na tela de login, mas isso nao e necessario para atender o fluxo atual.

### Ajuste das rotas publicas

Revisar a composicao das rotas para suportar `/login` e `/register` como rotas publicas de primeiro nivel para usuarios nao autenticados. Para usuarios autenticados, ambas devem redirecionar para a area privada, preservando o comportamento atual de nao mostrar telas publicas para quem ja esta autenticado.

## Risks / Trade-offs

- Mensagem de sucesso desaparecer rapido demais para o usuario ou para o teste -> manter o texto visivel antes de navegar e testar com espera baseada em navegacao/estado, sem sleeps fixos.
- Validacao de e-mail muito permissiva ou restritiva -> usar uma regra simples e previsivel no frontend, deixando validacao definitiva para a API.
- Duplicacao acidental dos estilos publicos -> centralizar estilos compartilhados ou importar estilos existentes quando fizer sentido.
- Mudanca de rotas quebrar redirecionamento privado -> cobrir login/register nao autenticados e redirecionamento de autenticado nos testes.
- Backend retornar erro em formatos diferentes -> continuar usando `apiFetch`, que ja normaliza `details`, `message`, `error` e erro de conexao.

## Migration Plan

1. Adicionar o service de cadastro sem alterar os metodos atuais de login.
2. Criar a pagina de cadastro e linkar login/cadastro.
3. Ajustar rotas publicas para incluir `/register`.
4. Adicionar testes E2E mockando `/auth/register`, `/auth/login` e `/auth/me` quando necessario.
5. Validar com `npm run lint`, `npm run build` e suite Playwright relevante.
