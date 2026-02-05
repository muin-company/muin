# Show HN: We built 20 dev tools in 6 days with an AI-only team

**Link:** https://muin.company/tools/  
**GitHub:** https://github.com/muin-company

---

## What We Built

20 open-source developer tools. Started with 10 in 48 hours, doubled to 20 in the next few days.

All MIT licensed. All solving problems we hit daily.

### CLI Tools (16)

**Code Quality:**
- **roast** - AI code reviewer with attitude (think Gordon Ramsay meets senior dev)
- **git-why** - Explains *why* code exists, not just who wrote it (git blame + AI context)
- **commitlint-lite** - Conventional Commits validator (zero dependencies)

**Security & Dependencies:**
- **lockcheck** - Scan lockfiles for suspicious registries, missing hashes
- **licensecheck** - Catch copyleft licenses (GPL/AGPL) before production
- **depcheck-lite** - Find unused dependencies in 0.3 seconds (vs depcheck's 10s+)
- **pkgsize** - Check npm package sizes before installing

**Environment & Config:**
- **unenv** - Auto-generate .env.example by scanning your code
- **envdiff** - Compare .env files, catch missing variables before deploy
- **tsconfig-helper** - Plain English explanations for TS compiler options
- **gitig** - Generate .gitignore instantly (10+ built-in templates)

**Build & Utilities:**
- **bundlesize** - Bundle size monitor for CI/CD
- **portguard** - Kill processes by port number
- **readme-gen** - Auto-generate README from project structure
- **cron-explain** - Cron ↔ natural language converter
- **oops** - Pipe error messages to Claude for instant solutions

### Web Tools (2)
- **json-to-types** - Convert JSON to TypeScript/Zod/Python types (https://json.muin.ai)
- **curl-to-code** - Convert cURL to Python/JS/Go/Rust/PHP/Ruby (https://curl.muin.ai)

### Chrome Extensions (2)
- **Copy as Markdown** - Copy web content as clean markdown
- **Tab Bankruptcy** - Auto-close old tabs, save as bookmarks

## The AI-Only Team Part

This isn't a marketing angle. It's our actual operating model.

**What AI agents do:**
- Write code
- Write tests
- Write documentation
- Fix bugs
- Iterate on feedback
- Monitor and deploy

**What we (founders) do:**
- Strategy
- Final decisions
- Customer conversations
- Quality checks

We don't have human employees. Just two founders + AI agents.

**Why this works:**
- AI agents don't sleep (we doubled our toolkit overnight)
- No hiring, onboarding, or HR overhead
- API costs: ~$500/month (vs engineer salaries)
- Scales instantly (spawn more agents)

**Why this is hard:**
- Quality control is critical
- AI makes stupid mistakes on edge cases
- You still need humans for strategy and taste
- Not everything can be automated (yet)

## Technical Details

**CLI tools:**
- TypeScript + Node.js
- Published to npm under @muin scope
- Most work offline
- Zero or minimal dependencies
- Cross-platform (Mac/Linux/Windows)

**Web tools:**
- Next.js + TypeScript
- Client-side processing (data never leaves your browser)
- No tracking, no analytics, no sign-up
- Open source

**Examples:**

```bash
# Install and use
npm install -g @muin/roast
roast src/messy-code.js

# Output:
# 🔥 This function has more responsibilities than a middle manager
# 🔥 You're treating state like a suggestion, not a contract
# 🔥 Error handling? Never heard of her
```

```bash
# Find unused deps
depcheck-lite
# Found 2 unused dependencies: lodash, moment
# (0.3 seconds)
```

```bash
# Scan lockfile security
lockcheck
# ⚠️  Package evil-pkg uses non-standard registry
# ⚠️  Package lodash has 2 versions: 4.17.20, 4.17.21
```

## What We Learned

**1. Small tools ship fast**
Each tool does ONE thing. No feature creep, no roadmap meetings.

**2. Developers want honesty**
The roast tool (which is deliberately harsh) got more traction than our "useful" tools.

**3. Security matters**
lockcheck and licensecheck got immediate enterprise adoption. Supply chain security is real.

**4. Web tools still have value**
Not everyone wants to install npm packages for one-off tasks.

**5. AI is great at boilerplate, terrible at edge cases**
AI scaffolded 80% of each tool. We spent 80% of our time fixing the remaining 20%.

## What Went Wrong

**1. Windows support was an afterthought**
Tested on Mac/Linux initially. Windows users opened issues immediately.

**2. The curl converter breaks on multipart forms**
Handles 80% of cases perfectly. The remaining 20%... we're working on it.

**3. Documentation quality varies**
Some tools have great docs. Others... less so. AI-generated docs need human editing.

**4. The roast tool is sometimes too polite**
Even with "be harsh" prompts, LLMs sometimes say "this code is suboptimal" instead of "this is a mess."

## Links

- **All tools:** https://muin.company/tools/
- **GitHub org:** https://github.com/muin-company
- **Quick install:** `npm install -g @muin/roast @muin/oops @muin/git-why`
- **Web tools:** json.muin.ai, curl.muin.ai, cron.muin.ai

## FAQ

**Q: Is the "AI-only team" real or marketing?**  
A: Real. We've been operating this way for months. All code, docs, tests are AI-generated (with human review).

**Q: How do you manage AI agents?**  
A: Custom orchestration system. Agents have roles, can spawn sub-agents, report status. We'll probably open-source it eventually.

**Q: What's the API cost?**  
A: ~$500/month currently (Claude API). Way cheaper than hiring.

**Q: Will these stay free?**  
A: Yes. All tools are MIT licensed and will stay open source. We might add paid enterprise features (SSO, support, etc.) but the core tools stay free.

**Q: Why not just contribute to existing tools?**  
A: We tried. Some maintainers are MIA. Some projects are too complex for simple use cases. We wanted tools that do one thing well.

**Q: Are you hiring?**  
A: No. That's kind of the point.

---

Built with: TypeScript, Claude API, Next.js, and zero human employees (besides us founders).

Happy to answer questions about the tools, the build process, or the AI-only company model.
