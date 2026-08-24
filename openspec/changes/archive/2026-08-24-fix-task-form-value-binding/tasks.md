## 1. Correcao do formulario de tarefa

- [x] 1.1 Ajustar o helper de registro dos campos em `TaskFormModal` para sincronizar o valor atual no estado do formulario e verificar que `handleSubmit` recebe titulo, descricao, status, prioridade, time, responsavel e prazo preenchidos
- [x] 1.2 Preservar a limpeza de mensagens de erro ao alterar campos invalidos e verificar que `Informe o titulo.` desaparece apos preencher um titulo valido
- [x] 1.3 Remover o `console.log` temporario do submit e verificar que o console nao registra dados de diagnostico ao salvar

## 2. Validacao

- [x] 2.1 Executar `npm run build` e verificar que TypeScript/Vite concluem sem erros
- [x] 2.2 Validar manualmente no navegador a criacao de tarefa com titulo, descricao, status, prioridade, time, responsavel opcional e prazo, verificando no Network ou no comportamento do board que o payload usa os valores atuais do formulario
- [x] 2.3 Validar manualmente que trocar o time ainda filtra responsaveis e limpa responsavel invalido antes da submissao
