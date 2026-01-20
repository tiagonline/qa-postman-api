# Guia de Boas Práticas

## ✨ Clean Code

### 1. Nomes Significativos

❌ Ruim:
```javascript
pm.test('t1', function() {
  pm.response.to.have.status(200);
});
```

✅ Bom:
```javascript
pm.test('Login deve retornar status 200', function() {
  pm.response.to.have.status(200);
});
```

### 2. Assertions Claras

❌ Ruim:
```javascript
pm.test('response', function() {
  pm.expect(pm.response.json()).to.be.ok;
});
```

✅ Bom:
```javascript
pm.test('Response deve conter token JWT válido', function() {
  const response = pm.response.json();
  pm.expect(response).to.have.property('token');
  pm.expect(response.token).to.match(/^[A-Za-z0-9-._~+/]+=*$/);
});
```

### 3. Variáveis Descritivas

❌ Ruim:
```javascript
pm.environment.set('t', json.token);
pm.environment.set('u', json.user.id);
```

✅ Bom:
```javascript
pm.environment.set('authToken', json.token);
pm.environment.set('userId', json.user.id);
```

## 🏗️ Arquitetura

### 1. Organização de Collections

```
collections/
├── user_flow.json       # Fluxo completo de usuário
├── security.js          # Testes de segurança
├── products.json        # (futuro) Testes de produtos
└── orders.json          # (futuro) Testes de pedidos
```

### 2. Reutilização de Código

Use helpers para lógica comum:

```javascript
// ❌ Repetido em múltiplos testes
pm.test('JWT válido', function() {
  const token = pm.response.json().token;
  pm.expect(token).to.match(/^[A-Za-z0-9-._~+/]+=*$/);
});

// ✅ Usar helper
const { isValidJWT } = require('../helpers/api-helpers');
pm.test('JWT válido', function() {
  pm.expect(isValidJWT(pm.response.json().token)).to.be.true;
});
```

### 3. Validação com Schemas

```javascript
// ❌ Validações inline
pm.test('Resposta válida', function() {
  const json = pm.response.json();
  pm.expect(json).to.have.property('id');
  pm.expect(json).to.have.property('email');
  pm.expect(json).to.have.property('name');
});

// ✅ Com schema
const schema = pm.collectionVariables.get('userSchema');
pm.test('Resposta segue schema de usuário', function() {
  const { validateResponseSchema } = require('../helpers/api-helpers');
  pm.expect(validateResponseSchema(pm.response.json(), schema)).to.be.true;
});
```

## 🔒 Segurança

### 1. Nunca versione credenciais

```bash
# ❌ Errado - nunca commit isso
git add environments/prod.json  # com senhas reais

# ✅ Certo
# Use .env ou variables secretas em CI/CD
```

### 2. Validação de Headers de Segurança

```javascript
const { assertSecurityHeaders } = require('../helpers/test-assertions');

pm.test('Response headers incluem proteções de segurança', function() {
  pm.expect(assertSecurityHeaders(pm.response)).to.be.true;
});
```

### 3. Sanitização de Dados

```javascript
// ❌ Ruim
console.log('Token:', pm.environment.get('authToken'));

// ✅ Bom
pm.logger.info('Request autenticado com sucesso');
// (sem logar tokens sensíveis)
```

## 📊 Performance

### 1. Assertions de Performance

```javascript
const { assertResponseTime } = require('../helpers/test-assertions');

pm.test('Resposta rápida (< 1s)', function() {
  pm.expect(assertResponseTime(pm.response, 1000)).to.be.true;
});
```

### 2. Retry Logic

Para requisições instáveis:

```javascript
const { setupRetryPolicy } = require('../helpers/api-helpers');
const retryConfig = setupRetryPolicy(3, 1000); // 3 tentativas, 1s delay
```

## ✅ Testing

### 1. Testes Independentes

```javascript
// ❌ Ruim - testes acoplados
pm.test('Login', function() {
  pm.response.to.have.status(200);
  pm.environment.set('token', pm.response.json().token);
});

pm.test('Get User - requer token do teste anterior', function() {
  const token = pm.environment.get('token');
  pm.expect(token).to.exist;
});
```

✅ Melhor:
```javascript
// Setup token antes de cada teste
const token = 'valid-jwt-token'; // ou fixture
pm.request.headers.add('Authorization', `Bearer ${token}`);
```

### 2. Cobertura de Casos

```javascript
// ✅ Testar sucesso E erro
pm.test('[200] Login com credenciais válidas', function() {
  pm.response.to.have.status(200);
});

pm.test('[401] Login com credenciais inválidas', function() {
  // Testar com dados inválidos
  pm.response.to.have.status(401);
});
```

## 📝 Documentação

### 1. Comentar o Porquê

```javascript
// ✅ Bom
// Aguarda estabilização da cache antes de executar
// para evitar falsos positivos em testes intermitentes
pm.response.to.have.status(200);

// ❌ Ruim
// Verifica status 200
pm.response.to.have.status(200);
```

### 2. Descrições em Collections

Adicione descrição em cada request:

```json
{
  "name": "Create User",
  "description": "Cria um novo usuário no sistema. Requer email e nome válidos.",
  "request": { ... }
}
```

## 🔄 Versionamento

### Git Commits

```bash
# ✅ Descritivo
git commit -m "feat: adiciona validação de JWT em requests autenticadas"

# ❌ Vago
git commit -m "fix stuff"
```

## 🚀 CI/CD

### 1. Testar em Ambientes

```bash
npm run test  # dev
# npm run test:staging  # (to be added)
# npm run test:prod  # (to be added)
```

### 2. Monitorar Resultados

Verifique reports após cada execução:

```bash
cat reports/results.json
```

## 📚 Referências

- [Postman Best Practices](https://learning.postman.com/docs/getting-started/best-practices/)
- [Clean Code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [API Testing Best Practices](https://www.soapui.org/learn/api-testing/best-practices)
