// helpers/test-assertions.js
// Extensões de assertions reutilizáveis

/**
 * Valida resposta de sucesso padrão
 */
function assertSuccessResponse(response, expectedStatus = 200) {
  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, got ${response.status}`
    );
  }

  if (!response.headers['content-type']?.includes('application/json')) {
    throw new Error(
      `Expected JSON response, got ${response.headers['content-type']}`
    );
  }

  return true;
}

/**
 * Valida resposta de erro padrão
 */
function assertErrorResponse(response, expectedStatus = 400) {
  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected error status ${expectedStatus}, got ${response.status}`
    );
  }

  const json = response.json();
  if (!json.error && !json.message) {
    throw new Error('Error response must contain error or message field');
  }

  return true;
}

/**
 * Valida tempo de resposta (performance)
 */
function assertResponseTime(response, maxMs = 1000) {
  if (response.responseTime > maxMs) {
    console.warn(
      `Slow response: ${response.responseTime}ms (threshold: ${maxMs}ms)`
    );
  }

  return response.responseTime <= maxMs;
}

/**
 * Valida presença de headers de segurança
 */
function assertSecurityHeaders(response) {
  const securityHeaders = [
    'x-content-type-options',
    'x-frame-options',
    'x-xss-protection',
  ];

  const missing = securityHeaders.filter(
    (header) => !response.headers[header]
  );

  if (missing.length > 0) {
    console.warn(`Missing security headers: ${missing.join(', ')}`);
    return false;
  }

  return true;
}

module.exports = {
  assertSuccessResponse,
  assertErrorResponse,
  assertResponseTime,
  assertSecurityHeaders,
};
