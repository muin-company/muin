# MUIN Infrastructure Checklist

Comprehensive pre-launch and operational infrastructure guide.

---

## Table of Contents
- [Pre-Launch Checklist](#pre-launch-checklist)
- [Monitoring Setup](#monitoring-setup)
- [Logging Strategy](#logging-strategy)
- [Backup Automation](#backup-automation)
- [Cost Optimization](#cost-optimization)
- [Security Hardening](#security-hardening)
- [Performance Optimization](#performance-optimization)

---

## Pre-Launch Checklist

### ☑️ Application Setup

- [ ] **Environment variables** configured for all environments
- [ ] **Database migrations** tested and ready
- [ ] **Seed data** scripts prepared (if applicable)
- [ ] **API documentation** up to date (Swagger/OpenAPI)
- [ ] **Health check endpoints** implemented (`/health`, `/ready`)
- [ ] **Error handling** implemented globally
- [ ] **Rate limiting** configured
- [ ] **CORS** properly configured
- [ ] **API versioning** strategy in place

### ☑️ Infrastructure

- [ ] **DNS records** configured and propagated
- [ ] **SSL certificates** active and auto-renewing
- [ ] **CDN** configured for static assets
- [ ] **Load balancer** configured (if applicable)
- [ ] **Database** provisioned with adequate resources
- [ ] **Redis/Cache** layer set up
- [ ] **File storage** configured (S3, Cloudflare R2, etc.)
- [ ] **Email service** configured (SendGrid, AWS SES, etc.)
- [ ] **Background jobs** infrastructure ready (Bull, Inngest, etc.)

### ☑️ Monitoring & Observability

- [ ] **Uptime monitoring** configured (UptimeRobot, Better Uptime)
- [ ] **Error tracking** set up (Sentry, Rollbar)
- [ ] **Performance monitoring** active (New Relic, Datadog)
- [ ] **Log aggregation** configured (Logtail, Papertrail)
- [ ] **Analytics** integrated (PostHog, Mixpanel, GA4)
- [ ] **Status page** created (status.muin.io)
- [ ] **Alerting** configured for critical events

### ☑️ Security

- [ ] **Secrets** stored securely (not in code)
- [ ] **HTTPS** enforced (no HTTP traffic)
- [ ] **Security headers** configured (HSTS, CSP, etc.)
- [ ] **SQL injection** prevention verified
- [ ] **XSS protection** in place
- [ ] **CSRF tokens** implemented
- [ ] **Input validation** on all endpoints
- [ ] **Authentication** properly implemented (JWT, sessions)
- [ ] **Authorization** checks on protected routes
- [ ] **Dependencies** scanned for vulnerabilities
- [ ] **API keys** rotated and secured
- [ ] **Database backups** encrypted

### ☑️ Performance

- [ ] **Database indexes** optimized
- [ ] **Query performance** analyzed (no N+1 queries)
- [ ] **Caching strategy** implemented
- [ ] **Image optimization** in place (WebP, AVIF)
- [ ] **Code splitting** configured (Next.js/Vite)
- [ ] **Lazy loading** for heavy components
- [ ] **CDN** for static assets
- [ ] **Compression** enabled (Gzip/Brotli)
- [ ] **Bundle size** analyzed and optimized

### ☑️ Testing

- [ ] **Unit tests** passing (>80% coverage)
- [ ] **Integration tests** passing
- [ ] **E2E tests** for critical flows
- [ ] **Load testing** performed (k6, Artillery)
- [ ] **Smoke tests** automated
- [ ] **Cross-browser testing** completed
- [ ] **Mobile responsiveness** verified
- [ ] **Accessibility** tested (WCAG 2.1 AA)

### ☑️ DevOps

- [ ] **CI/CD pipeline** working
- [ ] **Deployment strategy** defined (blue-green, canary, etc.)
- [ ] **Rollback procedure** documented and tested
- [ ] **Environment parity** verified (dev/staging/prod)
- [ ] **Infrastructure as Code** (Terraform, Pulumi, etc.)
- [ ] **Disaster recovery plan** documented
- [ ] **Backup restoration** tested

### ☑️ Documentation

- [ ] **README** complete with setup instructions
- [ ] **API documentation** published
- [ ] **Architecture diagram** created
- [ ] **Deployment guide** written
- [ ] **Troubleshooting guide** available
- [ ] **Runbook** for common operations
- [ ] **On-call procedures** documented

### ☑️ Compliance & Legal

- [ ] **Privacy policy** published
- [ ] **Terms of service** published
- [ ] **GDPR compliance** verified (if applicable)
- [ ] **Cookie consent** implemented (if applicable)
- [ ] **Data retention policy** defined
- [ ] **User data export** functionality
- [ ] **User data deletion** functionality

### ☑️ Business Continuity

- [ ] **Domain ownership** verified
- [ ] **Payment method** configured and valid
- [ ] **Service contracts** reviewed
- [ ] **Budget alerts** configured
- [ ] **Team access** properly configured
- [ ] **Emergency contacts** documented
- [ ] **Escalation procedures** defined

---

## Monitoring Setup

### Uptime Monitoring with Better Uptime

**Setup**:
```bash
# 1. Create account: https://betteruptime.com
# 2. Add monitors via dashboard or API

curl -X POST "https://betteruptime.com/api/v2/monitors" \
  -H "Authorization: Bearer $BETTERUPTIME_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "monitor_type": "status",
    "url": "https://api.muin.io/health",
    "check_frequency": 60,
    "request_timeout": 15,
    "confirmation_period": 180,
    "monitor_group_id": null,
    "pronounceable_name": "MUIN API",
    "recovery_period": 180,
    "verify_ssl": true,
    "follow_redirects": false,
    "expected_status_codes": [200],
    "call": true,
    "sms": true,
    "email": true,
    "push": true
  }'
```

**Health Check Endpoint** (`/health`):
```typescript
// apps/api/src/routes/health.ts
import { Router } from 'express';
import db from '../db';
import redis from '../redis';

const router = Router();

router.get('/health', async (req, res) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'unknown',
    redis: 'unknown',
    memory: process.memoryUsage(),
  };

  try {
    // Check database
    await db.raw('SELECT 1');
    checks.database = 'ok';
  } catch (error) {
    checks.database = 'error';
    checks.status = 'degraded';
  }

  try {
    // Check Redis
    await redis.ping();
    checks.redis = 'ok';
  } catch (error) {
    checks.redis = 'error';
    checks.status = 'degraded';
  }

  const statusCode = checks.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(checks);
});

// Readiness probe (for Kubernetes)
router.get('/ready', async (req, res) => {
  // Check if app is ready to receive traffic
  try {
    await db.raw('SELECT 1');
    res.status(200).json({ ready: true });
  } catch (error) {
    res.status(503).json({ ready: false });
  }
});

// Liveness probe
router.get('/live', (req, res) => {
  res.status(200).json({ alive: true });
});

export default router;
```

### Error Tracking with Sentry

**Installation**:
```bash
npm install @sentry/node @sentry/profiling-node
npm install @sentry/nextjs  # For Next.js
```

**Configuration** (`sentry.server.config.ts`):
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  profilesSampleRate: 0.1,
  
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.authorization;
    }
    return event;
  },

  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Prisma({ client: prisma }),
  ],

  ignoreErrors: [
    'Non-Error promise rejection captured',
    'Network request failed',
    'Load failed',
  ],
});
```

**Usage**:
```typescript
// Capture exceptions
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      operation: 'riskyOperation',
      userId: user.id,
    },
    level: 'error',
  });
}

// Add breadcrumbs
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User logged in',
  level: 'info',
  data: { userId: user.id },
});

// Set user context
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});
```

### Performance Monitoring

**Next.js Web Vitals**:
```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';
import { reportWebVitals } from 'next/web-vitals';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics
  if (metric.label === 'web-vital') {
    console.log(metric);
    
    // Send to custom analytics
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        label: metric.label,
      }),
    });
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

**Custom Performance Tracking**:
```typescript
// lib/metrics.ts
import { performance } from 'perf_hooks';

export class Metrics {
  static async measure<T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      
      console.log(`[Metrics] ${name}: ${duration.toFixed(2)}ms`);
      
      // Send to monitoring service
      await this.send({
        metric: 'function_duration',
        name,
        value: duration,
        timestamp: Date.now(),
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`[Metrics] ${name} failed after ${duration.toFixed(2)}ms`);
      throw error;
    }
  }

  private static async send(data: any) {
    // Send to Datadog, New Relic, etc.
    // Or use Vercel Analytics API
  }
}

// Usage
const users = await Metrics.measure('fetchUsers', async () => {
  return db.user.findMany();
});
```

---

## Logging Strategy

### Structured Logging with Pino

**Installation**:
```bash
npm install pino pino-pretty
```

**Configuration** (`lib/logger.ts`):
```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },

  transport: process.env.NODE_ENV === 'development'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,

  redact: {
    paths: [
      'password',
      'token',
      'apiKey',
      'authorization',
      'cookie',
      '*.password',
      '*.token',
    ],
    remove: true,
  },
});

export default logger;
```

**Usage**:
```typescript
import logger from './lib/logger';

// Basic logging
logger.info('Application started');
logger.error('Something went wrong');

// Structured logging
logger.info({
  event: 'user_login',
  userId: user.id,
  email: user.email,
  ip: req.ip,
}, 'User logged in');

// Child loggers
const requestLogger = logger.child({
  requestId: req.id,
  method: req.method,
  url: req.url,
});

requestLogger.info('Processing request');

// Error logging
try {
  await operation();
} catch (error) {
  logger.error({ err: error, userId }, 'Operation failed');
}
```

### Log Aggregation with Logtail

**Installation**:
```bash
npm install @logtail/node @logtail/pino
```

**Configuration**:
```typescript
import { Logtail } from '@logtail/node';
import { LogtailStream } from '@logtail/pino';
import pino from 'pino';

const logtail = new Logtail(process.env.LOGTAIL_TOKEN!);

const logger = pino(
  {
    level: 'info',
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
  new LogtailStream(logtail)
);

export default logger;
```

### Request Logging Middleware

```typescript
// middleware/logger.ts
import { v4 as uuidv4 } from 'uuid';
import logger from '../lib/logger';

export function requestLogger(req, res, next) {
  req.id = uuidv4();
  
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info({
      requestId: req.id,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      userId: req.user?.id,
    }, 'Request completed');
  });
  
  next();
}
```

### Log Levels Guide

```
FATAL (60): Application is unusable
ERROR (50): Error that needs attention
WARN (40):  Warning, but app continues
INFO (30):  Informational messages
DEBUG (20): Debug information
TRACE (10): Very verbose debugging
```

**When to use**:
- **FATAL**: Database connection lost, out of memory
- **ERROR**: Failed API calls, unhandled exceptions
- **WARN**: Deprecated API usage, rate limit approaching
- **INFO**: User actions, system state changes
- **DEBUG**: Function entry/exit, variable values
- **TRACE**: Loop iterations, detailed flow

---

## Backup Automation

### PostgreSQL Backups

**Automated Backup Script** (`scripts/backup-db.sh`):
```bash
#!/bin/bash
set -e

# Configuration
DB_NAME="${DATABASE_NAME:-muin}"
BACKUP_DIR="${BACKUP_DIR:-/backups}"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql.gz"
S3_BUCKET="s3://muin-backups/database"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Perform backup
echo "Starting backup: $BACKUP_FILE"
pg_dump "$DATABASE_URL" | gzip > "$BACKUP_FILE"

# Upload to S3
echo "Uploading to S3..."
aws s3 cp "$BACKUP_FILE" "$S3_BUCKET/"

# Verify backup
if [ -f "$BACKUP_FILE" ]; then
  SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
  echo "✅ Backup completed: $BACKUP_FILE ($SIZE)"
else
  echo "❌ Backup failed"
  exit 1
fi

# Clean up old local backups
echo "Cleaning up old backups..."
find "$BACKUP_DIR" -name "${DB_NAME}_*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Clean up old S3 backups
aws s3 ls "$S3_BUCKET/" | \
  awk '{print $4}' | \
  while read file; do
    file_date=$(echo "$file" | grep -oP '\d{8}' | head -1)
    if [ -n "$file_date" ]; then
      days_old=$(( ($(date +%s) - $(date -d "$file_date" +%s)) / 86400 ))
      if [ $days_old -gt $RETENTION_DAYS ]; then
        echo "Deleting old backup: $file"
        aws s3 rm "$S3_BUCKET/$file"
      fi
    fi
  done

echo "✅ Backup process completed"
```

**Cron Schedule** (Railway/Render):
```yaml
# render.yaml
services:
  - type: cron
    name: database-backup
    env: docker
    schedule: "0 2 * * *"  # 2 AM daily
    dockerfilePath: ./Dockerfile.backup
    dockerContext: ./
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: muin-db
          property: connectionString
      - key: AWS_ACCESS_KEY_ID
        sync: false
      - key: AWS_SECRET_ACCESS_KEY
        sync: false
      - key: RETENTION_DAYS
        value: 30
```

**Restore Script** (`scripts/restore-db.sh`):
```bash
#!/bin/bash
set -e

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: ./restore-db.sh <backup-file>"
  exit 1
fi

echo "⚠️  This will REPLACE the current database!"
read -p "Are you sure? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Restore cancelled"
  exit 0
fi

echo "Restoring from: $BACKUP_FILE"

# If S3 path, download first
if [[ "$BACKUP_FILE" == s3://* ]]; then
  LOCAL_FILE="/tmp/restore_$(date +%s).sql.gz"
  aws s3 cp "$BACKUP_FILE" "$LOCAL_FILE"
  BACKUP_FILE="$LOCAL_FILE"
fi

# Restore
gunzip < "$BACKUP_FILE" | psql "$DATABASE_URL"

echo "✅ Database restored successfully"
```

### File Storage Backups (S3 to S3 Glacier)

**Lifecycle Policy** (AWS S3):
```json
{
  "Rules": [
    {
      "Id": "MoveToGlacier",
      "Status": "Enabled",
      "Prefix": "uploads/",
      "Transitions": [
        {
          "Days": 90,
          "StorageClass": "GLACIER_IR"
        },
        {
          "Days": 365,
          "StorageClass": "DEEP_ARCHIVE"
        }
      ],
      "Expiration": {
        "Days": 2555
      }
    }
  ]
}
```

### Backup Verification

**Test Restore Script** (`scripts/test-restore.sh`):
```bash
#!/bin/bash
set -e

BACKUP_FILE=$1
TEST_DB="test_restore_$(date +%s)"

echo "Creating test database: $TEST_DB"
createdb "$TEST_DB"

echo "Restoring backup to test database..."
gunzip < "$BACKUP_FILE" | psql "postgresql://localhost/$TEST_DB"

echo "Verifying data..."
COUNT=$(psql "postgresql://localhost/$TEST_DB" -t -c "SELECT COUNT(*) FROM users")

if [ "$COUNT" -gt 0 ]; then
  echo "✅ Backup verified: $COUNT users found"
else
  echo "❌ Backup verification failed: No data found"
  exit 1
fi

echo "Cleaning up test database..."
dropdb "$TEST_DB"

echo "✅ Backup verification completed"
```

---

## Cost Optimization

### Vercel Optimization

**Bandwidth Reduction**:
```javascript
// next.config.js
module.exports = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Remove source maps in production
  productionBrowserSourceMaps: false,
  
  // Enable SWC minification
  swcMinify: true,
};
```

**Incremental Static Regeneration**:
```typescript
// pages/blog/[slug].tsx
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  
  return {
    props: { post },
    revalidate: 3600, // Regenerate every hour
  };
}
```

### Railway/Render Optimization

**Reduce Build Time**:
```dockerfile
# Use build cache
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

**Auto-Scaling Configuration**:
```yaml
# render.yaml
services:
  - type: web
    name: muin-api
    plan: standard  # Supports auto-scaling
    scaling:
      minInstances: 1
      maxInstances: 5
      targetMemoryPercent: 80
      targetCPUPercent: 70
```

### Database Optimization

**Connection Pooling**:
```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,              // Maximum pool size
  min: 2,               // Minimum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Prisma connection pooling
// DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"
```

**Query Optimization**:
```typescript
// Bad: N+1 query
const users = await db.user.findMany();
for (const user of users) {
  const posts = await db.post.findMany({ where: { userId: user.id } });
}

// Good: Single query with includes
const users = await db.user.findMany({
  include: { posts: true },
});

// Even better: Pagination
const users = await db.user.findMany({
  take: 20,
  skip: page * 20,
  include: { posts: { take: 5 } },
});
```

### CDN & Caching

**Cloudflare Cache Rules**:
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ];
  },
};
```

### Cost Monitoring

**Budget Alert Script** (`scripts/check-costs.ts`):
```typescript
import { CostExplorerClient, GetCostAndUsageCommand } from '@aws-sdk/client-cost-explorer';

async function checkMonthlyCosts() {
  const client = new CostExplorerClient({ region: 'us-east-1' });
  
  const start = new Date();
  start.setDate(1); // First day of month
  
  const end = new Date();
  
  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: start.toISOString().split('T')[0],
      End: end.toISOString().split('T')[0],
    },
    Granularity: 'MONTHLY',
    Metrics: ['UnblendedCost'],
  });
  
  const response = await client.send(command);
  const cost = parseFloat(
    response.ResultsByTime?.[0]?.Total?.UnblendedCost?.Amount || '0'
  );
  
  console.log(`Monthly cost so far: $${cost.toFixed(2)}`);
  
  // Alert if over budget
  const BUDGET = 100; // $100/month
  if (cost > BUDGET * 0.8) {
    // Send alert
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `⚠️ AWS costs at ${(cost/BUDGET*100).toFixed(0)}% of budget ($${cost.toFixed(2)}/$${BUDGET})`,
      }),
    });
  }
}
```

---

## Quick Reference

### Monthly Ops Checklist

- [ ] Review error logs and fix recurring issues
- [ ] Check uptime metrics and SLA compliance
- [ ] Review and optimize slow database queries
- [ ] Verify all backups are working
- [ ] Test backup restoration
- [ ] Review security alerts and dependency updates
- [ ] Check cost usage and optimize if needed
- [ ] Review performance metrics and set baselines
- [ ] Update documentation with any infrastructure changes
- [ ] Rotate API keys and secrets (quarterly)

### Emergency Response Runbook

**Service Down**:
1. Check status page: https://status.muin.io
2. View recent deployments: `gh run list`
3. Check error tracking: Sentry dashboard
4. View logs: `vercel logs` or Railway/Render dashboard
5. Rollback if needed: `vercel rollback` or redeploy previous version

**Database Issues**:
1. Check connection pool: `SELECT COUNT(*) FROM pg_stat_activity;`
2. Identify slow queries: `SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;`
3. Check disk space: Railway/Render metrics
4. Scale up if needed: Increase database plan

**High Costs**:
1. Check Vercel bandwidth usage
2. Review Railway/Render metrics
3. Analyze database query patterns
4. Check CDN cache hit rates
5. Review API rate limiting

---

**Last Updated**: 2026-02-07  
**Maintained by**: MUIN DevOps Team
