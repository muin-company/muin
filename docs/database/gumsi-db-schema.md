# 검시AI Database Schema

## Overview
Database schema for 검시AI - AI-powered exam preparation platform with adaptive learning, progress tracking, and subscription management.

**Database:** PostgreSQL 15+  
**Character Set:** UTF-8  
**Timezone:** UTC (convert to KST in application layer)

---

## Core Tables

### 1. users
User accounts and authentication.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    phone VARCHAR(20),
    
    -- Account status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMPTZ,
    
    -- Preferences
    preferences JSONB DEFAULT '{}',
    timezone VARCHAR(50) DEFAULT 'Asia/Seoul',
    language VARCHAR(10) DEFAULT 'ko',
    
    -- Tracking
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    login_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. user_profiles
Extended user information and learning preferences.

```sql
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    -- Demographics
    birth_year INTEGER,
    occupation VARCHAR(100),
    education_level VARCHAR(50),
    
    -- Learning preferences
    target_exam VARCHAR(100),
    target_date DATE,
    study_hours_per_day DECIMAL(3,1),
    preferred_study_time VARCHAR(20), -- 'morning', 'afternoon', 'evening', 'night'
    
    -- Difficulty preferences
    difficulty_preference VARCHAR(20) DEFAULT 'adaptive', -- 'easy', 'medium', 'hard', 'adaptive'
    
    -- Notifications
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    reminder_time TIME DEFAULT '09:00:00',
    
    -- Statistics (denormalized for performance)
    total_questions_attempted INTEGER DEFAULT 0,
    total_correct_answers INTEGER DEFAULT 0,
    current_streak_days INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_target_exam ON user_profiles(target_exam);
```

### 3. exam_categories
Hierarchical exam categories and subjects.

```sql
CREATE TABLE exam_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES exam_categories(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url TEXT,
    
    -- Hierarchy
    level INTEGER DEFAULT 0, -- 0: root, 1: major, 2: subject, 3: topic
    sort_order INTEGER DEFAULT 0,
    
    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_exam_categories_parent ON exam_categories(parent_id);
CREATE INDEX idx_exam_categories_slug ON exam_categories(slug);
CREATE INDEX idx_exam_categories_level ON exam_categories(level);
```

### 4. questions
Question bank with rich metadata.

```sql
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES exam_categories(id) ON DELETE SET NULL,
    
    -- Question content
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) DEFAULT 'multiple_choice' 
        CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'essay')),
    
    -- Difficulty & metadata
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    estimated_time_seconds INTEGER, -- Expected time to answer
    
    -- Options (for multiple choice)
    options JSONB, -- [{"id": "a", "text": "...", "is_correct": true}, ...]
    correct_answer TEXT, -- For short answer/true-false
    
    -- Explanation
    explanation TEXT,
    explanation_media_urls JSONB, -- Images, videos for explanation
    
    -- References
    reference_source VARCHAR(200),
    reference_year INTEGER,
    tags TEXT[], -- Array of tags
    
    -- Statistics (denormalized)
    total_attempts INTEGER DEFAULT 0,
    correct_attempts INTEGER DEFAULT 0,
    avg_time_seconds DECIMAL(8,2),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_category ON questions(category_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty_level);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_questions_tags ON questions USING GIN(tags);
```

### 5. study_sessions
User study sessions with learning context.

```sql
CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Session metadata
    session_type VARCHAR(20) DEFAULT 'practice' 
        CHECK (session_type IN ('practice', 'test', 'review', 'adaptive')),
    category_id UUID REFERENCES exam_categories(id),
    
    -- Configuration
    target_question_count INTEGER,
    difficulty_range JSONB, -- {"min": 1, "max": 5}
    time_limit_seconds INTEGER,
    
    -- Progress
    status VARCHAR(20) DEFAULT 'in_progress' 
        CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    questions_attempted INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    
    -- Timing
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    total_time_seconds INTEGER,
    
    -- Scores
    score_percentage DECIMAL(5,2),
    performance_rating VARCHAR(20), -- 'excellent', 'good', 'average', 'needs_improvement'
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_sessions_user ON study_sessions(user_id, created_at DESC);
CREATE INDEX idx_study_sessions_status ON study_sessions(status);
CREATE INDEX idx_study_sessions_started_at ON study_sessions(started_at);
```

### 6. user_answers
Individual answers within study sessions.

```sql
CREATE TABLE user_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES study_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    
    -- Answer details
    selected_answer TEXT,
    selected_option_id VARCHAR(10), -- For multiple choice: 'a', 'b', 'c', etc.
    is_correct BOOLEAN NOT NULL,
    
    -- Timing
    time_spent_seconds INTEGER,
    answered_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Flags
    was_skipped BOOLEAN DEFAULT FALSE,
    was_bookmarked BOOLEAN DEFAULT FALSE,
    confidence_level INTEGER CHECK (confidence_level BETWEEN 1 AND 5),
    
    -- AI feedback
    ai_feedback TEXT,
    improvement_tips TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_answers_session ON user_answers(session_id);
CREATE INDEX idx_user_answers_user_question ON user_answers(user_id, question_id);
CREATE INDEX idx_user_answers_correct ON user_answers(user_id, is_correct);
CREATE INDEX idx_user_answers_answered_at ON user_answers(answered_at);
```

---

## Learning Analytics Tables

### 7. user_progress
Aggregated progress per category per user.

```sql
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES exam_categories(id) ON DELETE CASCADE,
    
    -- Progress metrics
    mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
    questions_attempted INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    accuracy_rate DECIMAL(5,2),
    
    -- Performance trends
    recent_accuracy_rate DECIMAL(5,2), -- Last 20 questions
    improvement_rate DECIMAL(5,2), -- Compared to previous period
    
    -- Time investment
    total_study_time_seconds INTEGER DEFAULT 0,
    avg_time_per_question DECIMAL(8,2),
    
    -- Recommendations
    recommended_difficulty INTEGER,
    next_review_date DATE,
    
    -- Timestamps
    last_practiced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, category_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_mastery ON user_progress(user_id, mastery_level DESC);
CREATE INDEX idx_user_progress_next_review ON user_progress(next_review_date) 
    WHERE next_review_date IS NOT NULL;
```

### 8. learning_analytics
Daily/weekly learning analytics snapshots.

```sql
CREATE TABLE learning_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Time period
    period_type VARCHAR(10) CHECK (period_type IN ('daily', 'weekly', 'monthly')),
    period_date DATE NOT NULL,
    
    -- Activity metrics
    sessions_count INTEGER DEFAULT 0,
    questions_attempted INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    study_time_minutes INTEGER DEFAULT 0,
    
    -- Performance metrics
    avg_accuracy DECIMAL(5,2),
    avg_difficulty DECIMAL(3,1),
    completion_rate DECIMAL(5,2),
    
    -- Engagement metrics
    streak_days INTEGER DEFAULT 0,
    categories_studied INTEGER DEFAULT 0,
    
    -- Category breakdown
    category_performance JSONB, -- {"category_id": {"attempted": 10, "correct": 8, ...}, ...}
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, period_type, period_date)
);

CREATE INDEX idx_learning_analytics_user_period ON learning_analytics(user_id, period_date DESC);
CREATE INDEX idx_learning_analytics_period ON learning_analytics(period_type, period_date);
```

### 9. weak_areas
Identified weak areas and recommendations.

```sql
CREATE TABLE weak_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES exam_categories(id) ON DELETE CASCADE,
    
    -- Issue identification
    issue_type VARCHAR(50), -- 'low_accuracy', 'slow_speed', 'inconsistent', 'needs_review'
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    
    -- Metrics
    current_accuracy DECIMAL(5,2),
    target_accuracy DECIMAL(5,2),
    attempts_needed INTEGER,
    
    -- Recommendations
    recommended_action TEXT,
    recommended_questions JSONB, -- Array of question IDs
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'improving', 'resolved')),
    
    identified_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_weak_areas_user ON weak_areas(user_id, status);
CREATE INDEX idx_weak_areas_severity ON weak_areas(severity) WHERE status = 'active';
```

---

## Subscription & Billing Tables

### 10. subscription_plans
Available subscription plans.

```sql
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    
    -- Pricing
    price_krw INTEGER NOT NULL,
    billing_interval VARCHAR(20) CHECK (billing_interval IN ('monthly', 'yearly', 'lifetime')),
    
    -- Features
    features JSONB, -- {"max_questions_per_day": 100, "ai_explanations": true, ...}
    question_limit_per_day INTEGER,
    session_limit_per_day INTEGER,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    
    -- Trial
    trial_days INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscription_plans_active ON subscription_plans(is_active, sort_order);
```

### 11. user_subscriptions
User subscription records.

```sql
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('trial', 'active', 'cancelled', 'expired', 'suspended')),
    
    -- Dates
    trial_ends_at TIMESTAMPTZ,
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    cancelled_at TIMESTAMPTZ,
    
    -- Billing
    auto_renew BOOLEAN DEFAULT TRUE,
    price_paid_krw INTEGER,
    
    -- External references
    payment_provider VARCHAR(50), -- 'toss', 'stripe', 'iamport', etc.
    external_subscription_id VARCHAR(255),
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_subscriptions_user ON user_subscriptions(user_id, status);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_period_end ON user_subscriptions(current_period_end) 
    WHERE status = 'active';
```

### 12. payments
Payment transaction records.

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES user_subscriptions(id),
    
    -- Payment details
    amount_krw INTEGER NOT NULL,
    payment_method VARCHAR(50), -- 'card', 'transfer', 'mobile', 'virtual_account'
    payment_provider VARCHAR(50),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
    
    -- External references
    transaction_id VARCHAR(255) UNIQUE,
    receipt_url TEXT,
    
    -- Dates
    paid_at TIMESTAMPTZ,
    refunded_at TIMESTAMPTZ,
    
    -- Error handling
    error_code VARCHAR(50),
    error_message TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id, created_at DESC);
CREATE INDEX idx_payments_subscription ON payments(subscription_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
```

### 13. usage_quotas
Track usage limits for free/trial users.

```sql
CREATE TABLE usage_quotas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Quota period
    quota_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Usage counts
    questions_attempted_today INTEGER DEFAULT 0,
    sessions_started_today INTEGER DEFAULT 0,
    ai_explanations_used_today INTEGER DEFAULT 0,
    
    -- Limits (from subscription plan)
    question_limit INTEGER,
    session_limit INTEGER,
    ai_explanation_limit INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, quota_date)
);

CREATE INDEX idx_usage_quotas_user_date ON usage_quotas(user_id, quota_date DESC);
```

---

## Supporting Tables

### 14. bookmarks
User-bookmarked questions for review.

```sql
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    
    -- Organization
    folder_name VARCHAR(100),
    notes TEXT,
    tags TEXT[],
    
    -- Status
    is_reviewed BOOLEAN DEFAULT FALSE,
    reviewed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, question_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id, created_at DESC);
CREATE INDEX idx_bookmarks_folder ON bookmarks(user_id, folder_name);
```

### 15. notifications
User notifications and alerts.

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Content
    title VARCHAR(200) NOT NULL,
    message TEXT,
    notification_type VARCHAR(50), -- 'achievement', 'reminder', 'streak', 'weak_area', 'subscription'
    
    -- Action
    action_url TEXT,
    action_data JSONB,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    
    -- Priority
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    
    -- Delivery
    sent_at TIMESTAMPTZ,
    delivery_channels TEXT[], -- ['push', 'email', 'in_app']
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_notifications_sent_at ON notifications(sent_at);
```

### 16. achievements
Gamification achievements.

```sql
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon_url TEXT,
    
    -- Requirements
    requirement_type VARCHAR(50), -- 'streak', 'accuracy', 'question_count', 'category_mastery'
    requirement_value JSONB,
    
    -- Rewards
    points INTEGER DEFAULT 0,
    badge_tier VARCHAR(20) CHECK (badge_tier IN ('bronze', 'silver', 'gold', 'platinum')),
    
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_achievements_active ON achievements(is_active, sort_order);
```

### 17. user_achievements
User-earned achievements.

```sql
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    progress_data JSONB, -- Track partial progress
    
    UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id, earned_at DESC);
```

---

## ERD Description (Text-Based)

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   users     │────1:1──│  user_profiles   │         │ exam_categories │
│             │         │                  │         │                 │
│ • id (PK)   │         │ • user_id (PK,FK)│         │ • id (PK)       │
│ • email     │         │ • target_exam    │         │ • parent_id (FK)│
│ • username  │         │ • study_hours    │         │ • name          │
└─────┬───────┘         └──────────────────┘         └────────┬────────┘
      │                                                         │
      │ 1:N                                                     │
      │                                                         │ 1:N
      ├──────────────┬──────────────┬──────────────┬          │
      │              │              │              │          │
┌─────▼────────┐ ┌──▼────────────┐ ┌▼─────────────┐ ┌───────▼─────────┐
│study_sessions│ │user_answers   │ │user_progress │ │   questions     │
│              │ │               │ │              │ │                 │
│• id (PK)     │ │• session_id(FK│ │• user_id (FK)│ │ • id (PK)       │
│• user_id(FK) │ │• user_id (FK) │ │• category(FK)│ │ • category(FK)  │
│• category(FK)│ │• question(FK) │ │• mastery     │ │ • question_text │
└──────┬───────┘ │• is_correct   │ └──────────────┘ │ • difficulty    │
       │         └───────────────┘                   └────────┬────────┘
       │ 1:N                                                   │
       │                                                       │ N:1
       └───────────────────────────────────────────────────────┘

┌──────────────────┐         ┌───────────────────┐
│subscription_plans│────1:N──│user_subscriptions │
│                  │         │                   │
│ • id (PK)        │         │ • id (PK)         │
│ • name           │         │ • user_id (FK)    │
│ • price_krw      │         │ • plan_id (FK)    │
└──────────────────┘         └─────────┬─────────┘
                                       │ 1:N
                             ┌─────────▼─────────┐
                             │     payments      │
                             │                   │
                             │ • id (PK)         │
                             │ • user_id (FK)    │
                             │ • subscription(FK)│
                             └───────────────────┘

┌──────────────┐         ┌─────────────┐         ┌────────────────┐
│  bookmarks   │         │weak_areas   │         │user_achievements│
│              │         │             │         │                 │
│• user_id (FK)│         │• user_id(FK)│         │• user_id (FK)   │
│• question(FK)│         │• category(FK│         │• achievement(FK)│
└──────────────┘         └─────────────┘         └─────────────────┘
```

---

## Indexes & Optimization Notes

### Composite Indexes for Common Queries

```sql
-- Session performance queries
CREATE INDEX idx_sessions_user_status_date 
    ON study_sessions(user_id, status, created_at DESC);

-- Answer analysis queries
CREATE INDEX idx_answers_user_correct_date 
    ON user_answers(user_id, is_correct, answered_at DESC);

-- Progress tracking
CREATE INDEX idx_progress_user_mastery 
    ON user_progress(user_id, mastery_level DESC, last_practiced_at DESC);

-- Question selection for adaptive learning
CREATE INDEX idx_questions_category_difficulty_status 
    ON questions(category_id, difficulty_level, status) 
    WHERE status = 'active';
```

### Partial Indexes

```sql
-- Only index active subscriptions
CREATE INDEX idx_subscriptions_active_users 
    ON user_subscriptions(user_id) 
    WHERE status IN ('active', 'trial');

-- Only index unread notifications
CREATE INDEX idx_notifications_unread 
    ON notifications(user_id, created_at DESC) 
    WHERE is_read = FALSE;
```

### JSONB Indexes

```sql
-- For searching question options
CREATE INDEX idx_questions_options 
    ON questions USING GIN(options);

-- For user preferences
CREATE INDEX idx_users_preferences 
    ON users USING GIN(preferences);

-- For analytics category breakdown
CREATE INDEX idx_analytics_category_performance 
    ON learning_analytics USING GIN(category_performance);
```

### Performance Tips

1. **Partitioning Strategy**
   - Partition `user_answers` by month (time-series data)
   - Partition `learning_analytics` by quarter
   - Keeps query performance fast as data grows

```sql
-- Example: Partition user_answers by month
CREATE TABLE user_answers (
    -- ... columns ...
) PARTITION BY RANGE (answered_at);

CREATE TABLE user_answers_2026_01 PARTITION OF user_answers
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
-- Create new partitions monthly via scheduled job
```

2. **Materialized Views for Analytics**

```sql
-- Pre-computed daily user stats
CREATE MATERIALIZED VIEW mv_daily_user_stats AS
SELECT 
    user_id,
    DATE(answered_at) as study_date,
    COUNT(*) as questions_attempted,
    SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_count,
    AVG(time_spent_seconds) as avg_time,
    ARRAY_AGG(DISTINCT category_id) as categories_studied
FROM user_answers
WHERE answered_at >= NOW() - INTERVAL '90 days'
GROUP BY user_id, DATE(answered_at);

CREATE UNIQUE INDEX ON mv_daily_user_stats(user_id, study_date);

-- Refresh nightly
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_user_stats;
```

3. **Denormalization for Read Performance**
   - Store aggregate counts in `user_profiles` (total questions, accuracy)
   - Update via triggers or scheduled jobs
   - Trade storage for query speed

4. **Connection Pooling**
   - Use PgBouncer with pool size = (CPU cores × 2) + effective_spindle_count
   - Session pooling for application, transaction pooling for background jobs

5. **Query Optimization**
   - Use `EXPLAIN ANALYZE` for slow queries
   - Aim for index-only scans where possible
   - Avoid N+1 queries with proper JOINs or batch loading

---

## Migration Strategy

### Initial Migration
```bash
# Apply migrations in order
psql -d gumsi_db -f migrations/001_create_users.sql
psql -d gumsi_db -f migrations/002_create_questions.sql
# ... etc
```

### Schema Versioning
- Use migration tool: `node-pg-migrate`, `Flyway`, or `Liquibase`
- Store migration version in `schema_migrations` table
- Never modify applied migrations—create new ones

### Sample Migration File
```sql
-- migrations/001_create_users.sql
BEGIN;

CREATE TABLE IF NOT EXISTS users (
    -- ... table definition ...
);

INSERT INTO schema_migrations (version, description) 
VALUES (1, 'Create users table');

COMMIT;
```

---

## Security Considerations

1. **Password Storage**: Use bcrypt (cost factor 12+)
2. **PII Encryption**: Encrypt `phone`, `email` at application layer for GDPR compliance
3. **Row-Level Security (RLS)**: Optional for multi-tenant isolation

```sql
ALTER TABLE user_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_answers_isolation ON user_answers
    USING (user_id = current_setting('app.current_user_id')::UUID);
```

4. **Audit Logging**: Track sensitive operations (subscription changes, payment transactions)

---

## Backup & Recovery

- **Full backup**: Daily at 02:00 KST
- **WAL archiving**: Continuous for point-in-time recovery
- **Retention**: 30 days full backups, 7 days WAL logs
- **Test restores**: Monthly verification

```bash
# Example backup command
pg_dump -Fc gumsi_db > backups/gumsi_$(date +%Y%m%d).dump
```

---

**Last Updated:** 2026-02-07  
**Schema Version:** 1.0  
**Maintainer:** MJ (COO)
