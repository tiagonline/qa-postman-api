// helpers/newman-helpers.js
// Exemplo de script Node que poderia manipular reports após execução do Newman.
// (Arquivo opcional, serve como exemplo para integrar pós-processamento)
const fs = require('fs');
const path = require('path');

function summarizeReport() {
  const rpt = path.join(__dirname, '..', 'reports', 'report.html');
  if (fs.existsSync(rpt)) {
    console.log('Report HTML exists:', rpt);
  } else {
    console.log('No report found.');
  }
}

module.exports = { summarizeReport };
