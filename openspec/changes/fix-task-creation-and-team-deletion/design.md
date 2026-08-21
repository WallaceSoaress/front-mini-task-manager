## Context

Veja `proposal.md` para a motivacao. O frontend ja possui formulario de tarefas, services, hooks com React Query e componentes de confirmacao/feedback. O backend possui CRUD de tarefas, listagem/criacao de times e o relacionamento `tasks.team_id -> teams.id`, mas ainda nao expoe exclusao de times.

O contrato real de `POST /tasks` exige `title`, `status`, `priority` e `teamId`; `description`, `responsibleId` e `dueDate` sao opcionais. Os valores de status e prioridade devem ser os enums da API, e `dueDate` deve ser enviada como data compativel com `LocalDate`.

## Goals / Non-Goals

**Goals:**

- Corrigir a causa real da validacao inconsistente no formulario de tarefa, sem esconder erros manualmente.
- Preservar a arquitetura atual de componentes, hooks, services e tipos.
- Enviar payloads compatíveis com o contrato real do backend.
- Implementar exclusao de time com regra de negocio obrigatoria no backend.
- Atualizar listagens via invalidacao de queries, sem `window.location.reload()`.
- Registrar uma auditoria objetiva dos requisitos obrigatorios da prova tecnica apos a implementacao.

**Non-Goals:**

- Recriar o layout da aplicacao ou refatorar o board alem do necessario.
- Adicionar dependencias novas para resolver validacao.
- Implementar exclusao em cascata de demandas.
- Criar endpoints alternativos se o contrato REST direto for suficiente.

## Decisions

1. **Manter Yup manual e limpar erros no fluxo do React Hook Form**

   O projeto nao possui `@hookform/resolvers`, entao a correcao deve manter o schema Yup existente e limpar erros quando campos forem alterados. Alternativa considerada: adicionar `@hookform/resolvers`; rejeitada para evitar dependencia nova desnecessaria.

2. **Evitar reset indevido do formulario aberto**

   O modal de tarefa deve inicializar valores quando abrir/criar/editar, mas nao deve sobrescrever dados digitados apenas porque a lista de times foi refeita. Alternativa considerada: manter o efeito atual; rejeitada porque pode recriar o bug de estado visual divergente.

3. **Separar labels visuais de valores enviados**

   Status, prioridade, responsavel e time continuarao exibindo textos amigaveis, mas o payload deve usar enums e IDs reais. Essa decisao preserva UX e evita acoplamento entre labels do Jira e contrato da API.

4. **Normalizar data antes da requisicao quando necessario**

   O formulario deve aceitar a experiencia visual do navegador, mas o service ou o conversor de request deve garantir `YYYY-MM-DD` para a API. Datas invalidas devem ser barradas no formulario.

5. **Garantir exclusao segura no backend**

   O backend deve consultar se existem tarefas vinculadas ao time antes de excluir. Se houver qualquer vinculo, retorna erro de negocio e nao executa delete. Alternativa considerada: confiar apenas no frontend; rejeitada porque a regra deve ser garantida pela API.

6. **Reutilizar confirmacao existente no frontend**

   A exclusao de time deve usar o padrao visual de confirmacao ja usado para tarefas, adaptando props/mensagem quando necessario. Alternativa considerada: criar um novo modal exclusivo; rejeitada para manter consistencia e escopo menor.

## Risks / Trade-offs

- Validacao manual pode voltar a divergir do schema se novos campos forem adicionados -> centralizar conversao/validacao em helpers pequenos e testar os casos principais.
- Bloqueio de exclusao por qualquer tarefa vinculada e mais restritivo que checar status especificos -> atende a regra de nao remover times com demandas e evita depender de novos status futuros.
- Mensagens de erro backend podem variar conforme tratamento global atual -> frontend deve exibir a mensagem retornada quando disponivel e manter fallback generico.
- Se o servidor local nao for reiniciado apos mudancas backend, o Swagger e as rotas nao refletirao o novo endpoint -> validar apos restart da API.

## Migration Plan

- Implementar backend primeiro para expor `DELETE /teams/{id}` e a regra de negocio.
- Implementar frontend consumindo o endpoint e invalidando `GET /teams`.
- Corrigir criacao de tarefa e validar payload contra Swagger.
- Executar build/testes possiveis em frontend e backend.
- Revisar a documentacao da prova tecnica e produzir checklist final.
