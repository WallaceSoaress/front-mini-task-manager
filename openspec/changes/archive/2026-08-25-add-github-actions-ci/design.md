## Context

See proposal.md - Why.

O projeto esta dividido em dois repositorios publicos: API Spring Boot/Maven e frontend React/Vite. A execucao local integrada ja e coberta pelo Docker Compose da API, mas a validacao automatica no GitHub deve ser configurada em cada repositorio, pois cada um possui seu proprio ciclo de build e testes.

## Goals / Non-Goals

**Goals:**

- Criar CI simples e objetivo para a API, validando testes Maven com Java 21.
- Criar CI simples e objetivo para o frontend, validando instalacao de dependencias, lint e build.
- Usar GitHub Actions com gatilhos em `push` e `pull_request`.
- Documentar o diferencial como CI simples, sem chamar de CD.

**Non-Goals:**

- Nao publicar ambiente automaticamente.
- Nao criar pipeline de deploy.
- Nao executar testes E2E Playwright no CI nesta etapa, para evitar acoplamento com banco/API rodando no pipeline.
- Nao alterar comportamento da API, UI, banco ou Docker Compose.

## Decisions

- **Workflows separados por repositorio.** Cada repositorio recebe seu proprio `.github/workflows/ci.yml`. Alternativa considerada: workflow unico em um monorepo; descartada porque a entrega usa repositorios separados.
- **API com `mvn test`.** O workflow deve instalar Java 21 e executar a suite Maven existente. Alternativa considerada: `mvn verify`; descartada por ser mais amplo que o necessario para o escopo e por `mvn test` ja cobrir os testes automatizados declarados no README.
- **Frontend com instalacao, lint e build.** O workflow deve instalar Node.js, instalar dependencias e rodar `npm run lint` e `npm run build`. Alternativa considerada: incluir Playwright; descartada nesta etapa por exigir preparar ambiente integrado no runner.
- **Nomear como CI, nao CI/CD.** Como nao existe deploy automatico nem ambiente publicado, a documentacao deve evitar "CD" para nao gerar expectativa incorreta na avaliacao.
- **Cache de dependencias quando simples.** Usar cache nativo do `actions/setup-java` para Maven e do `actions/setup-node` para npm quando compativel. Se o frontend permanecer com `yarn.lock`, a implementacao pode optar por Yarn para respeitar o lockfile.

## Risks / Trade-offs

- [Risco] Frontend possui `yarn.lock`, mas README cita npm. -> [Mitigacao] Escolher um gerenciador no workflow e documentar de forma consistente; preferir o lockfile existente para reprodutibilidade.
- [Risco] Playwright fora do CI pode ser visto como cobertura incompleta. -> [Mitigacao] Documentar que os E2E existem e podem ser rodados localmente, enquanto o CI cobre lint/build.
- [Risco] GitHub Actions so executa apos os arquivos serem enviados ao remoto. -> [Mitigacao] Validar localmente os comandos equivalentes antes do push.
- [Risco] Nomear como CI/CD sem deploy automatico pode causar cobranca indevida. -> [Mitigacao] Usar explicitamente "CI simples" nos READMEs e no e-mail.

## Migration Plan

1. Criar `.github/workflows/ci.yml` no repositorio da API.
2. Criar `.github/workflows/ci.yml` no repositorio do frontend.
3. Atualizar os READMEs para mencionar CI simples com GitHub Actions.
4. Rodar localmente os comandos equivalentes: `mvn test`, `npm run lint` e `npm run build` ou equivalentes com Yarn, conforme o workflow escolhido.
5. Enviar os commits ao GitHub e conferir a aba Actions dos dois repositorios.
