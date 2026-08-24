## Context

Veja `proposal.md` para a motivacao. O formulario de time em `TeamFormModal.tsx` usa `select multiple` nativo, controlado por `memberIds` no React Hook Form. Esse controle funciona tecnicamente, mas no uso comum em desktop troca a selecao quando a pessoa clica sem `Ctrl` ou `Shift`.

## Goals / Non-Goals

**Goals:**

- Permitir selecionar varios membros com cliques simples.
- Permitir remover um membro selecionado clicando novamente nele.
- Preservar `memberIds` como array de IDs no estado do formulario e no payload enviado para a API.
- Manter carregamento, erro de usuarios e cadastro sem membros.

**Non-Goals:**

- Criar autocomplete ou busca de usuarios.
- Alterar endpoints, DTOs ou regras da API.
- Implementar edicao de membros de times existentes.

## Decisions

### Trocar select multiple por lista de checkboxes

Usar uma lista de checkboxes ou botoes com papel equivalente para representar os usuarios. Cada item mostra nome e e-mail e atualiza `memberIds` adicionando ou removendo somente o ID clicado.

Racional: checkbox e o controle padrao para selecao independente de varios itens, funciona com clique simples, teclado e leitores de tela sem ensinar atalhos do navegador.

Alternativa considerada: interceptar eventos do `select multiple` para simular toggle. Isso manteria o visual atual, mas continuaria com uma semantica confusa e comportamento inconsistente entre navegadores.

### Manter estado no React Hook Form

Continuar usando `useWatch` e `setValue("memberIds", ...)` para preservar a integracao atual com validacao e submissao.

Racional: reduz o escopo da alteracao e evita duplicar estado local.

## Risks / Trade-offs

- Lista grande de usuarios pode ocupar mais espaco no modal -> limitar altura visual e usar rolagem interna.
- Mudanca visual pode afetar snapshots ou testes E2E que dependam do `select` -> atualizar testes para interagir com checkboxes pelo nome visivel.
- Usuario precisa entender quantos membros estao selecionados -> exibir estado selecionado claramente no item e manter texto de apoio objetivo.

## Migration Plan

1. Substituir o `select multiple` por lista de opcoes com checkbox no formulario de time.
2. Adicionar estilos para lista rolavel, estado selecionado e responsividade.
3. Atualizar ou adicionar teste cobrindo selecao de dois membros por clique simples.
4. Validar build e fluxo de cadastro de time.
