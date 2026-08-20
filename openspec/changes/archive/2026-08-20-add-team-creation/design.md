## Context

O front-end ja possui a rota privada principal para tarefas, services de `GET /teams` e `GET /users`, hooks de consulta para times e usuarios, schemas de validacao para formularios e componentes modais usados no fluxo de tarefas. A API exposta no Swagger confirma `POST /teams` com `name` obrigatorio e `memberIds` opcional como array de UUIDs unicos, alem de `GET /users` para listar usuarios selecionaveis.

## Goals / Non-Goals

**Goals:**
- Criar a experiencia privada de listagem de times e cadastro de novo time.
- Reutilizar o padrao visual e estrutural ja presente nos componentes de tarefas.
- Manter chamadas HTTP na camada de services e operacoes de dados em hooks.
- Validar apenas regras confirmadas: nome obrigatorio e limite coerente com a API.
- Atualizar a listagem automaticamente apos cadastro bem-sucedido.

**Non-Goals:**
- Nao alterar o contrato do backend para times ou usuarios.
- Nao implementar edicao, exclusao ou detalhes de time nesta mudanca.
- Nao tornar membros obrigatorios, pois o contrato da API e a prova tecnica nao exigem isso.
- Nao adicionar dependencias de UI para autocomplete ou multi-select.

## Decisions

### Rota privada de times
Adicionar uma rota privada `/teams` para a listagem de times. A rota principal de tarefas deve continuar existindo, e a navegacao pode expor acesso simples entre tarefas e times dentro do header ou shell privado atual.

Alternativa considerada: embutir o cadastro de time apenas dentro da tela de tarefas. Isso resolveria o bloqueio de criar tarefas sem time, mas nao atenderia diretamente ao pedido de tela de Times.

### Modal para cadastro
Usar modal para o formulario de novo time, reaproveitando o padrao existente de formulario de tarefas. A interacao fica consistente: o usuario permanece na listagem, abre o formulario, salva ou cancela e retorna ao contexto anterior.

Alternativa considerada: drawer lateral. Como nao ha drawer no projeto atual, isso criaria um padrao visual novo desnecessario.

### Selecao de membros
Usar um controle de selecao multipla com usuarios retornados por `GET /users`, exibindo nome e e-mail quando disponivel e registrando somente os IDs em `memberIds`.

Alternativa considerada: campo textual de UUIDs. Foi descartado porque exporia detalhe tecnico ao usuario e contraria o requisito de selecao amigavel.

### Hook de criacao de time
Estender o service de times para incluir `createTeam(payload)` e criar um hook de mutacao que invalida a query de `GET /teams` no sucesso. Isso segue o fluxo atual de dados e evita recarregar a pagina manualmente.

Alternativa considerada: chamar `apiFetch` diretamente na pagina. Foi descartado para preservar a separacao de responsabilidades do projeto.

### Feedback
Usar mensagens inline e estados ja adotados nos componentes atuais para loading, erro, vazio e submissao. Para sucesso, a listagem atualizada e o fechamento do modal confirmam o resultado sem introduzir um sistema global novo.

Alternativa considerada: criar uma camada global de notificacoes. Foi descartada por ser fora do escopo e nao existir como padrao atual neste projeto.

## Risks / Trade-offs

- [Controle multi-select nativo pode ter usabilidade limitada em alguns navegadores] -> Mitigar com labels claros, texto de apoio e layout responsivo; trocar por autocomplete fica como evolucao futura se o projeto ganhar um componente padronizado.
- [Nao ha endpoint paginado para times] -> Mitigar exibindo a lista completa retornada por `GET /teams`, coerente com o contrato atual.
- [Falha em `GET /users` poderia bloquear selecao de membros] -> Mitigar permitindo cadastrar sem membros quando o nome for valido, pois `memberIds` nao e obrigatorio.
- [A rota de times e nova no front] -> Mitigar mantendo a rota principal de tarefas intacta e adicionando navegacao discreta para nao quebrar o fluxo existente.
