# Analytics Setup for muin.company

## Solution: hits.dwyl.com

**Date:** 2026-02-05  
**Status:** ✅ Implemented

### Why hits.dwyl.com?

We chose [hits.dwyl.com](https://hits.dwyl.com) as our analytics solution because it meets all requirements:

- ✅ **Zero cost** - Completely free, open-source
- ✅ **No signup required** - Just add an image tag
- ✅ **Privacy-friendly** - No cookies, no personal data tracking
- ✅ **GDPR compliant** - No cookie consent banner needed
- ✅ **Lightweight** - Simple image tag, no JavaScript required
- ✅ **Fast** - Doesn't slow down page load
- ✅ **Open source** - [GitHub repository](https://github.com/dwyl/hits)

### Implementation

Added a simple tracking pixel to all HTML pages:

```html
<img src="https://hits.dwyl.com/muin-company/{page-name}.svg?style=flat-square" alt="Hit counter" style="display:none;" />
```

### Pages Tracked

1. **Main site:** `https://hits.dwyl.com/muin-company/home.svg`
2. **Tools landing:** `https://hits.dwyl.com/muin-company/tools.svg`
3. **Cron Explain:** `https://hits.dwyl.com/muin-company/tools-cron-explain.svg`
4. **curl to Code:** `https://hits.dwyl.com/muin-company/tools-curl-to-code.svg`
5. **JSON to Types:** `https://hits.dwyl.com/muin-company/tools-json-to-types.svg`
6. **Paste Checker:** `https://hits.dwyl.com/muin-company/tools-paste-checker.svg`

### How to View Analytics

Visit any of the tracking URLs above in your browser to see the hit count badge and statistics.

For example:
- https://hits.dwyl.com/muin-company/home

This will show:
- Total hits
- Unique visitors
- Recent activity graph

### Technical Details

**How it works:**
- Each page load triggers a request to hits.dwyl.com
- The server records the hit (without cookies or personal data)
- Uses IP address + User-Agent for uniqueness detection
- Data stored in PostgreSQL database
- No client-side JavaScript required

**Privacy:**
- No cookies set
- No localStorage/sessionStorage used
- No cross-site tracking
- IP addresses hashed, not stored raw
- Complies with GDPR/CCPA

### Alternative Options Considered

1. **GoatCounter** - Great analytics dashboard, but requires signup
2. **Plausible/Umami** - Excellent, but costs money for hosted version
3. **Google Analytics** - Not privacy-friendly, requires cookie consent
4. **hits.seeyoufarm.com** - Similar to dwyl/hits but less elegant

### Upgrade Path

If we need more detailed analytics in the future:

1. **GoatCounter** (free, signup required)
   - Real-time dashboard
   - Referrer tracking
   - Browser/OS breakdown
   - Location data

2. **Self-hosted Plausible/Umami**
   - Full control over data
   - More features
   - Requires server setup

### Maintenance

**What to monitor:**
- Check hit counts weekly via the tracking URLs
- If a URL doesn't increment, investigate the img tag

**No maintenance required:**
- No API keys to rotate
- No accounts to manage
- No updates to install
- No servers to maintain

### Files Modified

```
/Users/mj/github/muin-company.github.io/
├── index.html                        ✅ Added tracking
├── tools/
│   ├── index.html                    ✅ Added tracking
│   ├── cron-explain/index.html       ✅ Added tracking
│   ├── curl-to-code/index.html       ✅ Added tracking
│   ├── json-to-types/index.html      ✅ Added tracking
│   └── paste-checker/index.html      ✅ Added tracking
```

### Commit Message

```
Add privacy-friendly analytics tracking to all pages

- Implemented hits.dwyl.com (zero-cost, no-signup solution)
- Added tracking pixel to 6 HTML pages
- GDPR compliant, no cookies, no personal data
- Lightweight, doesn't impact page load speed
- Documented setup in ~/muin/docs/analytics-setup.md
```

---

**Questions?** Contact MJ or check the [hits.dwyl.com docs](https://github.com/dwyl/hits)
