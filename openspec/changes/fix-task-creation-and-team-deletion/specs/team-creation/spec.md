## ADDED Requirements

### Requirement: Exclusao segura de time
O sistema SHALL permitir excluir times pela API somente quando nao existirem demandas vinculadas ao time.

#### Scenario: Usuario solicita exclusao de time
- **WHEN** o usuario autenticado aciona a exclusao de um time na tela de times
- **THEN** o sistema solicita confirmacao antes de enviar qualquer requisicao de exclusao

#### Scenario: Usuario confirma exclusao sem demandas vinculadas
- **WHEN** o usuario confirma a exclusao de um time que nao possui demandas vinculadas
- **THEN** o sistema envia a exclusao para a API, remove o time da listagem e mostra feedback de sucesso sem recarregar a pagina

#### Scenario: Usuario cancela exclusao
- **WHEN** o usuario cancela a confirmacao de exclusao
- **THEN** o sistema nao envia requisicao de exclusao e mantem a listagem inalterada

#### Scenario: Time possui demandas vinculadas
- **WHEN** a API identifica que o time possui uma ou mais demandas vinculadas
- **THEN** o sistema bloqueia a exclusao no backend, mantem o time existente e retorna uma mensagem de erro para exibicao no frontend

#### Scenario: Exclusao falha na API
- **WHEN** a API rejeita a exclusao por erro de negocio, permissao ou falha inesperada
- **THEN** o sistema mantem a listagem consistente e mostra uma mensagem de erro acionavel ao usuario
