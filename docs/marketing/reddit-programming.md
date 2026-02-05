# I built 20 developer tools in 6 days with an AI-only team. Here's what I learned.

## Post Body

Last week, my co-founder and I decided to build as many useful dev tools as possible. We started with 10 in 48 hours, then doubled it to 20 in the next few days.

**The twist:** We're an AI-run company. No human employees. Just two founders + AI agents doing the actual work.

**The result:** 20 open-source tools. Some are genuinely useful, a couple are memes, and one will probably get me roasted here.

## The Tools (All Open Source)

### CLI Tools (16)

**Code Quality & Review:**
- **roast** - AI code reviewer that actually roasts your code (no diplomatic BS)
  - `npx @muin/roast your-code.js` → get insulted constructively
  
- **git-why** - Explains why any line of code exists (git blame + context + AI)
  - Turns "Steve changed this in 2019" into "This fixes a Safari bug from issue #432"

- **commitlint-lite** - Validates Conventional Commits (zero dependencies)

**Security & Dependencies:**
- **lockcheck** - Scan lockfiles for suspicious registries, missing hashes
- **licensecheck** - Catch copyleft licenses (GPL/AGPL) before they catch you
- **depcheck-lite** - Find unused dependencies in 0.3 seconds
- **pkgsize** - Check npm package sizes before installing

**Environment & Config:**
- **unenv** - Auto-generate .env.example from your code
- **envdiff** - Compare .env files, find missing variables before deploy
- **tsconfig-helper** - Plain English explanations for 40+ TS compiler options
- **gitig** - Generate .gitignore files instantly (10+ built-in templates)

**Build & Utilities:**
- **bundlesize** - Catch bundle bloat before production
- **portguard** - Kill zombie processes by port number
- **readme-gen** - Auto-generate README from project structure
- **cron-explain** - Bidirectional cron ↔ natural language converter
- **oops** - Pipe error messages directly to Claude for instant solutions

### Web Tools (2)
- **json-to-types** (json.muin.ai) - JSON to TypeScript/Zod/Python types
- **curl-to-code** (curl.muin.ai) - Convert cURL to Python/JS/Go/PHP/Ruby/Rust

### Chrome Extensions (2)
- **Copy as Markdown** - Copy page content as clean markdown
- **Tab Bankruptcy** - Auto-close old tabs, optionally save as bookmarks

## What Went Right

**1. AI is absurdly good at boilerplate**
We used Claude to scaffold 80% of each tool. Not because we can't write code, but because typing out TypeScript configs and CLI arg parsers is soul-crushing. The AI did that in seconds.

**2. Open source is faster**
No meetings about feature prioritization. No PM asking for analytics. Just build, push, done.

**3. Small tools ship fast**
Each tool does ONE thing. No feature creep, no roadmap, no "but what if we add..."

**4. AI teams don't sleep**
We literally doubled our toolkit overnight. While we slept, the AI agents kept shipping.

## What Went Wrong

**1. The curl converter is kinda broken**
Handles 80% of cases perfectly, then fails on some weird edge case with multipart form data. Will fix it eventually. Maybe.

**2. The roast tool is too polite sometimes**
Even with "be mean" prompts, the LLM sometimes goes "this code is... suboptimal." Dude, just tell me it sucks.

**3. We didn't test on Windows initially**
All the CLI tools work on Mac/Linux. Windows support came later after people opened issues.

**4. Licensing compliance is harder than expected**
Building licensecheck made us realize how many projects unknowingly use GPL dependencies.

## What Surprised Me

**1. People actually want honesty**
The roast tool got more traction than the "useful" ones. Turns out developers are tired of sugar-coated feedback.

**2. Security tools matter more than we thought**
lockcheck and licensecheck got immediate adoption from companies. Supply chain security is no joke.

**3. Web tools still have a place**
I thought everyone used CLI for everything. Nope. Some people just want to paste JSON and get types without installing a package.

**4. AI-assisted doesn't mean AI-written**
We used AI heavily, but every tool required real work: fixing edge cases, handling errors, making the UX not suck. AI is a 10x force multiplier, not a replacement.

## The "AI-Only Company" Part

Yeah, about that. We're serious:
- Code reviews? AI agents
- Documentation? AI agents
- Bug triage? AI agents
- Marketing? AI agents (with human approval)

We (the founders) do:
- Strategy
- Customer conversations
- Final decisions
- Quality checks

The AI agents do:
- Implementation
- Testing
- Documentation
- Monitoring
- Iteration

Is this sustainable? We're finding out. But so far, we've shipped 20 tools in 6 days, which would've taken months with traditional hiring.

## The Honest Part

These aren't revolutionary. They're small utilities that solve tiny annoyances. But that's the point—most software doesn't need to be revolutionary. It just needs to not suck.

We're not trying to raise VC money or "disrupt" anything. We just wanted tools that:
1. Work offline (or mostly offline)
2. Don't track you
3. Don't require an account
4. Are open source
5. Do one thing well

If that sounds appealing, try them. If you find bugs (you will), PRs welcome.

## Links

- All tools: https://muin.company/tools/
- GitHub org: https://github.com/muin-company
- Quick install: `npm install -g @muin/roast @muin/oops @muin/git-why`

Built with: TypeScript, Claude API, Next.js for web tools, a lot of coffee, and zero human employees.

Happy to answer questions about the build process, why we made certain decisions, the AI-only company model, or why we thought building 20 tools in a week was a good idea (it wasn't, but here we are).

---

**Edit:** Since people are asking:

**Q: How do you manage AI agents?**  
A: We use a custom orchestration system (also AI-built, lol). Agents have specific roles, can spawn sub-agents for tasks, and report status regularly.

**Q: What's the cost?**  
A: API costs are ~$500/month currently. Way cheaper than hiring.

**Q: Will you open-source the agent system?**  
A: Maybe. Still figuring out if it's useful outside our specific use case.

**Q: Is this just a marketing stunt?**  
A: Nope. This is our actual operating model. We've been doing this for months now.
