## 1. Service e rotas publicas

- [x] 1.1 Adicionar ao `authService` um metodo de cadastro que chama `POST /auth/register` com `name`, `email` e `password`, verificando em teste E2E ou mock que o body nao inclui confirmacao de senha
- [x] 1.2 Ajustar a composicao das rotas publicas para expor `/login` e `/register` para usuarios nao autenticados, verificando manualmente ou por teste que ambas renderizam sem aviso de rota aninhada
- [x] 1.3 Preservar o redirecionamento de usuario autenticado para a area privada ao acessar `/login` ou `/register`, verificando por teste E2E com `/auth/me` autenticado

## 2. Tela de cadastro e navegacao

- [x] 2.1 Criar a pagina `Register` seguindo o mesmo fundo, card, cores, campos, espacamentos, botao e responsividade da tela de login, verificando visualmente em viewport desktop e mobile
- [x] 2.2 Reutilizar ou centralizar estilos compartilhados entre Login e Register, verificando que a tela de login mantem o mesmo comportamento visual apos a alteracao
- [x] 2.3 Adicionar na tela de login o texto "Nao possui uma conta? Cadastre-se" com navegacao para `/register`, verificando com `getByRole` que o link navega corretamente
- [x] 2.4 Adicionar na tela de cadastro o texto "Ja possui uma conta? Entrar" com navegacao para `/login`, verificando com `getByRole` que o link navega corretamente

## 3. Formulario, validacoes e feedback

- [x] 3.1 Implementar campos Nome, E-mail, Senha e Confirmar senha com labels acessiveis, verificando que `getByLabel` localiza todos os campos
- [x] 3.2 Validar campos obrigatorios antes do envio, verificando que nenhuma requisicao `POST /auth/register` e enviada quando houver campo vazio
- [x] 3.3 Validar formato de e-mail antes do envio, verificando mensagem amigavel e ausencia de requisicao quando o e-mail for invalido
- [x] 3.4 Validar igualdade entre senha e confirmacao de senha, verificando mensagem amigavel e ausencia de requisicao quando os valores forem diferentes
- [x] 3.5 Implementar estado de loading e botao desabilitado durante o envio, verificando que multiplos cliques nao geram multiplas requisicoes
- [x] 3.6 Exibir erros retornados pela API ou erro de conexao usando mensagem acessivel, verificando que o usuario permanece em `/register`
- [x] 3.7 Ao receber `201 Created`, exibir "Cadastro realizado com sucesso! Faca login para continuar." e redirecionar para `/login`, verificando que nao ha login automatico nem persistencia de token

## 4. Testes Playwright

- [x] 4.1 Adicionar mocks de `/auth/register` aos helpers E2E quando necessario, verificando que os testes conseguem capturar payload, status de sucesso e erro da API
- [x] 4.2 Criar teste E2E do happy path de cadastro, verificando navegacao login -> cadastro -> sucesso -> `/login` e payload enviado sem `confirmPassword`
- [x] 4.3 Criar testes E2E de validacoes de obrigatorios, e-mail invalido e senha divergente, verificando mensagens e ausencia de chamada ao backend
- [x] 4.4 Criar teste E2E de erro do backend no cadastro, verificando mensagem amigavel e permanencia na tela de cadastro
- [x] 4.5 Criar teste E2E garantindo que o cadastro bem-sucedido nao chama `/auth/login` automaticamente e nao leva o usuario para rotas privadas

## 5. Validacao final

- [x] 5.1 Executar `npm run lint` e verificar ausencia de erros
- [x] 5.2 Executar `npm run build` e verificar ausencia de erros
- [x] 5.3 Executar `npm run test:e2e` e verificar que a suite Playwright passa sem `waitForTimeout`, XPath ou seletores frageis
- [x] 5.4 Revisar os arquivos alterados e verificar que apenas partes necessarias do fluxo publico de auth foram modificadas
