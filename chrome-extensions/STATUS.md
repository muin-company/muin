# Chrome Extension Store Submission - Status

**Date:** February 7, 2026  
**Task:** Prepare Tab Bankruptcy and Copy as Markdown for Chrome Web Store submission

---

## ✅ Completed

### Tab Bankruptcy
**Location:** `~/muin/projects/tab-bankruptcy/`

**Files Created:**
- ✅ `STORE_SUBMISSION.md` - Complete submission guide with:
  - Store listing (name, descriptions, category)
  - Screenshot specifications (5 detailed scenarios)
  - Privacy policy content
  - Permissions justifications
  - Complete submission checklist
  - Quick-start commands for ZIP creation
  
- ✅ `PRIVACY.md` - Privacy policy document ready for web hosting

**Git:**
- ✅ Committed and pushed to `https://github.com/muin-company/tab-bankruptcy`
- Commit: `70b5c6f` - "Add Chrome Web Store submission guide and privacy policy"

**Assets Status:**
- ✅ Icons ready (icon128.png exists and is proper size)
- ⏳ Screenshots need to be captured (detailed instructions provided)

---

### Copy as Markdown
**Location:** `~/muin/projects/copy-as-markdown/`

**Files Created:**
- ✅ `STORE_SUBMISSION.md` - Complete submission guide with:
  - Store listing (name, descriptions, category)
  - Screenshot specifications (5 detailed scenarios)
  - Privacy policy content
  - Permissions justifications
  - Complete submission checklist
  - Quick-start commands for ZIP creation
  
- ✅ `PRIVACY.md` - Privacy policy document ready for web hosting

**Git:**
- ✅ Committed and pushed to `https://github.com/muin-company/copy-as-markdown`
- Commit: `e2a6d93` - "Add Chrome Web Store submission guide and privacy policy"

**Assets Status:**
- ⚠️ **Icons need regeneration** (current files are 67-byte placeholders)
- ⏳ Screenshots need to be captured (detailed instructions provided)

---

## 📋 Next Steps

### Tab Bankruptcy - Ready for Submission
1. **Capture screenshots** following specifications in STORE_SUBMISSION.md:
   - Main popup with old tabs
   - Settings page
   - Badge counter
   - Bookmark organization (optional)
   - Before/after comparison (optional)

2. **Host privacy policy** at one of:
   - `https://muin.company/privacy/tab-bankruptcy`
   - GitHub Pages from `PRIVACY.md`
   - Any static hosting service

3. **Create ZIP file:**
   ```bash
   cd ~/muin/projects/tab-bankruptcy
   zip -r ../tab-bankruptcy-v1.0.0.zip . \
     -x "*.git*" -x "*node_modules*" -x "*.DS_Store" \
     -x "*STORE_SUBMISSION.md" -x "*TODO.md" -x "*TESTING.md" \
     -x "*PROJECT-SUMMARY.md" -x "docs/*"
   ```

4. **Submit** to Chrome Web Store Developer Dashboard

---

### Copy as Markdown - Needs Icon Fix First

⚠️ **CRITICAL: Fix icons before submission**

1. **Regenerate icons** from SVG:
   ```bash
   cd ~/muin/projects/copy-as-markdown/icons
   # Current icon files are 67-byte placeholders
   # Use icon.svg to generate proper PNGs
   # Ensure icon128.png is several KB (proper image), not 67 bytes
   ```

2. **Capture screenshots** following specifications in STORE_SUBMISSION.md:
   - Right-click context menu
   - Before/after conversion
   - Table conversion
   - Settings panel
   - Toast notification (optional)

3. **Host privacy policy** at one of:
   - `https://muin.company/privacy/copy-as-markdown`
   - GitHub Pages from `PRIVACY.md`
   - Any static hosting service

4. **Create ZIP file:**
   ```bash
   cd ~/muin/projects/copy-as-markdown
   zip -r ../copy-as-markdown-v1.0.0.zip . \
     -x "*.git*" -x "*node_modules*" -x "*.DS_Store" \
     -x "*STORE_SUBMISSION.md" -x "*BUILD_SUMMARY.md" \
     -x "*INSTALLATION.md" -x "*CONTRIBUTING.md" -x ".github/*"
   ```

5. **Submit** to Chrome Web Store Developer Dashboard

---

## 📝 Developer Account Requirements

**Chrome Web Store Developer Account:**
- URL: https://chrome.google.com/webstore/devconsole
- One-time fee: $5 (shared across all extensions)
- Required for both extensions

---

## 📊 Submission Content Summary

### Tab Bankruptcy

**Name:** Tab Bankruptcy  
**Category:** Productivity  
**Short Description:** Close all tabs older than X days, with option to save as bookmarks first. Reclaim your browser from tab overload. (119 chars)

**Key Features:**
- Badge counter showing old tab count
- Age grouping (1-3 days, 3-7 days, etc.)
- Bulk close with optional bookmarking
- Individual tab dismiss
- Configurable age threshold

**Permissions:** tabs, storage, bookmarks

---

### Copy as Markdown

**Name:** Copy as Markdown  
**Category:** Productivity  
**Short Description:** Convert web content to clean markdown with a right-click. Perfect for note-taking, documentation, and knowledge management. (129 chars)

**Key Features:**
- Right-click context menu
- Keyboard shortcut (Cmd/Ctrl+Shift+M)
- Smart HTML → Markdown conversion
- Supports headings, links, code, tables, lists
- Configurable (toggle images/links)

**Permissions:** contextMenus, activeTab, storage

---

## 📁 File Locations

**Tab Bankruptcy:**
- Repo: https://github.com/muin-company/tab-bankruptcy
- Submission guide: `~/muin/projects/tab-bankruptcy/STORE_SUBMISSION.md`
- Privacy policy: `~/muin/projects/tab-bankruptcy/PRIVACY.md`

**Copy as Markdown:**
- Repo: https://github.com/muin-company/copy-as-markdown
- Submission guide: `~/muin/projects/copy-as-markdown/STORE_SUBMISSION.md`
- Privacy policy: `~/muin/projects/copy-as-markdown/PRIVACY.md`

---

## ✅ Checklist for Final Submission

### Tab Bankruptcy
- [x] STORE_SUBMISSION.md created
- [x] PRIVACY.md created
- [x] Git committed and pushed
- [x] Icons verified (128x128 PNG ready)
- [ ] Screenshots captured
- [ ] Privacy policy hosted (URL ready)
- [ ] ZIP file created
- [ ] Chrome Web Store developer account ready
- [ ] Submitted for review

### Copy as Markdown
- [x] STORE_SUBMISSION.md created
- [x] PRIVACY.md created
- [x] Git committed and pushed
- [ ] **Icons regenerated** (CRITICAL)
- [ ] Screenshots captured
- [ ] Privacy policy hosted (URL ready)
- [ ] ZIP file created
- [ ] Chrome Web Store developer account ready
- [ ] Submitted for review

---

## 🎯 Estimated Time to Complete

**Tab Bankruptcy:**
- Screenshots: 30 min
- Privacy policy hosting: 10 min
- ZIP creation & submission: 20 min
- **Total:** ~1 hour

**Copy as Markdown:**
- Icon regeneration: 15 min (MUST DO FIRST)
- Screenshots: 30 min
- Privacy policy hosting: 10 min
- ZIP creation & submission: 20 min
- **Total:** ~1.25 hours

**Both extensions:** ~2.25 hours to complete and submit

---

**Status:** Ready for next steps. All documentation complete, git repos updated. Main blocker is capturing screenshots and (for Copy as Markdown) regenerating icons.
