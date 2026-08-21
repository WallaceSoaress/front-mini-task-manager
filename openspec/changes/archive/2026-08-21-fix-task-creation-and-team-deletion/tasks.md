## 1. Validacao e payload de tarefas

- [x] 1.1 Revisar `POST /tasks` no Swagger/backend e verificar em runtime que o contrato esperado continua sendo `title`, `description`, `status`, `priority`, `responsibleId`, `teamId` e `dueDate`
- [x] 1.2 Corrigir o formulario de tarefa para limpar erros de validacao quando campos forem alterados e verificar que o erro `Informe o titulo.` desaparece ao preencher um titulo valido
- [x] 1.3 Ajustar a inicializacao/reset do formulario para nao sobrescrever dados digitados enquanto o modal esta aberto e verificar abrindo o modal, digitando dados e refazendo queries de apoio
- [x] 1.4 Garantir que status, prioridade, responsavel e time enviem enums/IDs reais em vez de labels visuais e verificar o payload gerado antes da chamada
- [x] 1.5 Garantir que `dueDate` seja validado/normalizado para o formato aceito pela API e verificar criacao com prazo valido e data invalida
- [x] 1.6 Validar criacao bem-sucedida de tarefa e verificar que o modal fecha, o feedback aparece e a query de tarefas e atualizada sem recarregar a pagina
- [x] 1.7 Validar erro de API na criacao de tarefa e verificar que o modal permanece aberto com os dados preenchidos e mensagem adequada

## 2. Exclusao segura de times no backend

- [x] 2.1 Adicionar verificacao de existencia de tarefas por time no repository de tarefas e verificar com teste/compilacao que a consulta funciona
- [x] 2.2 Implementar regra no service de times para bloquear exclusao quando houver demandas vinculadas e verificar que nenhuma demanda e removida em cascata
- [x] 2.3 Expor `DELETE /teams/{id}` no controller de times e verificar que o Swagger passa a listar o endpoint apos reiniciar a API
- [x] 2.4 Adicionar ou ajustar testes backend para cobrir exclusao permitida e exclusao bloqueada por demandas vinculadas

## 3. Exclusao de times no frontend

- [x] 3.1 Adicionar `deleteTeam` ao service de times e verificar que a requisicao usa `DELETE /teams/{id}` com credenciais incluidas pelo cliente HTTP existente
- [x] 3.2 Criar hook/mutation de exclusao de time invalidando a query de `GET /teams` e verificar atualizacao automatica da listagem
- [x] 3.3 Adicionar acao de excluir na listagem de times com confirmacao reutilizando o padrao visual existente e verificar cancelamento sem chamada HTTP
- [x] 3.4 Tratar sucesso e erro da exclusao no frontend e verificar exibicao da mensagem retornada pela API quando o time possuir demandas vinculadas
- [x] 3.5 Verificar responsividade da acao de exclusao e da confirmacao em desktop, tablet e mobile

## 4. Validacao integrada

- [x] 4.1 Executar build/lint do frontend e verificar ausencia de erros TypeScript/ESLint relacionados a tarefa e times
- [x] 4.2 Executar testes do backend e verificar que regras de tarefa e exclusao de times passam
- [x] 4.3 Testar manualmente o fluxo completo de criacao de tarefa com formulario vazio, titulo preenchido, descricao, status, prioridade, responsavel, time, prazo, erro de API e criacao valida
- [x] 4.4 Testar manualmente exclusao de time sem tarefas, exclusao cancelada e exclusao bloqueada por tarefas vinculadas
- [x] 4.5 Reler a documentacao da prova tecnica e produzir checklist final requisito por requisito com status atendido, parcialmente atendido ou nao atendido
