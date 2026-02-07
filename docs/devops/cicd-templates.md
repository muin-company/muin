# MUIN CI/CD Pipeline Templates

Production-ready GitHub Actions workflows for automated testing, building, and deployment.

---

## Table of Contents
- [Basic CI Pipeline](#basic-ci-pipeline)
- [Next.js App with Vercel](#nextjs-app-with-vercel)
- [Node.js API with Railway/Render](#nodejs-api-with-railwayrender)
- [Docker Build and Push](#docker-build-and-push)
- [Preview Deployments for PRs](#preview-deployments-for-prs)
- [Production Deployment with Approvals](#production-deployment-with-approvals)
- [Monorepo Setup](#monorepo-setup)
- [Secrets Management](#secrets-management)

---

## Basic CI Pipeline

**`.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint & Format Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check Prettier formatting
        run: npm run format:check

      - name: TypeScript type check
        run: npm run type-check

  test:
    name: Test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-${{ matrix.node-version }}

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: |
            dist/
            .next/
            public/
          retention-days: 7
```

---

## Next.js App with Vercel

**`.github/workflows/nextjs-vercel.yml`**

```yaml
name: Next.js - Vercel Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    name: Test & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build Next.js
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

  deploy-preview:
    name: Deploy Preview (PR)
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel Preview
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> $GITHUB_OUTPUT

      - name: Comment PR with preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🚀 Preview deployment ready!\n\n✨ **Preview URL**: ${{ steps.deploy.outputs.url }}`
            })

  deploy-staging:
    name: Deploy Staging
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/develop' && github.event_name == 'push'
    environment:
      name: staging
      url: https://staging.muin.io
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel Staging
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment:
      name: production
      url: https://muin.io
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel Production
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: muin
          SENTRY_PROJECT: web
        with:
          environment: production
          version: ${{ github.sha }}
```

---

## Node.js API with Railway/Render

**`.github/workflows/nodejs-api.yml`**

```yaml
name: Node.js API - Deploy

on:
  push:
    branches: [main, develop]
    paths:
      - 'apps/api/**'
      - '.github/workflows/nodejs-api.yml'
  pull_request:
    branches: [main]
    paths:
      - 'apps/api/**'

defaults:
  run:
    working-directory: apps/api

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: apps/api/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
          NODE_ENV: test

      - name: Build
        run: npm run build

  deploy-railway-staging:
    name: Deploy to Railway (Staging)
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/develop' && github.event_name == 'push'
    environment:
      name: staging
      url: https://api-staging.muin.io
    steps:
      - uses: actions/checkout@v4

      - name: Install Railway CLI
        run: npm install -g @railway/cli

      - name: Deploy to Railway
        run: railway up --service api-staging
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-railway-production:
    name: Deploy to Railway (Production)
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment:
      name: production
      url: https://api.muin.io
    steps:
      - uses: actions/checkout@v4

      - name: Install Railway CLI
        run: npm install -g @railway/cli

      - name: Deploy to Railway
        run: railway up --service api-production
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

      - name: Run database migrations
        run: railway run --service api-production npm run migrate
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ API deployed to production",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*API Production Deployment*\n✅ Successfully deployed to Railway\n\n*Commit*: `${{ github.sha }}`\n*Author*: ${{ github.actor }}\n*Branch*: ${{ github.ref_name }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Docker Build and Push

**`.github/workflows/docker.yml`**

```yaml
name: Docker Build & Push

on:
  push:
    branches: [main, develop]
    tags:
      - 'v*'
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    name: Build and Push Docker Image
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64,linux/arm64

      - name: Image digest
        run: echo ${{ steps.build.outputs.digest }}

  scan:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.event_name != 'pull_request'
    
    steps:
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.ref_name }}
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build-and-push, scan]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://app.muin.io
    
    steps:
      - name: Deploy to Kubernetes
        uses: actions-hub/kubectl@master
        env:
          KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
        with:
          args: set image deployment/muin-app muin-app=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

      - name: Verify deployment
        uses: actions-hub/kubectl@master
        env:
          KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
        with:
          args: rollout status deployment/muin-app
```

---

## Preview Deployments for PRs

**`.github/workflows/preview-deploy.yml`**

```yaml
name: Preview Deployment

on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main]

concurrency:
  group: preview-${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  deploy-preview:
    name: Deploy Preview Environment
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      deployments: write
    
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: https://api-preview-${{ github.event.pull_request.number }}.muin.io
          NODE_ENV: production

      - name: Deploy to Vercel
        id: deploy
        run: |
          npm install -g vercel
          url=$(vercel deploy --token=${{ secrets.VERCEL_TOKEN }} --build-env NEXT_PUBLIC_API_URL=https://api-preview-${{ github.event.pull_request.number }}.muin.io)
          vercel alias set $url preview-${{ github.event.pull_request.number }}.muin.io --token=${{ secrets.VERCEL_TOKEN }}
          echo "url=https://preview-${{ github.event.pull_request.number }}.muin.io" >> $GITHUB_OUTPUT

      - name: Create deployment status
        uses: actions/github-script@v7
        with:
          script: |
            const deployment = await github.rest.repos.createDeployment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: context.payload.pull_request.head.sha,
              environment: 'preview',
              auto_merge: false,
              required_contexts: [],
              description: 'Preview deployment for PR #${{ github.event.pull_request.number }}'
            });

            await github.rest.repos.createDeploymentStatus({
              owner: context.repo.owner,
              repo: context.repo.repo,
              deployment_id: deployment.data.id,
              state: 'success',
              environment_url: '${{ steps.deploy.outputs.url }}',
              description: 'Preview deployment ready'
            });

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const comment = `### 🚀 Preview Deployment Ready!
            
            | Name | URL |
            |------|-----|
            | 🌐 **Preview** | ${{ steps.deploy.outputs.url }} |
            | 📊 **Lighthouse** | [Run Lighthouse](https://googlechrome.github.io/lighthouse/viewer/?url=${{ steps.deploy.outputs.url }}) |
            
            <details>
            <summary>📝 Deployment Details</summary>
            
            - **Commit**: \`${{ github.event.pull_request.head.sha }}\`
            - **Branch**: \`${{ github.event.pull_request.head.ref }}\`
            - **Deployed at**: ${new Date().toISOString()}
            </details>
            
            _This preview will be automatically deleted when the PR is closed._`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });

  cleanup:
    name: Cleanup Preview on PR Close
    runs-on: ubuntu-latest
    if: github.event.action == 'closed'
    steps:
      - name: Delete Vercel preview
        run: |
          npm install -g vercel
          vercel remove preview-${{ github.event.pull_request.number }}.muin.io --yes --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Production Deployment with Approvals

**`.github/workflows/production-deploy.yml`**

```yaml
name: Production Deployment

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to deploy'
        required: true
        default: 'latest'

jobs:
  prepare:
    name: Prepare Release
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.version.outputs.version }}
      changelog: ${{ steps.changelog.outputs.changelog }}
    
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get version
        id: version
        run: |
          if [ "${{ github.event_name }}" == "workflow_dispatch" ]; then
            echo "version=${{ github.event.inputs.version }}" >> $GITHUB_OUTPUT
          else
            VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
            echo "version=$VERSION" >> $GITHUB_OUTPUT
          fi

      - name: Generate changelog
        id: changelog
        run: |
          CHANGELOG=$(git log --pretty=format:"- %s (%h)" $(git describe --tags --abbrev=0 @^)..@ 2>/dev/null || echo "Initial release")
          echo "changelog<<EOF" >> $GITHUB_OUTPUT
          echo "$CHANGELOG" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

  test:
    name: Test Suite
    runs-on: ubuntu-latest
    needs: prepare
    strategy:
      matrix:
        test-type: [unit, integration, e2e]
    
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ${{ matrix.test-type }} tests
        run: npm run test:${{ matrix.test-type }}

  security-scan:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: prepare
    
    steps:
      - uses: actions/checkout@v4

      - name: Run npm audit
        run: npm audit --audit-level=moderate

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build:
    name: Build Production Bundle
    runs-on: ubuntu-latest
    needs: [prepare, test, security-scan]
    
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --prefer-offline

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
          NEXT_PUBLIC_API_URL: ${{ secrets.PROD_API_URL }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: production-build
          path: |
            .next/
            dist/
            public/
          retention-days: 30

  deploy-approval:
    name: Request Production Deployment Approval
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: production-approval
    
    steps:
      - name: Approval checkpoint
        run: |
          echo "✅ Deployment approved by ${{ github.actor }}"
          echo "Version: ${{ needs.prepare.outputs.version }}"
          echo "Changelog:"
          echo "${{ needs.prepare.outputs.changelog }}"

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [prepare, build, deploy-approval]
    environment:
      name: production
      url: https://muin.io
    
    steps:
      - uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: production-build

      - name: Deploy to Vercel Production
        run: |
          npm install -g vercel
          vercel deploy --prod --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

      - name: Smoke test
        run: |
          sleep 10
          curl -f https://muin.io/health || exit 1

      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: muin
          SENTRY_PROJECT: web
        with:
          environment: production
          version: ${{ needs.prepare.outputs.version }}

      - name: Notify team
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "🚀 Production Deployment Complete!",
              "blocks": [
                {
                  "type": "header",
                  "text": {
                    "type": "plain_text",
                    "text": "🚀 Production Deployment Complete!"
                  }
                },
                {
                  "type": "section",
                  "fields": [
                    {"type": "mrkdwn", "text": "*Version:*\n${{ needs.prepare.outputs.version }}"},
                    {"type": "mrkdwn", "text": "*Environment:*\nProduction"},
                    {"type": "mrkdwn", "text": "*Deployed by:*\n${{ github.actor }}"},
                    {"type": "mrkdwn", "text": "*URL:*\nhttps://muin.io"}
                  ]
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Changes:*\n${{ needs.prepare.outputs.changelog }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

  rollback:
    name: Rollback (Manual)
    runs-on: ubuntu-latest
    if: failure()
    environment:
      name: production
    
    steps:
      - name: Rollback deployment
        run: |
          npm install -g vercel
          vercel rollback --token=${{ secrets.VERCEL_TOKEN }} --yes
      
      - name: Notify rollback
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "⚠️ Production deployment failed - Rolled back",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Failed*\n❌ Automatically rolled back to previous version\n\n*Commit*: `${{ github.sha }}`\n*Author*: ${{ github.actor }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Monorepo Setup

**`.github/workflows/monorepo.yml`**

```yaml
name: Monorepo CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  detect-changes:
    name: Detect Changed Packages
    runs-on: ubuntu-latest
    outputs:
      web: ${{ steps.filter.outputs.web }}
      api: ${{ steps.filter.outputs.api }}
      mobile: ${{ steps.filter.outputs.mobile }}
      shared: ${{ steps.filter.outputs.shared }}
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            web:
              - 'apps/web/**'
              - 'packages/shared/**'
            api:
              - 'apps/api/**'
              - 'packages/shared/**'
            mobile:
              - 'apps/mobile/**'
              - 'packages/shared/**'
            shared:
              - 'packages/shared/**'

  test-web:
    name: Test Web App
    runs-on: ubuntu-latest
    needs: detect-changes
    if: needs.detect-changes.outputs.web == 'true'
    defaults:
      run:
        working-directory: apps/web
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  test-api:
    name: Test API
    runs-on: ubuntu-latest
    needs: detect-changes
    if: needs.detect-changes.outputs.api == 'true'
    defaults:
      run:
        working-directory: apps/api
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy-web:
    name: Deploy Web
    runs-on: ubuntu-latest
    needs: [detect-changes, test-web]
    if: |
      github.ref == 'refs/heads/main' && 
      needs.detect-changes.outputs.web == 'true'
    
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g vercel
      - run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
        working-directory: apps/web

  deploy-api:
    name: Deploy API
    runs-on: ubuntu-latest
    needs: [detect-changes, test-api]
    if: |
      github.ref == 'refs/heads/main' && 
      needs.detect-changes.outputs.api == 'true'
    
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @railway/cli
      - run: railway up
        working-directory: apps/api
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## Secrets Management

### Required GitHub Secrets

Add these in: **Settings → Secrets and variables → Actions**

```bash
# Vercel
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>

# Railway
RAILWAY_TOKEN=<your-railway-token>

# Container Registry
GITHUB_TOKEN  # Auto-provided by GitHub

# Monitoring
SENTRY_AUTH_TOKEN=<sentry-token>
CODECOV_TOKEN=<codecov-token>
SNYK_TOKEN=<snyk-token>

# Notifications
SLACK_WEBHOOK_URL=<slack-webhook>

# Production env vars
PROD_API_URL=https://api.muin.io
DATABASE_URL=<production-db-url>
REDIS_URL=<production-redis-url>
JWT_SECRET=<your-jwt-secret>
```

### Getting Tokens

**Vercel**:
```bash
# Get token from: https://vercel.com/account/tokens
vercel whoami  # Verify

# Get IDs:
cat .vercel/project.json
```

**Railway**:
```bash
# Get token from: https://railway.app/account/tokens
railway whoami  # Verify
```

**GitHub Container Registry**:
```bash
# Use GITHUB_TOKEN (auto-provided) or create PAT:
# Settings → Developer settings → Personal access tokens → Fine-grained tokens
# Permissions: contents:read, packages:write
```

---

## Usage Examples

### Manual Workflow Trigger

```bash
# Trigger workflow manually
gh workflow run production-deploy.yml -f version=v1.2.3

# Monitor workflow
gh run watch

# List recent runs
gh run list --workflow=production-deploy.yml
```

### Local Testing with Act

```bash
# Install act
brew install act

# Run CI locally
act -j test

# Run with secrets
act -j deploy-production --secret-file .env.secrets

# List available jobs
act -l
```

### Workflow Status Badges

Add to `README.md`:

```markdown
![CI](https://github.com/muin/project/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/muin/project/actions/workflows/production-deploy.yml/badge.svg)
[![codecov](https://codecov.io/gh/muin/project/branch/main/graph/badge.svg)](https://codecov.io/gh/muin/project)
```

---

## Troubleshooting

### Common Issues

**1. Workflow not triggering**
- Check branch filters in `on.push.branches`
- Verify GitHub Actions are enabled: Settings → Actions → General

**2. Secrets not available**
```yaml
# Debug: Print available env vars (remove after debugging)
- run: env | grep -v SECRET | sort
```

**3. Vercel deployment fails**
```bash
# Check Vercel CLI version
vercel --version

# Pull latest env vars
vercel env pull .env.local
```

**4. Docker build timeout**
```yaml
# Increase timeout
- uses: docker/build-push-action@v5
  with:
    timeout: 1800  # 30 minutes
```

---

## Best Practices

1. **Use concurrency groups** to cancel duplicate runs
2. **Cache dependencies** with `actions/setup-node` cache
3. **Matrix testing** for multiple Node.js versions
4. **Separate workflows** for different concerns (CI/CD/Deploy)
5. **Environment protection rules** for production
6. **Require approvals** for production deployments
7. **Notify team** on deployment success/failure
8. **Tag releases** with semantic versioning
9. **Automated rollback** on deployment failure
10. **Security scanning** in every pipeline

---

**Last Updated**: 2026-02-07  
**Maintained by**: MUIN DevOps Team
