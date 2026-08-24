## MODIFIED Requirements

### Requirement: Selecao de membros por usuarios existentes
O sistema SHALL permitir selecionar membros a partir dos usuarios disponiveis retornados pela API, com interacao de multiplas escolhas por clique simples e sem depender de teclas modificadoras do navegador.

#### Scenario: Usuarios disponiveis carregam
- **WHEN** o formulario precisa apresentar membros disponiveis
- **THEN** o sistema usa `GET /users` para obter os usuarios selecionaveis

#### Scenario: Usuario seleciona membros
- **WHEN** o usuario escolhe mais de um membro pelo nome visivel usando cliques simples
- **THEN** o formulario mantem todos os membros escolhidos selecionados e registra internamente os respectivos IDs em `memberIds`

#### Scenario: Usuario alterna selecao de membro
- **WHEN** o usuario clica em um membro ja selecionado
- **THEN** o formulario remove somente esse membro de `memberIds` e preserva os demais membros selecionados

#### Scenario: Usuario envia time sem membros
- **WHEN** nenhum membro esta selecionado
- **THEN** o formulario preserva `memberIds` como lista vazia e permite cadastrar o time se o nome for valido

#### Scenario: Falha ao carregar usuarios
- **WHEN** a consulta de usuarios falha
- **THEN** o formulario informa que nao foi possivel carregar membros e ainda permite cadastrar o time sem membros se o nome for valido
