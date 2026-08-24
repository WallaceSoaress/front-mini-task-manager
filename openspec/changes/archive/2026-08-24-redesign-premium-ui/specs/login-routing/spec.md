## ADDED Requirements

### Requirement: Consistencia visual das rotas publicas
O sistema SHALL manter login e cadastro visualmente consistentes com o sistema visual refinado, preservando autenticacao, privacidade do token, navegacao publica e validacoes existentes.

#### Scenario: Login legivel e profissional
- **WHEN** a pagina de login e renderizada
- **THEN** fundo, card, titulo, textos auxiliares, campos, botao, erros e links apresentam contraste, hierarquia e espacamento consistentes com a identidade visual refinada

#### Scenario: Cadastro legivel e profissional
- **WHEN** a pagina de cadastro e renderizada
- **THEN** campos, mensagens, acoes e links apresentam contraste, hierarquia e espacamento consistentes com a tela de login e com o restante da aplicacao

#### Scenario: Estados de formulario publicos
- **WHEN** login ou cadastro apresenta erro, sucesso, foco, disabled ou loading
- **THEN** o sistema comunica o estado de forma clara, acessivel e visualmente coerente
