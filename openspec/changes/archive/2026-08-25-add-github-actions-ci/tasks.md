## 1. Workflows de CI

- [x] 1.1 Criar `.github/workflows/ci.yml` na API com GitHub Actions usando Java 21, cache Maven e `mvn test`, verificando que o arquivo existe e referencia `actions/setup-java`.
- [x] 1.2 Criar `.github/workflows/ci.yml` no frontend com GitHub Actions usando Node.js, instalacao de dependencias, `lint` e `build`, verificando que o arquivo existe e referencia `actions/setup-node`.

## 2. Documentacao

- [x] 2.1 Atualizar o README da API para listar CI simples com GitHub Actions como diferencial e verificar que o texto nao menciona CD/deploy automatico.
- [x] 2.2 Atualizar o README do frontend para listar CI simples com GitHub Actions como diferencial e verificar que o texto nao menciona CD/deploy automatico.
- [x] 2.3 Revisar o texto de entrega/e-mail para citar "CI simples" somente se os workflows forem commitados e enviados ao GitHub.

## 3. Validacao

- [x] 3.1 Rodar `mvn test` na API e verificar que a suite passa localmente.
- [x] 3.2 Rodar o comando de lint do frontend e verificar que passa localmente.
- [x] 3.3 Rodar o comando de build do frontend e verificar que passa localmente.
- [x] 3.4 Conferir `git status` nos dois repositorios para garantir que os workflows e READMEs estao prontos para commit/push.
