{
  "info": {
    "name": "Users",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Users",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/users",
          "host": ["{{baseUrl}}"],
          "path": ["users"]
        }
      },
      "response": [],
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test('Status code is 200', function () {",
              "    pm.response.to.have.status(200);",
              "});",
              "pm.test('Body is an array', function () {",
              "    pm.expect(pm.response.json()).to.be.an('array');",
              "});",
              "// JSON Schema validation",
              "const schema = require('../../schemas/user-list-schema.json');",
              "pm.test('Schema is valid', function () {",
              "    pm.response.to.have.jsonSchema(schema);",
              "});"
            ],
            "type": "text/javascript"
          }
        }
      ]
    }
  ]
}