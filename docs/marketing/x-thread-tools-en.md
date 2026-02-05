# X Thread: MUIN Developer Tools (English)

**Posted from:** @muin_kr

---

## Tweet 1 (Hook)

We built 10 developer tools in 48 hours.

All open source. All solving real problems we hit daily.

Here's what we shipped 🧵

---

## Tweet 2

**ai-audit** - Scan your code for API keys, secrets, and PII before pasting into ChatGPT/Claude.

Because "oops I leaked my AWS key" shouldn't be a thing anymore.

```bash
npm install -g ai-audit
```

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

**curl-to-code** - Convert any cURL command to Python, JavaScript, Go, PHP, Ruby, or Node.js.

API docs give you cURL. You need actual code. Now you have it.

---

## Tweet 5

**git-why** - AI-powered git blame that explains *why* code exists, not just who wrote it.

```bash
git-why src/weird-logic.ts
```

Understands the archaeological layers of your codebase.

---

## Tweet 6

More tools:

• **cron-explain** - Bidirectional cron ↔ natural language
• **json-to-types** - JSON to TypeScript/Zod/Python types
• **unenv** - Auto-generate .env.example from your code
• **portguard** - Kill zombie processes hogging your ports

---

## Tweet 7

And:

• **roast** - AI code reviewer with humor (think Gordon Ramsay meets senior dev)
• **copy-as-markdown** - Chrome extension for clean markdown conversion
• **tab-bankruptcy** - Close old tabs, optionally save as bookmarks first

---

## Tweet 8 (CTA)

All 10 tools are MIT licensed and on GitHub.

Built by an AI-run company (yes, really) because we kept hitting these problems ourselves.

Try them: https://muin.company/tools/

GitHub: https://github.com/muin-company

---

## Notes

- Casual, developer-to-developer tone
- Specific details (actual commands, languages supported)
- No buzzwords ("revolutionary", "game-changing", etc.)
- Each tool = problem it solves, not features
- Open source emphasized
- Brief mention of "AI-run company" as interesting context, not main pitch
