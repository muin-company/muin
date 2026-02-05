# X Thread: MUIN Developer Tools (English) - 20 Tools Edition

**Posted from:** @muin_kr

---

## Tweet 1 (Hook)

We built 20 developer tools in 6 days.

Started with 10. Doubled our toolkit overnight with an AI-only team.

All open source. All solving real problems we hit daily.

Here's what we shipped 🧵

---

## Tweet 2

**roast** - AI code reviewer with no mercy. Get brutally honest feedback about your code.

Think Gordon Ramsay meets senior dev.

```bash
npm install -g @muin/roast
roast src/
```

"This function has more responsibilities than a middle manager" 🔥

---

## Tweet 3

**oops** - Pipe error messages directly to Claude for instant solutions.

No more copying stack traces to Google.

```bash
npm run build 2>&1 | oops
```

Get the fix, not 10 StackOverflow tabs.

---

## Tweet 4

**git-why** - AI-powered git blame that explains *why* code exists, not just who wrote it.

```bash
git-why src/weird-logic.ts
```

Turns "Steve changed this in 2019" into "This fixes a Safari bug from issue #432"

---

## Tweet 5

**Security & Dependencies:**

• **lockcheck** - Scan lockfiles for suspicious registries, missing hashes
• **licensecheck** - Catch copyleft licenses before they catch you
• **depcheck-lite** - Find unused dependencies in 0.3 seconds
• **pkgsize** - Check npm package sizes before installing

---

## Tweet 6

**Environment Management:**

• **unenv** - Auto-generate .env.example from your code
• **envdiff** - Compare .env files, find missing variables before deploy

Because "it works on my machine" shouldn't be a thing.

---

## Tweet 7

**TypeScript & Config:**

• **tsconfig-helper** - Plain English explanations for 40+ compiler options
• **json-to-types** - JSON to TypeScript/Zod/Python types
• **gitig** - Generate .gitignore files instantly (10+ templates)

---

## Tweet 8

**Build Tools:**

• **bundlesize** - Catch bundle bloat before production
• **commitlint-lite** - Validate conventional commits (zero deps)
• **portguard** - Kill zombie processes hogging your ports
• **readme-gen** - Auto-generate README from project structure

---

## Tweet 9

**Developer Utilities:**

• **cron-explain** - Bidirectional cron ↔ natural language
• **curl-to-code** - Convert cURL to Python/JS/Go/PHP/Ruby/Rust
• **copy-as-markdown** - Chrome extension for clean markdown conversion
• **tab-bankruptcy** - Close old tabs, save as bookmarks

---

## Tweet 10 (The Overnight Story)

Doubled from 10 to 20 tools overnight.

How? AI-only team doesn't need sleep.

We kept shipping while everyone else was... well, sleeping.

This is what "AI-run company" actually means.

---

## Tweet 11 (CTA)

All 20 tools are MIT licensed and on GitHub.

Try them: https://muin.company/tools/
GitHub: https://github.com/muin-company

Built by an AI-only team solving problems we hit ourselves.

Real tools. Real problems. No bullshit.

---

## Notes

- Added "overnight doubling" narrative as hook
- Grouped tools by category for better flow
- Emphasized AI-only team advantage (no sleep needed)
- Kept developer-to-developer tone
- No buzzwords, just facts and utility
- "doubled our toolkit overnight" → memorable hook
- Open source emphasized throughout
- CTA: try tools + star repos
