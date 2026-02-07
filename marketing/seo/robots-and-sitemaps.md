# robots.txt & sitemap.xml Templates for MUIN Domains

## 1. muin.company

### robots.txt
```txt
# muin.company - Main company website
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Sitemap location
Sitemap: https://muin.company/sitemap.xml

# Crawl-delay for respectful crawling (optional)
# Crawl-delay: 1

# Block specific bots (if needed)
# User-agent: BadBot
# Disallow: /
```

### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>https://muin.company/</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://muin.company/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://muin.company/en/" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- English Homepage -->
  <url>
    <loc>https://muin.company/en/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://muin.company/en/" />
    <xhtml:link rel="alternate" hreflang="ko" href="https://muin.company/" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- About -->
  <url>
    <loc>https://muin.company/about</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://muin.company/about" />
    <xhtml:link rel="alternate" hreflang="en" href="https://muin.company/en/about" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Products -->
  <url>
    <loc>https://muin.company/products</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://muin.company/products" />
    <xhtml:link rel="alternate" hreflang="en" href="https://muin.company/en/products" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog -->
  <url>
    <loc>https://muin.company/blog</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contact -->
  <url>
    <loc>https://muin.company/contact</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>
```

### Dynamic Sitemap (Next.js)
```javascript
// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  const baseUrl = 'https://muin.company';
  
  // Fetch dynamic content (blogs, products, etc.)
  const posts = await fetchBlogPosts();
  const products = await fetchProducts();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static pages -->
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    
    <!-- Dynamic blog posts -->
    ${posts.map(post => `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${post.updatedAt}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    `).join('')}
    
    <!-- Dynamic products -->
    ${products.map(product => `
    <url>
      <loc>${baseUrl}/products/${product.slug}</loc>
      <lastmod>${product.updatedAt}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    `).join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {}
```

---

## 2. tools.muin.company

### robots.txt
```txt
# tools.muin.company - MUIN Tools Hub
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/auth/
Disallow: /api/internal/
Disallow: /_next/

# Allow specific API endpoints (if public)
Allow: /api/tools/

# Sitemap location
Sitemap: https://tools.muin.company/sitemap.xml

# Rate limiting for crawlers
Crawl-delay: 1
```

### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage / Tools Directory -->
  <url>
    <loc>https://tools.muin.company/</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://tools.muin.company/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://tools.muin.company/en/" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Individual Tools -->
  <url>
    <loc>https://tools.muin.company/gumsi</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://tools.muin.company/gumsi" />
    <xhtml:link rel="alternate" hreflang="en" href="https://tools.muin.company/en/gumsi" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://tools.muin.company/investment-notes</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://tools.muin.company/investment-notes" />
    <xhtml:link rel="alternate" hreflang="en" href="https://tools.muin.company/en/investment-notes" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Categories -->
  <url>
    <loc>https://tools.muin.company/category/ai</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://tools.muin.company/category/productivity</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>
```

---

## 3. gumsi-ai.vercel.app (검시AI)

### robots.txt
```txt
# gumsi-ai.vercel.app - 검시AI (Real Estate Analysis)
User-agent: *
Allow: /

# Disallow sensitive or functional pages
Disallow: /api/
Disallow: /_next/
Disallow: /results/  # If results contain sensitive data
Disallow: /admin/

# Allow specific API documentation (if public)
Allow: /api/docs

# Sitemap location
Sitemap: https://gumsi-ai.vercel.app/sitemap.xml

# Crawl-delay to prevent overload
Crawl-delay: 2
```

### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>https://gumsi-ai.vercel.app/</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://gumsi-ai.vercel.app/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://gumsi-ai.vercel.app/en/" />
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- How It Works -->
  <url>
    <loc>https://gumsi-ai.vercel.app/how-it-works</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Pricing -->
  <url>
    <loc>https://gumsi-ai.vercel.app/pricing</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- FAQ -->
  <url>
    <loc>https://gumsi-ai.vercel.app/faq</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Blog/Guides (if exists) -->
  <url>
    <loc>https://gumsi-ai.vercel.app/blog</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Regional landing pages (if targeting specific cities) -->
  <url>
    <loc>https://gumsi-ai.vercel.app/seoul</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://gumsi-ai.vercel.app/busan</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

---

## Advanced: Sitemap Index (For Large Sites)

If you have 1000+ URLs, split into multiple sitemaps:

### sitemap-index.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <sitemap>
    <loc>https://muin.company/sitemap-main.xml</loc>
    <lastmod>2026-02-07</lastmod>
  </sitemap>
  
  <sitemap>
    <loc>https://muin.company/sitemap-blog.xml</loc>
    <lastmod>2026-02-07</lastmod>
  </sitemap>
  
  <sitemap>
    <loc>https://muin.company/sitemap-products.xml</loc>
    <lastmod>2026-02-07</lastmod>
  </sitemap>

</sitemapindex>
```

Then update `robots.txt`:
```txt
Sitemap: https://muin.company/sitemap-index.xml
```

---

## Implementation Checklist

### 1. Create Files
- [ ] Add `robots.txt` to `/public/` directory
- [ ] Add `sitemap.xml` to `/public/` (static) or create dynamic endpoint

### 2. Verify Files
- [ ] Visit `https://yourdomain.com/robots.txt`
- [ ] Visit `https://yourdomain.com/sitemap.xml`
- [ ] Check for proper XML formatting (no errors)

### 3. Submit to Search Engines
- [ ] Google Search Console → Sitemaps → Add sitemap URL
- [ ] Bing Webmaster Tools → Sitemaps → Submit sitemap
- [ ] Naver Search Advisor (for Korean sites)

### 4. Monitor & Update
- [ ] Update `lastmod` when pages change
- [ ] Regenerate sitemap when adding new pages
- [ ] Check Google Search Console for indexing status
- [ ] Fix any errors reported by search engines

---

## Automation Tips

### Auto-generate sitemap on build (Next.js)
```json
// package.json
{
  "scripts": {
    "postbuild": "node scripts/generate-sitemap.js"
  }
}
```

### scripts/generate-sitemap.js
```javascript
const fs = require('fs');
const globby = require('globby');

(async () => {
  const pages = await globby([
    'pages/**/*.js',
    '!pages/_*.js',
    '!pages/api',
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => {
      const path = page
        .replace('pages', '')
        .replace('.js', '')
        .replace('/index', '');
      const route = path === '' ? '' : path;
      
      return `
        <url>
          <loc>https://muin.company${route}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
        </url>
      `;
    }).join('')}
  </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
```

---

## Testing

1. **robots.txt validator:** https://support.google.com/webmasters/answer/6062598
2. **Sitemap validator:** https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. **Google Search Console:** Best way to verify crawling

**Pro Tip:** Always test in Google Search Console's URL Inspection tool before going live!
