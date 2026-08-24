## 1. Conferência de base

- [x] 1.1 Conferir `pom.xml`, `docker-compose.yml`, `.env.example`, controllers e testes da API, verificando que o README reescrito liste apenas tecnologias, comandos e endpoints realmente existentes
- [x] 1.2 Conferir `package.json`, `.env.example`, services HTTP, rotas e testes do frontend, verificando que o README reescrito liste apenas scripts, telas e integrações realmente existentes

## 2. README da API

- [x] 2.1 Reescrever `api-mini-task-manager/README.md` em formato enxuto e verificar que mantém visão geral, tecnologias, funcionalidades, arquitetura curta, variáveis, execução, Swagger, endpoints, autenticação, regras de negócio, testes, diferenciais implementados e limitações objetivas
- [x] 2.2 Remover do README da API conteúdo especulativo ou defensivo sobre CI/CD/deploy, Square Cloud, IA, Redis/cache, microsserviços, padrões internos e registro histórico, verificando que o documento não promete itens não implementados
- [x] 2.3 Corrigir no README da API qualquer trecho que indique que o frontend está fora da entrega, verificando que a documentação reconhece o projeto frontend separado sem duplicar seu README

## 3. README do frontend

- [x] 3.1 Enxugar `front-mini-task-manager/README.md`, removendo versão local fixa de Node, detalhes internos de mock do Playwright e lista extensa de cenários E2E, verificando que execução, build, testes e configuração da API continuam claros
- [x] 3.2 Reduzir duplicação de contratos no README do frontend, verificando que ele referencia os endpoints consumidos sem repetir payloads/enums de forma mais detalhada que a API
- [x] 3.3 Revisar limitações e melhorias futuras do frontend, verificando que só permaneçam pontos úteis para avaliação e que não pareçam ausência de requisito obrigatório

## 4. Validação final

- [x] 4.1 Revisar os dois READMEs como avaliador, verificando que uma pessoa consegue rodar API e frontend seguindo apenas a documentação
- [x] 4.2 Rodar comandos leves de validação disponíveis, pelo menos `openspec validate --changes` no frontend, e verificar que a mudança documental continua válida
- [x] 4.3 Conferir `git diff -- README.md` em cada projeto, verificando que apenas documentação foi alterada e que não houve mudança acidental em código ou artefatos gerados
