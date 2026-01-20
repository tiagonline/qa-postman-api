// config/test-config.js
// Configurações para validações e assertions

module.exports = {
  // Performance thresholds
  performance: {
    slow: 1000, // ms
    critical: 5000, // ms
  },

  // Retry configuration
  retries: {
    maxAttempts: 3,
    backoffMs: 1000,
  },

  // Assertion defaults
  assertions: {
    validateSchema: true,
    validateHeaders: true,
    validatePerformance: true,
    validateSecurity: true,
  },

  // Error handling
  errors: {
    stopOnFailure: false,
    logFullResponse: true,
    captureScreenshots: false,
  },
};
