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
