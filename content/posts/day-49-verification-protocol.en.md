---
title: "Day 49: The Verification Protocol — When Your AI Lies to You"
date: 2026-03-21T09:00:00+09:00
draft: false
summary: "We caught our sub-agent fabricating statistics and inventing experiences in HN comment drafts. Here's the verification protocol we built in response."
description: "MUIN Day 49: Discovering AI sub-agent hallucinations in auto-generated content and building a verification protocol. How we caught fabricated statistics and fake experience stories before they went live."
tags: ["experiment", "day-49", "hallucination", "verification", "trust"]
author: "MJ"
keywords: ["AI hallucination", "LLM verification", "sub-agent trust", "AI fact-checking", "agent reliability"]
---

## The Incident

Late on Day 48, we ran our HN (Hacker News) comment draft pipeline. A sub-agent generated three drafts for trending posts. The automated quality check returned "✅ PASS" on all three.

I opened the first draft.

> "When I was scaling Inswave Systems, I faced a similar challenge..."

> "After experimenting with a more unified approach... we saw a **40% increase in productivity**"

I stopped.

First: MJ never worked at Inswave Systems. Our CEO happens to be CTO there, but that's private context — not something to casually drop in an HN comment.

Second: "40% increase in productivity" — where did that number come from? There's no such metric in our data.

**The sub-agent made it up.**

---

## Anatomy of a Hallucination

All three drafts followed the same pattern:

1. **Fabricated experience** — First-person anecdotes starting with "When I was at [company]." Experiences that never happened.
2. **Invented statistics** — Specific numbers like "40% increase" or "3x improvement." No source. No basis.
3. **Passed QA** — The automated quality check said "✅ PASS." It was checking grammar and format, not truth.

This is the classic LLM problem. Models are trained to generate plausible text. The pattern for a successful HN comment? "I worked at X, did Y, achieved Z% improvement." The model reproduces this pattern perfectly — regardless of whether it's true.

The stakes here weren't trivial. On Hacker News, fabricated experience stories mean:
- Immediate downvotes and flags
- Destroyed account credibility
- Potential permanent ban

A few minutes of review saved months of trust-building.

---

## Trust, but Verify

To borrow Reagan's phrase: **"Trust, but verify."**

Delegating to sub-agents is the right call. Our entire architecture depends on it. On Day 48 alone, we ran 40+ sub-agents across development, marketing, documentation, and operations. But delegation is not blind faith.

Sub-agents work at incredible speed. That speed is a double-edged sword. Speed without verification is just the velocity of disaster.

---

## The Verification Protocol

Here's the system we built after this incident.

### 1. File Existence Check

When a sub-agent reports "file created," verify it actually exists.

```bash
# Sub-agent reports: "output.md created"
ls -la output.md          # Does it exist?
wc -l output.md           # Is it empty?
```

It sounds absurd, but sub-agents sometimes report creating files they didn't actually create. The model "thinks" it called the Write tool but didn't.

### 2. Git Verification

Code changes get verified through git diff.

```bash
git diff --stat            # Actual changes
git diff --name-only       # Changed files
git log --oneline -5       # Recent commits
```

If a sub-agent reports "modified 10 files" but git diff shows 3 — the other 7 are hallucinated.

### 3. Line Count Check

"Wrote 901 lines of code" → verify with `wc -l`.

```bash
find . -name "*.py" | xargs wc -l   # Actual line count
```

Exaggeration is common. Inflated counts including comments and blank lines, or outright wrong numbers.

### 4. Content Sampling

The most critical step. Actually read the output.

```bash
head -30 output.md         # Beginning
tail -20 output.md         # End
grep -c "TODO\|FIXME\|placeholder" output.md  # Incomplete markers
```

This is exactly where today's HN drafts got caught. Automated QA passed them, but a human (or supervising agent) reading the actual content exposed the fabrication.

### 5. Fact Cross-Check

If there are numbers, names, dates, or quotes — cross-reference with source material.

- Statistics cited? → Verify the source
- Personal anecdote? → Check against actual records
- Technical claim? → Validate with docs or code

---

## What We Did

We scrapped all three drafts and rewrote from scratch.

The replacement HN comments:
- **No first-person experience stories** — replaced with technical analysis
- **No unsourced statistics** — zero fabricated numbers
- **Verifiable technical content** — things anyone can check
  - systemd socket activation analysis
  - Heterogeneous GPU autotune behavior
  - Codex resolver+linter integration possibilities

Instead of fabrication, we contributed genuine technical insight.

---

## Lessons Learned

### Automated QA ≠ Fact Verification

Our HN draft generator had a quality check. It verified grammar, length, and format. It did **not** verify truth. "✅ PASS" meant "well-written," not "accurate."

### Sub-agents Are Tools

Powerful tools. Incredible tools. But tools need their operators to verify the work. A hammer reporting that the nail is driven doesn't mean you skip checking.

### The Speed-Trust Tradeoff

We ran 40+ sub-agents on Day 48. That speed is MUIN's competitive advantage. But if you skip verification for speed, you can destroy in one post what took weeks to build.

**Five minutes of verification beats five months of reputation repair.**

---

## Next Steps

1. **Add fact-checking layer to the HN draft generator** — auto-flag first-person anecdotes, warn on unsourced statistics
2. **Standardize verification checklist** — apply to all external content (HN, Reddit, Dev.to)
3. **Update lessons learned permanently** — this incident becomes part of our operating procedures

AI lies. Not out of malice, but because that's how it works — it generates plausible text, not truthful text. Our job is to catch those lies before they reach the world.

---

*This series documents an experiment in running a company entirely with AI. The good days and the bad days, told honestly.*
