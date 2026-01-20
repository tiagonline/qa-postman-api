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
        "url": "{{baseUrl}}/secure-data"
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
        "url": "{{baseUrl}}/users?search=' OR 1=1--"
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
    },
    {
      "name": "XSS Attempt - Script Tag",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"<script>alert('XSS')</script>\"}"
        },
        "url": "{{baseUrl}}/api/users"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('XSS payload rejected or sanitized', function () {",
              "    var response = pm.response.json();",
              "    pm.expect(response.name).to.not.include('<script>');",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "XSS Attempt - Event Handler",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"test@test.com\", \"bio\": \"<img src=x onerror=alert('XSS')>\"}"
        },
        "url": "{{baseUrl}}/api/users"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('XSS event handler blocked', function () {",
              "    var response = pm.response.json();",
              "    pm.expect(response.bio).to.not.include('onerror');",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "Invalid JWT Token",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer invalid.token.here",
            "type": "text"
          }
        ],
        "url": "{{baseUrl}}/api/users"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('Invalid JWT rejected', function () {",
              "    pm.response.to.have.status(401);",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "Missing Authorization Header",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/users/protected"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('Missing auth header returns 401', function () {",
              "    pm.response.to.have.status(401);",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "Security Headers Validation",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/users"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('Response has security headers', function () {",
              "    pm.expect(pm.response.headers.has('X-Content-Type-Options')).to.be.true;",
              "    pm.expect(pm.response.headers.has('X-Frame-Options')).to.be.true;",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "CORS Headers Present",
      "request": {
        "method": "OPTIONS",
        "url": "{{baseUrl}}/api/users"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('CORS headers configured', function () {",
              "    pm.expect(pm.response.headers.has('Access-Control-Allow-Origin')).to.be.true;",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "Rate Limiting Headers",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/users"
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('Rate limiting headers present', function () {",
              "    pm.expect(pm.response.headers.has('X-RateLimit-Limit') || pm.response.headers.has('RateLimit-Limit')).to.be.true;",
              "});"
            ]
          }
        }
      ]
    }
  ]
}