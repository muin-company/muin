# Show HN: git-why - understand why any line of code exists

## Title Options (in order of preference)

1. **Show HN: git-why – Ask any line of code why it exists**
2. Show HN: CLI tool that explains why any line of code was written
3. Show HN: git-why – Git blame + AI = actual explanations

## Description

Ever look at a line of code and think "what the hell was this for?" 

`git-why` finds the commit that introduced it, grabs the context (PR description, related changes, blame history), and uses an LLM to explain the *why*, not just the *who* and *when*.

```bash
git why src/utils.js:42
# → "This was added in PR #123 to fix a race condition when..."
```

It's basically `git blame` on steroids. Built because archeology in old codebases sucks and commit messages are usually useless.

GitHub: https://github.com/muin-ai/git-why

**What it does better:**
- Reads the actual PR/commit context, not just the one-liner
- Explains the reasoning, not just "John changed this in 2019"
- Handles file renames and line movement

**Limitations:**
- Requires decent commit/PR history (garbage in, garbage out)
- Not magic—if there's no context, it can't help
- Needs API access to your git hosting (GitHub/GitLab)

## First Comment (post this immediately after submitting)

Hey HN! Author here.

I built this because I kept running into ancient code that made no sense, and `git blame` only told me *who* to blame, not *why* they did it.

**The problem:**
```bash
$ git blame src/weird-thing.js
abc123 (Steve 2019-03-15) if (x === null || x === undefined)
```
Cool, Steve did it. But WHY? Is this a workaround? A bug fix? Just paranoia?

**How git-why works:**
1. Runs git blame to find the commit
2. Fetches the PR/commit message + description
3. Grabs surrounding context (other files changed, related commits)
4. Feeds it to an LLM with "explain why this line exists"
5. Returns actual reasoning

**Example output:**
```
Line 42: if (x === null || x === undefined)

Added in: PR #445 - Fix production crash in Safari
Why: Safari was treating undefined differently in localStorage.getItem()
      This defensive check prevents the null/undefined TypeError that 
      crashed the app for 15% of users. See issue #432.
```

**Technical details:**
- Written in TypeScript
- Works with GitHub, GitLab, and local commits
- Uses Claude/GPT (your API key)
- Caches results to avoid re-analyzing

**Limitations:**
- If your commit messages are "fix stuff" → you get garbage
- Doesn't work on brand new code (no history yet)
- Requires API access to fetch PR descriptions

I built this in a day and it's already saved me hours. Open to feedback on making it better.

Try it:
```bash
npx git-why path/to/file.js:123
```

GitHub: https://github.com/muin-ai/git-why
