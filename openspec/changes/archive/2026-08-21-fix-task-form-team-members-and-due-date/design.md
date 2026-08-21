## Context

Veja `proposal.md` para a motivacao. O formulario atual de tarefa recebe `users` e `teams`, mas lista responsaveis a partir de todos os usuarios. A API de times ja retorna `members`, entao a filtragem pode ser feita sem endpoint novo. A API aceita `dueDate` como `LocalDate`, portanto o payload deve chegar em `YYYY-MM-DD`.

## Goals / Non-Goals

**Goals:**

- Corrigir validacao persistente de titulo usando o valor atual do formulario.
- Reordenar os campos para selecionar time antes de responsavel.
- Filtrar responsaveis por membros do time selecionado.
- Normalizar datas exibidas/recebidas em formato local antes de enviar a API.
- Bloquear prazo passado no frontend e no backend.

**Non-Goals:**

- Criar endpoint novo para listar membros por time.
- Alterar a regra de responsavel opcional quando a tarefa nao esta concluida.
- Refatorar toda a camada de formularios ou adicionar novas dependencias.

## Decisions

1. **Usar `teams[].members` como fonte dos responsaveis**

   O frontend deve derivar a lista de responsaveis do time selecionado. Alternativa considerada: buscar todos os usuarios e filtrar por outro endpoint; rejeitada porque o contrato atual de `GET /teams` ja fornece membros.

2. **Limpar responsavel invalido ao trocar time**

   Quando o time mudar, se o responsavel atual nao estiver em `selectedTeam.members`, o formulario deve limpar `responsibleId`. Isso evita payload inconsistente.

3. **Normalizar data em helper puro**

   A normalizacao deve aceitar `YYYY-MM-DD` e `DD/MM/YYYY`, retornando sempre `YYYY-MM-DD` para request. Datas invalidas ou anteriores a hoje devem ser bloqueadas pelo schema antes da mutation.

4. **Validar prazo passado no backend**

   A API deve rejeitar `dueDate` anterior a `LocalDate.now()` em criacao e atualizacao. A regra deve ficar no dominio ou service de tarefas, antes da persistencia. Alternativa considerada: validar apenas no frontend; rejeitada porque chamadas diretas poderiam burlar a regra.

5. **Preservar update de tarefa existente**

   A regra de data vale tambem para edicao, mas nao deve quebrar tarefas antigas sem prazo. Se uma tarefa existente tiver prazo passado e o usuario editar outro campo mantendo esse prazo, a implementacao deve definir uma resposta consistente durante o apply: bloquear a submissao ou exigir atualizar para hoje/futuro, conforme a mesma regra de API.

## Risks / Trade-offs

- [Risk] Navegadores exibem `input[type=date]` de forma localizada, mas armazenam valor ISO em geral -> Mitigation: normalizar o valor antes de validar/enviar.
- [Risk] Time sem membros deixara responsavel sem opcoes alem de nao atribuido -> Mitigation: manter opcao `Nao atribuido` e mensagens claras.
- [Risk] Datas dependem do fuso do cliente/backend -> Mitigation: comparar somente datas locais sem horario e validar tambem no backend.
- [Risk] Tarefas antigas com prazo passado podem nao ser editaveis sem ajustar o prazo -> Mitigation: manter mensagem clara explicando que o prazo deve ser hoje ou futuro.

## Migration Plan

- Ajustar frontend do formulario de tarefas.
- Ajustar backend para bloquear prazo passado.
- Validar `POST /tasks` e `PUT /tasks/{id}` com datas passadas e datas validas.
- Rodar lint/build do frontend e testes do backend.
