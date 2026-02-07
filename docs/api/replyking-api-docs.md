# ReplyKingAI API Documentation

**Version:** 1.0.0  
**Base URL:** `https://api.replyking.ai/v1`  
**Last Updated:** 2026-02-07

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Webhooks](#webhooks)
- [API Endpoints](#api-endpoints)
- [Error Codes](#error-codes)
- [SDK Examples](#sdk-examples)

---

## Overview

ReplyKingAI automates comment management and engagement across social media platforms. The API provides intelligent comment analysis, template-based responses, sentiment analysis, and comprehensive analytics.

### Key Features

- AI-powered comment analysis and classification
- Template-based response generation
- Multi-platform support (YouTube, Instagram, Twitter/X, Facebook)
- Sentiment and intent detection
- Automated reply scheduling
- Analytics and engagement metrics

---

## Authentication

All API requests require authentication using API keys.

### API Key Authentication

Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
X-API-Key: YOUR_API_KEY
```

**Obtaining an API Key:**

1. Sign up at [https://replyking.ai](https://replyking.ai)
2. Navigate to Settings → API Access
3. Generate a new API key
4. Set appropriate scopes (read, write, analytics)

**API Key Scopes:**

| Scope | Permissions |
|-------|-------------|
| `comments:read` | Read comments and replies |
| `comments:write` | Post and edit replies |
| `templates:read` | View templates |
| `templates:write` | Create and edit templates |
| `analytics:read` | Access analytics data |
| `webhooks:manage` | Configure webhooks |

---

## Webhooks

ReplyKingAI sends real-time notifications to your webhook endpoint when events occur.

### Webhook Events

| Event | Description |
|-------|-------------|
| `comment.received` | New comment detected |
| `comment.processed` | Comment analysis completed |
| `reply.posted` | Reply successfully posted |
| `reply.failed` | Reply posting failed |
| `sentiment.alert` | Negative sentiment detected |
| `template.matched` | Template auto-matched to comment |

### Webhook Endpoint Configuration

**Endpoint:** `POST /webhooks`

**Request:**

```http
POST /v1/webhooks
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/replyking",
  "events": [
    "comment.received",
    "comment.processed",
    "reply.posted"
  ],
  "active": true,
  "secret": "your_webhook_secret"
}
```

**Response (201 Created):**

```json
{
  "webhook_id": "wh_abc123",
  "url": "https://your-app.com/webhooks/replyking",
  "events": [
    "comment.received",
    "comment.processed",
    "reply.posted"
  ],
  "active": true,
  "created_at": "2026-02-07T09:30:00Z"
}
```

### Webhook Payload

**Example: `comment.received`**

```json
{
  "event": "comment.received",
  "webhook_id": "wh_abc123",
  "timestamp": "2026-02-07T10:15:30Z",
  "data": {
    "comment_id": "cmt_xyz789",
    "platform": "youtube",
    "author": {
      "id": "UC123456",
      "username": "user123",
      "display_name": "John Doe"
    },
    "content": "This product looks amazing! How much does it cost?",
    "post_id": "video_abc123",
    "parent_comment_id": null,
    "created_at": "2026-02-07T10:15:00Z",
    "metadata": {
      "video_title": "Product Demo 2026",
      "likes": 5,
      "is_verified": false
    }
  }
}
```

**Example: `comment.processed`**

```json
{
  "event": "comment.processed",
  "webhook_id": "wh_abc123",
  "timestamp": "2026-02-07T10:15:35Z",
  "data": {
    "comment_id": "cmt_xyz789",
    "analysis": {
      "sentiment": "positive",
      "sentiment_score": 0.85,
      "intent": "inquiry",
      "category": "pricing",
      "language": "en",
      "requires_response": true,
      "urgency": "medium",
      "topics": ["pricing", "product_interest"]
    },
    "suggested_template": "template_pricing_001",
    "auto_reply_enabled": false
  }
}
```

### Webhook Security

All webhook requests include a signature header for verification:

```http
X-ReplyKing-Signature: sha256=abc123def456...
X-ReplyKing-Timestamp: 1707307200
```

**Verify Webhook Signature (Node.js):**

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret, timestamp) {
  // Check timestamp (prevent replay attacks)
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - timestamp) > 300) {
    return false; // Reject if older than 5 minutes
  }

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature.replace('sha256=', '')),
    Buffer.from(expectedSignature)
  );
}
```

---

## API Endpoints

### 1. Process Comment

Analyze a comment and get AI-powered insights.

**Endpoint:** `POST /comments/process`

**Request:**

```http
POST /v1/comments/process
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "content": "This product looks amazing! How much does it cost?",
  "platform": "youtube",
  "author": {
    "id": "UC123456",
    "username": "user123"
  },
  "metadata": {
    "post_id": "video_abc123",
    "timestamp": "2026-02-07T10:15:00Z"
  }
}
```

**Response (200 OK):**

```json
{
  "comment_id": "cmt_xyz789",
  "analysis": {
    "sentiment": "positive",
    "sentiment_score": 0.85,
    "intent": "inquiry",
    "category": "pricing",
    "language": "en",
    "confidence": 0.92,
    "requires_response": true,
    "urgency": "medium",
    "topics": ["pricing", "product_interest"],
    "entities": [
      {
        "type": "product",
        "text": "product",
        "confidence": 0.88
      }
    ]
  },
  "suggested_templates": [
    {
      "template_id": "template_pricing_001",
      "name": "Pricing Inquiry Response",
      "match_score": 0.95,
      "preview": "Thanks for your interest! Our pricing starts at..."
    },
    {
      "template_id": "template_general_inquiry",
      "name": "General Inquiry",
      "match_score": 0.72,
      "preview": "Thank you for reaching out..."
    }
  ],
  "processing_time_ms": 245
}
```

---

### 2. Generate Reply

Generate a reply using a template or AI.

**Endpoint:** `POST /replies/generate`

**Request:**

```http
POST /v1/replies/generate
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "comment_id": "cmt_xyz789",
  "template_id": "template_pricing_001",
  "variables": {
    "product_name": "Pro Package",
    "price": "$99/month",
    "discount": "20%"
  },
  "tone": "friendly",
  "personalize": true
}
```

**Response (200 OK):**

```json
{
  "reply_id": "reply_abc123",
  "content": "Thanks for your interest, John! Our Pro Package starts at $99/month, and we're currently offering a 20% discount for new customers. Would you like more details? 😊",
  "template_used": "template_pricing_001",
  "personalization_applied": true,
  "character_count": 187,
  "estimated_engagement": 0.78
}
```

---

### 3. Post Reply

Post a generated reply to the platform.

**Endpoint:** `POST /replies/post`

**Request:**

```http
POST /v1/replies/post
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "comment_id": "cmt_xyz789",
  "reply_id": "reply_abc123",
  "platform": "youtube",
  "schedule_at": null,
  "auto_like_parent": true
}
```

**Response (201 Created):**

```json
{
  "post_id": "post_def456",
  "status": "posted",
  "platform_reply_id": "UgxYz9876",
  "posted_at": "2026-02-07T10:20:00Z",
  "comment_id": "cmt_xyz789",
  "reply_content": "Thanks for your interest, John! Our Pro Package starts at $99/month..."
}
```

---

### 4. Create Template

Create a new response template.

**Endpoint:** `POST /templates`

**Request:**

```http
POST /v1/templates
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "name": "Pricing Inquiry Response",
  "content": "Thanks for your interest, {{author_name}}! Our {{product_name}} starts at {{price}}. {{#if discount}}We're currently offering {{discount}} off for new customers!{{/if}} Would you like more details? 😊",
  "category": "pricing",
  "triggers": [
    "how much",
    "price",
    "cost",
    "pricing"
  ],
  "intent_match": ["inquiry"],
  "platforms": ["youtube", "instagram", "twitter"],
  "variables": [
    {
      "name": "product_name",
      "type": "string",
      "required": true
    },
    {
      "name": "price",
      "type": "string",
      "required": true
    },
    {
      "name": "discount",
      "type": "string",
      "required": false
    }
  ],
  "active": true
}
```

**Response (201 Created):**

```json
{
  "template_id": "template_pricing_001",
  "name": "Pricing Inquiry Response",
  "category": "pricing",
  "created_at": "2026-02-07T09:00:00Z",
  "updated_at": "2026-02-07T09:00:00Z",
  "usage_count": 0,
  "active": true
}
```

---

### 5. List Templates

Retrieve all templates.

**Endpoint:** `GET /templates`

**Request:**

```http
GET /v1/templates?category=pricing&active=true&limit=20
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category |
| `active` | boolean | Filter by active status |
| `platform` | string | Filter by platform |
| `limit` | integer | Results per page (default: 50) |
| `offset` | integer | Pagination offset |

**Response (200 OK):**

```json
{
  "templates": [
    {
      "template_id": "template_pricing_001",
      "name": "Pricing Inquiry Response",
      "category": "pricing",
      "platforms": ["youtube", "instagram", "twitter"],
      "usage_count": 45,
      "avg_engagement": 0.82,
      "active": true,
      "created_at": "2026-01-15T10:00:00Z"
    },
    {
      "template_id": "template_shipping_001",
      "name": "Shipping Question",
      "category": "logistics",
      "platforms": ["instagram", "facebook"],
      "usage_count": 28,
      "avg_engagement": 0.75,
      "active": true,
      "created_at": "2026-01-20T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

---

### 6. Update Template

Update an existing template.

**Endpoint:** `PATCH /templates/{template_id}`

**Request:**

```http
PATCH /v1/templates/template_pricing_001
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "content": "Thanks for your interest! Our {{product_name}} starts at {{price}}. {{#if discount}}Special offer: {{discount}} off!{{/if}} DM us for details! 😊",
  "active": true
}
```

**Response (200 OK):**

```json
{
  "template_id": "template_pricing_001",
  "name": "Pricing Inquiry Response",
  "updated_at": "2026-02-07T10:30:00Z",
  "changes_applied": 2
}
```

---

### 7. Delete Template

Delete a template.

**Endpoint:** `DELETE /templates/{template_id}`

**Request:**

```http
DELETE /v1/templates/template_pricing_001
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
```

**Response (204 No Content)**

---

### 8. Get Analytics

Retrieve engagement and performance analytics.

**Endpoint:** `GET /analytics`

**Request:**

```http
GET /v1/analytics?start_date=2026-02-01&end_date=2026-02-07&platform=youtube
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `start_date` | string | Start date (YYYY-MM-DD) |
| `end_date` | string | End date (YYYY-MM-DD) |
| `platform` | string | Filter by platform |
| `group_by` | string | Group by: day, week, month, template |

**Response (200 OK):**

```json
{
  "period": {
    "start": "2026-02-01T00:00:00Z",
    "end": "2026-02-07T23:59:59Z"
  },
  "summary": {
    "total_comments_processed": 1247,
    "total_replies_sent": 856,
    "avg_response_time_minutes": 12,
    "reply_rate": 0.69,
    "avg_sentiment_score": 0.72,
    "negative_sentiment_count": 34
  },
  "sentiment_distribution": {
    "positive": 782,
    "neutral": 431,
    "negative": 34
  },
  "top_categories": [
    {
      "category": "pricing",
      "count": 345,
      "percentage": 27.7
    },
    {
      "category": "product_features",
      "count": 298,
      "percentage": 23.9
    },
    {
      "category": "support",
      "count": 187,
      "percentage": 15.0
    }
  ],
  "template_performance": [
    {
      "template_id": "template_pricing_001",
      "name": "Pricing Inquiry Response",
      "usage_count": 124,
      "avg_engagement": 0.85,
      "reply_rate": 0.92
    },
    {
      "template_id": "template_support_001",
      "name": "Support Response",
      "usage_count": 98,
      "avg_engagement": 0.78,
      "reply_rate": 0.88
    }
  ],
  "daily_breakdown": [
    {
      "date": "2026-02-01",
      "comments": 178,
      "replies": 123,
      "avg_sentiment": 0.74
    },
    {
      "date": "2026-02-02",
      "comments": 192,
      "replies": 134,
      "avg_sentiment": 0.71
    }
  ]
}
```

---

### 9. Get Platform Analytics

Get platform-specific analytics.

**Endpoint:** `GET /analytics/platforms/{platform}`

**Request:**

```http
GET /v1/analytics/platforms/youtube?start_date=2026-02-01&end_date=2026-02-07
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
```

**Response (200 OK):**

```json
{
  "platform": "youtube",
  "period": {
    "start": "2026-02-01T00:00:00Z",
    "end": "2026-02-07T23:59:59Z"
  },
  "metrics": {
    "total_comments": 645,
    "total_replies": 432,
    "avg_likes_per_reply": 8.5,
    "avg_reply_time_minutes": 15,
    "videos_monitored": 12,
    "top_videos": [
      {
        "video_id": "video_abc123",
        "title": "Product Demo 2026",
        "comments": 234,
        "replies": 189,
        "engagement_rate": 0.81
      }
    ]
  }
}
```

---

### 10. Bulk Import Comments

Import multiple comments for batch processing.

**Endpoint:** `POST /comments/bulk-import`

**Request:**

```http
POST /v1/comments/bulk-import
Host: api.replyking.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "platform": "instagram",
  "comments": [
    {
      "content": "Love this!",
      "author": {"id": "user1", "username": "johndoe"},
      "post_id": "post123",
      "timestamp": "2026-02-07T10:00:00Z"
    },
    {
      "content": "When will this be available?",
      "author": {"id": "user2", "username": "janedoe"},
      "post_id": "post123",
      "timestamp": "2026-02-07T10:05:00Z"
    }
  ]
}
```

**Response (202 Accepted):**

```json
{
  "batch_id": "batch_xyz789",
  "status": "processing",
  "total_comments": 2,
  "estimated_completion": "2026-02-07T10:12:00Z"
}
```

---

## Error Codes

### Standard Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {},
    "request_id": "req_abc123"
  }
}
```

### Error Codes

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `INVALID_API_KEY` | 401 | API key is invalid or missing | Verify your API key |
| `INSUFFICIENT_SCOPE` | 403 | API key lacks required scope | Request key with appropriate scopes |
| `COMMENT_NOT_FOUND` | 404 | Comment ID doesn't exist | Check comment ID |
| `TEMPLATE_NOT_FOUND` | 404 | Template ID doesn't exist | Verify template ID |
| `INVALID_PLATFORM` | 400 | Unsupported platform | Use: youtube, instagram, twitter, facebook |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Wait and retry |
| `INVALID_TEMPLATE_SYNTAX` | 400 | Template syntax error | Check template format |
| `PLATFORM_AUTH_FAILED` | 401 | Platform authentication failed | Reconnect platform account |
| `REPLY_POST_FAILED` | 500 | Failed to post reply | Check platform status or retry |
| `WEBHOOK_VERIFICATION_FAILED` | 400 | Webhook signature invalid | Check webhook secret |
| `INVALID_DATE_RANGE` | 400 | Date range exceeds limits (max 90 days) | Reduce date range |

---

## SDK Examples

### JavaScript/Node.js

**Installation:**

```bash
npm install @replyking/api-client
```

**Usage:**

```javascript
const ReplyKingAI = require('@replyking/api-client');

// Initialize client
const client = new ReplyKingAI({
  apiKey: process.env.REPLYKING_API_KEY
});

// Process a comment
async function processComment() {
  const analysis = await client.comments.process({
    content: "How much does this cost?",
    platform: "youtube",
    author: {
      id: "UC123456",
      username: "user123"
    }
  });

  console.log('Sentiment:', analysis.sentiment);
  console.log('Intent:', analysis.intent);
  console.log('Suggested template:', analysis.suggested_templates[0].name);
}

// Generate and post reply
async function replyToComment(commentId) {
  // Generate reply
  const reply = await client.replies.generate({
    commentId: commentId,
    templateId: 'template_pricing_001',
    variables: {
      product_name: 'Pro Package',
      price: '$99/month'
    },
    tone: 'friendly'
  });

  console.log('Generated reply:', reply.content);

  // Post reply
  const posted = await client.replies.post({
    commentId: commentId,
    replyId: reply.reply_id,
    platform: 'youtube'
  });

  console.log('Reply posted:', posted.platform_reply_id);
}

// Setup webhook
async function setupWebhook() {
  const webhook = await client.webhooks.create({
    url: 'https://myapp.com/webhook',
    events: ['comment.received', 'comment.processed'],
    secret: process.env.WEBHOOK_SECRET
  });

  console.log('Webhook created:', webhook.webhook_id);
}

// Get analytics
async function getAnalytics() {
  const analytics = await client.analytics.get({
    startDate: '2026-02-01',
    endDate: '2026-02-07',
    platform: 'youtube'
  });

  console.log('Total comments:', analytics.summary.total_comments_processed);
  console.log('Reply rate:', analytics.summary.reply_rate);
}

processComment();
```

---

### Python

**Installation:**

```bash
pip install replyking-api
```

**Usage:**

```python
from replyking import ReplyKingAI
import os

# Initialize client
client = ReplyKingAI(api_key=os.environ.get('REPLYKING_API_KEY'))

# Process comment
def process_comment():
    analysis = client.comments.process(
        content="How much does this cost?",
        platform="youtube",
        author={
            "id": "UC123456",
            "username": "user123"
        }
    )
    
    print(f"Sentiment: {analysis['sentiment']}")
    print(f"Intent: {analysis['intent']}")
    print(f"Suggested: {analysis['suggested_templates'][0]['name']}")

# Generate and post reply
def reply_to_comment(comment_id):
    # Generate reply
    reply = client.replies.generate(
        comment_id=comment_id,
        template_id='template_pricing_001',
        variables={
            'product_name': 'Pro Package',
            'price': '$99/month'
        },
        tone='friendly'
    )
    
    print(f"Generated: {reply['content']}")
    
    # Post reply
    posted = client.replies.post(
        comment_id=comment_id,
        reply_id=reply['reply_id'],
        platform='youtube'
    )
    
    print(f"Posted: {posted['platform_reply_id']}")

# Create template
def create_template():
    template = client.templates.create(
        name="Shipping Inquiry",
        content="Hi {{author_name}}! We ship worldwide, typically 3-5 business days. {{#if country}}To {{country}}, it takes about {{shipping_time}}.{{/if}}",
        category="logistics",
        triggers=["shipping", "delivery", "ship to"],
        intent_match=["inquiry"],
        platforms=["instagram", "facebook"]
    )
    
    print(f"Template created: {template['template_id']}")

# Get analytics
def get_analytics():
    analytics = client.analytics.get(
        start_date='2026-02-01',
        end_date='2026-02-07',
        platform='youtube'
    )
    
    print(f"Comments processed: {analytics['summary']['total_comments_processed']}")
    print(f"Reply rate: {analytics['summary']['reply_rate']}")
    
    for template in analytics['template_performance']:
        print(f"{template['name']}: {template['usage_count']} uses, {template['avg_engagement']} engagement")

# Listen to webhooks (Flask example)
from flask import Flask, request
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook_handler():
    # Verify signature
    signature = request.headers.get('X-ReplyKing-Signature')
    timestamp = request.headers.get('X-ReplyKing-Timestamp')
    
    if not verify_webhook(request.data, signature, os.environ.get('WEBHOOK_SECRET'), timestamp):
        return 'Invalid signature', 401
    
    # Process event
    event = request.json
    
    if event['event'] == 'comment.received':
        comment = event['data']
        print(f"New comment: {comment['content']}")
        # Process and reply
        
    return 'OK', 200

def verify_webhook(payload, signature, secret, timestamp):
    expected = hmac.new(
        secret.encode(),
        f"{timestamp}.{payload.decode()}".encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)

if __name__ == '__main__':
    process_comment()
```

---

## Rate Limiting

**Limits by Plan:**

| Plan | Requests/Minute | Comments/Day | Templates |
|------|----------------|--------------|-----------|
| Free | 10 | 100 | 5 |
| Starter | 60 | 1,000 | 25 |
| Pro | 300 | 10,000 | 100 |
| Enterprise | Custom | Unlimited | Unlimited |

**Headers:**

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1707307200
```

---

## Support

- **Documentation:** https://docs.replyking.ai
- **API Status:** https://status.replyking.ai
- **Support Email:** api@replyking.ai
- **Community:** https://community.replyking.ai

---

**OpenAPI Specification:**

Download: [replyking-openapi.yaml](https://api.replyking.ai/openapi.yaml)

**Postman Collection:**

Import: [Download](https://api.replyking.ai/postman-collection.json)
