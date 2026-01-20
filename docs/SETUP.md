# Guia de Setup

## Instalação

### 1. Pré-requisitos

- Node.js 18+ (ou 20+)
- npm 9+
- Git

### 2. Clonar repositório

```bash
git clone https://github.com/tiagonline/qa-postman-api.git
cd qa-postman-api
```

### 3. Instalar dependências

```bash
npm install
```

Isso vai instalar:
- **newman** - CLI para executar collections Postman
- **chai** - Biblioteca de assertions
- **eslint** - Linter para JavaScript
- **prettier** - Formatador de código
- **husky** - Git hooks
- **commitlint** - Validação de commit messages

### 4. Configurar hooks do Git

```bash
npm run prepare
```

## Configuração do Ambiente

### 1. Variáveis de Ambiente

Edite `environments/dev.json`:

```json
{
  "id": "dev-env",
  "name": "Development",
  "values": [
    {
      "key": "baseUrl",
      "value": "https://api.dev.meusite.com"
    },
    {
      "key": "authToken",
      "value": "seu-token-aqui"
    },
    {
      "key": "timeout",
      "value": 30000
    }
  ]
}
```

### 2. Credenciais (Opcional)

Para usar credenciais seguras:

1. Crie um arquivo `.env` (não versionar):

```
API_TOKEN=seu-token-seguro
API_USER=seu-usuario
API_PASSWORD=sua-senha
```

2. Configure em suas collections usando variáveis

## Primeiros Passos

### 1. Rodar um teste simples

```bash
npm run test
```

Você deve ver:

```
newman

User Flow - Chained Requests...
→ Login (store token)
  POST https://api.dev.meusite.com/api/login [200 OK]
  ✓ Login successful - status 200
```

### 2. Checar linting

```bash
npm run lint
```

Se houver erros, corrija com:

```bash
npm run lint:fix
npm run format
```

### 3. Explorar estrutura

- `collections/user_flow.json` - Fluxo de user
- `collections/security.js` - Testes de segurança
- `environments/dev.json` - Variáveis de ambiente
- `helpers/api-helpers.js` - Utilidades de API
- `schemas/` - Validações JSON Schema

## Troubleshooting

### Newman não encontrado

```bash
# Reinstale
npm install newman --save-dev
```

### Certificado SSL inválido

```bash
# Use a flag --insecure
npm run test -- --insecure
```

### Erro de timeout

Aumente o timeout em `environments/dev.json`:

```json
"timeout": 60000
```

### Problemas com Git hooks

```bash
# Reinstale husky
npm run prepare

# Se ainda não funcionar
npx husky install
```

## Próximos Passos

1. Leia [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Explore as [Collections](../collections/)
3. Revise os [Helpers](../helpers/)
4. Verifique os [Schemas](../schemas/)

## Referências

- [Postman Docs](https://learning.postman.com/)
- [Newman CLI](https://learning.postman.com/docs/running-collections/using-newman-cli/)
- [JSON Schema](https://json-schema.org/)
