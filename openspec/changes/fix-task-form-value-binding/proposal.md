## Why

Ao criar uma tarefa, o modal pode exibir campos preenchidos visualmente, mas submeter `title`, `description`, `responsibleId` e `dueDate` como valores vazios no estado do formulario. Isso bloqueia a criacao valida e causa mensagens de validacao incorretas, como `Informe o titulo.` mesmo quando o usuario digitou um titulo.

## What Changes

- Corrigir o binding dos campos do `TaskFormModal` para que cada alteracao atualize o estado usado no submit.
- Preservar a limpeza de erros de validacao quando o usuario corrige um campo.
- Garantir que o payload de criacao/edicao reflita os valores preenchidos no modal antes da validacao e do envio para a API.
- Remover instrumentacao temporaria de console usada para diagnostico do submit.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `task-management-board`: reforca que os valores preenchidos visualmente no formulario de tarefa devem ser os mesmos valores validados e enviados para a API.

## Impact

- Afeta `src/components/tasks/TaskFormModal.tsx`.
- Nao altera contrato da API, entidades, rotas ou dependencias.
- Deve ser validado com criacao de tarefa preenchendo titulo, descricao, status, prioridade, time, responsavel opcional e prazo.
