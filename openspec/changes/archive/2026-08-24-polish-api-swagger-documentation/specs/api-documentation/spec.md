## Purpose

Define a clareza da documentacao Swagger/OpenAPI da API para que avaliadores e consumidores entendam cada endpoint pela propria lista de operacoes.

## ADDED Requirements

### Requirement: Endpoints da API com summaries claros
A API SHALL expor documentacao Swagger/OpenAPI com tags, summaries e descricoes claras para todos os endpoints principais.

#### Scenario: Documentacao de autenticacao
- **WHEN** a documentacao Swagger/OpenAPI lista os endpoints de autenticacao
- **THEN** `POST /auth/register`, `POST /auth/login`, `GET /auth/session` e `POST /auth/logout` aparecem com summaries e descricoes que comunicam suas finalidades

#### Scenario: Documentacao de usuarios
- **WHEN** a documentacao Swagger/OpenAPI lista `GET /users`
- **THEN** a operacao aparece em uma tag de usuarios com summary e descricao indicando que lista usuarios disponiveis para selecao

#### Scenario: Documentacao de times
- **WHEN** a documentacao Swagger/OpenAPI lista os endpoints de times
- **THEN** `POST /teams`, `GET /teams` e `DELETE /teams/{id}` aparecem com summaries e descricoes que comunicam criacao, listagem e exclusao de times

#### Scenario: Documentacao de tarefas
- **WHEN** a documentacao Swagger/OpenAPI lista os endpoints de tarefas
- **THEN** `POST /tasks`, `GET /tasks`, `GET /tasks/{id}`, `PUT /tasks/{id}` e `DELETE /tasks/{id}` aparecem com summaries e descricoes que comunicam criacao, listagem, detalhe, atualizacao e exclusao de tarefas

#### Scenario: Tags organizam os grupos da API
- **WHEN** um consumidor navega pela documentacao Swagger/OpenAPI
- **THEN** as operacoes aparecem agrupadas por tags coerentes de autenticacao, usuarios, times e tarefas
