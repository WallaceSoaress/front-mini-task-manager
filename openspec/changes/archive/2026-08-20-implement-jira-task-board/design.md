## Context

O frontend ja possui login com cookie HttpOnly, rotas publicas/privadas e um shell privado inicial. A API de tarefas ja oferece os endpoints necessarios para listagem paginada com filtros, detalhes, criacao, edicao e exclusao. A prova tecnica exige CRUD completo, filtros, listagem paginada, associacao de responsavel e time, e a regra de que tarefas concluidas precisam ter responsavel.

## Goals / Non-Goals

**Goals:**
- Substituir a tela privada inicial por uma experiencia funcional de tarefas.
- Entregar um board visual inspirado no Jira usando apenas os status reais da API.
- Separar responsabilidades em componentes reutilizaveis, hooks, contratos, validacoes e services.
- Centralizar chamadas HTTP fora dos componentes de tela.
- Garantir responsividade em desktop, notebook, tablet e mobile.
- Preservar autenticacao por cookie HttpOnly e envio de credenciais nas requisicoes.

**Non-Goals:**
- Nao implementar drag-and-drop entre colunas nesta mudanca.
- Nao criar novos status alem de `TODO`, `IN_PROGRESS` e `DONE`.
- Nao implementar gestao completa de membros de times.
- Nao alterar backend, migrations ou regras de dominio.
- Nao reproduzir o Jira pixel a pixel.

## Decisions

1. Usar o board como tela privada principal.
   - Racional: a prova pede listagem, filtros, criacao/edicao e detalhes; o board permite organizar esses fluxos em uma unica experiencia coerente.
   - Alternativa considerada: tabela tradicional. Foi rejeitada porque a referencia visual solicitada privilegia colunas e cards.

2. Mapear visualmente os status reais da API para colunas.
   - `TODO` sera tratado como itens pendentes.
   - `IN_PROGRESS` sera tratado como em andamento.
   - `DONE` sera tratado como feito.
   - Racional: preserva a regra funcional da API/prova e usa o Jira apenas como direcao visual.

3. Separar dados e UI em camadas.
   - A pagina privada orquestra filtros, paginacao e modais.
   - Componentes de tarefas renderizam board, colunas, cards, filtros, formularios, detalhes, estados vazios e feedbacks.
   - Hooks encapsulam consultas e mutacoes.
   - Services encapsulam endpoints.
   - Interfaces tipam entidades, payloads, paginas e props.
   - Validacoes ficam separadas dos componentes de tela.

4. Usar formularios em modal para criacao e edicao.
   - Racional: permite criar/editar sem sair do board e preserva contexto visual.
   - Alternativa considerada: paginas separadas para criar/editar. Foi rejeitada nesta fase para manter fluxo mais rapido e parecido com ferramentas de gestao.

5. Usar visual responsivo por adaptacao, nao por copia.
   - Desktop/notebook: colunas lado a lado com largura minima e rolagem horizontal quando necessario.
   - Tablet: colunas ainda navegaveis com cards preservando legibilidade.
   - Mobile: experiencia compacta por abas/status ou rolagem horizontal com filtros recolhiveis.

6. Manter exclusao com confirmacao simples.
   - Racional: evita remocao acidental sem exigir nova dependencia ou fluxo complexo.

7. Tratar falta de endpoint de sessao restauravel como limitacao existente.
   - Racional: o login atual mantem usuario em memoria e usa cookie HttpOnly. Sem endpoint de perfil autenticado, recarregar a pagina pode voltar ao login mesmo com cookie valido.
   - Esta mudanca nao altera esse contrato.

## Risks / Trade-offs

- Board pode esconder paginacao quando tarefas existem em muitas paginas -> Mitigacao: mostrar controles claros de pagina/carregar mais mantendo filtros.
- Colunas podem ficar apertadas em telas menores -> Mitigacao: definir larguras minimas, rolagem horizontal controlada e layout compacto para mobile.
- Regra de `DONE` com responsavel pode ser descoberta tarde se depender apenas da API -> Mitigacao: validar no formulario antes de enviar e tambem tratar erro da API.
- API exige pelo menos um time cadastrado para criar tarefas -> Mitigacao: mostrar estado orientativo quando nao houver times disponiveis.
- Usuario pode tentar editar/excluir durante refetch -> Mitigacao: bloquear controles em mutacoes ativas e invalidar dados apos sucesso.

## Migration Plan

1. Criar contratos de tarefa, usuario, time, pagina e filtros.
2. Criar services para tarefas, usuarios e times.
3. Criar hooks de consulta/mutacao e chaves de cache.
4. Criar validacao do formulario de tarefa.
5. Criar componentes reutilizaveis de board, coluna, card, filtros, formulario, detalhes, confirmacao e estados.
6. Substituir a tela privada inicial pela pagina de tarefas.
7. Validar responsividade e estados funcionais.
8. Rodar typecheck, build e busca por uso indevido de storage/token.
