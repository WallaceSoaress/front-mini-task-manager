## 1. Frontend do formulario de tarefa

- [x] 1.1 Ajustar a leitura/limpeza de erros do formulario para revalidar o valor atual do titulo e verificar que `Informe o titulo.` some ao preencher um titulo valido
- [x] 1.2 Reordenar os campos para exibir `Time` antes de `Responsavel` e verificar visualmente o modal de criacao/edicao
- [x] 1.3 Derivar responsaveis a partir de `teams[].members` do time selecionado e verificar que usuarios fora do time nao aparecem no select
- [x] 1.4 Limpar `responsibleId` quando o time mudar para outro que nao contenha o responsavel atual e verificar o payload gerado
- [x] 1.5 Normalizar o prazo para `YYYY-MM-DD` antes da validacao/request e verificar que `20/08/2026` vira `2026-08-20`
- [x] 1.6 Bloquear prazo anterior ao dia atual no frontend e verificar mensagem de validacao junto ao campo
- [x] 1.7 Garantir que prazo vazio, data atual e data futura continuem validos no frontend e verificar submit sem erro de schema

## 2. Backend de tarefas

- [x] 2.1 Adicionar regra backend para rejeitar `dueDate` anterior a data atual em criacao e atualizacao e verificar resposta de erro de negocio
- [x] 2.2 Adicionar testes backend para tarefa com prazo passado, prazo atual, prazo futuro e prazo vazio
- [x] 2.3 Confirmar que a regra `DONE` com responsavel continua funcionando apos a validacao de prazo

## 3. Validacao integrada

- [x] 3.1 Executar `npm run lint` e `npm run build` no frontend e verificar ausencia de erros
- [x] 3.2 Executar `mvn test` no backend e verificar sucesso da suite
- [x] 3.3 Validar por API ou navegador que criacao com data passada falha, criacao com data atual/futura funciona e responsavel enviado pertence ao time selecionado
- [x] 3.4 Atualizar README ou documentacao relevante somente se a regra de prazo precisar ficar explicita para execucao/teste
