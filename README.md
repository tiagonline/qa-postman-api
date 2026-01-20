# QA API Testing - Postman + Newman

[![Tests Status](https://img.shields.io/badge/tests-5%2F5%20passing-brightgreen?style=flat-square)](https://github.com/tiagonline/qa-postman-api)
[![Security Tests](https://img.shields.io/badge/security-2%2F2%20passing-brightgreen?style=flat-square)](https://github.com/tiagonline/qa-postman-api)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green?style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Projeto de automação de testes de API com **Postman**, **Newman** e práticas modernas de QA, seguindo padrões de código limpo e arquitetura escalável.

## 🎯 Funcionalidades

- ✅ Automação de testes de API com Newman
- 🔐 Testes de segurança (JWT, SQL Injection)
- 📊 Validação com JSON Schema
- 🔄 Retry logic automático
- 📈 Performance assertions
- 🔒 Headers de segurança
- 🚀 CI/CD com GitHub Actions
- 📝 Lint e formatação automática (ESLint, Prettier)
- 🎣 Git hooks com Husky

## 📁 Estrutura do Projeto

```
qa-postman-api/
├── .github/workflows/        # CI/CD pipelines
├── collections/              # Postman collections
│   ├── user_flow.json       # Fluxo completo de usuário (login, get, update)
│   └── security.js          # Testes de segurança (JWT, SQL Injection)
├── config/                   # Configurações centralizadas
│   ├── newman-config.js     # Config do Newman
│   └── test-config.js       # Config de testes
├── docs/                     # Documentação
│   ├── SETUP.md             # Guia de instalação
│   └── BEST-PRACTICES.md    # Boas práticas
├── environments/             # Arquivos de ambiente
│   ├── dev.json
│   ├── staging.json
│   └── prod.json
├── helpers/                  # Utilidades reutilizáveis
│   ├── api-helpers.js       # Retry logic, validação de schema, JWT
│   └── test-assertions.js   # Assertions customizadas
├── reports/                  # Relatórios gerados
├── schemas/                  # JSON Schemas para validação
│   ├── login-response-schema.json
│   ├── user-response-schema.json
│   └── user-list-schema.json
├── scripts/                  # Scripts auxiliares
│   └── run-tests.js         # Runner de testes
├── tests/                    # Testes auxiliares
│   └── example.test.js      # Exemplos de uso dos helpers
├── .eslintrc.json           # ESLint config
├── .prettierrc               # Prettier config
├── .commitlintrc.json       # Commitlint config
├── .lintstagedrc.json       # Lint-staged config
├── .gitignore               # Git ignore rules
├── package.json             # Dependências e scripts
├── README.md                # Este arquivo
└── CONTRIBUTING.md          # Guia de contribuição
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ ou 20+
- npm 9+
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/tiagonline/qa-postman-api.git
cd qa-postman-api

# Instale as dependências
npm install

# Configure os hooks do Git
npm run prepare
```

## 📖 Como usar

### Executar testes localmente

```bash
# Rodar testes de user flow
npm run test

# Rodar testes de segurança
npm run test:security

# Rodar todos os testes
npm run test:all

# Rodar com relatório JSON
npm run test:html
```

### Qualidade de código

```bash
# Verificar estilo do código
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Formatar código
npm run format
```

### Limpeza

```bash
# Remover reports e node_modules
npm run clean
```

## 📊 Variáveis de Ambiente

Crie um arquivo `.env` ou edite `environments/dev.json`:

```json
{
  "baseUrl": "https://api.dev.meusite.com",
  "timeout": 30000,
  "authToken": "seu-token-aqui"
}
```

## 🔍 Validação com JSON Schema

As respostas são validadas automaticamente contra schemas JSON:

- `schemas/login-response-schema.json` - Validação do login
- `schemas/user-response-schema.json` - Validação de dados do usuário
- `schemas/user-list-schema.json` - Validação de listas

## 🔄 Retry Logic

Requisições instáveis são automaticamente retentadas:

```javascript
// Configurável em config/test-config.js
retries: {
  maxAttempts: 3,
  backoffMs: 1000
}
```

## 🚀 CI/CD com GitHub Actions

O projeto inclui um workflow automático que:

1. Roda testes em Node 18 e 20
2. Valida lint
3. Executa testes de user flow e segurança
4. Faz upload de relatórios
5. Comenta resultados em PRs

Veja: `.github/workflows/newman-tests.yml`

## 📝 Git Workflow

Este projeto usa `Husky` e `Commitlint`:

```bash
# Commits automáticos seguem o padrão Conventional Commits
git commit -m "feat: adiciona novo teste"
git commit -m "fix: corrige validação"
git commit -m "docs: atualiza README"
```

## 🛠️ Helpers Disponíveis

### `helpers/api-helpers.js`

```javascript
// Retry logic
setupRetryPolicy(maxRetries, delayMs);

// Validação de schema
validateResponseSchema(response, schema);

// Extração de headers
extractHeaders(response);

// Validação de JWT
isValidJWT(token);
```

### `helpers/test-assertions.js`

```javascript
// Assertions customizadas
assertSuccessResponse(response, expectedStatus);
assertErrorResponse(response, expectedStatus);
assertResponseTime(response, maxMs);
assertSecurityHeaders(response);
```

## 📊 Relatórios

Os relatórios são gerados em `reports/`:

- `results.json` - Relatório estruturado
- Console output - Feedback em tempo real

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para diretrizes de contribuição.

## 📜 Licença

MIT

## 📧 Contato

Tiago Silva - [@tiagonline](https://github.com/tiagonline)


## Segurança

Testes de segurança automatizados, como validação de JWT e tentativas de SQL Injection.

## Colaboração

Projeto organizado em workspace colaborativo para desenvolvimento em equipe.

---
