{
  "info": {
    "name": "Security",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "JWT Validation",
      "request": {
        "method": "GET",
        "url": { "raw": "{{baseUrl}}/secure-data" }
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('JWT is valid', function () {",
              "    pm.response.to.have.status(200);",
              "    pm.expect(pm.response.json().token_valid).to.eql(true);",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "SQL Injection Attempt",
      "request": {
        "method": "GET",
        "url": { "raw": "{{baseUrl}}/users?search=' OR 1=1--" }
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('SQL Injection blocked', function () {",
              "    pm.response.to.have.status(400);",
              "});"
            ]
          }
        }
      ]
    }
  ]
}