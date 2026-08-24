## Context

Veja `proposal.md` para a motivacao. O frontend usa React, TypeScript e styled-components, com tema centralizado em `themeDefault.ts`, estilos globais em `global-styles.css` e componentes compartilhados em `components/tasks/styles.ts`, `components/teams/styles.ts` e `components/layout/styles.ts`.

O layout atual tem boa separacao funcional, mas sofre com baixo contraste em textos secundarios, superficies muito parecidas, pouca hierarquia entre header/filtros/conteudo e responsividade que depende mais de empilhamento basico do que de composicao intencional.

## Goals / Non-Goals

**Goals:**

- Melhorar contraste e legibilidade em todo o frontend.
- Criar uma linguagem visual mais premium, limpa e consistente.
- Refinar componentes compartilhados antes de ajustes pontuais por tela.
- Preservar rotas, dados exibidos, payloads, validacoes e comportamento funcional.
- Validar desktop, tablet e mobile com screenshots ou inspecao visual.

**Non-Goals:**

- Trocar framework de UI ou adicionar biblioteca visual.
- Alterar backend, endpoints ou contratos HTTP.
- Criar novos fluxos de produto.
- Fazer landing page ou tela promocional.

## Decisions

### Reforcar tokens de tema primeiro

Atualizar `themeDefault.ts` e, se necessario, `ITheme.ts` com tokens mais expressivos para texto, superficie, borda, foco e sombras.

Racional: a maior parte da UI consome `theme.colors`, entao uma base melhor reduz inconsistencias e evita correcoes isoladas.

Alternativa considerada: aplicar cores diretamente em cada componente. Isso resolveria pontos rapidos, mas aumentaria duplicacao e dificultaria consistencia.

### Remover interferencia visual global genérica

Revisar `global-styles.css`, especialmente `color-scheme: light dark` e variaveis herdadas de template, para garantir que a aplicacao siga o tema claro projetado.

Racional: a aplicacao ja possui tema proprio via styled-components. Um `color-scheme` global pode mudar renderizacao nativa de inputs e reduzir previsibilidade visual.

### Redesenhar componentes compartilhados

Refinar `Button`, `Field`, `Toolbar`, `Modal*`, `StateBox`, `Chip`, `TaskCardButton`, navegacao privada e shells privados antes de alterar componentes especificos.

Racional: tarefas e times compartilham muitos componentes; melhorar esses blocos aumenta qualidade geral com menor risco de divergencia.

### Layout privado com largura maxima e topbar estruturada

Usar shell privado com largura maxima centralizada, espacamento vertical consistente e topbar com presenca visual suficiente para usuario, navegacao e logout.

Racional: no desktop amplo, o layout atual estica demais e perde hierarquia. Uma largura maxima preserva densidade profissional e melhora leitura.

### Paleta sobria com acento controlado

Usar base neutra clara, textos escuros de alto contraste e teal/ciano como acento funcional para acoes primarias, foco e itens ativos.

Racional: preserva identidade atual do projeto sem cair em visual monocromatico ou exagerado. O acento deve guiar acao, nao dominar a tela.

### Validacao visual pragmatica

Validar com `npm run build`, testes E2E existentes e Playwright/screenshots em viewports representativas quando houver servidor disponivel.

Racional: a mudanca e visual e responsiva; build sozinho nao captura problemas de composicao, sobreposicao ou texto apagado.

## Risks / Trade-offs

- [Risco] Mudancas globais podem alterar telas publicas e privadas ao mesmo tempo -> [Mitigacao] aplicar por camadas e validar as telas principais apos cada bloco.
- [Risco] A busca por visual premium pode reduzir densidade operacional -> [Mitigacao] manter componentes compactos o bastante para board e filtros, usando espaco extra apenas onde melhora leitura.
- [Risco] Contraste de chips coloridos pode ficar insuficiente -> [Mitigacao] usar pares texto/fundo testados e revisar manualmente status, prioridade e alertas.
- [Risco] Screenshots podem variar por ambiente -> [Mitigacao] usar verificacoes objetivas de build/testes e screenshots como QA visual, nao como teste de pixel perfeito.

## Migration Plan

1. Revisar tema, globais e tokens de contraste.
2. Refinar shell privado, topbar e navegacao.
3. Refinar toolbar, filtros, campos, botoes e estados de foco/hover/disabled/loading.
4. Refinar board, colunas, cards, chips, estados vazios e paginacao.
5. Refinar tela de times, cards, formulario, lista de membros e modais.
6. Refinar telas publicas de login/cadastro para manter consistencia.
7. Validar build, testes principais e screenshots responsivos.
