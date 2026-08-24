## Purpose

Define o comportamento do shell de login do frontend, incluindo selecao entre rotas publicas e privadas, estado de usuario autenticado e exibicao da versao sem expor tokens de autenticacao ao JavaScript.

## Requirements

### Requirement: Rota publica de login
O sistema SHALL expor uma rota publica de login para usuarios nao autenticados.

#### Scenario: Usuario nao autenticado abre a aplicacao
- **WHEN** nenhum usuario autenticado estiver disponivel no estado do frontend
- **THEN** o sistema renderiza a pagina de login como ponto de entrada publico

#### Scenario: Pagina de login usa tema do sistema
- **WHEN** a pagina de login e renderizada
- **THEN** os estilos visiveis do login usam as cores e tokens de tipografia do tema da aplicacao

### Requirement: Envio de login baseado em cookie
O sistema SHALL enviar credenciais de login para a URL configurada da API com inclusao de credenciais do navegador.

#### Scenario: Usuario envia credenciais validas
- **WHEN** o usuario envia e-mail e senha pela pagina de login
- **THEN** o sistema envia a requisicao de login com credenciais incluidas para que o navegador possa receber o cookie de autenticacao HttpOnly

#### Scenario: Resposta de login contem usuario autenticado
- **WHEN** a requisicao de login e concluida com sucesso
- **THEN** o sistema armazena o perfil do usuario retornado no estado de autenticacao do frontend sem ler ou armazenar o token JWT

#### Scenario: Requisicao de login falha
- **WHEN** a API rejeita as credenciais ou a requisicao nao consegue acessar a API
- **THEN** o sistema mantem o usuario na pagina de login e mostra uma mensagem de erro acionavel

### Requirement: Rota privada apos login
O sistema SHALL renderizar rotas privadas da aplicacao apenas depois que o frontend marcar o usuario como autenticado.

#### Scenario: Login bem-sucedido altera o conjunto de rotas
- **WHEN** o login e concluido com sucesso e o usuario autenticado e armazenado no estado de contexto
- **THEN** o sistema renderiza o conjunto de rotas privadas em vez da rota publica de login

#### Scenario: Usuario nao autenticado solicita conteudo privado
- **WHEN** um usuario nao autenticado tenta acessar conteudo privado
- **THEN** o sistema redireciona ou retorna para a rota publica de login

### Requirement: Privacidade do token de autenticacao
O sistema SHALL NOT armazenar tokens de autenticacao em storage do navegador acessivel por JavaScript.

#### Scenario: Login e concluido com sucesso
- **WHEN** a API retorna apos um login bem-sucedido
- **THEN** o sistema nao grava valores de JWT ou token de sessao em `localStorage`, `sessionStorage`, IndexedDB ou variaveis em memoria destinadas a expor o token bruto

### Requirement: Exibicao da versao da aplicacao
O sistema SHALL exibir a versao do pacote frontend em um local fixo e de baixa enfase no shell principal da aplicacao.

#### Scenario: Shell da aplicacao e renderizado
- **WHEN** a raiz da aplicacao renderiza rotas publicas ou privadas
- **THEN** a versao do pacote fica visivel proxima ao rodape da viewport sem bloquear o conteudo principal

### Requirement: Exemplo de ambiente
O projeto SHALL fornecer um arquivo de exemplo de ambiente para configuracao local da API.

#### Scenario: Desenvolvedor verifica configuracao de ambiente
- **WHEN** o desenvolvedor abre o repositorio
- **THEN** `.env.example` documenta `VITE_API_BASE_URL` com o padrao local da API

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
