## Why

A criacao de tarefas apresenta validacao inconsistente no formulario e pode impedir o cadastro correto de demandas mesmo com dados preenchidos. A tela de times tambem precisa permitir exclusao segura, garantindo no backend que nenhum time com demandas vinculadas seja removido.

## What Changes

- Corrigir o fluxo de criacao de tarefa para validar campos conforme o contrato real de `POST /tasks`, limpar erros quando os campos forem corrigidos e enviar payload compativel com a API.
- Garantir que status, prioridade, responsavel, time e prazo sejam enviados com os valores esperados pelo backend, mantendo labels visuais separados dos valores da API.
- Atualizar a listagem de tarefas via invalidacao/refetch de query apos criacao bem-sucedida, sem recarregar a pagina.
- Implementar exclusao de times no backend com `DELETE /teams/{id}` e bloqueio quando houver qualquer demanda vinculada ao time.
- Implementar a acao de excluir time no frontend com confirmacao, feedback de sucesso/erro e atualizacao automatica da listagem.
- Auditar os requisitos obrigatorios da prova tecnica apos as correcoes e documentar o status de atendimento.

## Capabilities

### New Capabilities

### Modified Capabilities

- `task-management-board`: corrigir o comportamento de criacao de tarefas para respeitar validacao, payload, contrato da API e atualizacao automatica da listagem.
- `team-creation`: expandir a gestao de times com exclusao segura por API, confirmacao no frontend e bloqueio de exclusao quando existirem demandas vinculadas.

## Impact

- Frontend: formulario de tarefa, schema de validacao, service/hook de tarefas se necessario, listagem de times, service/hook de times, estados de feedback e confirmacao.
- Backend: controller/service/repository de times, repository de tarefas para verificacao de vinculos, tratamento de erro de regra de negocio e documentacao Swagger gerada pela API.
- Banco de dados: sem remocao em cascata de demandas; a regra deve impedir exclusao antes de chamar delete do time.
- Testes: cobrir criacao de tarefa valida/invalida quando aplicavel e regra backend que impede exclusao de time com demandas.
