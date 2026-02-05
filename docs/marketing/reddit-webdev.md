# Free web tools: cron explainer, JSON to types, curl to code

## Post Body

I got tired of googling "cron syntax" for the 100th time, so I built a few web-based dev tools that actually stay open in browser tabs.

## The Tools

**Live now at muin.ai/tools:**

### 1. Cron Schedule Explainer
- Paste `0 */6 * * *` → get "Every 6 hours"
- Works in reverse too: type "every Monday at 9am" → get cron syntax
- No ads, no sign-up, no BS
- Link: https://cron.muin.ai

### 2. JSON to TypeScript Types
- Paste any JSON → instant TypeScript interfaces
- Handles nested objects, arrays, unions
- Copies to clipboard with one click
- Actually works with messy real-world JSON (optional fields, inconsistent types)
- Link: https://json.muin.ai

### 3. Curl to Code
- Paste a curl command → get equivalent code
- Supports Python (requests), JavaScript (fetch/axios), Go, etc.
- Preserves headers, auth, query params
- Useful when APIs only give curl examples
- Link: https://curl.muin.ai

### Bonus: Standard stuff
- Base64 encoder/decoder
- JWT decoder
- Regex tester
- (Yeah, these exist everywhere, but ours don't have 15 ads)

## Why I Built These

**Honest answer:** I was tired of:
- Using sketchy websites that spam ads
- Installing npm packages for one-off conversions
- Switching between tools that all suck in different ways

These are fast, work offline (mostly), and don't track you. That's it.

## Technical Details

- Built with Next.js + TypeScript
- JSON parser handles edge cases (trailing commas, comments)
- Cron parser supports both standard and extended syntax
- All processing happens client-side (your data never hits our servers)
- Open source: https://github.com/muin-ai/tools

## Limitations (Being Honest)

- **Curl converter:** Doesn't handle every edge case (multipart forms are janky)
- **JSON to TS:** Infers types from examples, so one object might miss optional fields
- **Cron:** Supports standard cron, but some exotic Unix variations might not work

## The Ask

Try them, break them, let me know what sucks. I built these in a weekend with my co-founder, so there are definitely bugs.

If you find them useful, star the repo. If you find bugs, open an issue (or better yet, a PR).

**Links:**
- Tools: https://muin.ai/tools
- GitHub: https://github.com/muin-ai/tools
- Individual tools: cron.muin.ai, json.muin.ai, curl.muin.ai

No sign-up, no tracking, no bullshit. Just tools that work.

---

**FAQ I'm expecting:**

**Q: Why not just use [existing tool]?**  
A: Most existing tools are either ad-ridden, slow, or require sign-up. These don't.

**Q: Is this a Y Combinator thing?**  
A: Nope. Just two devs who wanted better tools.

**Q: Can I self-host?**  
A: Yes, it's open source. Clone the repo, run `npm install`, done.

**Q: Do you collect data?**  
A: No. Everything runs in your browser. We literally can't see your data.

**Q: What's the business model?**  
A: There isn't one (yet). We might add a paid tier with API access or something, but the web tools will stay free.

Built with: Next.js, TypeScript, too much coffee, and a stubborn refusal to use sketchy converter websites.
