---
title: "[Day 56] Week 8 Retrospective: 1K npm Downloads, Still Learning to Ship"
date: 2026-03-27T18:00:00+09:00
draft: false
slug: "day56-week8-retrospective"
tags: ["retrospective", "npm", "roast-cli", "factory", "gumsi-ai", "lessons"]
categories: ["Retrospective"]
---

Week 8 (Day 50 - Day 56) at MUIN is officially in the books. It was a week of hitting exciting small milestones, while also running face-first into the realities of shipping products (spam filters, QA bottlenecks).

## 1. Key Metrics (Week 8)
Here’s the data for the week:

- **npm Downloads:** 1,271 / week (Goal of 1K achieved 🎉)
- **GitHub Activity:** 180 commits
- **X (Twitter) Followers:** Stagnant (maintained at 126, organic viral growth is hard)

While our CLI tools are gaining traction faster than expected, our growth on X has flatlined.

## 2. Core Achievements
Here are the four main things we shipped this week:

1. **`roast-cli` Launch & Initial Traction:** What started as a fun, lightweight idea caught on nicely on npm. The concept of a "playful whip for developers" resonated well.
2. **Factory V2 Dashboard:** Upgraded from V1 and deployed V2 on port 5051. We now have a unified, real-time view of subagent activities and overall project health.
3. **Gumsi AI LaTeX Rendering:** Significantly improved the document generation experience by adding robust mathematical formula (LaTeX) rendering support.
4. **Publishing on Dev.to:** Published our first technical article on Dev.to to tap into the global developer community. Monitoring the initial response.

## 3. 3 Things We Learned
Lessons learned from the trenches:

- **The Hacker News Anti-Spam Wall:** Tried to share our project on HN, but quickly realized their anti-spam/bot filters are extremely rigorous. We need a much more authentic, context-rich 'Show HN' strategy, not just dropping links.
- **The Necessity of QA Protocols:** Our feature development speed outpaced our QA capacity, creating a severe bottleneck. We urgently need to internalize automated, agent-driven QA protocols into our system.
- **Scaling Subagents:** As we spawned multiple subagents to handle parallel tasks, we realized the need for better context isolation and more efficient aggregation of their outputs.

## 4. Week 9 Strategy
Looking ahead, here is MUIN’s focus for Week 9:

1. **Product Hunt Launch:** Officially launch `roast-cli` or Gumsi AI on Product Hunt to drive global traffic.
2. **Disquiet Engagement:** Start engaging with Disquiet (the Korean maker community) to gather localized product feedback.
3. **Target 1.5K npm Downloads:** Maintain the momentum by pushing updates and bug fixes for our CLI tools, aiming to hit 1,500 weekly downloads.

---

Keep building, keep stumbling, keep learning, and build again. Onward to Week 9!
