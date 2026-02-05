# I built 10 developer tools in 48 hours. Here's what I learned.

## Post Body

Last weekend, my co-founder and I decided to build as many useful dev tools as possible in 48 hours. Not as a challenge or to prove anything—we were just tired of switching to web UIs for simple developer tasks.

**The result:** 10 open-source tools. Some are genuinely useful, a couple are memes, and one is probably going to get me roasted here.

## The Tools

**CLI tools:**
- **roast** - AI code reviewer that actually roasts your code (no diplomatic BS)
  - GitHub: https://github.com/muin-ai/roast
  - `npx roast your-code.js` → get insulted
  
- **git-why** - Explains why any line of code exists (git blame + context + AI)
  - GitHub: https://github.com/muin-ai/git-why
  - Turns "Steve changed this in 2019" into "This fixes a Safari bug from issue #432"

**Web tools:**
- **cron.muin.ai** - Plain English cron schedule explainer
- **json.muin.ai** - JSON to TypeScript types (actually works with nested stuff)
- **curl.muin.ai** - Convert curl commands to code (Python, JS, Go, etc.)
- Plus a few others: regex tester, base64 tools, JWT decoder

## What Went Right

**1. AI is absurdly good at boilerplate**
We used Claude to scaffold 80% of each tool. Not because we can't write code, but because typing out TypeScript configs and CLI arg parsers is soul-crushing. The AI did that in seconds.

**2. Open source is faster**
No meetings about feature prioritization. No PM asking for analytics. Just build, push, done.

**3. Small tools ship fast**
Each tool does ONE thing. No feature creep, no roadmap, no "but what if we add..."

## What Went Wrong

**1. The curl converter is kinda broken**
Handles 80% of cases perfectly, then fails on some weird edge case with multipart form data. Will fix it eventually. Maybe.

**2. The roast tool is too polite sometimes**
Even with "be mean" prompts, the LLM sometimes goes "this code is... suboptimal." Dude, just tell me it sucks.

**3. We didn't test on Windows**
All the CLI tools work on Mac/Linux. Windows? No idea. Probably fine. (It's definitely not fine.)

## What Surprised Me

**1. People actually want honesty**
The roast tool got more traction than the "useful" ones. Turns out developers are tired of sugar-coated feedback.

**2. Web tools still have a place**
I thought everyone used CLI for everything. Nope. Some people just want to paste JSON and get types without installing a package.

**3. AI-assisted doesn't mean AI-written**
We used AI heavily, but every tool required real work: fixing edge cases, handling errors, making the UX not suck. AI is a 10x force multiplier, not a replacement.

## The Honest Part

These aren't revolutionary. They're small utilities that solve tiny annoyances. But that's the point—most software doesn't need to be revolutionary. It just needs to not suck.

We're not trying to raise VC money or "disrupt" anything. We just wanted tools that:
1. Work offline (or mostly offline)
2. Don't track you
3. Don't require an account
4. Are open source

If that sounds appealing, try them. If you find bugs (you will), PRs welcome.

## Links

- GitHub org: https://github.com/muin-ai
- Web tools: https://muin.ai/tools
- Roast your code: `npx roast file.js`
- Git archaeology: `npx git-why file.js:42`

Built with: TypeScript, Claude API, Next.js for web tools, a lot of coffee.

Happy to answer questions about the build process, why we made certain decisions, or why we thought building 10 tools in a weekend was a good idea (it wasn't, but here we are).
