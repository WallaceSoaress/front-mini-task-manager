## ADDED Requirements

### Requirement: Rota publica de cadastro de usuario
O sistema SHALL expor uma rota publica de cadastro para usuarios nao autenticados e permitir navegacao bidirecional entre login e cadastro.

#### Scenario: Usuario acessa cadastro pela tela de login
- **WHEN** um usuario nao autenticado aciona a opcao "Cadastre-se" na tela de login
- **THEN** o sistema navega para a tela publica de cadastro

#### Scenario: Usuario retorna para login pela tela de cadastro
- **WHEN** um usuario nao autenticado aciona a opcao "Entrar" na tela de cadastro
- **THEN** o sistema navega para a tela publica de login

#### Scenario: Tela de cadastro usa o padrao visual do login
- **WHEN** a tela de cadastro e renderizada
- **THEN** o sistema exibe fundo, card centralizado, cores, campos, espacamentos, botao e comportamento responsivo consistentes com a tela de login

### Requirement: Cadastro de usuario integrado a API
O sistema SHALL permitir que usuarios nao autenticados criem uma conta enviando nome, e-mail e senha para a API de cadastro.

#### Scenario: Cadastro bem-sucedido
- **WHEN** o usuario preenche nome, e-mail, senha e confirmacao de senha validos e envia o formulario
- **THEN** o sistema envia `POST /auth/register` com `Content-Type: application/json` e corpo contendo apenas `name`, `email` e `password`

#### Scenario: API confirma cadastro
- **WHEN** a API responde ao cadastro com `201 Created`
- **THEN** o sistema mostra a mensagem "Cadastro realizado com sucesso! Faca login para continuar." e redireciona o usuario para `/login`

#### Scenario: Cadastro nao autentica automaticamente
- **WHEN** a API responde ao cadastro com sucesso
- **THEN** o sistema nao chama o endpoint de login automaticamente, nao armazena token e nao marca o usuario como autenticado

#### Scenario: API rejeita cadastro
- **WHEN** a API rejeita o cadastro ou a requisicao nao consegue acessar a API
- **THEN** o sistema mantem o usuario na tela de cadastro e mostra uma mensagem de erro amigavel

### Requirement: Validacao do formulario de cadastro
O sistema SHALL validar os dados do formulario de cadastro antes de enviar a requisicao para a API.

#### Scenario: Campos obrigatorios ausentes
- **WHEN** o usuario tenta cadastrar sem preencher todos os campos obrigatorios
- **THEN** o sistema nao envia a requisicao de cadastro e mostra mensagens de validacao para os campos ausentes

#### Scenario: E-mail invalido
- **WHEN** o usuario informa um e-mail fora de formato valido e tenta cadastrar
- **THEN** o sistema nao envia a requisicao de cadastro e mostra uma mensagem de validacao para o e-mail

#### Scenario: Senha e confirmacao diferentes
- **WHEN** o usuario informa senha e confirmacao de senha diferentes e tenta cadastrar
- **THEN** o sistema nao envia a requisicao de cadastro e mostra uma mensagem informando que as senhas devem ser iguais

#### Scenario: Envio em andamento
- **WHEN** a requisicao de cadastro esta em andamento
- **THEN** o sistema mostra estado de carregamento no botao de cadastro e desabilita o botao para evitar multiplos envios
