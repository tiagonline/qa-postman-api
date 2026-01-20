#!/usr/bin/env node

// scripts/run-tests.js
// Script para rodar testes com mais controle

const { spawn } = require('child_process');
const path = require('path');

const config = require('../config/newman-config');

function runTests(collectionName, environment = 'dev') {
  return new Promise((resolve, reject) => {
    const collection = config.collections[collectionName];
    const env = config.environments[environment];

    if (!collection || !env) {
      reject(
        new Error(`Collection "${collectionName}" ou environment "${environment}" não encontrado`)
      );
      return;
    }

    console.log(`\n📊 Executando testes de "${collectionName}" em "${environment}"\n`);

    const newman = spawn('npx', [
      'newman',
      'run',
      collection,
      '-e',
      env,
      '--reporters',
      'cli',
      '--insecure',
    ]);

    newman.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    newman.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    newman.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ Testes de "${collectionName}" passaram!\n`);
        resolve();
      } else {
        console.log(`\n❌ Testes de "${collectionName}" falharam\n`);
        reject(new Error(`Tests failed with code ${code}`));
      }
    });
  });
}

async function runAllTests() {
  try {
    console.log('🚀 Iniciando suite de testes\n');

    await runTests('userFlow', 'dev');
    await runTests('security', 'dev');

    console.log('✅ Todos os testes passaram com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar testes:', error.message);
    process.exit(1);
  }
}

const command = process.argv[2];

if (command === 'all') {
  runAllTests();
} else if (command === 'user-flow') {
  runTests('userFlow', 'dev').catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
} else if (command === 'security') {
  runTests('security', 'dev').catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
} else {
  console.log(`
Uso: node scripts/run-tests.js [comando]

Comandos:
  all          - Executar todos os testes
  user-flow    - Executar testes de user flow
  security     - Executar testes de segurança

Exemplos:
  npm run test:all
  npm run test
  npm run test:security
  `);
}
