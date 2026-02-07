# Structured Data (JSON-LD) Schemas for MUIN

Structured data helps search engines understand your content and display rich results (knowledge panels, enhanced listings, etc.)

## Implementation

Add these `<script type="application/ld+json">` blocks to the `<head>` section of your HTML.

---

## 1. Organization Schema (MUIN)

Use this on the **main company page** (muin.company)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MUIN",
  "alternateName": "뮤인",
  "url": "https://muin.company",
  "logo": "https://muin.company/logo.png",
  "image": "https://muin.company/og-image.png",
  "description": "AI 도구를 만드는 스튜디오. 실무에 바로 쓰는 AI 서비스를 제공합니다.",
  "foundingDate": "2024",
  "slogan": "일하는 AI, 누리는 인간",
  "email": "contact@muin.company",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KR",
    "addressLocality": "Seoul"
  },
  "sameAs": [
    "https://twitter.com/muin_studio",
    "https://github.com/muin-company",
    "https://www.linkedin.com/company/muin"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "contact@muin.company",
    "availableLanguage": ["Korean", "English"]
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "검시AI",
        "url": "https://gumsi-ai.vercel.app"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "투자노트",
        "url": "https://tools.muin.company/investment-notes"
      }
    }
  ]
}
```

---

## 2. WebSite Schema

Use this on all main sites to enable **sitelinks search box** in Google

### For muin.company
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MUIN",
  "url": "https://muin.company",
  "description": "AI로 일하는 세상을 만듭니다",
  "publisher": {
    "@type": "Organization",
    "name": "MUIN",
    "logo": {
      "@type": "ImageObject",
      "url": "https://muin.company/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://muin.company/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": ["ko-KR", "en-US"]
}
```

### For tools.muin.company
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MUIN Tools",
  "url": "https://tools.muin.company",
  "description": "실무에 바로 쓰는 AI 도구 모음",
  "publisher": {
    "@type": "Organization",
    "name": "MUIN",
    "url": "https://muin.company"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://tools.muin.company/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": ["ko-KR", "en-US"]
}
```

### For gumsi-ai.vercel.app
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "검시AI",
  "alternateName": "Gumsi AI",
  "url": "https://gumsi-ai.vercel.app",
  "description": "부동산 실거래가 AI 분석 서비스",
  "publisher": {
    "@type": "Organization",
    "name": "MUIN",
    "url": "https://muin.company"
  },
  "inLanguage": "ko-KR"
}
```

---

## 3. SoftwareApplication Schema (For Tools)

### 검시AI (Gumsi AI)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "검시AI",
  "alternateName": "Gumsi AI",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Real Estate Analysis",
  "operatingSystem": "Web",
  "url": "https://gumsi-ai.vercel.app",
  "description": "AI가 부동산 실거래가를 분석해주는 서비스. 주소만 입력하면 시세, 거래 내역, 투자 인사이트를 제공합니다.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW",
    "availability": "https://schema.org/InStock"
  },
  "screenshot": "https://gumsi-ai.vercel.app/screenshot.png",
  "image": "https://gumsi-ai.vercel.app/og-image.png",
  "creator": {
    "@type": "Organization",
    "name": "MUIN",
    "url": "https://muin.company"
  },
  "datePublished": "2026-01-15",
  "softwareVersion": "1.0",
  "inLanguage": "ko-KR",
  "browserRequirements": "Requires JavaScript. Modern browser recommended.",
  "featureList": [
    "AI 부동산 분석",
    "실거래가 조회",
    "시세 추이 분석",
    "투자 인사이트 제공"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "120",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### 투자노트 (Investment Notes) - Template
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "투자노트",
  "alternateName": "Investment Notes",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "url": "https://tools.muin.company/investment-notes",
  "description": "AI로 투자 인사이트를 정리하고 분석하는 도구",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW",
    "availability": "https://schema.org/InStock"
  },
  "screenshot": "https://tools.muin.company/screenshots/investment-notes.png",
  "creator": {
    "@type": "Organization",
    "name": "MUIN",
    "url": "https://muin.company"
  },
  "datePublished": "2026-02-01",
  "softwareVersion": "1.0",
  "inLanguage": ["ko-KR", "en-US"],
  "featureList": [
    "투자 메모 정리",
    "AI 분석 및 인사이트",
    "포트폴리오 추적"
  ]
}
```

---

## 4. BreadcrumbList Schema

Use this for better navigation in search results

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://muin.company"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://muin.company/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "검시AI",
      "item": "https://muin.company/products/gumsi"
    }
  ]
}
```

---

## 5. FAQPage Schema (For FAQ Sections)

Displays rich snippets in Google search

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "검시AI는 무료인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 검시AI는 기본 기능을 무료로 제공합니다. 회원가입 없이 바로 사용할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "어떤 지역의 부동산 정보를 제공하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대한민국 전국의 아파트, 오피스텔, 단독/다가구 주택의 실거래가 정보를 제공합니다."
      }
    },
    {
      "@type": "Question",
      "name": "데이터는 얼마나 자주 업데이트되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "국토교통부 실거래가 공개시스템의 데이터를 기반으로 하며, 매일 업데이트됩니다."
      }
    }
  ]
}
```

---

## 6. Article Schema (For Blog Posts)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "AI로 부동산 투자 분석하는 법",
  "image": "https://muin.company/blog/real-estate-ai/cover.jpg",
  "author": {
    "@type": "Person",
    "name": "MUIN Team",
    "url": "https://muin.company/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MUIN",
    "logo": {
      "@type": "ImageObject",
      "url": "https://muin.company/logo.png"
    }
  },
  "datePublished": "2026-02-07",
  "dateModified": "2026-02-07",
  "description": "검시AI를 활용한 부동산 투자 분석 가이드",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://muin.company/blog/real-estate-ai-analysis"
  },
  "articleBody": "본문 내용...",
  "wordCount": 1500,
  "inLanguage": "ko-KR"
}
```

---

## 7. Product Schema (If Selling Premium Features)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "검시AI Pro",
  "image": "https://gumsi-ai.vercel.app/pro-features.png",
  "description": "검시AI의 프리미엄 기능. 더 상세한 분석과 투자 인사이트를 제공합니다.",
  "brand": {
    "@type": "Organization",
    "name": "MUIN"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://gumsi-ai.vercel.app/pricing",
    "priceCurrency": "KRW",
    "price": "9900",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "MUIN"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87"
  }
}
```

---

## 8. Review Schema (For Testimonials)

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "검시AI"
  },
  "author": {
    "@type": "Person",
    "name": "김철수"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "datePublished": "2026-02-01",
  "reviewBody": "부동산 투자할 때 정말 유용했어요. AI 분석이 생각보다 정확하고 사용하기도 편합니다!"
}
```

---

## Implementation Guide

### React/Next.js Component
```jsx
// components/StructuredData.js
export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage in page
import StructuredData from '@/components/StructuredData';

export default function GumsiAIPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "검시AI",
    // ... rest of schema
  };
  
  return (
    <>
      <StructuredData data={schema} />
      {/* Page content */}
    </>
  );
}
```

### Multiple Schemas on One Page
You can include multiple schemas by wrapping them in an array:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MUIN"
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MUIN",
    "url": "https://muin.company"
  }
]
```

---

## Testing & Validation

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Paste your URL or code
   - Check for errors and warnings

2. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Validates JSON-LD syntax

3. **Google Search Console**
   - Monitor "Enhancements" section
   - Check which rich results are active

4. **Structured Data Testing Tool** (deprecated but still useful)
   - https://search.google.com/structured-data/testing-tool

---

## Pro Tips

1. **Keep it updated** - When product info changes, update the schema
2. **Don't spam** - Only use relevant schemas, don't add fake reviews
3. **Image requirements** - Use high-quality images (min 1200px wide)
4. **Multiple languages** - Add `inLanguage` for i18n sites
5. **Local business** - If you have a physical office, use `LocalBusiness` schema

---

## Common Mistakes to Avoid

❌ **Don't:**
- Add fake reviews or ratings
- Use outdated schema types
- Include markup for content not visible on the page
- Copy-paste without updating URLs and data

✅ **Do:**
- Validate before deploying
- Update schemas when content changes
- Use specific schema types (SoftwareApplication > Thing)
- Match schema data with visible page content

---

## Resources

- Official Schema.org: https://schema.org/
- Google Search Central: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- JSON-LD Playground: https://json-ld.org/playground/
