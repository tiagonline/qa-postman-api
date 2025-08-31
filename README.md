# qa-postman-api

Projeto de automação de testes de API utilizando Postman, Newman e práticas modernas de QA.

## Estrutura do Projeto

- `collections/` - Coleções Postman organizadas por funcionalidade.
- `environments/` - Ambientes para parametrização (dev, staging, prod).
- `schemas/` - JSON Schemas para validação de resposta.
- `.github/workflows/` - Integração contínua (CI/CD) com Newman.
- `docs/` - Documentação automática (link Postman Docs).

## Como rodar os testes localmente

```bash
newman run ./collections/Users.json -e ./environments/dev.json --reporters cli,html
```

Para gerar relatório Allure:
```bash
newman run ./collections/Users.json -e ./environments/dev.json -r allure
```

## Visualizar relatório HTML

Após rodar, abra o arquivo gerado em `./newman/newman-run-report.html`.

## Visualizar relatório Allure

```bash
npx allure open ./allure-report
```

## CI/CD com GitHub Actions

Os testes são executados automaticamente a cada push/PR. Veja o workflow em `.github/workflows/postman-newman.yml`.

## Documentação

Acesse a documentação automática [aqui](https://www.postman.com/your-workspace/docs)  
*(Troque pelo link real do seu workspace/documentação)*

## Monitores

Os testes são monitorados periodicamente. Alertas de falha são enviados para o e-mail cadastrado.

## Mock Servers

Endpoints fictícios para testes isolados podem ser acessados via Postman Mock Server.

## Segurança

Testes de segurança automatizados, como validação de JWT e tentativas de SQL Injection.

## Colaboração

Projeto organizado em workspace colaborativo para desenvolvimento em equipe.

---