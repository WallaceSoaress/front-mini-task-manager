## 1. Controle de selecao

- [x] 1.1 Substituir o `select multiple` do formulario de time por uma lista de checkboxes ou itens alternaveis, verificando que o campo ainda exibe nome e e-mail dos usuarios.
- [x] 1.2 Implementar a alternancia de membros via clique simples, verificando que clicar em dois usuarios diferentes mantem ambos os IDs em `memberIds`.
- [x] 1.3 Implementar a remocao por novo clique em item selecionado, verificando que somente o ID clicado e removido de `memberIds`.

## 2. Estados e acessibilidade

- [x] 2.1 Manter o formulario funcionando quando nao ha membros selecionados, verificando que `memberIds` permanece como lista vazia e o cadastro com nome valido continua permitido.
- [x] 2.2 Preservar os estados de carregamento e erro de usuarios, verificando que erro em `GET /users` ainda permite salvar time sem membros.
- [x] 2.3 Estilizar a lista de membros com altura controlada, rolagem interna e estado visual selecionado, verificando que o modal nao sobrepoe conteudo em desktop e mobile.

## 3. Validacao

- [x] 3.1 Atualizar ou adicionar teste cobrindo selecao de dois membros por clique simples, verificando que o payload de `POST /teams` contem os dois IDs.
- [x] 3.2 Executar `npm run build` e verificar que o frontend compila sem erros.
- [x] 3.3 Validar manualmente no navegador o cadastro de time com mais de um membro, verificando que a listagem mostra a quantidade/membros corretos apos salvar.
