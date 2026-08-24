## Context

O README da API concentra informação demais para o objetivo de entrega da prova: execução, contratos, autenticação, regra de negócio principal, testes e diferenciais implementados ficam misturados com roadmap, justificativas longas e conteúdo que pode distrair o avaliador. O README do frontend já está mais próximo do ideal, mas ainda contém detalhes internos de teste e algumas listas longas que podem ser condensadas.

Os projetos ficam em diretórios separados:

- `C:\Users\walla\Desktop\Projetos-pessoais\prova-tecnica\api-mini-task-manager`
- `C:\Users\walla\Desktop\Projetos-pessoais\prova-tecnica\front-mini-task-manager`

## Goals / Non-Goals

**Goals:**

- Reduzir a documentação da API para um guia de entrega direto, com foco no que o avaliador precisa para rodar, testar e validar requisitos.
- Manter o README do frontend coerente com a API e mais enxuto.
- Preservar apenas limitações e melhorias futuras que ajudem a demonstrar consciência técnica sem chamar atenção para ausência de itens fora do escopo.
- Remover afirmações obsoletas ou confusas, especialmente sobre o frontend estar fora da entrega.

**Non-Goals:**

- Alterar código, endpoints, testes, variáveis de ambiente, Docker, banco de dados ou contratos.
- Criar documentação extensa de produto, roadmap, CI/CD ou arquitetura futura.
- Criar README raiz enquanto os projetos continuam como repositórios/diretórios separados.
- Esconder limitações relevantes; a meta é objetividade, não maquiagem.

## Decisions

1. **README da API como documento principal de execução da API**

   O README da API deve conter apenas: visão geral, tecnologias, funcionalidades, arquitetura em poucas linhas, execução com Docker, execução sem Docker resumida, variáveis de ambiente, Swagger, endpoints principais, autenticação, regras de negócio, testes, diferenciais implementados e limitações objetivas.

   Alternativa considerada: manter o README grande e só ajustar trechos inconsistentes. Rejeitada porque o tamanho atual prejudica leitura e dilui os pontos fortes da entrega.

2. **Remover conteúdo especulativo ou defensivo**

   Devem sair trechos sobre CI/CD futuro, deploy Square Cloud, integração com IA, Redis/cache, microsserviços, padrões para novas implementações e registro histórico de decisões. Esses assuntos podem surgir em entrevista, mas não precisam ocupar o README da entrega.

   Alternativa considerada: mover para uma seção "Melhorias futuras". Rejeitada para a maioria dos itens porque listar muitos não implementados cria ruído e pode parecer justificativa excessiva.

3. **README do frontend como guia de uso e integração**

   O README do frontend deve manter tecnologias, configuração da API, execução, build, testes, telas e integração com a API, mas condensar cenários E2E e remover detalhes internos como porta mockada do Playwright ou versão local fixa de Node.

   Alternativa considerada: deixar o frontend detalhado para compensar o corte da API. Rejeitada porque os dois documentos devem ter a mesma intenção: orientar avaliação rápida.

4. **Não duplicar documentação de contrato em excesso**

   A API deve documentar endpoints e payloads principais. O frontend pode referenciar os contratos consumidos sem repetir todos os detalhes de enums e payloads, salvo quando isso ajuda a configurar ou validar a integração.

   Alternativa considerada: manter payloads completos nos dois READMEs. Rejeitada porque aumenta risco de divergência documental.

## Risks / Trade-offs

- **Cortar informação útil demais** -> Mitigar mantendo comandos reais, endpoints principais, variáveis e regra de negócio obrigatória.
- **README parecer superficial** -> Mitigar com uma tabela curta de funcionalidades entregues e uma seção de decisões técnicas objetiva.
- **Documentação divergir da implementação** -> Mitigar conferindo `pom.xml`, `docker-compose.yml`, `.env.example`, `package.json`, services HTTP e testes antes de reescrever.
- **Cross-repo fora do root OpenSpec do front** -> Mitigar deixando claro no planejamento que a implementação afetará também o README da API, apesar da mudança OpenSpec estar registrada no projeto frontend.
