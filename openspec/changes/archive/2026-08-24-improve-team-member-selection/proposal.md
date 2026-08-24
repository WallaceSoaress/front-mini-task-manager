## Why

O cadastro de time usa um `select multiple` nativo para membros, mas no navegador ele exige `Ctrl` ou `Shift` para acumular selecoes. Isso faz parecer que o sistema permite apenas um membro por vez e prejudica o fluxo esperado de criar times com varias pessoas.

## What Changes

- Substituir a interacao de selecao multipla nativa por um controle em que cada clique alterna um membro sem depender de teclas modificadoras.
- Manter a exibicao de nome e e-mail dos usuarios disponiveis.
- Preservar o contrato enviado para a API com `memberIds` contendo os IDs dos membros selecionados.
- Manter a possibilidade de cadastrar time sem membros.
- Manter tratamento de carregamento e erro ao buscar usuarios.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `team-creation`: melhora a forma como usuarios selecionam multiplos membros no formulario de cadastro de time.

## Impact

- Componente de formulario de time no frontend.
- Estilos dos controles de membros.
- Testes ou validacoes manuais do fluxo de cadastro de time.
- Nenhuma alteracao esperada na API ou no contrato `POST /teams`.
