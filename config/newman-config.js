// config/newman-config.js
// Configurações centralizadas para execução do Newman

module.exports = {
  reporters: {
    cli: {
      name: 'cli',
      options: {
        noSummary: false,
        noFailures: false,
        showTimestamps: true,
      },
    },
    json: {
      name: 'json',
      export: 'reports/results.json',
    },
  },
  timeout: {
    request: 30000, // 30s
    script: 10000, // 10s
  },
  retryPolicy: {
    enabled: true,
    maxRetries: 3,
    delayMs: 1000,
  },
  environments: {
    dev: './environments/dev.json',
    staging: './environments/staging.json',
    prod: './environments/prod.json',
  },
  collections: {
    userFlow: './collections/user_flow.json',
    security: './collections/security.js',
  },
};
