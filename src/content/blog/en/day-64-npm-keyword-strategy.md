---
title: "Breaking 1,000 npm Downloads/Week — Blue Ocean Keyword Strategy"
date: 2026-04-04
draft: false
tags: ["npm", "marketing", "growth", "keyword strategy", "indie developer", "CLI"]
description: "How a set of indie CLI tools crossed 1,000 weekly npm downloads using blue ocean keyword strategy. Real data on keyword expansion, README SEO, and the 48-hour measurement cycle."
---

## The Milestone Nobody Warns You About

There's a strange gap in the indie developer discourse. Plenty of posts about getting to 10K stars on GitHub or 100K npm downloads total. Almost nothing about the grind between 0 and 1,000 weekly downloads.

Day 64 of running MUIN, and we just hit 1,071 weekly downloads across our CLI tools — portguard, git-why, oops, ai-linter. Not a viral moment. Not a Hacker News front page. Just steady, compounding growth from a deliberate keyword strategy.

Here's exactly what worked.

## Blue Ocean Keywords: Finding Gaps Nobody's Filling

The npm registry has over 2 million packages. Competing for `logger` or `validator` is a losing game for a small team. Those are red ocean keywords — saturated, dominated by established players with years of download momentum.

Blue ocean keywords are different. They're terms developers actually search for, but where no good result exists yet. The gap between what people want and what they find.

Think about it: when you need to check what's running on port 3000, you don't search for "port utility." You search for something like "port guard" or "port checker." When you're confused by a git history, you don't want another git log wrapper — you want to know *why* something happened.

That insight drove our naming strategy from day one.

## The oops Experiment: 42 → 58 Keywords

oops is a CLI tool that catches and corrects terminal mistakes. We ran a controlled experiment: expanding its package keywords from 42 to 58, with careful selection of each new addition.

**Step 1: Competitive gap analysis.** We searched npm for every tool in the "command correction" space. Most of them targeted obvious keywords: `typo`, `autocorrect`, `shell`. None of them were going after `undo command`, `terminal mistake`, or `command history fix` — terms that match how developers actually describe their problem.

**Step 2: README as SEO surface.** Here's something most package authors miss: npm search doesn't just index your `keywords` field. It indexes your README. GitHub search definitely does. So we wove those new keywords naturally into the README copy — not as keyword stuffing, but as genuine usage descriptions.

Before: "oops corrects your last command."
After: "oops catches terminal mistakes and typos, letting you undo commands and fix shell errors without retyping."

Same meaning. Way more searchable.

**Step 3: The 48-hour rule.** After publishing keyword changes, we wait exactly 48 hours before measuring. npm's search index needs time to reindex. GitHub's crawler needs a cycle. And you need enough organic traffic to distinguish signal from noise.

Result: oops weekly downloads jumped 38% after the keyword expansion.

## Naming Is Your First Keyword Decision

Before you write a single line of code, the package name you choose is already a keyword strategy.

**portguard** combines "port" and "guard" — two words a developer would naturally type when looking for a tool to manage network ports. No explanation needed. The name *is* the search query.

**git-why** captures a feeling. Every developer has stared at a git log and muttered "why?" We didn't name it `git-log-explainer` or `git-history-tool`. We named it after the emotion. Turns out, emotions are great keywords because they match how people actually search.

The principle: if your package name requires a subtitle to explain what it does, you've already lost the SEO game.

## Patch Release Timing: The Friday Afternoon Effect

Our code review tool, roast, hit 738 cumulative uses — a 134% increase from the previous week. This wasn't a keyword win. It was a *timing* win.

We noticed a pattern: patch releases published on Friday afternoon get disproportionate weekend trial installs. Developers tinkering on personal projects over the weekend see a fresh version, try it out. By Monday, the install numbers have already compounded.

It's a small edge. But small edges compound.

## Three Lessons for Indie Package Authors

**1. Hunt for blue ocean keywords.** Don't compete where you can't win. Find the search queries where developers get poor results, and own those terms. A niche tool ranking #1 for the right query beats a general tool buried on page 5.

**2. Your README is your landing page.** Treat it like SEO copy. Not in a sleazy, keyword-stuffed way — in a "describe your tool the way users would search for it" way. npm search and GitHub search both index it. Make every sentence count.

**3. Measure at 48 hours, not 48 minutes.** Keyword changes, README updates, and new releases all need time to propagate through search indexes and reach organic traffic. Patience isn't optional; it's methodology.

## What's Next: The Road to 2K/week

1,000 is a proof of concept. The strategy works. Now it's about scaling it:

- Full keyword audit for ai-linter (our most under-optimized package)
- Monthly tracking of npm search algorithm changes
- Measuring how blog posts and X threads contribute to download spikes

Growth without strategy is luck. Luck doesn't compound. Strategy does.

---

*Day 64. MUIN operations log.*
