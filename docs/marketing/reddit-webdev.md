# Free web dev tools: 20 utilities that don't suck

## Post Body

I got tired of googling "cron syntax" and using sketchy converter websites with 15 ads, so I built a collection of web dev tools that actually don't suck.

Started with a few, now at 20. All open source. No ads, no sign-up, no tracking.

## The Web Tools

**Live now at muin.company/tools:**

### 1. JSON to TypeScript Types
- Paste any JSON → instant TypeScript interfaces, Zod schemas, or Python dataclasses
- Handles nested objects, arrays, unions, optional fields
- Actually works with messy real-world JSON
- Link: https://json.muin.ai
- Also available as CLI: `npm install -g json-to-types`

### 2. Curl to Code
- Paste a curl command → get equivalent code
- Supports Python (requests), JavaScript (fetch/axios), Go, Rust, PHP, Ruby
- Preserves headers, auth, query params
- Useful when APIs only give curl examples
- Link: https://curl.muin.ai

### 3. Cron Schedule Explainer
- Paste `0 */6 * * *` → get "Every 6 hours"
- Works in reverse too: type "every Monday at 9am" → get cron syntax
- Supports standard and extended cron formats
- Link: https://cron.muin.ai

## The CLI Tools (for web devs)

**Install with npm:**

### Frontend/Build Tools
```bash
npm install -g @muin/bundlesize      # Catch bundle bloat before production
npm install -g depcheck-lite         # Find unused dependencies (0.3s)
npm install -g tsconfig-helper       # Understand TypeScript compiler options
```

### Security & Dependencies
```bash
npm install -g lockcheck             # Scan lockfiles for suspicious registries
npm install -g @muin-company/licensecheck  # Catch copyleft licenses
npm install -g pkgsize               # Check npm package sizes before installing
```

### Environment & Config
```bash
npm install -g @muin/unenv           # Auto-generate .env.example
npm install -g envdiff               # Compare .env files before deploy
npm install -g gitig                 # Generate .gitignore files instantly
```

### Code Quality
```bash
npm install -g @muin/roast           # AI code reviewer (with attitude)
npm install -g commitlint-lite       # Validate conventional commits
npm install -g readme-gen            # Auto-generate README files
```

### Utilities
```bash
npm install -g @muin/oops            # Pipe errors to AI for solutions
npm install -g @muin/portguard       # Kill processes by port number
npm install -g @muin/git-why         # Explain why code exists
npm install -g @muin/cron-explain    # CLI version of cron explainer
```

## Chrome Extensions

### 1. Copy as Markdown
- Copy page content as Markdown with one click
- Preserves links, headings, lists, code blocks
- Perfect for documentation and note-taking
- **Install:** Chrome Web Store (search "Copy as Markdown MUIN")

### 2. Tab Bankruptcy
- Auto-close tabs older than X days
- Whitelist important sites
- Optionally save closed tabs as bookmarks
- **Install:** Chrome Web Store (search "Tab Bankruptcy")

## Why I Built These

**Honest answer:** I was tired of:
- Using sketchy websites that spam ads
- Installing 5 different npm packages for one-off tasks
- Switching between tools that all suck in different ways
- Sites that require sign-up for basic functionality
- Tools that track everything you do

These are fast, work offline (CLI tools), don't track you (web tools run client-side), and don't require accounts.

## Technical Details

**Web tools:**
- Built with Next.js + TypeScript
- All processing happens client-side (your data never hits our servers)
- JSON parser handles edge cases (trailing commas, comments)
- Cron parser supports both standard and extended syntax
- Open source: https://github.com/muin-company/tools

**CLI tools:**
- TypeScript + Node.js
- Most tools work offline
- Zero or minimal dependencies
- Fast (depcheck-lite scans in 0.3s vs depcheck's 10s+)
- Cross-platform (Mac/Linux/Windows)

## The AI-Only Company Thing

Yeah, we're an AI-run company. Not as a gimmick—it's our actual operating model.

- Code? AI agents write it
- Docs? AI agents
- Bug fixes? AI agents
- Marketing? AI agents (with human review)

We (the founders) handle strategy and final decisions. Everything else is automated.

Result: We shipped 20 tools in 6 days. Would've taken months with traditional hiring.

## Limitations (Being Honest)

- **Curl converter:** Doesn't handle every edge case (multipart forms are janky)
- **JSON to TS:** Infers types from examples, might miss optional fields
- **Cron:** Supports standard cron, some exotic Unix variations might not work
- **Bundlesize:** Requires build step, not zero-config yet
- **Windows support:** Works, but less tested than Mac/Linux

## The Ask

Try them, break them, let me know what sucks.

If you find them useful, star the repos. If you find bugs, open an issue (or better yet, a PR).

**Links:**
- All tools: https://muin.company/tools/
- GitHub: https://github.com/muin-company
- Web tools: json.muin.ai, curl.muin.ai, cron.muin.ai
- Quick install: `npm install -g @muin/roast @muin/bundlesize @muin/oops`

No sign-up, no tracking, no bullshit. Just tools that work.

---

**FAQ:**

**Q: Why not just use [existing tool]?**  
A: Most existing tools are either ad-ridden, slow, require sign-up, or don't handle edge cases well. These don't have those problems.

**Q: Is this a Y Combinator thing?**  
A: Nope. Just two devs + AI agents who wanted better tools.

**Q: Can I self-host the web tools?**  
A: Yes, they're open source. Clone the repo, run `npm install`, done.

**Q: Do you collect data?**  
A: No. Web tools run entirely in your browser. CLI tools don't phone home. We literally can't see your data.

**Q: What's the business model?**  
A: Currently none. We might add a paid tier with API access or something, but the core tools will stay free and open source.

**Q: How are you different from [similar tool]?**  
A: We focus on: (1) No tracking, (2) Client-side processing, (3) Clean UX with no ads, (4) Open source, (5) Fast and lightweight.

**Q: The roast tool sounds mean?**  
A: It is. But it's also constructive. Think "Gordon Ramsay giving code review"—harsh but helpful.

Built with: Next.js, TypeScript, Claude API, too much coffee, and zero human employees (besides us founders).

Happy to answer questions about specific tools, the build process, or the AI-only company model!
