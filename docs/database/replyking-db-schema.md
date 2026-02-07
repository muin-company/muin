# ReplyKingAI Database Schema

## Overview
Database schema for ReplyKingAI - AI-powered social media comment/reply management platform with template library, analytics, and multi-account support.

**Database:** PostgreSQL 15+  
**Character Set:** UTF-8  
**Timezone:** UTC (convert to local in application layer)

---

## Core Tables

### 1. accounts
User accounts and authentication.

```sql
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Profile
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    website_url TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMPTZ,
    
    -- Account type
    account_type VARCHAR(20) DEFAULT 'individual' 
        CHECK (account_type IN ('individual', 'team', 'agency')),
    
    -- Settings
    timezone VARCHAR(50) DEFAULT 'Asia/Seoul',
    language VARCHAR(10) DEFAULT 'ko',
    preferences JSONB DEFAULT '{}',
    
    -- Security
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    
    -- Tracking
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_accounts_email ON accounts(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_accounts_status ON accounts(status);
CREATE INDEX idx_accounts_type ON accounts(account_type);
```

### 2. team_members
Team collaboration (for team/agency accounts).

```sql
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    member_account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Role & permissions
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    permissions JSONB DEFAULT '{}', -- {"can_create_templates": true, "can_manage_platforms": true, ...}
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('pending', 'active', 'inactive')),
    invited_by UUID REFERENCES accounts(id),
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    joined_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(account_id, member_account_id)
);

CREATE INDEX idx_team_members_account ON team_members(account_id, status);
CREATE INDEX idx_team_members_member ON team_members(member_account_id);
```

### 3. social_platforms
Supported social media platforms.

```sql
CREATE TABLE social_platforms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(50) UNIQUE NOT NULL, -- 'youtube', 'instagram', 'tiktok', 'twitter', 'facebook'
    display_name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    
    -- Platform config
    icon_url TEXT,
    color_hex VARCHAR(7), -- Brand color
    api_version VARCHAR(20),
    
    -- Features
    supports_replies BOOLEAN DEFAULT TRUE,
    supports_threading BOOLEAN DEFAULT FALSE,
    supports_media BOOLEAN DEFAULT TRUE,
    max_comment_length INTEGER,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social_platforms_active ON social_platforms(is_active);

-- Seed data
INSERT INTO social_platforms (name, display_name, slug, color_hex, max_comment_length) VALUES
    ('youtube', 'YouTube', 'youtube', '#FF0000', 10000),
    ('instagram', 'Instagram', 'instagram', '#E4405F', 2200),
    ('tiktok', 'TikTok', 'tiktok', '#000000', 150),
    ('twitter', 'Twitter/X', 'twitter', '#1DA1F2', 280),
    ('facebook', 'Facebook', 'facebook', '#1877F2', 8000);
```

### 4. connected_accounts
User's connected social media accounts.

```sql
CREATE TABLE connected_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    platform_id UUID NOT NULL REFERENCES social_platforms(id),
    
    -- Platform account info
    platform_user_id VARCHAR(255) NOT NULL,
    platform_username VARCHAR(255),
    platform_display_name VARCHAR(255),
    platform_avatar_url TEXT,
    
    -- OAuth tokens
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    scopes TEXT[],
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('active', 'expired', 'revoked', 'error')),
    last_sync_at TIMESTAMPTZ,
    last_error TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(account_id, platform_id, platform_user_id)
);

CREATE INDEX idx_connected_accounts_account ON connected_accounts(account_id, status);
CREATE INDEX idx_connected_accounts_platform ON connected_accounts(platform_id);
CREATE INDEX idx_connected_accounts_token_expiry ON connected_accounts(token_expires_at) 
    WHERE status = 'active';
```

### 5. comments
Imported social media comments.

```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connected_account_id UUID NOT NULL REFERENCES connected_accounts(id) ON DELETE CASCADE,
    
    -- Platform data
    platform_comment_id VARCHAR(255) NOT NULL,
    platform_post_id VARCHAR(255) NOT NULL,
    platform_author_id VARCHAR(255),
    platform_author_name VARCHAR(255),
    
    -- Content
    comment_text TEXT NOT NULL,
    language VARCHAR(10),
    
    -- Metadata
    comment_type VARCHAR(20) DEFAULT 'comment' 
        CHECK (comment_type IN ('comment', 'reply', 'mention', 'dm')),
    parent_comment_id UUID REFERENCES comments(id), -- For threaded comments
    
    -- Engagement
    like_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    
    -- Sentiment analysis (AI-powered)
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative', 'mixed')),
    sentiment_score DECIMAL(3,2), -- -1.0 to 1.0
    
    -- Classification
    is_spam BOOLEAN DEFAULT FALSE,
    is_toxic BOOLEAN DEFAULT FALSE,
    requires_attention BOOLEAN DEFAULT FALSE,
    
    -- Reply status
    reply_status VARCHAR(20) DEFAULT 'pending' 
        CHECK (reply_status IN ('pending', 'drafted', 'replied', 'ignored', 'archived')),
    
    -- Platform timestamps
    posted_at TIMESTAMPTZ NOT NULL,
    
    -- Our timestamps
    imported_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(connected_account_id, platform_comment_id)
);

CREATE INDEX idx_comments_account ON comments(connected_account_id, posted_at DESC);
CREATE INDEX idx_comments_post ON comments(platform_post_id);
CREATE INDEX idx_comments_status ON comments(reply_status, posted_at DESC);
CREATE INDEX idx_comments_sentiment ON comments(sentiment) WHERE sentiment IS NOT NULL;
CREATE INDEX idx_comments_attention ON comments(requires_attention, posted_at DESC) 
    WHERE requires_attention = TRUE;
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);
```

### 6. replies
Generated and sent replies.

```sql
CREATE TABLE replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    connected_account_id UUID NOT NULL REFERENCES connected_accounts(id),
    template_id UUID REFERENCES reply_templates(id), -- Can be NULL for manual replies
    
    -- Content
    reply_text TEXT NOT NULL,
    original_template_text TEXT, -- Store original template before variable substitution
    
    -- Generation method
    generation_method VARCHAR(20) DEFAULT 'ai' 
        CHECK (generation_method IN ('ai', 'template', 'manual', 'hybrid')),
    
    -- AI metadata
    ai_model VARCHAR(50),
    ai_prompt TEXT,
    ai_confidence DECIMAL(3,2), -- How confident AI was in this reply
    
    -- Customization
    was_edited BOOLEAN DEFAULT FALSE,
    edit_count INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft' 
        CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
    
    -- Scheduling
    scheduled_for TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    
    -- Platform response
    platform_reply_id VARCHAR(255), -- After successful send
    send_error TEXT,
    retry_count INTEGER DEFAULT 0,
    
    -- Engagement tracking
    like_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    
    -- Feedback
    user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
    user_feedback TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_replies_comment ON replies(comment_id);
CREATE INDEX idx_replies_account ON replies(account_id, created_at DESC);
CREATE INDEX idx_replies_status ON replies(status);
CREATE INDEX idx_replies_scheduled ON replies(scheduled_for) 
    WHERE status = 'scheduled' AND scheduled_for IS NOT NULL;
CREATE INDEX idx_replies_template ON replies(template_id);
```

---

## Template System

### 7. reply_templates
Reusable reply templates with variables.

```sql
CREATE TABLE reply_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Template info
    name VARCHAR(200) NOT NULL,
    description TEXT,
    template_text TEXT NOT NULL,
    
    -- Variables (e.g., {{name}}, {{product}}, {{emoji}})
    variables JSONB DEFAULT '[]', -- [{"name": "name", "type": "text", "required": true}, ...]
    
    -- Categorization
    category VARCHAR(100), -- 'greeting', 'support', 'promotional', 'appreciation', etc.
    tags TEXT[],
    
    -- AI enhancement
    ai_tone VARCHAR(50), -- 'friendly', 'professional', 'casual', 'enthusiastic'
    auto_emoji BOOLEAN DEFAULT FALSE,
    auto_personalize BOOLEAN DEFAULT TRUE,
    
    -- Usage tracking
    use_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    avg_engagement_rate DECIMAL(5,2),
    
    -- Visibility
    is_public BOOLEAN DEFAULT FALSE, -- Can other users see this template?
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Favoriting
    is_favorite BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reply_templates_account ON reply_templates(account_id, is_active);
CREATE INDEX idx_reply_templates_category ON reply_templates(category);
CREATE INDEX idx_reply_templates_tags ON reply_templates USING GIN(tags);
CREATE INDEX idx_reply_templates_public ON reply_templates(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_reply_templates_favorite ON reply_templates(account_id, is_favorite) 
    WHERE is_favorite = TRUE;
```

### 8. template_library
Public/shared template marketplace.

```sql
CREATE TABLE template_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Template content
    name VARCHAR(200) NOT NULL,
    description TEXT,
    template_text TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    
    -- Metadata
    category VARCHAR(100),
    tags TEXT[],
    language VARCHAR(10) DEFAULT 'ko',
    
    -- Platform compatibility
    compatible_platforms TEXT[], -- ['youtube', 'instagram', ...]
    
    -- Authorship
    created_by_account_id UUID REFERENCES accounts(id),
    is_official BOOLEAN DEFAULT FALSE, -- Created by ReplyKingAI team
    
    -- Stats
    usage_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0,
    avg_rating DECIMAL(3,2),
    rating_count INTEGER DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_template_library_category ON template_library(category, is_active);
CREATE INDEX idx_template_library_tags ON template_library USING GIN(tags);
CREATE INDEX idx_template_library_featured ON template_library(featured) WHERE featured = TRUE;
CREATE INDEX idx_template_library_rating ON template_library(avg_rating DESC, usage_count DESC);
```

### 9. template_usage
Track which templates users have used/imported.

```sql
CREATE TABLE template_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    library_template_id UUID REFERENCES template_library(id),
    user_template_id UUID REFERENCES reply_templates(id),
    
    -- Usage data
    times_used INTEGER DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    
    -- Feedback
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(account_id, library_template_id)
);

CREATE INDEX idx_template_usage_account ON template_usage(account_id);
CREATE INDEX idx_template_usage_library ON template_usage(library_template_id);
```

---

## Analytics Tables

### 10. reply_analytics
Aggregate analytics per reply.

```sql
CREATE TABLE reply_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reply_id UUID NOT NULL REFERENCES replies(id) ON DELETE CASCADE,
    
    -- Engagement metrics (snapshot at time intervals)
    snapshot_at TIMESTAMPTZ DEFAULT NOW(),
    
    likes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    
    -- Calculated metrics
    engagement_rate DECIMAL(5,2),
    sentiment_score DECIMAL(3,2),
    
    -- Time to first engagement
    time_to_first_like_seconds INTEGER,
    time_to_first_reply_seconds INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reply_analytics_reply ON reply_analytics(reply_id, snapshot_at DESC);
```

### 11. daily_analytics
Daily aggregated statistics per account.

```sql
CREATE TABLE daily_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    connected_account_id UUID REFERENCES connected_accounts(id),
    
    -- Date
    analytics_date DATE NOT NULL,
    
    -- Volume metrics
    comments_received INTEGER DEFAULT 0,
    replies_sent INTEGER DEFAULT 0,
    templates_used INTEGER DEFAULT 0,
    
    -- Engagement metrics
    total_likes INTEGER DEFAULT 0,
    total_replies INTEGER DEFAULT 0,
    avg_engagement_rate DECIMAL(5,2),
    
    -- Sentiment breakdown
    positive_comments INTEGER DEFAULT 0,
    neutral_comments INTEGER DEFAULT 0,
    negative_comments INTEGER DEFAULT 0,
    
    -- Response metrics
    avg_response_time_minutes INTEGER,
    response_rate DECIMAL(5,2), -- % of comments replied to
    
    -- Platform breakdown
    platform_breakdown JSONB, -- {"youtube": {"comments": 50, "replies": 40}, ...}
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(account_id, connected_account_id, analytics_date)
);

CREATE INDEX idx_daily_analytics_account_date ON daily_analytics(account_id, analytics_date DESC);
CREATE INDEX idx_daily_analytics_connected_date ON daily_analytics(connected_account_id, analytics_date DESC);
```

### 12. template_performance
Track which templates perform best.

```sql
CREATE TABLE template_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES reply_templates(id) ON DELETE CASCADE,
    
    -- Time period
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Usage stats
    times_used INTEGER DEFAULT 0,
    unique_users INTEGER DEFAULT 0,
    
    -- Engagement stats
    avg_likes DECIMAL(8,2),
    avg_replies DECIMAL(8,2),
    avg_engagement_rate DECIMAL(5,2),
    
    -- Sentiment
    avg_sentiment_score DECIMAL(3,2),
    
    -- User feedback
    avg_user_rating DECIMAL(3,2),
    rating_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(template_id, period_start, period_end)
);

CREATE INDEX idx_template_performance_template ON template_performance(template_id, period_start DESC);
```

---

## Subscription & Billing

### 13. subscription_plans
Pricing tiers.

```sql
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    
    -- Pricing
    price_krw INTEGER NOT NULL,
    price_usd INTEGER,
    billing_interval VARCHAR(20) CHECK (billing_interval IN ('monthly', 'yearly')),
    
    -- Limits
    max_connected_accounts INTEGER DEFAULT 1,
    max_comments_per_month INTEGER, -- NULL = unlimited
    max_replies_per_month INTEGER,
    max_templates INTEGER,
    
    -- Features
    features JSONB, -- {"ai_replies": true, "analytics": true, "team_collaboration": false, ...}
    
    -- AI Credits
    ai_credits_per_month INTEGER, -- For AI-generated replies
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscription_plans_active ON subscription_plans(is_active, sort_order);

-- Seed plans
INSERT INTO subscription_plans (name, slug, price_krw, billing_interval, max_connected_accounts, ai_credits_per_month) VALUES
    ('Free', 'free', 0, 'monthly', 1, 10),
    ('Pro', 'pro', 29000, 'monthly', 3, 500),
    ('Business', 'business', 99000, 'monthly', 10, 2000),
    ('Enterprise', 'enterprise', 299000, 'monthly', NULL, NULL);
```

### 14. user_subscriptions
Active subscriptions.

```sql
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('trialing', 'active', 'cancelled', 'expired', 'past_due')),
    
    -- Billing period
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    trial_ends_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    
    -- Payment
    auto_renew BOOLEAN DEFAULT TRUE,
    price_paid_krw INTEGER,
    
    -- External billing
    payment_provider VARCHAR(50), -- 'stripe', 'paddle', 'toss'
    external_subscription_id VARCHAR(255),
    external_customer_id VARCHAR(255),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_subscriptions_account ON user_subscriptions(account_id, status);
CREATE INDEX idx_user_subscriptions_period_end ON user_subscriptions(current_period_end) 
    WHERE status IN ('active', 'trialing');
```

### 15. payments
Payment transactions.

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES user_subscriptions(id),
    
    -- Amount
    amount_krw INTEGER NOT NULL,
    amount_usd INTEGER,
    currency VARCHAR(3) DEFAULT 'KRW',
    
    -- Payment details
    payment_method VARCHAR(50), -- 'card', 'bank_transfer', 'paypal'
    payment_provider VARCHAR(50),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    
    -- External references
    transaction_id VARCHAR(255) UNIQUE,
    invoice_url TEXT,
    receipt_url TEXT,
    
    -- Timestamps
    paid_at TIMESTAMPTZ,
    refunded_at TIMESTAMPTZ,
    
    -- Error handling
    failure_reason TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_account ON payments(account_id, created_at DESC);
CREATE INDEX idx_payments_subscription ON payments(subscription_id);
CREATE INDEX idx_payments_status ON payments(status);
```

### 16. usage_tracking
Track usage against plan limits.

```sql
CREATE TABLE usage_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Period
    period_month DATE NOT NULL, -- First day of month
    
    -- Usage counts
    comments_processed INTEGER DEFAULT 0,
    replies_sent INTEGER DEFAULT 0,
    ai_credits_used INTEGER DEFAULT 0,
    templates_created INTEGER DEFAULT 0,
    
    -- Limits (from subscription plan, cached here)
    comments_limit INTEGER,
    replies_limit INTEGER,
    ai_credits_limit INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(account_id, period_month)
);

CREATE INDEX idx_usage_tracking_account_month ON usage_tracking(account_id, period_month DESC);
```

---

## Supporting Tables

### 17. notifications
In-app and push notifications.

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Content
    title VARCHAR(200) NOT NULL,
    message TEXT,
    notification_type VARCHAR(50), 
        -- 'new_comment', 'reply_sent', 'reply_failed', 'high_engagement', 'negative_sentiment', 'usage_limit'
    
    -- Related entities
    related_comment_id UUID REFERENCES comments(id),
    related_reply_id UUID REFERENCES replies(id),
    
    -- Action
    action_url TEXT,
    action_label VARCHAR(50),
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    
    -- Priority
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_account_unread ON notifications(account_id, is_read, created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(notification_type);
```

### 18. ai_prompts
Stored AI prompts for reply generation.

```sql
CREATE TABLE ai_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id), -- NULL for system prompts
    
    -- Prompt details
    name VARCHAR(200) NOT NULL,
    prompt_text TEXT NOT NULL,
    
    -- Context
    prompt_type VARCHAR(50), -- 'reply_generation', 'sentiment_analysis', 'spam_detection'
    tone VARCHAR(50), -- 'friendly', 'professional', 'witty', 'empathetic'
    
    -- Usage
    is_default BOOLEAN DEFAULT FALSE,
    is_system BOOLEAN DEFAULT FALSE, -- Created by ReplyKingAI team
    use_count INTEGER DEFAULT 0,
    
    -- Performance
    avg_rating DECIMAL(3,2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_prompts_account ON ai_prompts(account_id);
CREATE INDEX idx_ai_prompts_type ON ai_prompts(prompt_type, is_system);
```

### 19. audit_logs
Track important actions for compliance.

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id),
    
    -- Action details
    action VARCHAR(100) NOT NULL, -- 'connect_platform', 'send_reply', 'delete_template', etc.
    resource_type VARCHAR(50), -- 'connected_account', 'reply', 'template'
    resource_id UUID,
    
    -- Changes
    old_values JSONB,
    new_values JSONB,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_account ON audit_logs(account_id, created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action, created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
```

---

## ERD Description (Text-Based)

```
┌──────────────┐         ┌─────────────────┐         ┌──────────────────┐
│  accounts    │────1:N──│  team_members   │         │social_platforms  │
│              │         │                 │         │                  │
│ • id (PK)    │         │ • account_id(FK)│         │ • id (PK)        │
│ • email      │         │ • member_id (FK)│         │ • name           │
│ • username   │         │ • role          │         │ • display_name   │
└───┬──────────┘         └─────────────────┘         └────────┬─────────┘
    │                                                          │
    │ 1:N                                                      │ 1:N
    │                                                          │
┌───▼──────────────────┐                          ┌───────────▼───────────┐
│connected_accounts    │──────────────────────────│      comments         │
│                      │ 1:N                      │                       │
│ • id (PK)            │                          │ • id (PK)             │
│ • account_id (FK)    │                          │ • connected_acct (FK) │
│ • platform_id (FK)   │                          │ • platform_comment_id │
│ • access_token       │                          │ • comment_text        │
└──────────────────────┘                          │ • sentiment           │
                                                   └──────────┬────────────┘
                                                              │ 1:N
                                                   ┌──────────▼────────────┐
                                                   │      replies          │
                                                   │                       │
                                                   │ • id (PK)             │
                                                   │ • comment_id (FK)     │
                                                   │ • template_id (FK)    │
                                                   │ • reply_text          │
                                                   │ • status              │
                                                   └───────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│reply_templates   │         │template_library  │         │template_usage    │
│                  │         │                  │         │                  │
│ • id (PK)        │         │ • id (PK)        │         │ • account_id (FK)│
│ • account_id (FK)│         │ • name           │         │ • library_id (FK)│
│ • template_text  │         │ • template_text  │         │ • times_used     │
│ • category       │         │ • usage_count    │         └──────────────────┘
└──────────────────┘         └──────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────┐
│subscription_plans│────1:N──│user_subscriptions│────1:N──│   payments   │
│                  │         │                  │         │              │
│ • id (PK)        │         │ • account_id (FK)│         │ • account(FK)│
│ • name           │         │ • plan_id (FK)   │         │ • amount_krw │
│ • price_krw      │         │ • status         │         │ • status     │
└──────────────────┘         └──────────────────┘         └──────────────┘
```

---

## Indexes & Optimization

### Composite Indexes

```sql
-- Comment inbox queries
CREATE INDEX idx_comments_account_status_date 
    ON comments(connected_account_id, reply_status, posted_at DESC);

-- Reply history
CREATE INDEX idx_replies_account_status_date 
    ON replies(account_id, status, created_at DESC);

-- Template search
CREATE INDEX idx_templates_account_category_active 
    ON reply_templates(account_id, category, is_active);
```

### Partial Indexes

```sql
-- Only index pending/high-priority comments
CREATE INDEX idx_comments_needs_reply 
    ON comments(posted_at DESC) 
    WHERE reply_status = 'pending' AND requires_attention = TRUE;

-- Active subscriptions only
CREATE INDEX idx_active_subscriptions 
    ON user_subscriptions(account_id, current_period_end) 
    WHERE status IN ('active', 'trialing');
```

### Full-Text Search

```sql
-- Search comments
CREATE INDEX idx_comments_fts ON comments 
    USING GIN(to_tsvector('korean', comment_text));

-- Search templates
CREATE INDEX idx_templates_fts ON reply_templates 
    USING GIN(to_tsvector('korean', template_text || ' ' || COALESCE(description, '')));

-- Usage:
SELECT * FROM comments 
WHERE to_tsvector('korean', comment_text) @@ to_tsquery('korean', '제품 & 문의');
```

### Performance Tips

1. **Comment Import Batching**: Use `COPY` for bulk imports
```sql
COPY comments(connected_account_id, platform_comment_id, comment_text, posted_at) 
FROM '/tmp/comments.csv' CSV;
```

2. **Reply Queue**: Materialized view for pending replies
```sql
CREATE MATERIALIZED VIEW mv_reply_queue AS
SELECT 
    c.*,
    ca.platform_username,
    a.timezone,
    COUNT(*) OVER (PARTITION BY c.connected_account_id) as queue_size
FROM comments c
JOIN connected_accounts ca ON c.connected_account_id = ca.id
JOIN accounts a ON ca.account_id = a.id
WHERE c.reply_status = 'pending'
  AND c.imported_at >= NOW() - INTERVAL '7 days'
ORDER BY c.requires_attention DESC, c.posted_at ASC;

REFRESH MATERIALIZED VIEW CONCURRENTLY mv_reply_queue;
```

3. **Analytics Aggregation**: Use cron job to populate `daily_analytics` nightly

4. **Partitioning Strategy**:
   - Partition `comments` by month
   - Partition `replies` by month
   - Partition `audit_logs` by quarter

---

## Security & Privacy

### Row-Level Security (RLS)

```sql
-- Enable RLS on sensitive tables
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own connected accounts
CREATE POLICY connected_accounts_isolation ON connected_accounts
    USING (
        account_id = current_setting('app.current_account_id')::UUID
        OR account_id IN (
            SELECT account_id FROM team_members 
            WHERE member_account_id = current_setting('app.current_account_id')::UUID 
              AND status = 'active'
        )
    );
```

### Token Encryption

```sql
-- Encrypt access tokens at application layer before storing
-- Use AES-256-GCM with account-specific keys
-- Never log tokens in audit_logs
```

### Data Retention

- Comments older than 90 days: Archive to cold storage
- Audit logs: Retain 1 year
- Deleted accounts: Anonymize after 30 days (GDPR compliance)

---

## Migration & Deployment

### Schema Versioning

```sql
CREATE TABLE schema_migrations (
    version INTEGER PRIMARY KEY,
    description TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Sample Migration Workflow

```bash
# 1. Export production schema (backup)
pg_dump -s replyking_db > schema_backup_$(date +%Y%m%d).sql

# 2. Run migration on staging
psql -d replyking_staging -f migrations/042_add_ai_prompts.sql

# 3. Test thoroughly

# 4. Apply to production during maintenance window
psql -d replyking_prod -f migrations/042_add_ai_prompts.sql
```

---

**Last Updated:** 2026-02-07  
**Schema Version:** 1.0  
**Maintainer:** MJ (COO)
