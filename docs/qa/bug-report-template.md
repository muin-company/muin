# Bug Report Template

Use this template when reporting bugs. The more detail you provide, the faster we can fix it!

---

## 🐛 Bug Report

**Title:** [Clear, concise description of the issue]

---

### 📌 Basic Information

**Reporter:** [Your name]  
**Date:** [YYYY-MM-DD]  
**Affected Version:** [e.g., v2.3.1, commit SHA, or "production"]  
**Environment:** [Production / Staging / Development / Local]  
**Priority:** [Critical / High / Medium / Low] (see severity guide below)  

---

### 📝 Description

**What happened?**  
[Clear description of the bug]

**What did you expect to happen?**  
[Expected behavior]

**Impact:**  
[Who is affected? How many users? Business impact?]

---

### 🔁 Steps to Reproduce

Please provide detailed steps so we can reproduce the issue:

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Reproducibility:**  
- [ ] Always (100%)
- [ ] Sometimes (< 100%, provide estimated %)
- [ ] Once (can't reproduce again)

---

### 💻 Environment Information

**Browser/Client:**
- Browser: [e.g., Chrome 120, Safari 17]
- OS: [e.g., macOS 14.2, Windows 11, iOS 17.1]
- Device: [e.g., MacBook Pro M3, iPhone 15, Desktop]
- Screen size: [e.g., 1920x1080, mobile 375x667]

**Backend/Server:**
- API Version: [e.g., v2.3.1]
- Database: [e.g., PostgreSQL 15.2]
- Region/Server: [e.g., US-East-1, eu-west-1]

**Network:**
- Connection: [WiFi / 4G / 5G / Ethernet]
- Speed: [if relevant, e.g., "slow 3G"]

**User Account:**
- User ID: [if applicable, redact if PII]
- Account Type: [e.g., Free, Pro, Enterprise]
- Session: [logged in / logged out]

---

### 📸 Evidence

**Screenshots/Screen Recording:**  
[Attach screenshots or link to video]

**Console Errors:**
```
[Paste browser console errors or server logs]
```

**Network Tab:**
```
[Paste failed requests, status codes, or upload HAR file]
```

**Error Message:**
```
[Exact error message shown to user]
```

---

### 🔍 Additional Context

**When did this start?**  
[e.g., "After deploying v2.3.0 on Feb 5", "Always been like this", "Intermittent since Jan"]

**Related Issues/PRs:**  
[Link to related bug reports, feature requests, or pull requests]

**Workaround:**  
[Is there a temporary workaround? If yes, describe it]

**Frequency:**  
[How often does this happen? Daily? Only under certain conditions?]

---

### 🏷️ Categorization

**Component:**  
[e.g., Authentication, Checkout, Dashboard, API, Database]

**Type:**  
- [ ] Functional (feature doesn't work)
- [ ] UI/UX (layout, design issue)
- [ ] Performance (slow, timeout)
- [ ] Security (vulnerability)
- [ ] Data (incorrect data, data loss)
- [ ] Compatibility (browser, device specific)

**Labels/Tags:**  
[e.g., `bug`, `frontend`, `critical`, `mobile`, `payment`]

---

## 🎯 Severity Levels Guide

### 🔴 Critical (P0)
**Impact:** System down, major functionality broken, data loss, security breach  
**Examples:**
- Cannot login (all users affected)
- Payment processing broken
- Database corruption
- Security vulnerability exposed
- Data loss

**SLA:** Fix within 4 hours

---

### 🟠 High (P1)
**Impact:** Major functionality broken for subset of users, serious workaround required  
**Examples:**
- Cannot checkout (affects paying customers)
- Key feature completely broken
- Performance severely degraded (>10s load time)
- Critical error for specific user segment

**SLA:** Fix within 24 hours

---

### 🟡 Medium (P2)
**Impact:** Feature partially broken, minor functionality impaired, workaround exists  
**Examples:**
- Search returns incorrect results
- UI element misaligned
- Non-critical feature broken
- Performance issue (3-10s load time)
- Email notifications delayed

**SLA:** Fix within 1 week

---

### 🟢 Low (P3)
**Impact:** Minor issue, cosmetic, no functional impact  
**Examples:**
- Typo in text
- Console warning (no user impact)
- Minor UI inconsistency
- Edge case bug affecting < 0.1% users

**SLA:** Fix when convenient (next sprint or later)

---

## 📋 Bug Report Examples

### Example 1: Critical Bug

**Title:** Payment processing fails for all Stripe transactions

**Reporter:** Jane Doe  
**Date:** 2026-02-07  
**Affected Version:** v2.5.0  
**Environment:** Production  
**Priority:** Critical

**Description:**  
All Stripe payment transactions are failing since the deployment of v2.5.0 at 14:30 UTC today. Users receive "Payment failed" error and orders are not created. Revenue stream is completely blocked.

**Impact:**  
All users attempting to make purchases. Estimated loss: $5,000/hour.

**Steps to Reproduce:**
1. Go to checkout page
2. Enter payment details (test card: 4242 4242 4242 4242)
3. Click "Pay Now"
4. Error appears: "Payment processing failed. Please try again."

**Reproducibility:** Always (100%)

**Environment:**
- Browser: Chrome 120, Safari 17 (both affected)
- OS: macOS, Windows, iOS (all affected)

**Console Errors:**
```
POST https://api.muin.app/checkout/charge 500 Internal Server Error
{
  "error": "stripe_api_version_mismatch",
  "message": "API version 2023-10-16 is not supported"
}
```

**Additional Context:**
- Started immediately after v2.5.0 deployment
- Related PR: #456 (updated Stripe SDK)
- Workaround: None available

**Component:** Payment Processing  
**Type:** Functional

---

### Example 2: Medium Bug

**Title:** User avatar not displaying on mobile Safari

**Reporter:** John Smith  
**Date:** 2026-02-07  
**Affected Version:** v2.4.8  
**Environment:** Production  
**Priority:** Medium

**Description:**  
User profile avatars are not loading on mobile Safari (iOS). A broken image icon is shown instead. Desktop browsers work fine.

**Impact:**  
iOS Safari users (~30% of mobile traffic). Affects user experience but not functionality.

**Steps to Reproduce:**
1. Open app on iPhone with Safari
2. Navigate to Profile page
3. Observe broken avatar image

**Reproducibility:** Always on iOS Safari, never on other browsers

**Environment:**
- Browser: Safari on iOS 17.1, 17.2
- Device: iPhone 13, iPhone 15 tested
- Screen size: Mobile portrait

**Screenshots:**
[Attached: broken-avatar-ios.png]

**Console Errors:**
```
Failed to load resource: The requested URL was not found on this server.
https://cdn.muin.app/avatars/user-123.webp
```

**Additional Context:**
- Works on Chrome iOS, Firefox, all desktop browsers
- Issue likely related to WebP format support or CORS
- Workaround: Use desktop browser

**Component:** User Profile  
**Type:** Compatibility

---

### Example 3: Low Bug

**Title:** Typo in confirmation email subject line

**Reporter:** QA Team  
**Date:** 2026-02-07  
**Affected Version:** v2.4.0  
**Environment:** All  
**Priority:** Low

**Description:**  
Order confirmation email has typo in subject line: "Your oder has been confirmed" (missing 'r' in "order").

**Impact:**  
Cosmetic issue, no functional impact. Slightly unprofessional.

**Steps to Reproduce:**
1. Place an order
2. Check email inbox
3. See typo in subject line

**Reproducibility:** Always

**Evidence:**
Subject line: `Your oder has been confirmed - MUIN` ❌  
Should be: `Your order has been confirmed - MUIN` ✅

**Additional Context:**
- Template file: `templates/emails/order-confirmation.html`
- Easy fix, single-word change

**Component:** Email  
**Type:** UI/UX

---

## 🛠️ For Developers: Bug Triage

When reviewing a bug report:

1. **Validate Severity**
   - [ ] Severity matches impact and urgency
   - [ ] SLA appropriate

2. **Can Reproduce?**
   - [ ] Yes → Assign to developer
   - [ ] No → Request more information
   - [ ] Partial → Add notes on what works/doesn't

3. **Assign Ownership**
   - [ ] Component owner identified
   - [ ] Added to sprint/backlog
   - [ ] Linked to relevant epic/story

4. **Root Cause Analysis** (after fix)
   - Why did this happen?
   - How did it pass testing?
   - What process changes prevent recurrence?

5. **Communication**
   - [ ] Reporter notified when fixed
   - [ ] Release notes include fix
   - [ ] Post-mortem if critical

---

## 📁 Where to Submit

**GitHub Issues:**  
Use this template in the issue description.

**Jira/Linear:**  
Fill in corresponding fields.

**Quick Bugs:**  
For urgent issues, also notify in:
- Slack: `#bugs` or `#engineering`
- Email: [email protected]

**Security Vulnerabilities:**  
**DO NOT file public issues.** Email [email protected] directly.

---

## ✅ Bug Report Checklist

Before submitting:
- [ ] Searched existing issues (no duplicate)
- [ ] Provided clear, actionable steps to reproduce
- [ ] Included environment details
- [ ] Attached screenshots/logs if applicable
- [ ] Assigned appropriate severity
- [ ] Tagged with relevant labels

---

## 🔗 Related Documents
- [Testing Strategy](./testing-strategy.md)
- [QA Checklists](./qa-checklists.md)

**Questions?** Contact QA Team or open a discussion in #engineering
