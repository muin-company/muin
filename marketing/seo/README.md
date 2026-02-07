# MUIN SEO Optimization Package

Complete SEO toolkit for all MUIN products. Everything you need to launch with strong search visibility.

**Created:** 2026-02-07  
**Last Updated:** 2026-02-07

---

## 📦 What's Included

### 1. [Meta Tags Templates](./seo-meta-templates.md)
Complete HTML meta tags for all MUIN products:
- **Products covered:** muin.company, tools.muin.company, gumsi-ai.vercel.app
- **Languages:** Korean + English
- **Includes:** Title tags, descriptions, OG tags, Twitter Cards
- **React/Next.js components** included

### 2. [Robots & Sitemaps](./robots-and-sitemaps.md)
robots.txt and sitemap.xml templates for all domains:
- Static and dynamic sitemap examples
- Next.js implementation guides
- Sitemap index for large sites
- Best practices for each MUIN domain

### 3. [Structured Data Schemas](./structured-data-schemas.md)
JSON-LD schemas for rich search results:
- **Organization schema** (MUIN company)
- **WebSite schema** (all sites)
- **SoftwareApplication schema** (for tools)
- **FAQPage, Article, Product schemas**
- Implementation examples for React/Next.js

### 4. [SEO Launch Checklist](./seo-launch-checklist.md)
Step-by-step guide for launching new products:
- **Pre-launch:** Technical setup, content prep, analytics
- **Launch day:** Go-live checklist, submissions
- **Post-launch:** Monitoring, optimization, growth
- **Core Web Vitals targets** and tools
- Monthly maintenance schedule

---

## 🚀 Quick Start Guide

### For New Product Launch

1. **Read the launch checklist first** → [seo-launch-checklist.md](./seo-launch-checklist.md)
2. Copy meta tags template → [seo-meta-templates.md](./seo-meta-templates.md)
3. Create robots.txt and sitemap → [robots-and-sitemaps.md](./robots-and-sitemaps.md)
4. Add structured data → [structured-data-schemas.md](./structured-data-schemas.md)
5. Follow the launch checklist step-by-step

### For Existing Product

1. Audit current SEO using [seo-launch-checklist.md](./seo-launch-checklist.md)
2. Update meta tags if needed
3. Verify robots.txt and sitemap are correct
4. Add missing structured data
5. Monitor and improve based on analytics

---

## 🎯 Key Principles

### 1. User-First, SEO-Second
- Write for humans, optimize for search engines
- Clear value proposition above the fold
- Fast, mobile-friendly, accessible

### 2. Bilingual by Default
- Always create Korean + English versions
- Use proper hreflang tags
- Native writing, not machine translation

### 3. Technical Excellence
- Core Web Vitals in green zone
- Structured data on all pages
- Clean, semantic HTML
- Fast load times (< 2s LCP)

### 4. Consistent Updates
- Monthly SEO maintenance
- Fresh content regularly
- Monitor Search Console
- Fix issues promptly

---

## 📊 Success Metrics

Track these monthly in Google Search Console + GA4:

| Metric | Target | Tool |
|--------|--------|------|
| Organic Traffic | Growing month-over-month | GA4 |
| Average Position | Top 10 for primary keywords | Search Console |
| Click-Through Rate | > 3% | Search Console |
| Core Web Vitals | All green | Search Console |
| Indexed Pages | 100% of sitemap | Search Console |
| Mobile Usability | 0 errors | Search Console |

---

## 🛠️ Essential Tools Setup

### Must-Have (Free)
- [ ] **Google Analytics 4** - Traffic & user behavior
- [ ] **Google Search Console** - Search performance
- [ ] **Google PageSpeed Insights** - Performance monitoring
- [ ] **Naver Search Advisor** (Korean market)

### Recommended (Paid)
- [ ] **Ahrefs** or **SEMrush** - Keyword research, backlinks
- [ ] **Screaming Frog** - Site audits (free tier available)

### Development Tools
- [ ] **next-sitemap** - Auto-generate sitemaps (Next.js)
- [ ] **next-seo** - SEO meta tags (Next.js)
- [ ] **react-helmet** - Dynamic meta tags (React)

---

## 📁 File Structure

```
~/muin/marketing/seo/
├── README.md                      ← You are here
├── seo-meta-templates.md          ← HTML meta tags for all products
├── robots-and-sitemaps.md         ← robots.txt & sitemap.xml templates
├── structured-data-schemas.md     ← JSON-LD schemas
└── seo-launch-checklist.md        ← Complete launch guide
```

---

## 🔄 Maintenance Schedule

### Daily (Automated)
- Monitor GA4 for traffic anomalies
- Check for server errors

### Weekly
- Review Search Console performance
- Check for crawl errors
- Monitor Core Web Vitals

### Monthly
- Full SEO audit using checklist
- Update sitemaps if needed
- Refresh meta descriptions for low-CTR pages
- Publish new content

### Quarterly
- Comprehensive site audit
- Keyword research refresh
- Competitor analysis
- Update schemas if product changed

---

## 🎓 Learning Resources

- **Official Google SEO Guide:** https://developers.google.com/search/docs
- **Schema.org Documentation:** https://schema.org/docs/full.html
- **Web.dev (Performance):** https://web.dev/learn-core-web-vitals/
- **Ahrefs Blog:** https://ahrefs.com/blog/
- **Naver SEO Guide (KR):** https://searchadvisor.naver.com/guide

---

## 📝 How to Use This Package

### Scenario 1: Launching 검시AI
1. Open [seo-launch-checklist.md](./seo-launch-checklist.md) → Follow pre-launch steps
2. Copy meta tags from [seo-meta-templates.md](./seo-meta-templates.md) → "검시AI" section
3. Create `robots.txt` and `sitemap.xml` using [robots-and-sitemaps.md](./robots-and-sitemaps.md)
4. Add SoftwareApplication schema from [structured-data-schemas.md](./structured-data-schemas.md)
5. Launch and follow post-launch checklist

### Scenario 2: Adding New Tool to tools.muin.company
1. Create new product page
2. Copy and customize meta tags template
3. Update sitemap to include new page
4. Add SoftwareApplication schema for the tool
5. Submit updated sitemap to Search Console

### Scenario 3: Improving Existing Product SEO
1. Run audit using [seo-launch-checklist.md](./seo-launch-checklist.md)
2. Compare current setup vs. templates
3. Identify gaps (missing schemas, poor meta tags, etc.)
4. Implement fixes
5. Monitor improvements in Search Console

---

## 🚨 Common Issues & Fixes

### Issue: Pages not indexed
- **Check:** robots.txt not blocking? Sitemap submitted?
- **Fix:** Submit URL in Search Console, verify sitemap

### Issue: Low CTR in search results
- **Check:** Meta descriptions compelling? Title tags clear?
- **Fix:** Update meta tags, test variations

### Issue: Poor Core Web Vitals
- **Check:** Images optimized? JavaScript minimized?
- **Fix:** Use WebP images, lazy loading, code splitting

### Issue: Duplicate content
- **Check:** Canonical tags set? Same content on multiple URLs?
- **Fix:** Set canonical URLs, redirect duplicates

---

## 🎯 Next Steps

1. **For MJ/ONE:** Review this package and approve for use
2. **For new products:** Follow launch checklist before going live
3. **For existing products:** Audit and implement improvements
4. **Document learnings:** Update this package based on what works

---

## 📞 Questions?

This package is maintained by MJ (COO). For updates or questions:
- Update this repo directly
- Reference official Google documentation
- Track performance in Search Console

---

**Remember:** SEO is not a one-time task. It's an ongoing process of creating value, measuring results, and iterating. Use this package as a foundation, then build on it! 🚀

---

**Last updated:** 2026-02-07  
**Next review:** 2026-03-07
