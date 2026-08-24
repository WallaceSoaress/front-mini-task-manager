## Why

Usuarios novos precisam conseguir criar uma conta diretamente pelo frontend antes de acessar o Mini Task Manager. Hoje a experiencia publica possui apenas login, entao o cadastro depende de uma etapa externa mesmo com o endpoint `POST /auth/register` ja disponivel.

## What Changes

- Adicionar uma tela publica de cadastro de usuario com o mesmo padrao visual da tela de login.
- Adicionar navegacao entre login e cadastro: "Nao possui uma conta? Cadastre-se" e "Ja possui uma conta? Entrar".
- Enviar cadastro para `POST /auth/register` com `name`, `email` e `password`, sem enviar confirmacao de senha.
- Validar campos obrigatorios, formato de e-mail e igualdade entre senha e confirmacao antes do envio.
- Mostrar loading, desabilitar o botao durante a requisicao e exibir erros amigaveis retornados pela API.
- Ao receber `201 Created`, mostrar mensagem de sucesso e redirecionar para `/login`, sem login automatico e sem salvar token.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `login-routing`: adicionar rota publica e fluxo de cadastro de usuario integrado ao endpoint de autenticacao, preservando a privacidade do token e o login manual.

## Impact

- `src/pages/public/Login/index.tsx` e estilos compartilhados/atuais do login para incluir link de cadastro.
- Nova tela publica de cadastro em `src/pages/public/Register`.
- `src/routes/publicRoutes.tsx` e possivelmente `src/routes/index.tsx` para suportar `/register` e corrigir a composicao das rotas publicas.
- `src/services/authService.ts` para adicionar o service de cadastro.
- Testes Playwright existentes podem ser estendidos para cobrir cadastro, validacoes, erro da API e ausencia de login automatico.
