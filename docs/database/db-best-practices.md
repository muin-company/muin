# Database Best Practices for SaaS

## Overview
Comprehensive guide to database design, optimization, and operations for modern SaaS applications. Focus on PostgreSQL, but principles apply broadly.

**Target Audience:** Backend developers, DevOps, database administrators  
**Last Updated:** 2026-02-07

---

## Table of Contents
1. [Multi-Tenancy Patterns](#multi-tenancy-patterns)
2. [Soft Delete vs Hard Delete](#soft-delete-vs-hard-delete)
3. [Audit Logging](#audit-logging)
4. [Performance Optimization](#performance-optimization)
5. [Migration Strategies](#migration-strategies)
6. [Security & Compliance](#security--compliance)
7. [Backup & Disaster Recovery](#backup--disaster-recovery)
8. [Monitoring & Alerting](#monitoring--alerting)

---

## Multi-Tenancy Patterns

### Pattern 1: Shared Database, Shared Schema
All tenants share the same tables, distinguished by a `tenant_id` column.

**Pros:**
- Simple to implement
- Cost-effective for small tenants
- Easy to add new tenants
- Cross-tenant analytics possible

**Cons:**
- Security risk (one bad query affects everyone)
- Harder to scale specific tenants
- Noisy neighbor problem
- Backup/restore affects all tenants

**Implementation:**

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    email VARCHAR(255) NOT NULL,
    -- ... other columns
    
    UNIQUE(tenant_id, email) -- Enforce uniqueness per tenant
);

CREATE INDEX idx_users_tenant ON users(tenant_id);

-- Row-Level Security (RLS) for automatic tenant isolation
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON users
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

**Use When:**
- B2C SaaS with many small customers
- Tenant data size is small (<100MB per tenant)
- Strong isolation not required
- Cost optimization is priority

---

### Pattern 2: Shared Database, Separate Schema
Each tenant gets their own PostgreSQL schema within the same database.

**Pros:**
- Better isolation than shared schema
- Can customize schema per tenant
- Easier to backup individual tenants
- Better query performance (smaller tables)

**Cons:**
- Schema limit (~500 efficient per database)
- More complex application logic
- Cross-tenant queries harder
- Migration management complexity

**Implementation:**

```sql
-- Create tenant schema
CREATE SCHEMA tenant_acme;

-- Create tables in tenant schema
CREATE TABLE tenant_acme.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    -- No tenant_id needed!
);

-- Set search path per request
SET search_path TO tenant_acme, public;

-- Application code (Node.js example)
const tenantSchema = `tenant_${tenantSlug}`;
await client.query(`SET search_path TO ${tenantSchema}, public`);
```

**Use When:**
- 10-500 enterprise customers
- Regulatory compliance requires logical separation
- Different schema versions per tenant
- Medium-large tenant data size (100MB-10GB)

---

### Pattern 3: Database Per Tenant
Each tenant gets a completely separate database.

**Pros:**
- Maximum isolation and security
- Can scale tenants independently
- Easy to backup/restore individual tenants
- Can host on different hardware

**Cons:**
- Higher infrastructure costs
- Complex connection pooling
- Harder cross-tenant analytics
- Migration management nightmare

**Implementation:**

```bash
# Create database per tenant
createdb tenant_acme_db
createdb tenant_globex_db

# Application manages connection pools per tenant
const tenantDb = tenantConnectionPools[tenantId];
const result = await tenantDb.query('SELECT * FROM users');
```

**Use When:**
- Large enterprise customers ($10k+ MRR)
- Strict data residency requirements (different regions)
- Tenant requires dedicated infrastructure
- Tenant data size > 10GB

---

### Pattern Comparison Table

| Aspect | Shared Schema | Separate Schema | Separate DB |
|--------|---------------|-----------------|-------------|
| **Isolation** | ⭐ Low | ⭐⭐ Medium | ⭐⭐⭐ High |
| **Cost** | ⭐⭐⭐ Low | ⭐⭐ Medium | ⭐ High |
| **Scalability** | ⭐ Limited | ⭐⭐ Good | ⭐⭐⭐ Excellent |
| **Complexity** | ⭐⭐⭐ Simple | ⭐⭐ Moderate | ⭐ Complex |
| **Best For** | B2C, SMB | B2B, Mid-Market | Enterprise |

---

### Hybrid Approach (Recommended)

Use different patterns for different tenant tiers:

```sql
-- Small tenants: Shared schema with tenant_id
CREATE TABLE shared.users (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    ...
);

-- Medium tenants: Separate schemas
CREATE SCHEMA tenant_medium_123;

-- Large tenants: Separate databases
CREATE DATABASE tenant_enterprise_456;
```

**Migration Path:**
Start small tenants in shared schema, promote to dedicated schema/DB as they grow.

---

## Soft Delete vs Hard Delete

### Soft Delete (Logical Delete)

Add `deleted_at` timestamp column. NULL = active, timestamped = deleted.

**Pros:**
- Recoverable (accidental deletes)
- Audit trail preserved
- Can analyze deleted data
- Comply with "right to be forgotten" later

**Cons:**
- Clutters database over time
- Slower queries (must filter deleted)
- Unique constraints tricky
- Storage costs increase

**Implementation:**

```sql
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Index for filtering out deleted rows
CREATE INDEX idx_posts_deleted ON posts(deleted_at) WHERE deleted_at IS NULL;

-- All queries must filter
SELECT * FROM posts WHERE deleted_at IS NULL;

-- Soft delete
UPDATE posts SET deleted_at = NOW() WHERE id = '...';

-- Restore
UPDATE posts SET deleted_at = NULL WHERE id = '...';
```

**Handling Unique Constraints:**

```sql
-- Problem: Can't re-use email after soft delete
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE(email);
-- This fails if email='john@example.com' exists with deleted_at != NULL

-- Solution 1: Partial unique index
CREATE UNIQUE INDEX users_email_unique ON users(email) WHERE deleted_at IS NULL;

-- Solution 2: Include deleted_at in constraint (allow multiple deleted)
ALTER TABLE users ADD CONSTRAINT users_email_deleted_unique 
    UNIQUE(email, deleted_at);
-- Downside: Two active rows with same email if one is deleted
```

---

### Hard Delete (Physical Delete)

Permanently remove row with `DELETE`.

**Pros:**
- Cleaner database
- Faster queries (no filter needed)
- Unique constraints work naturally
- Lower storage costs

**Cons:**
- Unrecoverable without backups
- No audit trail
- Accidental deletes are catastrophic
- Compliance issues (GDPR logs)

**Implementation:**

```sql
-- Before delete: Archive to audit table
INSERT INTO deleted_posts_archive 
SELECT *, NOW() as archived_at 
FROM posts 
WHERE id = '...';

-- Then hard delete
DELETE FROM posts WHERE id = '...';
```

---

### Recommended Strategy: Hybrid

**Soft delete for:**
- User data (account recovery)
- Financial records (audit requirements)
- Content (drafts, posts, comments)

**Hard delete for:**
- Temporary data (sessions, tokens)
- System-generated data (logs after retention period)
- GDPR "right to be forgotten" final purge

**Purge Process:**

```sql
-- Mark for deletion (soft delete)
UPDATE users SET deleted_at = NOW() WHERE id = '...';

-- After 30-day grace period, permanently delete (hard delete)
DELETE FROM users WHERE deleted_at < NOW() - INTERVAL '30 days';
```

**Helper Views:**

```sql
-- View without soft-deleted rows
CREATE VIEW active_users AS
    SELECT * FROM users WHERE deleted_at IS NULL;

-- Application can query active_users instead of users
SELECT * FROM active_users WHERE email = 'john@example.com';
```

---

## Audit Logging

### Why Audit Logs?

- **Compliance**: SOC 2, HIPAA, GDPR require tracking who changed what
- **Security**: Detect unauthorized access or data breaches
- **Debugging**: Trace how data got into bad state
- **User Support**: "I didn't delete that!" — show them they did

---

### What to Log

**Always Log:**
- Who (user_id, IP address)
- What (action: create/update/delete)
- When (timestamp)
- Which (resource type, resource ID)
- How (old values → new values)

**Examples:**
- User login/logout
- Password changes
- Permission changes
- Financial transactions
- Data exports
- Record deletions

---

### Implementation: Dedicated Audit Table

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Who
    user_id UUID REFERENCES users(id),
    ip_address INET,
    user_agent TEXT,
    
    -- What
    action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'login', 'export'
    resource_type VARCHAR(50) NOT NULL, -- 'user', 'post', 'payment'
    resource_id UUID,
    
    -- How
    old_values JSONB, -- Before state
    new_values JSONB, -- After state
    changes JSONB, -- Diff of what changed
    
    -- When
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Context
    request_id UUID, -- Correlate with application logs
    metadata JSONB -- Extra context
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id, created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action, created_at DESC);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
```

---

### Implementation: Database Triggers

Automatically log all changes without application code changes.

```sql
-- Function to audit changes
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_logs (
            action, 
            resource_type, 
            resource_id, 
            old_values,
            user_id
        ) VALUES (
            'delete',
            TG_TABLE_NAME,
            OLD.id,
            row_to_json(OLD),
            current_setting('app.current_user_id', true)::UUID
        );
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO audit_logs (
            action,
            resource_type,
            resource_id,
            old_values,
            new_values,
            user_id
        ) VALUES (
            'update',
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(OLD),
            row_to_json(NEW),
            current_setting('app.current_user_id', true)::UUID
        );
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO audit_logs (
            action,
            resource_type,
            resource_id,
            new_values,
            user_id
        ) VALUES (
            'create',
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(NEW),
            current_setting('app.current_user_id', true)::UUID
        );
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to tables
CREATE TRIGGER audit_users_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_payments_trigger
    AFTER INSERT OR UPDATE OR DELETE ON payments
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();
```

**Set user context in application:**

```javascript
// Node.js example
await client.query(`SET LOCAL app.current_user_id = '${userId}'`);
await client.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, userId]);
// Trigger automatically logs this change
```

---

### Implementation: Application-Level Logging

More flexible but requires discipline in every endpoint.

```javascript
async function updateUser(userId, updates, auditContext) {
    const oldUser = await db.users.findById(userId);
    
    await db.users.update(userId, updates);
    
    // Log audit trail
    await db.auditLogs.create({
        userId: auditContext.userId,
        ipAddress: auditContext.ipAddress,
        action: 'update',
        resourceType: 'user',
        resourceId: userId,
        oldValues: oldUser,
        newValues: updates,
        changes: diff(oldUser, updates)
    });
}
```

---

### Audit Log Retention

```sql
-- Partition audit logs by month
CREATE TABLE audit_logs (
    -- ... columns ...
) PARTITION BY RANGE (created_at);

CREATE TABLE audit_logs_2026_01 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

-- Archive old partitions to cold storage
-- Delete partitions after retention period (1-7 years depending on compliance)
DROP TABLE audit_logs_2020_01; -- After 7 years
```

---

### Viewing Audit Logs

```sql
-- Who changed user X in the last 30 days?
SELECT 
    al.created_at,
    u.email as changed_by,
    al.action,
    al.old_values->>'email' as old_email,
    al.new_values->>'email' as new_email
FROM audit_logs al
JOIN users u ON al.user_id = u.id
WHERE al.resource_type = 'user'
  AND al.resource_id = 'user-uuid-here'
  AND al.created_at >= NOW() - INTERVAL '30 days'
ORDER BY al.created_at DESC;

-- All payment deletions (security investigation)
SELECT * FROM audit_logs
WHERE action = 'delete'
  AND resource_type = 'payment'
ORDER BY created_at DESC;
```

---

## Performance Optimization

### Indexing Strategy

#### 1. Index Columns Used in WHERE Clauses

```sql
-- Slow query
SELECT * FROM orders WHERE customer_id = '...' AND status = 'pending';

-- Add index
CREATE INDEX idx_orders_customer_status ON orders(customer_id, status);

-- Now fast! Index-only scan
```

#### 2. Composite Index Column Order

**Rule:** Most selective column first, then equality, then range.

```sql
-- Good: city is more selective than country
CREATE INDEX idx_users_location ON users(city, country);

-- Bad: country is less selective
CREATE INDEX idx_users_location_bad ON users(country, city);

-- Also consider query patterns:
-- If you query "WHERE country = 'US' AND city = 'SF'" → country first
-- If you query "WHERE city = 'SF'" only → city first
```

#### 3. Partial Indexes

Index only rows you frequently query.

```sql
-- Only index active users (90% of queries)
CREATE INDEX idx_users_active ON users(email) WHERE status = 'active';

-- Smaller index = faster queries, less storage
```

#### 4. Covering Indexes (Index-Only Scans)

Include columns you SELECT in the index.

```sql
-- Query: SELECT email, name FROM users WHERE status = 'active';

-- Regular index: needs to fetch email, name from table
CREATE INDEX idx_users_status ON users(status);

-- Covering index: has all needed data
CREATE INDEX idx_users_status_covering ON users(status) INCLUDE (email, name);
-- PostgreSQL can answer query without touching table!
```

#### 5. JSONB Indexes

```sql
-- GIN index for JSONB contains queries
CREATE INDEX idx_users_preferences ON users USING GIN(preferences);

-- Query efficiently:
SELECT * FROM users WHERE preferences @> '{"theme": "dark"}';

-- GIN index for specific key
CREATE INDEX idx_users_pref_theme ON users((preferences->>'theme'));
```

---

### Query Optimization

#### 1. Use EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE customer_id = '...' 
  AND created_at >= '2026-01-01';

-- Output shows:
-- - Seq Scan vs Index Scan
-- - Rows estimated vs actual
-- - Time spent
-- - Index usage
```

**Look for:**
- `Seq Scan` on large tables → needs index
- Large difference between estimated and actual rows → outdated statistics (run `ANALYZE`)
- High execution time on specific nodes

#### 2. Avoid N+1 Queries

```javascript
// BAD: N+1 queries
const users = await db.query('SELECT * FROM users LIMIT 10');
for (const user of users) {
    user.posts = await db.query('SELECT * FROM posts WHERE user_id = $1', [user.id]);
}
// 1 query for users + 10 queries for posts = 11 queries!

// GOOD: Join or batch load
const users = await db.query(`
    SELECT u.*, 
           json_agg(p.*) as posts
    FROM users u
    LEFT JOIN posts p ON p.user_id = u.id
    GROUP BY u.id
    LIMIT 10
`);
// 1 query total!
```

#### 3. Pagination

```sql
-- BAD: OFFSET is slow for large offsets
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 10000;
-- Database still scans 10,000 rows then throws them away

-- GOOD: Cursor-based pagination
SELECT * FROM posts 
WHERE created_at < '2026-01-01 12:00:00'
ORDER BY created_at DESC 
LIMIT 20;
-- Uses index, no wasted work
```

#### 4. Batch Operations

```sql
-- BAD: Insert one at a time (slow)
INSERT INTO logs (message) VALUES ('log 1');
INSERT INTO logs (message) VALUES ('log 2');
-- ...1000 more times

-- GOOD: Batch insert
INSERT INTO logs (message) VALUES 
    ('log 1'),
    ('log 2'),
    -- ...
    ('log 1000');
-- 100x faster!
```

#### 5. Avoid SELECT *

```sql
-- BAD: Fetches all columns (including large TEXT/JSONB)
SELECT * FROM posts WHERE id = '...';

-- GOOD: Only fetch what you need
SELECT id, title, created_at FROM posts WHERE id = '...';
-- Faster network transfer, better cache utilization
```

---

### Connection Pooling

```javascript
// Use a connection pool (Node.js + pg)
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'myapp',
    user: 'myapp_user',
    password: '...',
    
    // Pool settings
    max: 20, // Max connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Each request gets a connection from pool
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
// Connection returned to pool automatically
```

**Pool Size Formula:**
```
connections = (core_count × 2) + effective_spindle_count
```

For example: 4 CPU cores + 1 SSD = (4 × 2) + 1 = 9 connections

---

### Caching Strategies

#### 1. Query Result Caching (Redis)

```javascript
async function getUser(userId) {
    // Check cache first
    const cached = await redis.get(`user:${userId}`);
    if (cached) return JSON.parse(cached);
    
    // Cache miss: query database
    const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    
    // Store in cache (TTL 5 minutes)
    await redis.setex(`user:${userId}`, 300, JSON.stringify(user));
    
    return user;
}

// Invalidate cache on update
async function updateUser(userId, updates) {
    await db.query('UPDATE users SET ... WHERE id = $1', [userId]);
    await redis.del(`user:${userId}`); // Clear cache
}
```

#### 2. Materialized Views

Pre-compute expensive queries.

```sql
-- Expensive query: User stats across multiple tables
CREATE MATERIALIZED VIEW user_stats AS
SELECT 
    u.id,
    u.email,
    COUNT(DISTINCT p.id) as post_count,
    COUNT(DISTINCT c.id) as comment_count,
    MAX(p.created_at) as last_post_at
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
LEFT JOIN comments c ON c.user_id = u.id
GROUP BY u.id;

-- Index on materialized view
CREATE UNIQUE INDEX ON user_stats(id);

-- Refresh nightly (cron job)
REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;

-- Query is instant now
SELECT * FROM user_stats WHERE id = '...';
```

#### 3. Denormalization

Store computed values in tables to avoid JOINs.

```sql
-- Normalize: Count comments on every query
SELECT p.*, COUNT(c.id) as comment_count
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
WHERE p.id = '...'
GROUP BY p.id;

-- Denormalize: Store count in posts table
ALTER TABLE posts ADD COLUMN comment_count INTEGER DEFAULT 0;

-- Update count with trigger
CREATE TRIGGER update_comment_count_trigger
    AFTER INSERT OR DELETE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_post_comment_count();

-- Now query is simple
SELECT * FROM posts WHERE id = '...';
-- No JOIN needed!
```

---

## Migration Strategies

### Migration Tools

**Recommended:**
- **Flyway** (Java, multi-DB)
- **Liquibase** (Java, XML/SQL/YAML)
- **node-pg-migrate** (Node.js, JavaScript/SQL)
- **Alembic** (Python, SQLAlchemy)
- **golang-migrate** (Go, SQL)

---

### Migration Principles

1. **Migrations are immutable**: Never edit an applied migration
2. **Migrations are sequential**: Version numbers or timestamps
3. **Migrations are reversible**: Provide DOWN migration when possible
4. **Test migrations on staging first**
5. **Migrations are small**: One logical change per migration

---

### Migration File Structure

```
migrations/
├── 001_create_users_table.up.sql
├── 001_create_users_table.down.sql
├── 002_add_email_index.up.sql
├── 002_add_email_index.down.sql
├── 003_add_deleted_at_column.up.sql
├── 003_add_deleted_at_column.down.sql
```

**Example: 001_create_users_table.up.sql**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

**Example: 001_create_users_table.down.sql**
```sql
DROP TABLE users;
```

---

### Zero-Downtime Migrations

#### Anti-Pattern: Breaking Change

```sql
-- BREAKS production: app expects 'name' column
ALTER TABLE users DROP COLUMN name;
ALTER TABLE users ADD COLUMN first_name VARCHAR(100);
ALTER TABLE users ADD COLUMN last_name VARCHAR(100);
-- App crashes because 'name' doesn't exist!
```

#### Pattern: Multi-Step Migration

**Step 1: Add new columns (compatible with old code)**
```sql
ALTER TABLE users ADD COLUMN first_name VARCHAR(100);
ALTER TABLE users ADD COLUMN last_name VARCHAR(100);
-- Old code still works (ignores new columns)
```

**Step 2: Backfill data**
```sql
UPDATE users 
SET 
    first_name = SPLIT_PART(name, ' ', 1),
    last_name = SPLIT_PART(name, ' ', 2)
WHERE first_name IS NULL;
```

**Step 3: Deploy new application code**
- New code writes to `first_name` and `last_name`
- New code reads from `first_name` and `last_name` (not `name`)

**Step 4: Drop old column (after verification)**
```sql
ALTER TABLE users DROP COLUMN name;
```

---

### Handling Large Tables

#### Problem: ALTER TABLE Locks Table

```sql
-- BAD: Locks 'users' table for hours on 100M row table
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
-- Production is down!
```

#### Solution 1: Add Column with Default (PostgreSQL 11+)

```sql
-- GOOD: Instant in PostgreSQL 11+ (no rewrite)
ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT NULL;
-- Table is NOT locked for existing rows
```

#### Solution 2: Background Migration (pg_repack)

```sql
-- Use pg_repack for VACUUM FULL without locking
pg_repack -d mydb -t users
```

#### Solution 3: Create New Table, Swap

```sql
-- 1. Create new table with changes
CREATE TABLE users_new (LIKE users INCLUDING ALL);
ALTER TABLE users_new ADD COLUMN phone VARCHAR(20);

-- 2. Copy data in batches (to avoid long-running transaction)
DO $$
DECLARE
    batch_size INT := 10000;
    last_id UUID := '00000000-0000-0000-0000-000000000000';
BEGIN
    LOOP
        INSERT INTO users_new SELECT * FROM users 
        WHERE id > last_id 
        ORDER BY id 
        LIMIT batch_size;
        
        IF NOT FOUND THEN EXIT; END IF;
        
        SELECT id INTO last_id FROM users 
        WHERE id > last_id 
        ORDER BY id 
        LIMIT 1 OFFSET batch_size - 1;
        
        COMMIT;
    END LOOP;
END $$;

-- 3. Swap tables (brief lock)
BEGIN;
ALTER TABLE users RENAME TO users_old;
ALTER TABLE users_new RENAME TO users;
COMMIT;

-- 4. Drop old table
DROP TABLE users_old;
```

---

## Security & Compliance

### 1. Least Privilege Access

```sql
-- Application user: Only DML, no DDL
CREATE USER myapp_user WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE myapp TO myapp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myapp_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO myapp_user;

-- Migration user: DDL only (used by CI/CD)
CREATE USER myapp_migrate WITH PASSWORD 'another_strong_password';
GRANT ALL PRIVILEGES ON DATABASE myapp TO myapp_migrate;

-- Read-only analyst user
CREATE USER analyst WITH PASSWORD 'read_only_password';
GRANT CONNECT ON DATABASE myapp TO analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;
```

### 2. Encrypt Sensitive Data

```sql
-- Use pgcrypto extension
CREATE EXTENSION pgcrypto;

-- Encrypt SSN at application layer before INSERT
INSERT INTO users (ssn_encrypted) 
VALUES (pgp_sym_encrypt('123-45-6789', 'encryption_key'));

-- Decrypt when needed
SELECT pgp_sym_decrypt(ssn_encrypted::bytea, 'encryption_key') 
FROM users 
WHERE id = '...';
```

**Better:** Encrypt at application layer (not in DB) for key rotation flexibility.

### 3. SQL Injection Prevention

```javascript
// BAD: SQL injection vulnerability
const email = req.body.email; // Could be: "'; DROP TABLE users; --"
await db.query(`SELECT * FROM users WHERE email = '${email}'`);

// GOOD: Parameterized query
await db.query('SELECT * FROM users WHERE email = $1', [email]);
// Driver automatically escapes
```

### 4. Backup Encryption

```bash
# Encrypt backups
pg_dump myapp | gpg --encrypt --recipient backup@example.com > backup.sql.gpg

# Decrypt to restore
gpg --decrypt backup.sql.gpg | psql myapp
```

---

## Backup & Disaster Recovery

### Backup Strategy (3-2-1 Rule)

- **3** copies of data
- **2** different media types
- **1** offsite backup

---

### PostgreSQL Backup Methods

#### 1. Logical Backup (pg_dump)

```bash
# Full database backup
pg_dump -Fc myapp > myapp_$(date +%Y%m%d).dump

# Restore
pg_restore -d myapp myapp_20260207.dump

# Single table
pg_dump -t users myapp > users_backup.sql
```

**Pros:** Human-readable (SQL), portable across versions  
**Cons:** Slow for large databases, locks during dump

---

#### 2. Physical Backup (pg_basebackup)

```bash
# Base backup (copy data directory)
pg_basebackup -D /backup/pgdata -Ft -z -P

# Restore: Stop PostgreSQL, replace data directory, start
```

**Pros:** Fast, supports point-in-time recovery (PITR)  
**Cons:** Must be same PostgreSQL version/architecture

---

#### 3. Continuous Archiving (WAL)

```bash
# Enable WAL archiving in postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /mnt/wal_archive/%f'

# Restore to specific point in time
pg_basebackup -D /backup/pgdata
# Edit recovery.conf
restore_command = 'cp /mnt/wal_archive/%f %p'
recovery_target_time = '2026-02-07 14:30:00'
```

---

### Backup Schedule

```
Daily:   Full backup at 02:00 (retain 7 days)
Weekly:  Full backup on Sunday (retain 4 weeks)
Monthly: Full backup on 1st (retain 12 months)
WAL:     Continuous archiving (retain 7 days)
```

---

### Test Restores Monthly

```bash
# Restore to test database
pg_restore -d myapp_test latest_backup.dump

# Verify data
psql myapp_test -c "SELECT COUNT(*) FROM users;"

# Measure restore time (should be < 4 hours for RTO)
```

---

## Monitoring & Alerting

### Key Metrics to Monitor

1. **Connection Pool Utilization**
   - Alert if > 80% used
   - Indicates connection leaks or need to scale

2. **Query Performance**
   - Track slow queries (> 1 second)
   - Alert on sudden increase in query time

3. **Replication Lag** (if using replicas)
   - Alert if lag > 10 seconds

4. **Disk Space**
   - Alert if < 20% free space

5. **Cache Hit Ratio**
   - Should be > 95% for indexes, > 99% for tables

6. **Transaction Rate**
   - Alert on sudden drops (could indicate outage)

---

### PostgreSQL Monitoring Queries

```sql
-- Active connections
SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active';

-- Long-running queries (> 5 minutes)
SELECT 
    pid,
    now() - query_start as duration,
    query
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - query_start > interval '5 minutes'
ORDER BY duration DESC;

-- Cache hit ratio
SELECT 
    sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as cache_hit_ratio
FROM pg_statio_user_tables;

-- Table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC; -- Unused indexes have idx_scan = 0
```

---

### Tools

- **pgAdmin**: GUI for PostgreSQL
- **DataGrip**: JetBrains SQL IDE
- **pganalyze**: Query performance monitoring (SaaS)
- **pgBadger**: Log analyzer
- **Prometheus + Grafana**: Metrics dashboard
- **Sentry**: Error tracking
- **New Relic / Datadog**: APM with DB monitoring

---

## Summary Checklist

### Design Phase
- [ ] Choose multi-tenancy pattern based on customer profile
- [ ] Decide soft delete vs hard delete per table
- [ ] Plan audit logging for compliance requirements
- [ ] Design indexes for common queries
- [ ] Normalize data, denormalize selectively for performance

### Development Phase
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Implement connection pooling
- [ ] Add database migrations to CI/CD
- [ ] Write seed data for local development
- [ ] Test with realistic data volumes

### Pre-Production
- [ ] Run EXPLAIN ANALYZE on critical queries
- [ ] Set up monitoring and alerting
- [ ] Configure automated backups
- [ ] Test restore procedure
- [ ] Load test with expected traffic
- [ ] Review security (least privilege, encryption)

### Production
- [ ] Monitor slow query log
- [ ] Review and optimize indexes quarterly
- [ ] Vacuum/analyze regularly (autovacuum should handle this)
- [ ] Rotate audit logs to cold storage
- [ ] Perform disaster recovery drills
- [ ] Keep PostgreSQL updated (minor versions)

---

## Additional Resources

- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Use The Index, Luke**: https://use-the-index-luke.com/
- **SQL Performance Explained**: Book by Markus Winand
- **Database Reliability Engineering**: Book by Charity Majors

---

**Last Updated:** 2026-02-07  
**Maintainer:** MJ (COO)  
**Feedback:** Open to suggestions and improvements!
