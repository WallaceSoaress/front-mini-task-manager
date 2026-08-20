## 1. Contratos e Camada de API

- [x] 1.1 Criar contratos tipados para tarefa, usuario, time, pagina paginada, filtros e payloads, e verificar que nenhum contrato usa `any`.
- [x] 1.2 Criar service de tarefas com listagem paginada, detalhes, criacao, edicao e exclusao, e verificar que todas as chamadas usam o client HTTP com credenciais.
- [x] 1.3 Criar services de usuarios e times para alimentar selects, e verificar que os retornos estao tipados conforme a API.
- [x] 1.4 Garantir configuracao segura da URL base da API, e verificar que o app funciona com `.env` e com o padrao local documentado.

## 2. Hooks e Estado de Dados

- [x] 2.1 Criar chaves de cache e hook de listagem de tarefas com filtros e pagina, e verificar que alterar filtros refaz a consulta correta.
- [x] 2.2 Criar hooks de detalhes, criacao, edicao e exclusao de tarefas, e verificar que mutacoes invalidam a listagem apos sucesso.
- [x] 2.3 Criar hooks para usuarios e times, e verificar que estados de loading/erro podem ser consumidos pelos formularios.

## 3. Validacoes e Formularios

- [x] 3.1 Criar schema de validacao de tarefa com titulo, status, prioridade e time obrigatorios, e verificar mensagens para campos invalidos.
- [x] 3.2 Implementar a validacao de que status `DONE` exige responsavel, e verificar que a submissao e bloqueada antes de chamar a API.
- [x] 3.3 Criar formulario reutilizavel de tarefa para criacao e edicao, e verificar preenchimento inicial em modo edicao.
- [x] 3.4 Tratar erros da API no formulario, e verificar que os dados preenchidos sao preservados apos falha.

## 4. Componentes do Board

- [x] 4.1 Criar componente de filtros com status, responsavel, prioridade e limpar filtros, e verificar que ele comunica mudancas para a pagina.
- [x] 4.2 Criar componentes de board, coluna e cabecalho de coluna, e verificar colunas `TODO`, `IN_PROGRESS` e `DONE` com contadores.
- [x] 4.3 Criar card de tarefa com titulo, prioridade, time, responsavel, prazo e identificacao, e verificar card sem responsavel e sem prazo.
- [x] 4.4 Criar estados de loading, erro, vazio e acao de retry, e verificar exibicao em cada estado.
- [x] 4.5 Criar confirmacao de exclusao, e verificar que cancelar nao envia requisicao.

## 5. Tela Privada de Tarefas

- [x] 5.1 Substituir a home privada pela pagina de tarefas, e verificar que usuario autenticado acessa o board como rota principal.
- [x] 5.2 Integrar board, filtros, paginacao, formularios e detalhes na pagina, e verificar que filtros e pagina atual sao preservados ao abrir/fechar detalhes.
- [x] 5.3 Implementar criacao de tarefa a partir da tela, e verificar que o board atualiza apos sucesso.
- [x] 5.4 Implementar edicao de tarefa a partir do card/detalhes, e verificar que o board reflete a alteracao apos sucesso.
- [x] 5.5 Implementar visualizacao de detalhes completa, e verificar exibicao de descricao, status, prioridade, responsavel, time, criador, prazo e datas quando disponiveis.
- [x] 5.6 Implementar exclusao de tarefa, e verificar que o card sai do board apos confirmacao e sucesso da API.

## 6. Design Responsivo

- [x] 6.1 Aplicar visual inspirado no Jira para colunas, cards, badges, contadores e acoes, e verificar consistencia com o tema do projeto.
- [x] 6.2 Ajustar desktop/notebook com colunas lado a lado e rolagem horizontal controlada, e verificar que textos nao sobrepoem elementos.
- [x] 6.3 Ajustar tablet e mobile com navegacao compacta entre colunas/filtros, e verificar legibilidade dos cards em viewports estreitas.
- [x] 6.4 Revisar acessibilidade basica de botoes, labels, foco e mensagens de erro, e verificar navegacao sem depender apenas do mouse.

## 7. Verificacao Final

- [x] 7.1 Executar typecheck e verificar que nao ha erros TypeScript.
- [x] 7.2 Executar build de producao e verificar que ele conclui com sucesso.
- [x] 7.3 Pesquisar por `localStorage`, `sessionStorage`, `accessToken` e chamadas HTTP diretas nos componentes, e verificar que nao ha persistencia indevida de token nem bypass da camada de services.
- [x] 7.4 Revisar manualmente os fluxos de criar, editar, detalhar, excluir, filtrar e paginar tarefas, e verificar aderencia aos requisitos da prova tecnica.
