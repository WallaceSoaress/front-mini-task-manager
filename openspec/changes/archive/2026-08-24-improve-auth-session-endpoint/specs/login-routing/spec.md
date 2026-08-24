## MODIFIED Requirements

### Requirement: Envio de login baseado em cookie
O sistema SHALL enviar credenciais de login para a URL configurada da API com inclusao de credenciais do navegador e SHALL recuperar a sessao autenticada atual por um endpoint semanticamente claro.

#### Scenario: Usuario envia credenciais validas
- **WHEN** o usuario envia e-mail e senha pela pagina de login
- **THEN** o sistema envia a requisicao de login com credenciais incluidas para que o navegador possa receber o cookie de autenticacao HttpOnly

#### Scenario: Resposta de login contem usuario autenticado
- **WHEN** a requisicao de login e concluida com sucesso
- **THEN** o sistema armazena o perfil do usuario retornado no estado de autenticacao do frontend sem ler ou armazenar o token JWT

#### Scenario: Requisicao de login falha
- **WHEN** a API rejeita as credenciais ou a requisicao nao consegue acessar a API
- **THEN** o sistema mantem o usuario na pagina de login e mostra uma mensagem de erro acionavel

#### Scenario: Sessao atual possui usuario autenticado
- **WHEN** o frontend precisa restaurar ou verificar a autenticacao existente usando o cookie HttpOnly
- **THEN** o sistema usa `GET /auth/session` para retornar os dados do usuario autenticado atual

#### Scenario: Endpoint legado de usuario atual permanece compativel
- **WHEN** um consumidor existente chama `GET /auth/me` com uma sessao valida
- **THEN** o sistema retorna os mesmos dados do usuario autenticado atual sem quebrar compatibilidade

#### Scenario: Documentacao da sessao autenticada e clara
- **WHEN** a documentacao Swagger/OpenAPI lista os endpoints de autenticacao
- **THEN** `GET /auth/session` aparece com resumo e descricao que indicam que ele obtem a sessao ou usuario autenticado atual
