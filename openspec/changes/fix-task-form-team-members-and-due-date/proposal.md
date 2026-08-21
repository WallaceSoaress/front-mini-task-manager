## Why

A criacao de tarefas ainda apresenta erro visual/funcional no formulario, especialmente com validacao de titulo e formato de prazo. O formulario tambem precisa guiar melhor a atribuicao: primeiro selecionar o time, depois limitar o responsavel aos membros daquele time, alem de bloquear prazos anteriores ao dia atual.

## What Changes

- Corrigir a validacao do formulario de tarefa para que erros antigos nao permaneçam quando o campo ja possui valor valido.
- Garantir que o prazo seja enviado para a API em formato `YYYY-MM-DD`, mesmo quando o navegador exibir a data em formato local.
- Bloquear criacao/edicao de tarefas com prazo anterior ao dia atual.
- Reordenar o formulario para exibir `Time` antes de `Responsavel`.
- Filtrar as opcoes de responsavel pelos membros do time selecionado.
- Limpar o responsavel selecionado quando o usuario trocar para um time que nao contem esse membro.
- Garantir tambem no backend que tarefas nao sejam criadas ou atualizadas com prazo passado.

## Capabilities

### New Capabilities

### Modified Capabilities

- `task-management-board`: ajustar o comportamento do formulario de criacao/edicao de tarefas para validar corretamente titulo/prazo e vincular responsavel somente a membros do time selecionado.

## Impact

- Frontend: modal de tarefa, schema/conversor de validacao, tipos de time/membros, exibicao/ordem dos campos e mensagens de erro.
- Backend: validacao de regra de negocio para rejeitar prazo anterior ao dia atual em criacao/atualizacao de tarefas.
- Testes: cobrir datas passadas no backend e validar build/lint do frontend apos os ajustes.
