## 1. Contratos e Services

- [x] 1.1 Adicionar contrato tipado para payload de criacao de time com `name` e `memberIds`, e verificar que nao foi usado `any`.
- [x] 1.2 Estender o service de times com `POST /teams`, e verificar que a chamada usa o client HTTP existente com credenciais incluidas.
- [x] 1.3 Confirmar que `GET /users` continua sendo o endpoint usado para membros selecionaveis, e verificar que o formulario nao exige digitacao manual de UUID.

## 2. Hooks e Cache

- [x] 2.1 Criar hook de mutacao para criar time, e verificar que ele chama o service de times.
- [x] 2.2 Invalidar a query de `GET /teams` apos sucesso na criacao, e verificar que a listagem refaz a consulta automaticamente.
- [x] 2.3 Reutilizar os hooks existentes de listagem de times e usuarios, e verificar estados de loading e erro na tela.

## 3. Validacao e Formulario

- [x] 3.1 Criar schema de validacao para time com `name` obrigatorio e limite de 120 caracteres, e verificar mensagens para nome ausente ou invalido.
- [x] 3.2 Implementar formulario de novo time em modal responsivo, e verificar que salvar, cancelar e fechar funcionam sem perder o padrao visual atual.
- [x] 3.3 Implementar selecao multipla de membros exibindo dados amigaveis dos usuarios, e verificar que o payload enviado contem somente IDs em `memberIds`.
- [x] 3.4 Permitir envio sem membros selecionados, e verificar que o payload respeita o contrato da API sem adicionar regra obrigatoria inexistente.
- [x] 3.5 Tratar erro da API no formulario, e verificar que o modal permanece aberto com os dados preenchidos preservados.

## 4. Tela de Times

- [x] 4.1 Criar pagina privada de Times com header e botao `Novo Time`, e verificar que o botao fica acessivel em desktop e mobile.
- [x] 4.2 Renderizar a listagem de times retornada por `GET /teams`, e verificar exibicao de nome e membros quando existirem.
- [x] 4.3 Implementar estado vazio com acao de cadastrar time, e verificar que a acao abre o formulario.
- [x] 4.4 Implementar estado de loading e erro com retry, e verificar comportamento quando `GET /teams` falha.
- [x] 4.5 Mostrar feedback de sucesso apos cadastro, e verificar que o novo time aparece na listagem sem recarregar a pagina.

## 5. Rotas e Navegacao

- [x] 5.1 Adicionar rota privada `/teams`, e verificar que usuario autenticado consegue acessar a tela.
- [x] 5.2 Manter a rota principal de tarefas funcionando, e verificar que o fluxo de login continua levando para a area privada atual.
- [x] 5.3 Adicionar navegacao simples entre Tarefas e Times seguindo o padrao visual existente, e verificar que links funcionam em desktop e mobile.

## 6. Verificacao Final

- [x] 6.1 Executar typecheck/build do front-end, e verificar que nao ha erros TypeScript ou de build.
- [x] 6.2 Pesquisar por chamadas HTTP diretas fora de services, e verificar que a criacao de time nao bypassa a camada de API.
- [x] 6.3 Pesquisar por `localStorage`, `sessionStorage` e tokens relacionados ao novo fluxo, e verificar que a autenticacao por cookie HttpOnly nao foi alterada.
- [x] 6.4 Revisar manualmente o fluxo completo `Times -> Novo Time -> selecionar membros -> cadastrar -> atualizar lista`, e verificar aderencia aos requisitos da prova tecnica.
