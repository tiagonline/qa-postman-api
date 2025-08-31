# QA API Testing - Postman + Newman

Este repositório demonstra testes de API com **Postman Collections** e execução via **Newman**. 
O foco é mostrar **encadeamento (chaining)** de requests, uso de variáveis de ambiente e geração de relatórios HTML/JUnit para CI.

## Estrutura
```
qa-api-testing/
├─ collections/user_flow.json       # Collection Postman com requests encadeados
├─ environments/dev.json           # Variáveis de ambiente (baseUrl, token)
├─ reports/                         # Relatórios gerados pelo Newman
├─ package.json
└─ .github/workflows/api-tests.yml  # Workflow GitHub Actions
```

## Requisitos
- Node.js >= 16
- npm
- (Opcional) Docker se quiser rodar em container

## Rodando local
```bash
npm install
npm test
# Após rodar, veja reports/report.html e reports/junit.xml
```

## Como funciona a coleção (resumo)
1. **Login**: faz POST /api/login, valida 200 e salva `authToken` no environment.
2. **Get User**: faz GET /api/users/2 usando `authToken`, valida resposta e salva `userId` no environment.
3. **Update User**: faz PUT /api/users/{{userId}} usando token e dados do body. Possui pré-request que garante existência de `userId`.

## CI / GitHub Actions
O workflow `.github/workflows/api-tests.yml` roda a collection via Newman e publica o relatório HTML como artifact.

## Notas técnicas
- A collection usa o serviço público `https://reqres.in` para demonstração.
- O relatório `htmlextra` gera um HTML rico que facilita revisão por recrutadores/gestores.
- O projeto está comentado para servir de material didático no portfólio.
