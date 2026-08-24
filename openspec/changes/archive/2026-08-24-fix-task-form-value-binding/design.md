## Context

See `proposal.md` for motivation. O formulario de tarefa usa `react-hook-form` com campos nao controlados e um helper `registerField` para limpar erros no `onChange`. O comportamento observado indica que os valores exibidos nos inputs podem nao chegar ao estado interno usado por `handleSubmit`, fazendo o submit receber `defaultValues`.

## Goals / Non-Goals

**Goals:**

- Garantir que cada mudanca de campo no modal atualize o estado que sera validado e enviado.
- Manter a experiencia atual de limpar erros quando o usuario corrige campos invalidos.
- Preservar a normalizacao de prazo e o filtro de responsaveis por time.
- Remover logs temporarios de diagnostico do fluxo de submit.

**Non-Goals:**

- Alterar contrato de `POST /tasks` ou `PUT /tasks`.
- Trocar biblioteca de formulario ou reestruturar o board.
- Introduzir novas validacoes fora das regras ja especificadas.

## Decisions

1. Atualizar o estado do formulario no proprio handler de mudanca dos campos.

   O helper de registro deve capturar o valor atual do elemento e chamar `setValue` para o campo correspondente com flags de dirty/validation adequadas, alem de limpar o erro daquele campo. Isso torna explicita a sincronizacao entre o DOM e o estado usado por `handleSubmit`.

   Alternativa considerada: remover completamente o `onChange` customizado e usar apenas `register(field)`. Essa alternativa e menor, mas pode regredir a limpeza imediata de erros que ja existe na especificacao.

2. Manter `useWatch` para `teamId` e `responsibleId`.

   A derivacao de membros do time selecionado e a limpeza de responsavel invalido continuam dependentes do estado observado. Corrigir o binding dos campos tambem deve fazer esses watchers refletirem selecoes atuais de forma consistente.

   Alternativa considerada: transformar todos os campos em componentes controlados com `Controller`. Isso resolveria a sincronizacao, mas aumenta o tamanho da mudanca sem necessidade para inputs nativos.

3. Verificar no nivel de build e por comportamento manual.

   Como o projeto nao possui testes automatizados de componente configurados, a validacao principal deve combinar `npm run build` com uma checagem manual no navegador: preencher o modal e confirmar que o payload/log/Network mostra os valores atuais.

## Risks / Trade-offs

- Uso incorreto de `setValue` em campos de enum pode perder tipos literais de TypeScript -> tipar o handler para aceitar os campos existentes e converter o valor como `TaskFormData[typeof field]`.
- Limpar erros cedo demais pode esconder erro ainda invalido -> usar flags de validacao quando o valor mudar e preservar a validacao final via schema no submit.
- O primeiro time selecionado por efeito pode competir com a digitacao se `teams` mudar durante edicao -> manter a condicao existente que so preenche time em criacao quando `teamId` esta vazio.
