# Show HN: roast - AI code reviewer that roasts your code

## Title Options (in order of preference)

1. **Show HN: Roast – AI code reviewer that actually roasts your code**
2. Show HN: I made an AI code reviewer that insults your code instead of being diplomatic
3. Show HN: Code review tool that roasts you (Gordon Ramsay mode for your PRs)

## Description

A CLI code reviewer that drops the corporate niceties and just tells you your code is bad. Built because I was tired of LLMs being overly polite when reviewing code.

Feed it a file or diff, get roasted. Uses Claude/GPT but strips away the "this is a good start, but consider..." nonsense. Sometimes you need someone to tell you that nested ternary is an abomination.

```bash
npx roast src/spaghetti.js
```

It's open source, works locally, and I built it in about 4 hours because code review shouldn't sound like HR drafted it.

GitHub: https://github.com/muin-ai/roast

**Honest caveats:**
- It's still an LLM, so occasionally the roasts are generic
- Works best on obviously bad code (where it shines)
- Not a replacement for real code review, just funnier

## First Comment (post this immediately after submitting)

Hey HN! Author here.

I built this after getting frustrated with how diplomatic AI code reviewers are. Every response is "this is a good approach, but you might consider..." when what you really need is "why are you nesting 7 if statements?"

**How it works:**
- CLI tool (Node.js)
- Supports local files, git diffs, or piping from stdin
- Uses Claude/GPT with a "be brutally honest" prompt
- Outputs actually entertaining roasts

**What I learned:**
- Getting LLMs to be mean is harder than you'd think (safety guardrails)
- The roasts are funnier when the code is genuinely bad
- People actually want honest feedback, even if it stings

**Limitations:**
- Requires API key (Claude or OpenAI)
- Token costs can add up on large files
- Sometimes roasts miss the actual worst parts

Built this in one evening, figured others might enjoy it. Happy to answer questions about the implementation or why I made questionable decisions.

**Try it:**
```bash
npx roast your-worst-code.js
```

Source: https://github.com/muin-ai/roast
