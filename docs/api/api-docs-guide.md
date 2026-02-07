# API Documentation Best Practices Guide

**Version:** 1.0.0  
**Last Updated:** 2026-02-07

## Table of Contents

- [Introduction](#introduction)
- [OpenAPI/Swagger Setup](#openapiswagger-setup)
- [Postman Collections](#postman-collections)
- [API Versioning Strategy](#api-versioning-strategy)
- [Changelog Format](#changelog-format)
- [Documentation Structure](#documentation-structure)
- [Writing Best Practices](#writing-best-practices)
- [Interactive Documentation](#interactive-documentation)
- [SDK Generation](#sdk-generation)
- [Maintenance & Updates](#maintenance--updates)

---

## Introduction

Great API documentation is essential for developer adoption and successful integration. This guide provides standards and best practices for creating, maintaining, and publishing API documentation for MUIN products.

### Goals of Good API Documentation

1. **Self-service:** Developers can integrate without support
2. **Completeness:** All endpoints, parameters, and responses documented
3. **Accuracy:** Documentation matches implementation
4. **Discoverability:** Easy to find what you need
5. **Examples:** Real-world, copy-paste-ready code samples
6. **Maintainability:** Easy to update as API evolves

---

## OpenAPI/Swagger Setup

OpenAPI Specification (formerly Swagger) is the industry standard for REST API documentation.

### OpenAPI 3.0 File Structure

Create `openapi.yaml` in your project root:

```yaml
openapi: 3.0.3
info:
  title: Your API Name
  version: 1.0.0
  description: |
    Comprehensive description of your API.
    
    ## Features
    - Feature 1
    - Feature 2
    
    ## Getting Started
    Sign up at [https://yourapp.com](https://yourapp.com)
  
  contact:
    name: API Support
    email: api-support@yourapp.com
    url: https://docs.yourapp.com
  
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  
  termsOfService: https://yourapp.com/terms

servers:
  - url: https://api.yourapp.com/v1
    description: Production server
  - url: https://api-staging.yourapp.com/v1
    description: Staging server
  - url: http://localhost:3000/v1
    description: Local development

tags:
  - name: Authentication
    description: Authentication and authorization endpoints
  - name: Users
    description: User management operations
  - name: Products
    description: Product catalog operations

paths:
  /auth/token:
    post:
      summary: Get access token
      description: Obtain an access token using API credentials
      operationId: getToken
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - grant_type
                - client_id
                - client_secret
              properties:
                grant_type:
                  type: string
                  enum: [client_credentials]
                  description: OAuth grant type
                client_id:
                  type: string
                  description: Your application client ID
                client_secret:
                  type: string
                  format: password
                  description: Your application client secret
            example:
              grant_type: client_credentials
              client_id: "your_client_id"
              client_secret: "your_client_secret"
      responses:
        '200':
          description: Successfully obtained access token
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'
              example:
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                token_type: "Bearer"
                expires_in: 3600
                scope: "read write"
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '429':
          $ref: '#/components/responses/RateLimitError'

  /users/{userId}:
    get:
      summary: Get user by ID
      description: Retrieve detailed information about a specific user
      operationId: getUserById
      tags:
        - Users
      security:
        - bearerAuth: []
      parameters:
        - name: userId
          in: path
          required: true
          description: The user ID
          schema:
            type: string
          example: "user_123abc"
        - name: include
          in: query
          description: Additional fields to include (comma-separated)
          schema:
            type: string
          example: "profile,preferences"
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          $ref: '#/components/responses/NotFoundError'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: |
        Enter your JWT token in the format: Bearer <token>
    
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: API key for authentication

  schemas:
    TokenResponse:
      type: object
      required:
        - access_token
        - token_type
        - expires_in
      properties:
        access_token:
          type: string
          description: JWT access token
        token_type:
          type: string
          description: Token type (always "Bearer")
        expires_in:
          type: integer
          description: Token lifetime in seconds
        scope:
          type: string
          description: Granted scopes
    
    User:
      type: object
      required:
        - id
        - email
        - created_at
      properties:
        id:
          type: string
          description: Unique user identifier
          example: "user_123abc"
        email:
          type: string
          format: email
          description: User email address
          example: "user@example.com"
        name:
          type: string
          description: User's display name
          example: "John Doe"
        created_at:
          type: string
          format: date-time
          description: Account creation timestamp
          example: "2026-01-15T10:30:00Z"
        metadata:
          type: object
          additionalProperties: true
          description: Custom user metadata
    
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          description: Machine-readable error code
          example: "INVALID_REQUEST"
        message:
          type: string
          description: Human-readable error message
          example: "The request was invalid"
        details:
          type: object
          description: Additional error details
        request_id:
          type: string
          description: Unique request identifier for support
          example: "req_abc123"

  responses:
    UnauthorizedError:
      description: Authentication failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: "UNAUTHORIZED"
            message: "Invalid or expired token"
            request_id: "req_xyz789"
    
    NotFoundError:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: "NOT_FOUND"
            message: "The requested resource was not found"
            request_id: "req_def456"
    
    RateLimitError:
      description: Rate limit exceeded
      content:
        application/json:
          schema:
            allOf:
              - $ref: '#/components/schemas/Error'
              - type: object
                properties:
                  retry_after:
                    type: integer
                    description: Seconds until retry allowed
          example:
            code: "RATE_LIMIT_EXCEEDED"
            message: "Rate limit exceeded. Try again later."
            retry_after: 60
            request_id: "req_ghi789"

  parameters:
    LimitParam:
      name: limit
      in: query
      description: Maximum number of results to return
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 20
    
    OffsetParam:
      name: offset
      in: query
      description: Number of results to skip
      schema:
        type: integer
        minimum: 0
        default: 0

  examples:
    UserExample:
      value:
        id: "user_123abc"
        email: "john@example.com"
        name: "John Doe"
        created_at: "2026-01-15T10:30:00Z"
```

### Validating OpenAPI Spec

**Using Swagger CLI:**

```bash
# Install
npm install -g @apidevtools/swagger-cli

# Validate
swagger-cli validate openapi.yaml

# Bundle (combine multiple files)
swagger-cli bundle openapi.yaml -o openapi-bundled.yaml
```

**Online Validators:**
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI.tools](https://openapi.tools/)

### Generating Documentation from OpenAPI

**Redoc (Recommended):**

```bash
npm install -g redoc-cli
redoc-cli bundle openapi.yaml -o api-docs.html
```

**Swagger UI:**

```bash
# Docker
docker run -p 8080:8080 -e SWAGGER_JSON=/api/openapi.yaml -v $(pwd):/api swaggerapi/swagger-ui

# NPM
npm install swagger-ui-dist
```

**ReDoc Live Server:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>API Documentation</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    <style>
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <redoc spec-url='./openapi.yaml'></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
  </body>
</html>
```

---

## Postman Collections

Postman collections provide interactive, runnable API documentation.

### Creating a Collection

**Structure:**

```
API Name Collection
├── Authentication
│   ├── Get Access Token
│   └── Refresh Token
├── Users
│   ├── List Users
│   ├── Get User
│   ├── Create User
│   ├── Update User
│   └── Delete User
└── Products
    ├── List Products
    └── Get Product
```

### Collection Variables

Define in collection settings:

```json
{
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://api.yourapp.com/v1",
      "type": "string"
    },
    {
      "key": "apiKey",
      "value": "",
      "type": "secret"
    },
    {
      "key": "accessToken",
      "value": "",
      "type": "string"
    }
  ]
}
```

### Environment Setup

Create environments for different deployment stages:

**Production Environment:**
```json
{
  "name": "Production",
  "values": [
    {
      "key": "baseUrl",
      "value": "https://api.yourapp.com/v1",
      "enabled": true
    }
  ]
}
```

**Staging Environment:**
```json
{
  "name": "Staging",
  "values": [
    {
      "key": "baseUrl",
      "value": "https://api-staging.yourapp.com/v1",
      "enabled": true
    }
  ]
}
```

### Pre-request Scripts

Automatically fetch and set access tokens:

```javascript
// Pre-request script for protected endpoints
const apiKey = pm.collectionVariables.get("apiKey");
const baseUrl = pm.collectionVariables.get("baseUrl");

if (!pm.collectionVariables.get("accessToken")) {
    pm.sendRequest({
        url: `${baseUrl}/auth/token`,
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: pm.environment.get("clientId"),
                client_secret: pm.environment.get("clientSecret")
            })
        }
    }, (err, response) => {
        if (!err) {
            const jsonData = response.json();
            pm.collectionVariables.set("accessToken", jsonData.access_token);
        }
    });
}
```

### Test Scripts

Add automated tests:

```javascript
// Test script
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Response has required fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('email');
    pm.expect(jsonData).to.have.property('created_at');
});

pm.test("Email format is valid", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

// Save data for next request
pm.collectionVariables.set("userId", pm.response.json().id);
```

### Exporting Collections

```bash
# Export via Postman CLI
postman collection export "API Collection" --export-path ./postman-collection.json

# Or manually: Collection → ... → Export
```

### Publishing Collections

**Postman Public Documentation:**

1. Collection → Share
2. Via API → Generate public documentation
3. Customize appearance, add logo
4. Publish to `yourapp.postman.co/documentation`

**Self-hosted:**

```bash
# Use newman to generate HTML
npm install -g newman newman-reporter-html

newman run postman-collection.json \
  -e production.postman_environment.json \
  -r html \
  --reporter-html-export ./api-docs.html
```

---

## API Versioning Strategy

### URL-Based Versioning (Recommended)

```
https://api.yourapp.com/v1/users
https://api.yourapp.com/v2/users
```

**Pros:**
- Clear and explicit
- Easy to route
- Browser-friendly
- Most common approach

**Cons:**
- URL changes on version bump
- Multiple codebases to maintain

### Header-Based Versioning

```http
GET /users
Accept: application/vnd.yourapp.v1+json
```

**Pros:**
- Clean URLs
- More RESTful

**Cons:**
- Less discoverable
- Harder to test in browser

### Query Parameter Versioning

```
https://api.yourapp.com/users?version=1
```

**Not recommended** (pollutes query string, less semantic)

### Versioning Best Practices

1. **Start with v1** - Don't use v0 or no version
2. **Major versions only** - `/v1`, `/v2`, not `/v1.2.3`
3. **Maintain old versions** - Support N-1 versions minimum
4. **Deprecation timeline** - Give 6-12 months notice
5. **Changelog** - Document all breaking changes
6. **Migration guides** - Help developers upgrade

### Breaking vs Non-Breaking Changes

**Breaking Changes (require new version):**
- Removing endpoints or parameters
- Changing response structure
- Renaming fields
- Changing authentication methods
- Modifying error codes

**Non-Breaking Changes (same version):**
- Adding new endpoints
- Adding optional parameters
- Adding new response fields
- Adding new error codes
- Performance improvements

### Version Deprecation Notice

**In API Response Headers:**

```http
X-API-Version: 1
X-API-Deprecated: true
X-API-Sunset: 2026-12-31
X-API-Upgrade-Guide: https://docs.yourapp.com/migration/v1-to-v2
```

**In Documentation:**

```markdown
## ⚠️ Version 1 Deprecation Notice

**Version 1 of this API will be sunset on December 31, 2026.**

Please migrate to [Version 2](https://docs.yourapp.com/api/v2) before this date.

**What's changing:**
- OAuth 2.0 required (API keys deprecated)
- Response format updated (see migration guide)
- New rate limiting structure

**Migration Guide:** [v1 to v2 Migration](https://docs.yourapp.com/migration/v1-to-v2)
```

---

## Changelog Format

Maintain a clear, chronological changelog.

### Changelog Structure

**File:** `CHANGELOG.md` or `docs/changelog.md`

```markdown
# API Changelog

All notable changes to the API will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New endpoint: `GET /analytics/export` for data export

### Changed
- Improved rate limiting algorithm for better performance

## [1.2.0] - 2026-02-07

### Added
- **New endpoint:** `POST /comments/bulk-import` for batch comment processing
- **New parameter:** `include` query parameter for `/users/{userId}` endpoint
- Webhook support for `comment.processed` event
- SDK support for Python 3.12

### Changed
- **Breaking:** Renamed `user_id` to `id` in User object (affects v2 only)
- Increased default rate limit for Pro tier (60 → 120 requests/min)
- Improved error messages with more detailed error codes

### Deprecated
- `GET /users/search` - Use `GET /users?query=` instead (will be removed in v2.0)
- API key authentication - OAuth 2.0 recommended (keys supported until 2027-01-01)

### Fixed
- Fixed pagination issue in `/templates` endpoint
- Resolved intermittent 500 errors in webhook delivery
- Fixed timezone handling in analytics date ranges

### Security
- Added rate limiting per API key (previously per IP only)
- Improved webhook signature validation
- Updated JWT token expiration (3600s → 1800s for security)

## [1.1.0] - 2026-01-15

### Added
- Template management API
- Sentiment analysis for comments
- Platform-specific analytics

### Fixed
- Corrected response format for batch operations

## [1.0.0] - 2026-01-01

Initial release.

### Added
- Comment processing API
- Reply generation and posting
- Basic analytics
- Webhook support

---

## Version Support Matrix

| Version | Status | Released | End of Support |
|---------|--------|----------|----------------|
| v2      | Beta | 2026-03-01 (planned) | N/A |
| v1      | Stable | 2026-01-01 | 2027-06-30 |
| v0 (beta) | Deprecated | 2025-10-01 | 2026-03-31 |

## Migration Guides

- [v0 → v1 Migration Guide](./migrations/v0-to-v1.md)
- [v1 → v2 Migration Guide](./migrations/v1-to-v2.md) *(coming soon)*
```

### Changelog Entry Template

When adding a new entry, use this template:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New feature or capability
- Format: Brief description, link to docs if applicable

### Changed
- Modified behavior
- Include **Breaking** tag if breaking change

### Deprecated
- Features marked for removal
- Include timeline for removal

### Removed
- Features removed in this version
- Reference migration guide

### Fixed
- Bug fixes
- Include issue/ticket numbers if applicable

### Security
- Security improvements or patches
- Include CVE numbers if applicable
```

### Automated Changelog Generation

**Using conventional commits:**

```bash
# Install
npm install -g conventional-changelog-cli

# Generate
conventional-changelog -p angular -i CHANGELOG.md -s

# Or use in CI/CD
```

**Git commit format:**

```
feat(comments): add bulk import endpoint
fix(webhooks): resolve signature verification issue
docs(api): update authentication examples
breaking(users): rename user_id to id in responses
```

---

## Documentation Structure

### Recommended File Organization

```
docs/
├── api/
│   ├── README.md                    # API overview
│   ├── getting-started.md           # Quick start guide
│   ├── authentication.md            # Auth details
│   ├── rate-limiting.md             # Rate limits
│   ├── errors.md                    # Error codes
│   ├── webhooks.md                  # Webhook setup
│   ├── changelog.md                 # Version history
│   ├── openapi.yaml                 # OpenAPI spec
│   ├── postman-collection.json      # Postman collection
│   └── endpoints/
│       ├── comments.md              # Comments API
│       ├── replies.md               # Replies API
│       ├── templates.md             # Templates API
│       └── analytics.md             # Analytics API
├── sdk/
│   ├── javascript.md                # JS SDK docs
│   ├── python.md                    # Python SDK docs
│   └── examples/                    # Code examples
└── guides/
    ├── migration-v1-to-v2.md        # Migration guides
    ├── best-practices.md            # Usage best practices
    └── tutorials/                   # Step-by-step tutorials
```

### Landing Page Template

**`docs/api/README.md`:**

```markdown
# API Documentation

Welcome to the [Your Product] API documentation.

## Quick Links

- [Getting Started](./getting-started.md)
- [API Reference](./openapi.yaml)
- [Authentication](./authentication.md)
- [Code Examples](#examples)
- [SDK Documentation](../sdk/)

## Overview

Brief description of what your API does and who it's for.

## Features

- Feature 1
- Feature 2
- Feature 3

## Base URL

```
https://api.yourapp.com/v1
```

## Authentication

Quick auth example:

```bash
curl https://api.yourapp.com/v1/users \
  -H "Authorization: Bearer YOUR_API_KEY"
```

[Full authentication docs →](./authentication.md)

## Rate Limits

| Plan | Requests/Min |
|------|-------------|
| Free | 10 |
| Pro  | 100 |

[Full rate limiting docs →](./rate-limiting.md)

## Quick Example

```javascript
const client = new YourAPI({ apiKey: 'your_key' });

const result = await client.users.get('user_123');
console.log(result);
```

## Support

- Email: api-support@yourapp.com
- Slack: [Join community](https://slack.yourapp.com)
- Status: [status.yourapp.com](https://status.yourapp.com)
```

---

## Writing Best Practices

### 1. Write for Developers

- Be concise and technical
- Assume familiarity with REST/HTTP
- Provide working code examples
- Use consistent terminology

### 2. Show, Don't Just Tell

**Bad:**
```
The API supports pagination.
```

**Good:**
```
The API supports pagination using `limit` and `offset` parameters:

```bash
curl "https://api.yourapp.com/v1/users?limit=20&offset=40"
```

### 3. Include All HTTP Details

Document:
- HTTP method (GET, POST, etc.)
- Full URL path with parameters
- Required headers
- Request body schema
- All possible response codes
- Response body schema

### 4. Provide Multiple Code Examples

Include examples in popular languages:
- cURL (universal)
- JavaScript/Node.js
- Python
- Your SDKs

### 5. Document Edge Cases

- What happens with empty responses?
- How are null values handled?
- What's the behavior on partial success?
- Rate limiting behavior
- Timeout behavior

### 6. Use Realistic Examples

**Bad:**
```json
{
  "name": "string",
  "age": 0
}
```

**Good:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 32,
  "joined_at": "2026-01-15T10:30:00Z"
}
```

### 7. Explain the "Why"

Not just what endpoints do, but when to use them:

```markdown
## When to Use Batch vs Single Processing

**Use single processing** (`POST /comments/process`) when:
- Processing comments in real-time
- You need immediate results
- Processing < 10 comments

**Use batch processing** (`POST /comments/bulk-import`) when:
- Importing historical data
- Processing > 10 comments
- Results can be asynchronous
```

---

## Interactive Documentation

### API Playground

Embed interactive API explorers:

**Using Swagger UI:**

```html
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
<script>
  SwaggerUIBundle({
    url: "/openapi.yaml",
    dom_id: '#swagger-ui',
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIBundle.SwaggerUIStandalonePreset
    ]
  })
</script>
```

**Using RapiDoc:**

```html
<rapi-doc
  spec-url="/openapi.yaml"
  render-style="read"
  allow-try="true"
  theme="dark"
  api-key-name="Authorization"
  api-key-location="header"
  api-key-value="Bearer "
></rapi-doc>
<script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
```

### Code Sandbox Integration

Embed runnable examples:

```markdown
Try it in CodeSandbox:

[![Edit API Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/your-example)
```

---

## SDK Generation

Generate SDKs automatically from OpenAPI spec.

### OpenAPI Generator

```bash
# Install
npm install @openapitools/openapi-generator-cli -g

# Generate JavaScript SDK
openapi-generator-cli generate \
  -i openapi.yaml \
  -g javascript \
  -o ./sdk/javascript

# Generate Python SDK
openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o ./sdk/python
```

**Supported Languages:**
- JavaScript/TypeScript
- Python
- Ruby
- PHP
- Go
- Java
- C#
- And 50+ more

### Custom SDK Templates

Create templates for your brand:

```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g javascript \
  -o ./sdk/javascript \
  -t ./templates/javascript \
  --additional-properties=npmName=@yourcompany/api-client,npmVersion=1.0.0
```

---

## Maintenance & Updates

### Documentation Testing

**Test examples:**

```bash
# Extract code blocks and run them
npm install -g markdown-it markdown-it-testgen

# Or use doc-testing tools
npm install -g @readme/oas-examples
oas-examples validate openapi.yaml
```

**Lint OpenAPI spec:**

```bash
npm install -g @stoplight/spectral-cli

spectral lint openapi.yaml
```

### Keep Docs in Sync

**1. Co-locate with code:**
- Store OpenAPI spec in repo
- Version with code
- Review in PRs

**2. Auto-generate from code:**

```javascript
// Node.js + Express
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const openapiSpec = swaggerJsdoc(options);
```

**3. Contract testing:**

```javascript
// Jest + OpenAPI validator
const OpenAPIValidator = require('express-openapi-validator');

app.use(
  OpenAPIValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: true,
  })
);
```

### Documentation CI/CD

**GitHub Actions example:**

```yaml
name: API Docs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'openapi.yaml'

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate OpenAPI
        run: |
          npm install -g @stoplight/spectral-cli
          spectral lint openapi.yaml
      
      - name: Generate docs
        run: |
          npm install -g redoc-cli
          redoc-cli bundle openapi.yaml -o api-docs.html
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Documentation Metrics

Track documentation usage:

- Page views (most visited endpoints)
- Search queries (what users look for)
- Feedback ratings
- Support ticket correlation

Use tools like:
- Google Analytics
- Mixpanel
- Intercom (for in-docs chat)

---

## Tools & Resources

### Documentation Platforms

- **ReadMe.io** - Hosted API docs with analytics
- **GitBook** - Beautiful documentation hosting
- **Docusaurus** - Facebook's open-source doc site generator
- **Slate** - Clean, responsive API docs
- **MkDocs** - Python-based doc generator

### API Design Tools

- **Stoplight Studio** - Visual OpenAPI editor
- **Insomnia** - API client + design
- **Postman** - Complete API platform
- **Swagger Editor** - Online OpenAPI editor

### Testing & Validation

- **Spectral** - OpenAPI linter
- **Dredd** - API testing framework
- **Portman** - Generate Postman from OpenAPI
- **openapi-examples-validator** - Validate examples

### SDK Generators

- **OpenAPI Generator** - 50+ languages
- **Swagger Codegen** - Java-based generator
- **Fern** - Modern SDK generator
- **Speakeasy** - SDK generation platform

---

## Checklist: Publishing API Docs

Before going live:

- [ ] OpenAPI spec is complete and valid
- [ ] All endpoints documented with examples
- [ ] Authentication clearly explained
- [ ] Error codes documented
- [ ] Rate limiting explained
- [ ] Webhooks documented (if applicable)
- [ ] SDK examples provided (JavaScript, Python minimum)
- [ ] Postman collection created and tested
- [ ] Getting started guide written
- [ ] Migration guides for breaking changes
- [ ] Changelog maintained
- [ ] Interactive playground available
- [ ] Code examples tested and working
- [ ] Contact/support information provided
- [ ] API status page linked
- [ ] Terms of service linked
- [ ] Version support policy documented

---

## Support

For questions about this guide:

- **Internal:** #api-docs Slack channel
- **Email:** dev-docs@muin.co
- **Wiki:** [MUIN Developer Documentation Standards](https://wiki.muin.co/api-docs)

---

**Last Updated:** 2026-02-07  
**Maintained by:** Engineering Team @ MUIN
