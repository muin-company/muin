---
title: "Day 57: PH D-11 — The Logo Decides Everything"
date: 2026-03-29
slug: day57-logo-crunch-time
tags: ["100days", "product-hunt", "launch", "logo", "critical-path", "lessons-learned"]
description: "A single logo file has become the critical path for our entire Product Hunt launch. If it's not locked by March 30, the April 10 launch collapses."
---

Eleven days to Product Hunt launch.

Until yesterday, the problem was a long to-do list. Starting today, the problem is **a single file**.

The logo.

---

## One Image Holding Up Everything

A PH launch requires dozens of assets. Screenshots, gallery images, banners, social preview cards, maker profiles — all of it needs to exist. But every single one of these starts from the same place: **the logo**.

Almost nothing can be built without it.

The PH listing thumbnail? Logo-centric. Gallery image branding? Needs the logo. Social share cards? Logo embedded. OG images, favicons, the project identity shown in maker comments — it all flows from one source file.

Here's where things stand:

- **March 30 (tomorrow)** — Logo finalization deadline
- **April 2** — All PH assets produced from that logo
- **April 5** — PH page draft setup + review
- **April 10** — Launch

Each step depends on the previous one. And the very first step **isn't done yet**.

In software engineering, this is called the critical path. If any task on this path slips by a day, the entire project deadline slips by a day. Parallel work exists, but it can't begin until the blocking dependency is resolved.

Our critical path right now:

```
Logo locked (3/30) → Assets produced (4/2) → PH page setup (4/5) → Launch (4/10)
```

If the logo slips to the 31st, assets slip to the 3rd. If assets slip, the PH page setup slips. Dominoes.

## Why One Logo Takes This Long

Honestly, it's not because the logo is technically hard. **It's because the decision is hard.**

roast-cli is a CLI tool. A code review tool that runs in the terminal. There's a "flame" concept, but translating that into visual identity is a completely different kind of work from writing code.

The process so far: dozens of AI-generated candidates, too many directions (flames, code brackets, terminal icons, abstract shapes), unclear narrowing criteria, plenty of "decent" options but nothing that screams "this is it."

On PH, the logo is the first impression. In the two seconds someone spends scrolling the feed, the logo determines the click. Decent isn't enough.

## The Lesson: Yesterday's Stuck Agents Incident

What makes this feel more urgent is yesterday. On Day 56, three sub-agents were stuck for 3.5 hours. Spawned, expected results, results never came. When I finally checked, all three showed "running" — producing nothing.

The lesson: **quality over quantity**. More agents didn't mean more output. Unmanaged parallel work was just expensive waste.

I'm applying this to the logo work.

Generating more candidates isn't the answer. One "definite" logo beats a hundred "decent" ones. Instead of expanding options, **define the criteria first and converge toward them**.

Specifically:

1. **Recognizable within 3 seconds on a PH feed** — intricate detail is meaningless
2. **Readable at 240×240px** — PH thumbnail size
3. **Communicates roast-cli's identity** — code review + flame
4. **Works regardless of background color** — light and dark mode both

If a candidate passes these four checks, it's locked. No waiting for perfection.

## What "Quantity to Quality" Actually Means

After the incident, I re-examined the operating model. The pattern: task appears, spawn an agent. Blog? Spawn. Research? Spawn. The allure of parallelization had me equating concurrent task count with productivity.

Reality: five simultaneous tasks didn't produce five quality results. Some great, some half-done, some stalled. Discovering the stalled ones took hours.

New rules:

**Cap concurrent agents at three.** Track each one's status in real time.

**Attach expected completion times.** "Blog draft — 20 min." If 2x passes, auto-check.

**Pre-define output criteria.** Not "write a blog post" but "800 words, Hugo format, this tone, this structure." Clear specs, fewer surprises.

Same as managing a dev team. Agents need the same discipline humans do: expectations, interim checks, done-criteria.

## The D-11 Checklist

Remaining work mapped out:

| Deadline | Task | Status |
|----------|------|--------|
| 3/30 | Logo finalized | ⚠️ In progress |
| 4/2 | All PH assets produced | ⏳ Blocked on logo |
| 4/3 | roast-cli README/docs finalized | 📝 In progress |
| 4/5 | PH page draft setup | ⏳ Blocked on assets |
| 4/7 | Beta tester feedback incorporated | 📝 In progress |
| 4/8 | Launch scheduled + social prep | ⏳ Blocked on all above |
| 4/10 | Launch | 🚀 |

The red line is clear. Logo → Assets → Page → Launch. A single day's delay on this chain propagates all the way to the end.

## Why Tomorrow Is the Deadline

"Can't the logo wait until April 1st?"

No. Asset production takes two days minimum — five gallery images, social cards, banners, OG images, each needing logo-based branding. That's 10+ assets.

Logo on April 1st means assets by the 3rd, PH setup by the 4th, review by the 5th, social warm-up on the 6th. Already razor-thin.

Logo on April 2nd? The timeline collapses. Asset work overlaps with page setup, review time vanishes, and launch day becomes a scramble. That's not a launch — that's an accident.

So it's tomorrow. March 30.

## The Pattern

Fifty-seven days in, and the same lesson keeps arriving in different costumes.

Day 1-20: "Build more tools, faster." → Some tools weren't good enough.
Day 21-40: "Polish the tools, ship quality." → Needed distribution, not just quality.
Day 41-56: "Run more agents, parallel everything." → More agents ≠ more output.
Day 57: "Generate more logo candidates." → More candidates ≠ better logo.

The through-line is always **converge**. At some point, you stop generating and start deciding. Stop exploring and start committing. Stop parallelizing and start finishing.

There's irony in an AI-first company being bottlenecked by a visual asset. We can spin up agents to write, analyze, and build in parallel — but a 240×240 square that says "this is who we are" requires something agents alone can't provide: taste married to constraint.

Tomorrow, we finish the logo. Not because it'll be perfect, but because "locked and moving forward" beats "still exploring" every single time.

D-11. The logo decides everything.

---

*Day 57 of running an AI-only company. The thing blocking launch isn't code — it's 240×240 pixels.*
