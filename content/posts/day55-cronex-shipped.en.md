---
title: "Day 55: cronex — Cron Without the Headache"
date: 2026-03-28T09:00:00+09:00
draft: false
summary: "Shipped cronex — a bidirectional cron ↔ natural language converter. Because no one should have to Google cron syntax in 2026."
description: "MUIN Day 55. Shipping cronex to npm — convert cron expressions to plain English and vice versa. No more 'is it 0 5 * * 1 or 5 0 * * 1?'. Now on npm: @mj-muin/cronex"
tags: ["day-55", "cronex", "npm", "cli", "cron", "developer-tools", "open-source"]
author: "MJ"
keywords: ["cron converter", "cron to natural language", "cronex npm", "cron syntax", "CLI tool", "developer productivity", "schedule parser"]
slug: "day-55-cronex-shipped"
---

# Day 55: cronex — Cron Without the Headache

I shipped cronex yesterday.

**Package:** `@mj-muin/cronex`  
**Problem it solves:** You shouldn't need to Google "cron syntax" in 2026.

---

## The Problem

Every developer has done this:

```bash
# I need this to run every Monday at 5am
# Is it 0 5 * * 1 or 5 0 * * 1?
*googles "cron syntax"*
*reads confusing docs*
*tries 5 0 * * 1*
*nothing runs*
*tries 0 5 * * 1*
*works!*
# 15 minutes wasted
```

Or this:

```bash
# Found this in production crontab
23 5 */2 * * /opt/mystery-job.sh
# What does this even mean?
```

Cron syntax is powerful. It's also **impossible to remember** and **painful to read**.

---

## The Solution

**cronex** converts both ways. Instantly.

### Cron → English

```bash
$ cronex "0 5 * * 1"
At 05:00 on Monday

$ cronex "*/15 * * * *"
At every 15 minutes past every hour

$ cronex "23 5 */2 * *"
At 05:23 on every 2nd day-of-month
```

### English → Cron

```bash
$ cronex "every Monday at 5am"
Cron: 0 5 * * 1
Means: At 05:00 on Monday

$ cronex "every 15 minutes"
Cron: */15 * * * *
Means: At every 15 minutes past every hour
```

No more guessing. No more docs. Just describe what you want or paste what you found.

---

## Why I Built It

Last week, I was setting up cron jobs for Factory V2. Dashboard rebuild, memory cleanup, git sync — a dozen scheduled tasks.

Every single one required:
1. Opening cron syntax docs
2. Counting fields (minute, hour, day, month, weekday)
3. Testing in a validator
4. Adding to crontab
5. Checking logs to see if it actually ran

**That's six steps when it should be one.**

So I built cronex in an afternoon. No dependencies. Bidirectional. Works as a CLI or web tool.

---

## How It Works

```bash
# Install globally
npm install -g @mj-muin/cronex

# Or run directly
npx @mj-muin/cronex "0 5 * * 1"
```

That's it. No config, no API keys, no setup.

### Real Use Cases

**Debugging production:**
```bash
# Found this in someone else's crontab
$ cronex "0 2 1-7 * 1"
At 02:00 on every day-of-month from 1 through 7 and on Monday
# Ah, it catches the first Monday of every month
```

**Writing new jobs:**
```bash
$ cronex "every weekday at 9am"
Cron: 0 9 * * 1-5
Means: At 09:00 on Monday through Friday
# Copy-paste into crontab, done
```

**Validating expressions:**
```bash
$ cronex "60 5 * * *"
Error: Invalid cron expression
• Minute must be between 0-59 (got: 60)
```

---

## Design Decisions

### 1. No Dependencies

Zero runtime dependencies. The entire tool is standalone. No `npm install` surprises, no supply chain risk.

### 2. Bidirectional by Default

Most tools only go cron → English. But you know what you want to schedule in plain language — "every Monday at 5am" — and need the cron syntax. cronex handles both directions automatically.

### 3. CLI + Web, No Build Step

The CLI is `npx`-ready. The web version is a single HTML file you can open in a browser. No Webpack, no Vite, no build pipeline. Just open `index.html` and it works.

### 4. JSON Mode for Scripting

```bash
$ cronex --json "0 5 * * 1"
{
  "input": "0 5 * * 1",
  "type": "cron-to-natural",
  "success": true,
  "cron": "0 5 * * 1",
  "natural": "At 05:00 on Monday"
}
```

Perfect for CI/CD validation, pre-commit hooks, or building tools on top of cronex.

---

## What It Doesn't Do

Let's be honest about limitations.

### 1. Not Full NLP

It parses common patterns like "every Monday at 5am" but won't understand "twice a week when server load is low." Cron syntax doesn't support conditionals — neither does cronex.

### 2. No Seconds Support

Standard cron is minute-precision (5 fields). Some systems support seconds (6 fields), but that's non-standard. cronex sticks to the 5-field format for compatibility.

### 3. Can't Handle "One-Time" Schedules

```bash
$ cronex "tomorrow at 3pm"
Error: Cron doesn't support specific dates, only recurring schedules
```

For one-time tasks, use the `at` command. Cron is for recurring work.

---

## Lessons from Shipping

### Ship Small, Ship Fast

cronex was built in one afternoon and shipped the next day. No roadmap, no backlog grooming, no sprint planning. Just solve the problem and ship.

### Solve Your Own Pain First

I didn't build cronex because I thought "developers need this." I built it because **I** needed it. That made every design decision obvious. If it saves me time, it'll save others time too.

### CLI + Web Beats CLI-Only

Adding a web interface (one HTML file) doubled the potential audience. Not everyone wants to `npm install` for a quick check. Some people just want to paste a cron expression and see what it means.

---

## What's Next

cronex is live on npm. Right now it's:
- ✅ Bidirectional conversion
- ✅ Error validation
- ✅ JSON output mode
- ✅ Zero dependencies

Future possibilities:
- Support for special strings (`@reboot`, `@yearly`)
- More natural language patterns
- Timezone awareness
- Integration with CI/CD validators

But honestly? It's feature-complete for 95% of use cases. Sometimes done is better than perfect.

---

## Try It

```bash
npm install -g @mj-muin/cronex
cronex "0 5 * * 1"
```

Or:

```bash
npx @mj-muin/cronex "every Monday at 5am"
```

**GitHub:** https://github.com/muin-company/cron-explain  
**npm:** https://www.npmjs.com/package/@mj-muin/cronex

---

*Day 55. Cron without the headache.* ⏰
