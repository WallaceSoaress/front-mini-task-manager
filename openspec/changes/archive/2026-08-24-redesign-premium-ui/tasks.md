## 1. Fundamentos visuais

- [x] 1.1 Revisar `themeDefault.ts` e `ITheme.ts` para tokens de texto, superficie, borda, foco, sombras e estados, verificando que nao ha referencias TypeScript quebradas.
- [x] 1.2 Revisar `global-styles.css` para remover interferencias de tema generico e melhorar base tipografica, verificando que a aplicacao permanece em tema claro previsivel.
- [x] 1.3 Validar contraste de textos principais, secundarios, labels, placeholders, badges e mensagens, verificando visualmente que nomes e textos claros ficam legiveis.

## 2. Componentes compartilhados

- [x] 2.1 Refinar `Button`, `Field`, `Toolbar`, `ToolbarHeader`, `FilterGrid`, `StateBox`, `Pagination` e estados hover/focus/active/disabled/loading, verificando consistencia em tarefas e times.
- [x] 2.2 Refinar `ModalBackdrop`, `ModalPanel`, `ModalHeader`, `ModalBody`, `FormGrid`, `ModalActions` e `DetailGrid`, verificando que formularios e detalhes continuam responsivos.
- [x] 2.3 Refinar navegacao privada, topbar e informacao do usuario, verificando que tarefas, times e logout ficam claros em desktop e mobile.

## 3. Tela de tarefas

- [x] 3.1 Redesenhar shell, toolbar e filtros da tela de tarefas, verificando que acao principal e filtros ficam mais escaneaveis sem alterar parametros enviados para API.
- [x] 3.2 Refinar board, colunas, contadores, cards, chips, metadados e estados vazios, verificando que status, prioridade, time, responsavel e prazo ficam legiveis.
- [x] 3.3 Validar responsividade da tela de tarefas em desktop, tablet e mobile, verificando que nao ha texto cortado, sobreposto ou excessivamente apagado.

## 4. Tela de times

- [x] 4.1 Redesenhar shell, toolbar, cards de time, badges de membros e estado vazio da tela de times, verificando hierarquia e legibilidade.
- [x] 4.2 Refinar formulario de time e lista de membros selecionaveis, verificando que selecao por clique simples, erro de usuarios e cadastro sem membros continuam funcionando.
- [x] 4.3 Validar responsividade da tela de times em desktop, tablet e mobile, verificando que acoes e conteudo permanecem acessiveis.

## 5. Rotas publicas

- [x] 5.1 Refinar login para a nova linguagem visual, verificando que envio, erro e navegacao para cadastro continuam funcionando.
- [x] 5.2 Refinar cadastro para a nova linguagem visual, verificando que validacoes, sucesso e retorno para login continuam funcionando.
- [x] 5.3 Garantir consistencia visual entre telas publicas e privadas, verificando que o produto nao parece misturar dois temas.

## 6. Validacao

- [x] 6.1 Executar `npm run build` e verificar que o frontend compila sem erros.
- [x] 6.2 Executar testes E2E relevantes (`tasks`, `teams` e `register`) e verificar que fluxos principais continuam passando.
- [x] 6.3 Fazer QA visual com Playwright ou navegador em pelo menos desktop, tablet e mobile, verificando contraste, alinhamento, hover/focus e ausencia de sobreposicoes.
- [x] 6.4 Revisar diff final e verificar que nao foram alterados contratos de API, rotas ou regras de negocio.
