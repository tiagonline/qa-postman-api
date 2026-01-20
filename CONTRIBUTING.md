# Guia de Contribuição

Obrigado por contribuir com o projeto! Este guia descreve como contribuir de forma efetiva.

## 🤝 Processo de Contribuição

### 1. Fork e Clone

```bash
git clone https://github.com/tiagonline/qa-postman-api.git
cd qa-postman-api
```

### 2. Crie uma branch

Use o padrão: `feature/descricao` ou `fix/descricao`

```bash
git checkout -b feature/nova-colecao-testes
```

### 3. Faça as mudanças

- Mantenha o código limpo e legível
- Siga o padrão de nome de variáveis e funções
- Adicione comentários quando necessário

### 4. Commit com Conventional Commits

```bash
git commit -m "feat: adiciona validação de JWT"
git commit -m "fix: corrige timeout em requisição"
git commit -m "docs: atualiza README"
git commit -m "test: adiciona teste de segurança"
```

**Tipos de commit:**

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `test:` - Testes
- `refactor:` - Refatoração sem mudanças de funcionalidade
- `perf:` - Melhorias de performance
- `style:` - Formatação (não afeta lógica)
- `chore:` - Tarefas de build, deps, etc

### 5. Push e Pull Request

```bash
git push origin feature/nova-colecao-testes
```

Abra um PR no GitHub com descrição clara do que foi feito.

## ✅ Checklist Antes de Fazer PR

- [ ] Testes passando: `npm run test:all`
- [ ] Código sem lint errors: `npm run lint`
- [ ] Código formatado: `npm run format`
- [ ] Documentação atualizada (README, docs)
- [ ] Commits seguem Conventional Commits
- [ ] Branch sincronizada com main

## 📝 Adicionando Novas Collections

### Template padrão:

```json
{
  "info": {
    "name": "Nova Collection",
    "_postman_id": "unique-id-aqui",
    "description": "Descrição da collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Request Name",
      "request": {
        "method": "GET",
        "header": [],
        "url": "{{baseUrl}}/endpoint"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('Status 200', function() {",
              "  pm.response.to.have.status(200);",
              "});"
            ]
          }
        }
      ]
    }
  ]
}
```

### Boas práticas para collections:

1. Use variáveis `{{baseUrl}}` para endpoints
2. Salve dados importantes com `pm.environment.set()`
3. Valide sempre com `pm.test()`
4. Inclua validação de schema quando possível
5. Documente o propósito de cada request
6. Use pré-request scripts para setup

## 🧪 Adicionando Novos Testes

1. Crie um arquivo na pasta `tests/`
2. Use as helpers disponíveis em `helpers/`
3. Siga o padrão de assertions em `helpers/test-assertions.js`
4. Documente o teste com comentários

### Exemplo:

```javascript
const { assertSuccessResponse, assertResponseTime } = require('../helpers/test-assertions');

describe('User Endpoints', () => {
  test('GET /users deve retornar sucesso', () => {
    const response = { status: 200, responseTime: 150 };
    assertSuccessResponse(response);
    assertResponseTime(response, 1000);
  });
});
```

## 🐛 Reportando Bugs

Ao reportar um bug, inclua:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. real
- Versão do Node.js e npm
- Logs relevantes

## 💡 Sugestões e Melhorias

Abra uma **Issue** com:

- Descrição da sugestão
- Justificativa
- Exemplos de como seria usado

## 📚 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Postman API Testing](https://learning.postman.com/docs/writing-scripts/test-scripts/)
- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/)
- [JSON Schema](https://json-schema.org/)

## 🚀 Desenvolvendo localmente

```bash
# Instale dependências
npm install

# Rode os testes
npm run test:all

# Veja os reports
cat reports/results.json

# Verifique lint
npm run lint

# Corrija formatação
npm run format
```

## 📞 Dúvidas?

- Abra uma Issue com a tag `question`
- Verifique issues existentes
- Consulte a documentação em `docs/`

Obrigado por contribuir! 🎉
