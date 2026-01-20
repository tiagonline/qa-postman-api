// tests/example.test.js
// Exemplo de testes usando helpers

const {
  assertSuccessResponse,
  assertErrorResponse,
  assertResponseTime,
  assertSecurityHeaders,
} = require('../helpers/test-assertions');

const {
  setupRetryPolicy,
  validateResponseSchema,
  extractHeaders,
  isValidJWT,
} = require('../helpers/api-helpers');

// Mock responses para demonstração
const mockSuccessResponse = {
  status: 200,
  responseTime: 250,
  headers: {
    'content-type': 'application/json',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'x-xss-protection': '1; mode=block',
  },
  json: () => ({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U',
    user: { id: 1, email: 'test@example.com', name: 'Test User' },
  }),
};

const mockErrorResponse = {
  status: 400,
  responseTime: 150,
  headers: {
    'content-type': 'application/json',
  },
  json: () => ({
    error: 'Invalid request',
    message: 'Email format is invalid',
  }),
};

// Exemplos de testes
console.log('=== Exemplos de Testes ===\n');

// 1. Validar resposta de sucesso
console.log('1. Validar resposta de sucesso');
try {
  assertSuccessResponse(mockSuccessResponse, 200);
  console.log('✅ Resposta de sucesso validada\n');
} catch (error) {
  console.error('❌ Erro:', error.message, '\n');
}

// 2. Validar tempo de resposta
console.log('2. Validar performance');
try {
  const result = assertResponseTime(mockSuccessResponse, 1000);
  console.log(`✅ Response time OK (${mockSuccessResponse.responseTime}ms)\n`);
} catch (error) {
  console.error('❌ Erro:', error.message, '\n');
}

// 3. Validar headers de segurança
console.log('3. Validar headers de segurança');
try {
  const result = assertSecurityHeaders(mockSuccessResponse);
  console.log('✅ Headers de segurança presentes\n');
} catch (error) {
  console.error('❌ Erro:', error.message, '\n');
}

// 4. Validar JWT
console.log('4. Validar JWT');
const token = mockSuccessResponse.json().token;
const isValid = isValidJWT(token);
console.log(`✅ JWT válido: ${isValid}\n`);

// 5. Extrair headers
console.log('5. Extrair headers importantes');
const headers = extractHeaders(mockSuccessResponse);
console.log('Headers extraídos:', JSON.stringify(headers, null, 2), '\n');

// 6. Setup retry policy
console.log('6. Configurar retry policy');
const retryConfig = setupRetryPolicy(3, 1000);
console.log('Retry config:', JSON.stringify(retryConfig, null, 2), '\n');

// 7. Validar resposta de erro
console.log('7. Validar resposta de erro');
try {
  assertErrorResponse(mockErrorResponse, 400);
  console.log('✅ Resposta de erro validada\n');
} catch (error) {
  console.error('❌ Erro:', error.message, '\n');
}

console.log('=== Testes Concluídos ===');
