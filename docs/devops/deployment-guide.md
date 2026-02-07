# MUIN Deployment Guide

Complete deployment guide for MUIN products across different platforms.

---

## Table of Contents
- [Vercel Deployment (Next.js)](#vercel-deployment-nextjs)
- [Railway/Render Deployment (Node.js)](#railwayrender-deployment-nodejs)
- [Docker Containerization](#docker-containerization)
- [Environment Variables Management](#environment-variables-management)
- [Domain and SSL Setup](#domain-and-ssl-setup)

---

## Vercel Deployment (Next.js)

### Prerequisites
- Vercel account
- GitHub/GitLab repository
- Node.js 18+ locally

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from project root
vercel

# Production deployment
vercel --prod
```

### `vercel.json` Configuration

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1", "sfo1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url",
    "ANALYTICS_ID": "@analytics-id"
  },
  "build": {
    "env": {
      "DATABASE_URL": "@database-url",
      "JWT_SECRET": "@jwt-secret"
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.muin.io/:path*"
    }
  ],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

### Environment Setup on Vercel

```bash
# Add secrets (not visible in UI)
vercel secrets add database-url "postgresql://..."
vercel secrets add jwt-secret "your-secret-here"

# Add environment variables (visible in settings)
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://api.muin.io

vercel env add NEXT_PUBLIC_API_URL preview
# Enter: https://api-staging.muin.io

vercel env add NEXT_PUBLIC_API_URL development
# Enter: http://localhost:3001
```

### Deployment Settings

**Project Settings** (Vercel Dashboard):
- Build Command: `npm run build` or `next build`
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install`
- Development Command: `npm run dev`

**Performance Optimizations**:
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.muin.io', 'assets.muin.io'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Reduce bundle size
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
}
```

---

## Railway/Render Deployment (Node.js)

### Railway Deployment

#### `railway.toml`
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[healthchecks]]
path = "/health"
interval = 30
timeout = 10
```

#### Railway CLI Deploy
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up

# Add environment variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set PORT=3000

# View logs
railway logs

# Open in browser
railway open
```

### Render Deployment

#### `render.yaml`
```yaml
services:
  # Web Service (API)
  - type: web
    name: muin-api
    env: node
    region: singapore
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: DATABASE_URL
        fromDatabase:
          name: muin-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          type: redis
          name: muin-redis
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
        
  # Background Worker
  - type: worker
    name: muin-worker
    env: node
    region: singapore
    plan: starter
    buildCommand: npm install
    startCommand: npm run worker
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false

  # Cron Job
  - type: cron
    name: muin-cleanup
    env: node
    schedule: "0 2 * * *"  # 2 AM daily
    buildCommand: npm install
    startCommand: npm run cleanup

databases:
  - name: muin-db
    databaseName: muin
    plan: starter
    
  - name: muin-redis
    plan: starter
```

#### Deploy to Render
```bash
# Option 1: Connect GitHub repo in Render Dashboard
# - Go to Dashboard > New > Web Service
# - Connect repository
# - Render auto-detects render.yaml

# Option 2: Manual configuration
# Root Directory: ./
# Build Command: npm install && npm run build
# Start Command: npm start
```

---

## Docker Containerization

### Multi-Stage Dockerfile (Next.js)

```dockerfile
# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Node.js API Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build if using TypeScript
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Security: Run as non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/index.js"]
```

### `docker-compose.yml` for Local Development

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    container_name: muin-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/muin
      - REDIS_URL=redis://redis:6379
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis
    command: npm run dev

  db:
    image: postgres:16-alpine
    container_name: muin-db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=muin
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    container_name: muin-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  nginx:
    image: nginx:alpine
    container_name: muin-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app

volumes:
  postgres_data:
  redis_data:
```

### `.dockerignore`

```
node_modules
npm-debug.log
.next
.git
.gitignore
.env*.local
.DS_Store
*.md
coverage
.vscode
.idea
dist
build
```

### Build and Run

```bash
# Build image
docker build -t muin-app:latest .

# Run container
docker run -d \
  -p 3000:3000 \
  --name muin-app \
  --env-file .env.production \
  muin-app:latest

# Docker Compose
docker-compose up -d

# View logs
docker logs -f muin-app

# Stop and remove
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

---

## Environment Variables Management

### Structure by Environment

```
.env.local          # Local development (gitignored)
.env.development    # Development environment
.env.staging        # Staging environment
.env.production     # Production environment (gitignored)
.env.example        # Template (committed to git)
```

### `.env.example`

```bash
# App
NODE_ENV=production
PORT=3000
APP_URL=https://app.muin.io

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Redis
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600

# Auth
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
SESSION_SECRET=another-secret-key

# External APIs
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@muin.io
SMTP_PASS=your-app-password

# Storage
S3_BUCKET=muin-uploads
S3_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

# Monitoring
SENTRY_DSN=https://...@sentry.io/...
LOG_LEVEL=info

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_BETA_FEATURES=false
```

### Loading Environment Variables

**Next.js** (`next.config.js`):
```javascript
module.exports = {
  env: {
    // Public variables (exposed to browser)
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
  },
  // Server-only variables (not exposed)
  serverRuntimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
}
```

**Node.js** (using `dotenv`):
```javascript
// config/env.js
import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env file
dotenv.config();

// Validate environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

### Security Best Practices

1. **Never commit secrets** to git
2. **Use different keys** for each environment
3. **Rotate secrets** periodically
4. **Use secret managers** for production (AWS Secrets Manager, Vault)
5. **Prefix public variables** with `NEXT_PUBLIC_` or `VITE_`

### Secret Management Script

```bash
#!/bin/bash
# scripts/setup-env.sh

ENV=$1

if [ -z "$ENV" ]; then
  echo "Usage: ./setup-env.sh [development|staging|production]"
  exit 1
fi

# Copy template
cp .env.example .env.$ENV

echo "✅ Created .env.$ENV"
echo "📝 Edit .env.$ENV and fill in your secrets"
echo ""
echo "Required secrets:"
grep -E "^[A-Z_]+=" .env.example | sed 's/=.*//' | while read var; do
  echo "  - $var"
done
```

---

## Domain and SSL Setup

### Vercel Custom Domain

1. **Add domain in Vercel Dashboard**:
   - Project Settings → Domains → Add
   - Enter: `app.muin.io`

2. **Configure DNS** (Cloudflare/Route53):
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   ```

3. **SSL**: Auto-provisioned by Vercel (Let's Encrypt)

### Railway/Render Custom Domain

**Railway**:
```bash
# Add custom domain
railway domain add app.muin.io

# Get CNAME target
railway domain list
# Add CNAME record pointing to: <project>.up.railway.app
```

**Render**:
- Settings → Custom Domain → Add
- CNAME: `app.muin.io` → `<service>.onrender.com`
- SSL: Auto-provisioned

### Self-Hosted with Nginx + Let's Encrypt

**Install Certbot**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d app.muin.io -d www.app.muin.io
```

**Nginx Configuration** (`/etc/nginx/sites-available/muin`):
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name app.muin.io www.app.muin.io;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name app.muin.io www.app.muin.io;

    # SSL certificates (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/app.muin.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.muin.io/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/app.muin.io/chain.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # Proxy to Node.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}
```

**Enable and reload**:
```bash
sudo ln -s /etc/nginx/sites-available/muin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Auto-renewal**:
```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot auto-renews via systemd timer
sudo systemctl status certbot.timer
```

### DNS Configuration Example (Cloudflare)

```
# Main domain
Type: A
Name: @
Value: <server-ip>
Proxy: Enabled (orange cloud)

# App subdomain
Type: CNAME
Name: app
Value: cname.vercel-dns.com
Proxy: Disabled (grey cloud)

# API subdomain
Type: A
Name: api
Value: <server-ip>
Proxy: Enabled

# WWW redirect
Type: CNAME
Name: www
Value: muin.io
Proxy: Enabled
```

---

## Quick Reference

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Build succeeds locally
- [ ] Health check endpoint working
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Monitoring/logging enabled
- [ ] Backup strategy in place

### Common Commands

```bash
# Vercel
vercel --prod
vercel logs
vercel env pull

# Railway
railway up
railway logs
railway variables

# Render
# (Deploy via Git push or Dashboard)

# Docker
docker-compose up -d --build
docker logs -f <container>
docker exec -it <container> sh

# Nginx
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew
```

---

**Last Updated**: 2026-02-07  
**Maintained by**: MUIN DevOps Team
