## Purpose

Define a execucao local integrada do Mini Task Manager com Docker Compose, cobrindo frontend, API e banco de dados em um fluxo unico e reproduzivel para avaliacao e desenvolvimento.

## Requirements

### Requirement: Ambiente integrado por Docker Compose
O sistema SHALL fornecer um comando Docker Compose capaz de subir frontend, API e banco PostgreSQL com configuracao local padrao.

#### Scenario: Subida completa do ambiente
- **WHEN** uma pessoa executa o comando documentado de Docker Compose a partir do local indicado
- **THEN** os servicos de banco, API e frontend ficam em execucao sem exigir instalacao local de Java, Maven, Node.js ou PostgreSQL

#### Scenario: Rebuild reproduzivel
- **WHEN** uma pessoa executa o comando documentado com rebuild
- **THEN** as imagens da API e do frontend sao reconstruidas a partir dos arquivos versionados nos repositórios

### Requirement: Frontend acessivel pelo navegador
O sistema SHALL expor o frontend em uma porta local documentada e SHALL permitir que o navegador consuma a API usando uma URL acessivel pelo host.

#### Scenario: Acesso ao frontend
- **WHEN** o ambiente Docker Compose esta saudavel
- **THEN** o frontend fica acessivel em `http://localhost:5173` ou em outra porta explicitamente documentada

#### Scenario: Chamadas autenticadas para API
- **WHEN** o frontend executado em container realiza login, logout, cadastro ou chamadas protegidas
- **THEN** as requisicoes usam credenciais do navegador e a configuracao de CORS da API permite a origem do frontend

### Requirement: API integrada ao banco
O sistema SHALL conectar a API ao PostgreSQL do mesmo ambiente Docker Compose e SHALL aplicar migracoes de banco automaticamente na inicializacao.

#### Scenario: Inicializacao da API apos o banco
- **WHEN** o banco ainda nao esta pronto para conexoes
- **THEN** a API aguarda a disponibilidade do banco antes de iniciar o fluxo principal de execucao

#### Scenario: Schema versionado
- **WHEN** a API inicia conectada ao banco do Compose
- **THEN** as migracoes Flyway versionadas sao aplicadas antes do uso dos endpoints

### Requirement: Validacao operacional documentada
O sistema SHALL documentar como iniciar, verificar, parar e limpar o ambiente Docker Compose integrado.

#### Scenario: Verificacao dos servicos
- **WHEN** uma pessoa segue a documentacao de validacao
- **THEN** ela consegue confirmar a disponibilidade do frontend, do health check da API, do Swagger e dos containers em execucao

#### Scenario: Limpeza do ambiente local
- **WHEN** uma pessoa executa o comando documentado para remover o ambiente
- **THEN** os containers sao parados e a opcao de remover o volume local do banco fica clara
