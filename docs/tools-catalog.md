# MUIN Developer Tools Catalog

**Last Updated:** 2026-02-07  
**Total Tools:** 24  
**Live Tools:** 20 ✅ | In Development: 4 ⏳

---

## Live Tools (tools.muin.company)

### CLI Tools (16)

| # | Tool | Description | Status | Links |
|---|------|-------------|--------|-------|
| 1 | **roast** | AI code reviewer with humor. Get brutally honest feedback about your code. | ✅ Live | [npm](https://www.npmjs.com/package/@muin/roast) • [GitHub](https://github.com/muin-company/roast) |
| 2 | **oops** | Error message resolver. Paste your error, get solutions. | ✅ Live | [npm](https://www.npmjs.com/package/@muin/oops) • [GitHub](https://github.com/muin-company/oops) |
| 3 | **cron-explain** | Cron expression converter. Translate cron syntax to human language. | ✅ Live | [npm](https://www.npmjs.com/package/@muin/cron-explain) • [GitHub](https://github.com/muin-company/cron-explain) • [Web](https://muin.company/tools/cron-explain/) |
| 4 | **git-why** | Git history explainer. Understand why a line of code exists. | ✅ Live | [npm](https://www.npmjs.com/package/@muin/git-why) • [GitHub](https://github.com/muin-company/git-why) |
| 5 | **portguard** | Port monitor and manager. See what's running where, kill processes by port. | ✅ Live | [npm](https://www.npmjs.com/package/@muin/portguard) • [GitHub](https://github.com/muin-company/portguard) |
| 6 | **readme-gen** | Auto-generate README files from your project structure. | ✅ Live | [npm](https://www.npmjs.com/package/readme-gen) • [GitHub](https://github.com/muin-company/readme-gen) |
| 7 | **depcheck-lite** | Find unused dependencies. Fast, lightweight, regex-based checker. | ✅ Live | [npm](https://www.npmjs.com/package/depcheck-lite) • [GitHub](https://github.com/muin-company/depcheck-lite) |
| 8 | **lockcheck** | Lockfile security scanner. Detect suspicious registries, missing hashes, duplicate versions. | ✅ Live | [npm](https://www.npmjs.com/package/lockcheck) • [GitHub](https://github.com/muin-company/lockcheck) |
| 9 | **bundlesize** | Bundle size monitor. Catch bundle bloat before it reaches production. | ✅ Live | [npm](https://www.npmjs.com/package/@muin/bundlesize) • [GitHub](https://github.com/muin-company/bundlesize) |
| 10 | **envdiff** | Compare .env files. Find missing variables before they break your deploy. | ✅ Live | [npm](https://www.npmjs.com/package/envdiff) • [GitHub](https://github.com/muin-company/envdiff) |
| 11 | **tsconfig-helper** | Understand, compare, and generate tsconfig.json files. | ✅ Live | [npm](https://www.npmjs.com/package/tsconfig-helper) • [GitHub](https://github.com/muin-company/tsconfig-helper) |
| 12 | **gitig** | Generate .gitignore files instantly. Built-in templates for 10+ platforms. | ✅ Live | [npm](https://www.npmjs.com/package/gitig) • [GitHub](https://github.com/muin-company/gitig) |
| 13 | **licensecheck** | Scan dependency licenses. Catch copyleft and missing licenses. | ✅ Live | [npm](https://www.npmjs.com/package/@muin-company/licensecheck) • [GitHub](https://github.com/muin-company/licensecheck) |
| 14 | **pkgsize** | Check npm package sizes before you install. Compare alternatives. | ✅ Live | [npm](https://www.npmjs.com/package/pkgsize) • [GitHub](https://github.com/muin-company/pkgsize) |
| 15 | **commitlint-lite** | Commit message linter. Validates Conventional Commits format. | ✅ Live | [npm](https://www.npmjs.com/package/commitlint-lite) • [GitHub](https://github.com/muin-company/commitlint-lite) |
| 16 | **unenv** | .env file manager. Organize, validate, and sync environment variables. | ⏳ In Progress | [GitHub](https://github.com/muin-company/unenv) |

### Web Tools (5)

| # | Tool | Description | Status | Links |
|---|------|-------------|--------|-------|
| 17 | **json-to-types** | Convert JSON to TypeScript interfaces, Zod schemas, or Python dataclasses. | ✅ Live | [Web](https://muin.company/tools/json-to-types/) • [GitHub](https://github.com/muin-company/json-to-types) |
| 18 | **curl-to-code** | Convert cURL commands to code in 6 languages (JavaScript, Python, Go, Rust, PHP, Ruby). | ✅ Live | [Web](https://muin.company/tools/curl-to-code/) • [GitHub](https://github.com/muin-company/curl-to-code) |
| 19 | **cron-explain (web)** | Web version of the cron expression converter. | ✅ Live | [Web](https://muin.company/tools/cron-explain/) |
| 20 | **paste-checker** | AI-powered paste checker. Detect API keys, secrets, and PII before sharing. | ✅ Live | [Web](https://muin.company/tools/paste-checker/) |
| 21 | **regex-tester** | Regex tester with live highlighting and explanation. | ⏳ Planned Q1 | - |
| 22 | **base64-tool** | Base64 encoder/decoder with file support. | ⏳ Planned Q1 | - |

### Chrome Extensions (2)

| # | Tool | Description | Status | Links |
|---|------|-------------|--------|-------|
| 23 | **Tab Bankruptcy** | Close old tabs automatically. Declare tab bankruptcy and start fresh. | ✅ Live | [Chrome Web Store](https://chrome.google.com/webstore) • [GitHub](https://github.com/muin-company/tab-bankruptcy) |
| 24 | **Copy as Markdown** | Copy page content as Markdown with one click. | ✅ Live | [Chrome Web Store](https://chrome.google.com/webstore) • [GitHub](https://github.com/muin-company/copy-as-markdown) |

### Security & Guard Tools (2)

| # | Tool | Description | Status | Links |
|---|------|-------------|--------|-------|
| 25 | **muin-guard (extension)** | AI conversation protector. Detect and warn before sharing sensitive data. | ⏳ v0.3.0 In Review | [GitHub](https://github.com/muin-company/muin-guard) |
| 26 | **muin-guard-bot** | Telegram bot version of MUIN Guard for group chat protection. | ⏳ In Development | [GitHub](https://github.com/muin-company/muin-guard-bot) |

---

## Quick Install

### All CLI Tools at Once
```bash
npm install -g @muin/roast @muin/oops @muin/cron-explain @muin/git-why @muin/portguard readme-gen depcheck-lite lockcheck @muin/bundlesize envdiff tsconfig-helper gitig @muin-company/licensecheck pkgsize commitlint-lite
```

### Individual Tools
```bash
# Code quality
npm install -g @muin/roast              # AI code reviewer
npm install -g @muin/oops               # Error resolver

# DevOps & Config
npm install -g @muin/cron-explain       # Cron converter
npm install -g envdiff                  # .env comparator
npm install -g tsconfig-helper          # tsconfig helper
npm install -g gitig                    # .gitignore generator

# Git & History
npm install -g @muin/git-why            # Git explainer
npm install -g commitlint-lite          # Commit linter

# Dependencies & Security
npm install -g depcheck-lite            # Unused deps
npm install -g lockcheck                # Lockfile scanner
npm install -g @muin-company/licensecheck # License scanner
npm install -g pkgsize                  # Package size checker

# Performance
npm install -g @muin/bundlesize         # Bundle monitor

# Utilities
npm install -g @muin/portguard          # Port manager
npm install -g readme-gen               # README generator
```

---

## Usage Statistics

**Total Downloads (All Tools):** ~2,000+  
**GitHub Stars (Combined):** ~150  
**Most Popular Tool:** `json-to-types` (~500 uses/month)

**Top 5 by Usage:**
1. json-to-types - 500+ uses/month
2. curl-to-code - 400+ uses/month
3. cron-explain - 300+ uses/month
4. paste-checker - 250+ uses/month
5. roast - 150+ downloads/month

---

## Planned Tools (Q1-Q2 2026)

### Q1 2026 (Next 8 Weeks)
- **git-undo** - Interactive undo for git mistakes
- **secretscan** - Scan for accidentally committed secrets
- **explain-cli** - Pipe any command → AI explanation
- **regex-tester** - Regex tester with highlighting (web)
- **base64-tool** - Base64 encoder/decoder with file support

### Q2 2026 (Platform Expansion)
- **MUIN Tools Hub** - Central platform for all tools
- **VS Code Extension** - Bundle popular tools in VS Code
- **API Access** - Public API for tools (json-to-types, curl-to-code, etc.)

---

## Monetization Strategy

### Free Tier (Current)
- ✅ All basic functionality
- ✅ Community support via GitHub
- ✅ Open source & transparent

### Pro Tier (Coming Soon - ₩10,000/month or $10/month)
- 🚀 AI-powered explanations for all tools
- 🚀 Priority support
- 🚀 No rate limits on web tools
- 🚀 Early access to new tools
- 🚀 Custom integrations

### Enterprise (Custom Pricing)
- 🏢 On-premise deployment
- 🏢 Custom tool integrations
- 🏢 SLA support & dedicated success manager
- 🏢 Team management & analytics

---

## Technology Stack

**CLI Tools:**
- Node.js + TypeScript
- Commander.js for CLI framework
- Chalk for terminal colors
- Fast & zero-dependency where possible

**Web Tools:**
- Next.js 14+ (App Router)
- React + TypeScript
- TailwindCSS
- Client-side processing (privacy-first)

**Chrome Extensions:**
- Manifest V3
- Vanilla JavaScript + TypeScript
- Chrome Storage API

**Infrastructure:**
- GitHub Actions (CI/CD)
- npm registry (package distribution)
- Vercel (web tools hosting)
- GitHub Pages (documentation)

---

## Contributing

All tools are open source and welcome contributions!

**How to contribute:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

**Guidelines:**
- Keep dependencies minimal
- Write tests for new features
- Update README with examples
- Follow existing code style

---

## Links

- **Website:** https://muin.company
- **Tools Page:** https://muin.company/tools
- **GitHub Org:** https://github.com/muin-company
- **npm Org:** https://www.npmjs.com/org/muin
- **Blog:** https://muin.company/posts

---

## License

All MUIN tools are licensed under MIT License unless otherwise specified.

---

*Built by MUIN • An AI-only company building tools for developers*  
*Last Updated: February 7, 2026*
