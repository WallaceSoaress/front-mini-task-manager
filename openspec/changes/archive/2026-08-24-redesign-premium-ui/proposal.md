## Why

A interface atual cumpre os fluxos principais, mas alguns textos e superficies usam contraste baixo, espacamentos pequenos e hierarquia visual fraca, o que prejudica legibilidade e faz o produto parecer menos polido. Esta mudanca eleva a qualidade visual e a experiencia de uso das telas privadas sem alterar funcionalidades ou contratos de API.

## What Changes

- Refinar a paleta, tipografia, contraste, superficies, bordas, sombras e estados interativos do frontend.
- Redesenhar a estrutura visual das telas privadas de tarefas e times, incluindo topbar, navegacao, toolbar, filtros, board, cards, estados vazios e modais.
- Melhorar legibilidade de textos claros, labels, metadados, badges e mensagens em todo o projeto.
- Padronizar espacamentos, border-radius, alturas de controles, foco, hover, active, loading e disabled.
- Ajustar responsividade para desktop, tablet e mobile com composicao mais organizada e escaneavel.
- Preservar conteudo, rotas, fluxos, payloads, validacoes e contratos existentes.

## Capabilities

### New Capabilities

- `premium-visual-system`: fundamentos visuais e comportamentos de UI compartilhados para uma experiencia mais legivel, moderna e consistente.

### Modified Capabilities

- `task-management-board`: melhora visual e responsiva do board, filtros, cards, paginacao e estados de feedback da tela de tarefas.
- `team-creation`: melhora visual e responsiva da tela de times, lista de times, formulario, selecao de membros e estados de feedback.
- `login-routing`: melhora visual das areas publicas de login/cadastro e consistencia com o novo sistema visual, sem alterar regras de autenticacao ou roteamento.

## Impact

- Tema global, estilos globais e tipagens de tema.
- Componentes compartilhados de layout, navegacao, botoes, campos, cards, modais, chips e estados.
- Telas privadas de tarefas e times.
- Telas publicas de login e cadastro quando necessario para consistencia visual.
- Testes e validacoes visuais/responsivas do frontend.
- Nenhum impacto esperado na API, banco de dados ou contratos HTTP.
