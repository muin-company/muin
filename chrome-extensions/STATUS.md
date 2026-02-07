# MUIN Chrome Extensions - Status Report

**Report Date:** 2026-02-07  
**Report By:** MJ (COO Agent)

---

## Overview

MUIN currently has **3 Chrome extensions** in development. All extensions are built, functional, and have comprehensive documentation. One extension has been submitted to the Chrome Web Store.

---

## 1. MUIN Guard - AI 대화 보호

### Basic Info
- **Version:** 0.3.0
- **Status:** 🟡 **Pending Review** (Chrome Web Store)
- **Last Updated:** 2026-02-07

### Description
AI 대화를 로컬에서 안전하게 모니터링하고 위험을 탐지합니다. WebGPU LLM 기반 분석으로 ChatGPT, Claude, Gemini에서 프롬프트 인젝션, 데이터 유출, 악의적 출력을 실시간 탐지합니다.

### Supported Platforms
- ChatGPT (chat.openai.com, chatgpt.com)
- Claude (claude.ai)
- Gemini (gemini.google.com)

### Links
- **GitHub:** https://github.com/muin-company/muin (directory: projects/muin-guard)
- **Local Path:** ~/muin/projects/muin-guard
- **Distribution:** ~/muin/projects/muin-guard/dist/muin-guard-v0.3.0.zip

### Next Steps
- ⏳ Wait for Chrome Web Store review approval
- 📝 Prepare marketing materials (blog post, social media)
- 🎯 Plan launch announcement
- 📊 Set up usage analytics (privacy-respecting)
- 🐛 Monitor for user feedback and bug reports

---

## 2. Tab Bankruptcy

### Basic Info
- **Version:** 1.0.0
- **Status:** 🔴 **Not Submitted** (Development Complete)
- **Last Updated:** 2026-02-06

### Description
Declare tab bankruptcy - close all tabs older than X days, with the option to save them as bookmarks first. Helps manage tab overload by tracking tab age and enabling bulk operations.

### Key Features
- Badge counter showing old tabs
- Age grouping (1-3 days, 3-7 days, 7-14 days, etc.)
- Bulk close with optional bookmark backup
- Individual tab dismiss
- Configurable age threshold (3/7/14/30 days)

### Links
- **GitHub:** https://github.com/muin-company/tab-bankruptcy
- **Local Path:** ~/muin/projects/tab-bankruptcy

### Next Steps
- 📦 Create distribution package (zip file)
- 🚀 Submit to Chrome Web Store
- 📝 Create product page and screenshots
- 🎥 Record demo video (optional)
- 📢 Announce on Product Hunt after approval
- 🔗 Cross-promote with MUIN Guard

---

## 3. Copy as Markdown

### Basic Info
- **Version:** 1.0.0
- **Status:** 🔴 **Not Submitted** (Development Complete)
- **Last Updated:** 2026-02-06

### Description
Convert selected web content into clean, formatted markdown with a single click. Perfect for documentation, note-taking, and content aggregation from web sources.

### Key Features
- Right-click context menu: "Copy as Markdown"
- Keyboard shortcut: Cmd/Ctrl+Shift+M
- Supports headings, lists, tables, code blocks, links, images
- Configurable image and link inclusion
- Toast notifications for feedback

### Supported Elements
- Headings (H1-H6)
- Bold/italic/code
- Links and images
- Tables and lists
- Blockquotes and horizontal rules

### Links
- **GitHub:** https://github.com/muin-company/copy-as-markdown
- **Local Path:** ~/muin/projects/copy-as-markdown

### Next Steps
- 📦 Create distribution package (zip file)
- 🚀 Submit to Chrome Web Store
- 📝 Create product page and screenshots
- 🎯 Target audience: developers, writers, researchers
- 📢 Share on HackerNews, Reddit (r/productivity, r/chrome_extensions)
- 🔗 Cross-promote with Tab Bankruptcy

---

## Summary Statistics

| Extension | Version | Chrome Web Store | Local Path |
|-----------|---------|------------------|------------|
| MUIN Guard | 0.3.0 | 🟡 Pending Review | ~/muin/projects/muin-guard |
| Tab Bankruptcy | 1.0.0 | 🔴 Not Submitted | ~/muin/projects/tab-bankruptcy |
| Copy as Markdown | 1.0.0 | 🔴 Not Submitted | ~/muin/projects/copy-as-markdown |

---

## Recommended Action Plan

### Immediate (This Week)
1. ✅ **MUIN Guard** - Monitor Chrome Web Store review status
2. 📦 **Tab Bankruptcy** - Package for submission
3. 📦 **Copy as Markdown** - Package for submission

### Short-term (Next 2 Weeks)
4. 🚀 Submit Tab Bankruptcy and Copy as Markdown to Chrome Web Store
5. 📝 Prepare launch materials for all extensions
6. 📊 Set up landing pages on muin.company

### Medium-term (Next Month)
7. 📢 Coordinated launch announcements
8. 🎯 Community engagement (Product Hunt, Reddit, HackerNews)
9. 📈 Track adoption metrics
10. 🐛 Bug fixes and feature requests

---

## Notes

- All extensions are **Manifest V3** compliant (latest standard)
- All extensions are **privacy-first** (no data sent to external servers)
- All extensions have **comprehensive documentation** (README with examples)
- All extensions have **MIT license**
- All extensions are built with **vanilla JavaScript** (no framework dependencies)

---

**Status Legend:**
- 🟢 Published
- 🟡 Pending Review
- 🔴 Not Submitted
- ⚪ In Development

---

*Last Updated: 2026-02-07 19:34 KST*
