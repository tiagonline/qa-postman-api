// helpers/api-helpers.js
// Utilidades para requisições de API com retry logic e validações

/**
 * Configura retry logic para requisições instáveis
 * @param {number} maxRetries - Máximo de tentativas
 * @param {number} delayMs - Delay entre tentativas em ms
 * @returns {object} Configuração de retry
 */
function setupRetryPolicy(maxRetries = 3, delayMs = 1000) {
  return {
    maxRetries,
    delayMs,
    shouldRetry: (error, retryCount) => {
      return (
        retryCount < maxRetries &&
        (error.code === 'ECONNREFUSED' ||
          error.code === 'ETIMEDOUT' ||
          error.code === 'ENOTFOUND')
      );
    },
  };
}

/**
 * Valida resposta contra schema JSON
 * @param {object} response - Resposta da API
 * @param {object} schema - Schema JSON para validação
 * @returns {boolean}
 */
function validateResponseSchema(response, schema) {
  if (!response || !schema) return false;

  for (const key in schema.properties) {
    if (!(key in response)) {
      console.warn(`Missing property: ${key}`);
      return false;
    }

    const propertySchema = schema.properties[key];
    const propertyValue = response[key];

    if (
      propertySchema.type &&
      typeof propertyValue !== propertySchema.type
    ) {
      console.warn(
        `Invalid type for ${key}: expected ${propertySchema.type}, got ${typeof propertyValue}`
      );
      return false;
    }
  }

  return true;
}

/**
 * Extrai headers de resposta comuns
 * @param {object} response - Resposta da API
 * @returns {object} Headers extraídos
 */
function extractHeaders(response) {
  return {
    contentType: response.headers['content-type'],
    cacheControl: response.headers['cache-control'],
    rateLimit: response.headers['x-ratelimit-limit'],
    rateLimitRemaining: response.headers['x-ratelimit-remaining'],
    xRequestId: response.headers['x-request-id'],
  };
}

/**
 * Valida tokens JWT
 * @param {string} token - Token JWT
 * @returns {boolean}
 */
function isValidJWT(token) {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  return parts.length === 3;
}

module.exports = {
  setupRetryPolicy,
  validateResponseSchema,
  extractHeaders,
  isValidJWT,
};
