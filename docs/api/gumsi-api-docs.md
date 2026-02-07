# 검시AI API Documentation

**Version:** 1.0.0  
**Base URL:** `https://api.gumsi.ai/v1`  
**Last Updated:** 2026-02-07

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [API Endpoints](#api-endpoints)
- [Error Codes](#error-codes)
- [SDK Examples](#sdk-examples)

---

## Overview

검시AI provides intelligent inspection and analysis capabilities through a RESTful API. This API allows you to submit images, documents, and data for automated inspection, quality control, and anomaly detection.

### Key Features

- Image-based inspection and defect detection
- Document analysis and compliance checking
- Real-time inference with low latency
- Batch processing for large-scale operations
- Customizable inspection models

---

## Authentication

All API requests require authentication using API keys or OAuth 2.0.

### API Key Authentication

Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

**Obtaining an API Key:**

1. Sign up at [https://gumsi.ai/signup](https://gumsi.ai/signup)
2. Navigate to Dashboard → API Keys
3. Generate a new key with appropriate permissions

**Security Best Practices:**
- Never commit API keys to version control
- Rotate keys every 90 days
- Use environment variables for key storage
- Limit key permissions to minimum required scope

### OAuth 2.0 Authentication

For user-delegated access, use OAuth 2.0 authorization flow.

**Authorization Endpoint:**
```
https://auth.gumsi.ai/oauth/authorize
```

**Token Endpoint:**
```
https://auth.gumsi.ai/oauth/token
```

**Supported Grant Types:**
- `authorization_code`
- `client_credentials`
- `refresh_token`

**Example Token Request:**

```bash
curl -X POST https://auth.gumsi.ai/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}
```

---

## Rate Limiting

API requests are rate-limited to ensure service quality and fair usage.

**Limits by Tier:**

| Plan | Requests/Minute | Requests/Day | Concurrent Requests |
|------|----------------|--------------|---------------------|
| Free | 10 | 1,000 | 2 |
| Starter | 60 | 10,000 | 5 |
| Pro | 300 | 100,000 | 20 |
| Enterprise | Custom | Custom | Custom |

**Rate Limit Headers:**

All responses include rate limit information:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1707307200
```

**Rate Limit Exceeded Response:**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 30 seconds.",
    "retry_after": 30
  }
}
```

---

## API Endpoints

### 1. Analyze Image

Analyze an image for defects, quality issues, or specific patterns.

**Endpoint:** `POST /analyze/image`

**Request:**

```http
POST /v1/analyze/image
Host: api.gumsi.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: multipart/form-data

{
  "image": <binary_file>,
  "model": "defect-detection-v2",
  "threshold": 0.85,
  "return_annotations": true
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | file | Yes | Image file (JPEG, PNG, WebP) |
| `model` | string | No | Model ID (default: latest) |
| `threshold` | float | No | Confidence threshold (0.0-1.0, default: 0.8) |
| `return_annotations` | boolean | No | Include bounding boxes (default: false) |
| `metadata` | object | No | Custom metadata to attach |

**Response (200 OK):**

```json
{
  "request_id": "req_abc123",
  "status": "completed",
  "results": {
    "defects_found": 2,
    "overall_quality": "medium",
    "confidence": 0.92,
    "detections": [
      {
        "class": "scratch",
        "confidence": 0.95,
        "bounding_box": {
          "x": 120,
          "y": 340,
          "width": 45,
          "height": 12
        }
      },
      {
        "class": "dent",
        "confidence": 0.89,
        "bounding_box": {
          "x": 450,
          "y": 120,
          "width": 78,
          "height": 65
        }
      }
    ]
  },
  "processing_time_ms": 342,
  "credits_used": 1
}
```

---

### 2. Batch Analysis

Submit multiple images for batch processing.

**Endpoint:** `POST /analyze/batch`

**Request:**

```http
POST /v1/analyze/batch
Host: api.gumsi.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "images": [
    {
      "url": "https://example.com/image1.jpg",
      "id": "img_001"
    },
    {
      "url": "https://example.com/image2.jpg",
      "id": "img_002"
    }
  ],
  "model": "defect-detection-v2",
  "callback_url": "https://your-app.com/webhooks/analysis"
}
```

**Response (202 Accepted):**

```json
{
  "batch_id": "batch_xyz789",
  "status": "processing",
  "total_images": 2,
  "estimated_completion": "2026-02-07T10:15:30Z"
}
```

---

### 3. Get Analysis Result

Retrieve results for a specific analysis request.

**Endpoint:** `GET /analyze/{request_id}`

**Request:**

```http
GET /v1/analyze/req_abc123
Host: api.gumsi.ai
Authorization: Bearer YOUR_API_KEY
```

**Response (200 OK):**

```json
{
  "request_id": "req_abc123",
  "status": "completed",
  "created_at": "2026-02-07T09:30:00Z",
  "completed_at": "2026-02-07T09:30:05Z",
  "results": {
    "defects_found": 2,
    "overall_quality": "medium",
    "confidence": 0.92
  }
}
```

---

### 4. List Models

Get available inspection models.

**Endpoint:** `GET /models`

**Request:**

```http
GET /v1/models
Host: api.gumsi.ai
Authorization: Bearer YOUR_API_KEY
```

**Response (200 OK):**

```json
{
  "models": [
    {
      "id": "defect-detection-v2",
      "name": "Defect Detection v2",
      "description": "General-purpose defect detection for manufacturing",
      "version": "2.1.0",
      "categories": ["scratch", "dent", "crack", "discoloration"],
      "status": "active"
    },
    {
      "id": "surface-inspection-v1",
      "name": "Surface Quality Inspector",
      "description": "Specialized surface quality analysis",
      "version": "1.5.2",
      "categories": ["roughness", "finish", "texture"],
      "status": "active"
    }
  ]
}
```

---

### 5. Create Custom Model

Train a custom inspection model with your data.

**Endpoint:** `POST /models/custom`

**Request:**

```http
POST /v1/models/custom
Host: api.gumsi.ai
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "name": "PCB Defect Detection",
  "base_model": "defect-detection-v2",
  "training_data_url": "https://storage.example.com/training-data.zip",
  "labels": ["solder_bridge", "missing_component", "oxidation"],
  "epochs": 50,
  "validation_split": 0.2
}
```

**Response (201 Created):**

```json
{
  "model_id": "custom_model_123",
  "status": "training",
  "estimated_completion": "2026-02-08T15:00:00Z",
  "training_job_id": "job_456"
}
```

---

### 6. Get Account Usage

Retrieve API usage and credits information.

**Endpoint:** `GET /account/usage`

**Request:**

```http
GET /v1/account/usage?start_date=2026-02-01&end_date=2026-02-07
Host: api.gumsi.ai
Authorization: Bearer YOUR_API_KEY
```

**Response (200 OK):**

```json
{
  "period": {
    "start": "2026-02-01T00:00:00Z",
    "end": "2026-02-07T23:59:59Z"
  },
  "usage": {
    "total_requests": 1547,
    "successful_requests": 1523,
    "failed_requests": 24,
    "credits_used": 1547,
    "credits_remaining": 8453
  },
  "breakdown_by_model": {
    "defect-detection-v2": 1200,
    "surface-inspection-v1": 347
  }
}
```

---

## Error Codes

All errors follow a consistent format:

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

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 202 | Accepted (async processing) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 413 | Payload Too Large |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

### Error Codes

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `INVALID_API_KEY` | 401 | API key is invalid or expired | Check your API key or generate a new one |
| `INSUFFICIENT_CREDITS` | 402 | Not enough credits to process request | Purchase additional credits |
| `INVALID_IMAGE_FORMAT` | 400 | Unsupported image format | Use JPEG, PNG, or WebP |
| `IMAGE_TOO_LARGE` | 413 | Image exceeds size limit (10MB) | Resize or compress the image |
| `MODEL_NOT_FOUND` | 404 | Specified model doesn't exist | Check available models via `/models` |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Wait and retry after rate limit reset |
| `PROCESSING_FAILED` | 500 | Analysis processing failed | Retry or contact support |
| `INVALID_THRESHOLD` | 400 | Threshold must be between 0.0 and 1.0 | Adjust threshold value |
| `BATCH_TOO_LARGE` | 400 | Batch exceeds maximum size (100 images) | Split into smaller batches |

**Example Error Response:**

```json
{
  "error": {
    "code": "INVALID_IMAGE_FORMAT",
    "message": "Image format not supported. Please use JPEG, PNG, or WebP.",
    "details": {
      "received_format": "bmp",
      "supported_formats": ["jpeg", "png", "webp"]
    },
    "request_id": "req_xyz789"
  }
}
```

---

## SDK Examples

### JavaScript/Node.js

**Installation:**

```bash
npm install @gumsi/api-client
```

**Usage:**

```javascript
const GumsiAI = require('@gumsi/api-client');

// Initialize client
const client = new GumsiAI({
  apiKey: process.env.GUMSI_API_KEY
});

// Analyze an image
async function analyzeImage() {
  try {
    const result = await client.analyze.image({
      imagePath: './product-photo.jpg',
      model: 'defect-detection-v2',
      threshold: 0.85,
      returnAnnotations: true
    });

    console.log('Defects found:', result.defects_found);
    console.log('Confidence:', result.confidence);
    console.log('Detections:', result.detections);
  } catch (error) {
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.log('Rate limit exceeded. Retry after:', error.retry_after);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Batch analysis
async function batchAnalysis() {
  const batch = await client.analyze.batch({
    images: [
      { url: 'https://example.com/img1.jpg', id: 'img_001' },
      { url: 'https://example.com/img2.jpg', id: 'img_002' }
    ],
    model: 'defect-detection-v2',
    callbackUrl: 'https://myapp.com/webhook'
  });

  console.log('Batch ID:', batch.batch_id);
  
  // Poll for results
  const results = await client.analyze.getBatch(batch.batch_id);
  console.log('Status:', results.status);
}

// List available models
async function listModels() {
  const models = await client.models.list();
  models.forEach(model => {
    console.log(`${model.name} (${model.id}): ${model.description}`);
  });
}

analyzeImage();
```

---

### Python

**Installation:**

```bash
pip install gumsi-api
```

**Usage:**

```python
from gumsi import GumsiAI
import os

# Initialize client
client = GumsiAI(api_key=os.environ.get('GUMSI_API_KEY'))

# Analyze an image
def analyze_image():
    try:
        with open('product-photo.jpg', 'rb') as image_file:
            result = client.analyze.image(
                image=image_file,
                model='defect-detection-v2',
                threshold=0.85,
                return_annotations=True
            )
        
        print(f"Defects found: {result['defects_found']}")
        print(f"Confidence: {result['confidence']}")
        
        for detection in result['detections']:
            print(f"- {detection['class']}: {detection['confidence']:.2f}")
            
    except client.RateLimitError as e:
        print(f"Rate limit exceeded. Retry after {e.retry_after} seconds")
    except client.APIError as e:
        print(f"API Error: {e.message}")

# Batch analysis
def batch_analysis():
    batch = client.analyze.batch(
        images=[
            {'url': 'https://example.com/img1.jpg', 'id': 'img_001'},
            {'url': 'https://example.com/img2.jpg', 'id': 'img_002'}
        ],
        model='defect-detection-v2',
        callback_url='https://myapp.com/webhook'
    )
    
    print(f"Batch ID: {batch['batch_id']}")
    
    # Wait for completion
    results = client.analyze.wait_for_batch(batch['batch_id'], timeout=300)
    print(f"Status: {results['status']}")

# List models
def list_models():
    models = client.models.list()
    for model in models:
        print(f"{model['name']} ({model['id']}): {model['description']}")

# Stream results for real-time processing
def stream_analysis():
    with client.analyze.stream() as stream:
        for image_path in ['img1.jpg', 'img2.jpg', 'img3.jpg']:
            with open(image_path, 'rb') as img:
                result = stream.analyze(img)
                print(f"{image_path}: {result['defects_found']} defects")

if __name__ == '__main__':
    analyze_image()
```

**Error Handling:**

```python
from gumsi import GumsiAI, APIError, RateLimitError, AuthenticationError

client = GumsiAI(api_key=os.environ.get('GUMSI_API_KEY'))

try:
    result = client.analyze.image(image=open('test.jpg', 'rb'))
except AuthenticationError:
    print("Invalid API key")
except RateLimitError as e:
    print(f"Rate limit exceeded. Retry after {e.retry_after}s")
except APIError as e:
    print(f"API error: {e.code} - {e.message}")
```

---

## Webhooks

For asynchronous operations (batch processing, model training), 검시AI can send results to your webhook endpoint.

**Webhook Payload Example:**

```json
{
  "event": "analysis.completed",
  "timestamp": "2026-02-07T10:15:30Z",
  "data": {
    "request_id": "req_abc123",
    "batch_id": "batch_xyz789",
    "status": "completed",
    "results": {
      "defects_found": 2,
      "confidence": 0.92
    }
  }
}
```

**Webhook Security:**

All webhook requests include a signature header:

```http
X-Gumsi-Signature: sha256=abc123...
```

Verify the signature using your webhook secret:

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

---

## Support

- **Documentation:** https://docs.gumsi.ai
- **API Status:** https://status.gumsi.ai
- **Support Email:** api-support@gumsi.ai
- **Developer Forum:** https://community.gumsi.ai

---

**OpenAPI Specification:**

Download the full OpenAPI 3.0 spec: [gumsi-openapi.yaml](https://api.gumsi.ai/openapi.yaml)

**Postman Collection:**

Import our Postman collection: [Download](https://api.gumsi.ai/postman-collection.json)
