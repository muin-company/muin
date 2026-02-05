# MUIN Guard DNS Setup Instructions

## Overview
This document contains DNS configuration instructions for pointing `guard.muin.company` to GitHub Pages.

## DNS Records to Add

Add the following DNS records in your DNS provider (e.g., Cloudflare, Route53, etc.):

### A Records
Add **four** A records for `guard.muin.company` pointing to GitHub Pages IPs:

```
Type: A
Name: guard
Value: 185.199.108.153
TTL: Auto or 3600

Type: A
Name: guard
Value: 185.199.109.153
TTL: Auto or 3600

Type: A
Name: guard
Value: 185.199.110.153
TTL: Auto or 3600

Type: A
Name: guard
Value: 185.199.111.153
TTL: Auto or 3600
```

### AAAA Records (IPv6, Optional but Recommended)
Add **four** AAAA records for IPv6 support:

```
Type: AAAA
Name: guard
Value: 2606:50c0:8000::153
TTL: Auto or 3600

Type: AAAA
Name: guard
Value: 2606:50c0:8001::153
TTL: Auto or 3600

Type: AAAA
Name: guard
Value: 2606:50c0:8002::153
TTL: Auto or 3600

Type: AAAA
Name: guard
Value: 2606:50c0:8003::153
TTL: Auto or 3600
```

## Verification

After adding DNS records:

1. **Wait for DNS propagation** (usually 5-60 minutes, can take up to 24 hours)
2. **Check DNS resolution:**
   ```bash
   dig guard.muin.company
   # Should return the four GitHub Pages IPs
   ```
3. **Enable GitHub Pages** in the repository settings:
   - Go to https://github.com/muin-company/guard/settings/pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Click Save
4. **Verify HTTPS:**
   - GitHub will automatically provision an SSL certificate
   - This may take 10-15 minutes after DNS propagates
   - Check "Enforce HTTPS" once the certificate is ready

## Repository Setup

The repository is located at:
- **GitHub:** https://github.com/muin-company/guard
- **Local:** /Users/mj/github/guard

The CNAME file in the repository root contains `guard.muin.company` which tells GitHub Pages what custom domain to use.

## Troubleshooting

### DNS not resolving
- Verify DNS records are added correctly
- Check TTL and wait for propagation
- Use `dig guard.muin.company` or online DNS checkers

### HTTPS certificate not working
- Ensure DNS is fully propagated first
- Remove and re-add the custom domain in GitHub Pages settings
- Wait 10-15 minutes for certificate provisioning

### 404 errors
- Verify GitHub Pages is enabled
- Check that the main branch has index.html
- Ensure CNAME file exists in repository root

## Current Status

- ✅ Landing page built at /Users/mj/github/guard
- ✅ CNAME file created (guard.muin.company)
- ⏳ Repository needs to be created on GitHub
- ⏳ DNS records need to be added
- ⏳ GitHub Pages needs to be enabled

## Next Steps for ONE

1. Create the GitHub repository:
   ```bash
   gh repo create muin-company/guard --public --source=/Users/mj/github/guard --push
   ```

2. Add DNS records as documented above

3. Enable GitHub Pages in repository settings

4. Wait for DNS propagation and HTTPS certificate

5. Visit https://guard.muin.company to verify

---

Created: 2026-02-06
Updated: 2026-02-06
