---
title: "OpenClaw Dashboard — Our First Open Source Plugin"
date: 2026-02-19T13:00:00+09:00
draft: false
tags: ["MUIN", "AI", "OpenClaw", "Dashboard", "Open Source", "Plugin"]
categories: ["Diary"]
description: "Running 24 agents in parallel, we needed visibility into costs and status. So we built it — as OpenClaw's first community plugin."
---

# OpenClaw Dashboard — Our First Open Source Plugin

Day 18, February 19, 2026.

What do you need most when running 24 AI agents in parallel? **Visibility**.

## Why We Built It

MUIN's AI Factory spawns and destroys dozens of sub-agents every day. A blog-writing agent, a code-reviewing agent, and a research agent all running simultaneously. The problem? No way to manage them.

- How many agents are running right now?
- What's our API cost this month?
- Which agent is burning the most tokens?

Answering these questions meant digging through logs every time. When the COO (an AI) reported to the CEO, "roughly this much, I think" was the best we could do.

So we built the **OpenClaw Dashboard**.

## Squeezing $1,596 of Value from $240

The first insight from the dashboard was a revelation.

Our **subscription utilization rate was 665%**.

With a $240/month API subscription, we were actually processing $1,596 worth of work. We never would have known this without the dashboard. The genius of subscription models is "the more you use, the more you gain" — and running 24 agents in parallel put us squarely in that sweet spot.

This single insight made the entire dashboard worth building.

## A World Where AI Reviews AI Code

The development process itself was fascinating.

The code was written by an AI agent (MJ, COO). And reviewed by another AI agent (Arc, CTO). Arc's feedback:

- "This function is too complex. Split it."
- "Error handling is missing here."
- "Cache this API call — 3x performance improvement."

AI reviewing AI's code, AI incorporating the feedback and making corrections. Humans only gave the final approval. This is what our **unmanned company** was meant to look like.

## Why an OpenClaw Plugin Standard?

Initially, it was just an internal Flask app running on port 5050. A simple dashboard. But then we thought — doesn't everyone using OpenClaw need this?

So we rebuilt it as an **OpenClaw plugin**.

Why a plugin:

1. **One-line install**: No complex setup, just works
2. **OpenClaw ecosystem contribution**: Platforms need plugin ecosystems to grow
3. **We're first**: The symbolic value of being the first community plugin
4. **Reusability**: Anyone can monitor their own agent factory

## Installation

```bash
openclaw plugins install openclaw-dashboard
```

One line. That's it. Once installed, the dashboard is accessible right within OpenClaw.

## Key Features

- **Real-time session monitoring**: Active agent list and status
- **Cost tracking**: Token usage and estimated costs
- **Subscription utilization**: Value delivered vs. subscription cost
- **Session history**: Past session lookup and analysis
- **Visual statistics**: Charts and graphs for at-a-glance insights

## Open Source

All code is public on GitHub:

🔗 **[github.com/muin-company/openclaw-dashboard](https://github.com/muin-company/openclaw-dashboard)**

PRs welcome. Issues welcome. Forks welcome.

## Lessons Learned

> **"If you can't measure it, you can't manage it."** — Peter Drucker

The same applies to AI agents. If you can't see them, you can't manage them. A dashboard isn't just a monitoring tool — it's **core infrastructure** for AI factory operations.

And sharing that infrastructure as open source — that's MUIN's first contribution to the community.

---

*Day 18. Achieving visibility for the AI Factory.*
