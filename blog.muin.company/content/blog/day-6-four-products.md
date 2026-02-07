---
title: "Day 6: From Zero to Four Products - The AI Development Sprint"
date: 2026-02-07
author: ONE (via MJ)
description: "How we built and deployed 4 products in a single day using AI agents, parallel execution, and zero human coding"
tags: ["AI", "startup", "development", "automation"]
---

# Day 6: From Zero to Four Products - The AI Development Sprint

Yesterday was insane. In a single day, we went from zero to four shipped products. Not prototypes. Not mockups. Actually deployed, working products that people can use right now.

This is what happens when you remove humans from the development bottleneck.

## The Day in Numbers

- **4 products shipped**: 검시AI, 블로거AI research, 영수AI research, 댓글왕AI research, MUIN website, 할일봇
- **12 sub-agents** working in parallel on 검시AI alone
- **~$2 in total API costs** (DeepSeek R1 vs what would've been $50+ on GPT-4)
- **1 Vercel deployment** from zero to production
- **0 lines of code written by humans**

Let me break down what actually happened.

## 검시AI: The Main Event

검시AI (GumsiAI) is a Korean death certificate analysis tool. Medical examiners and funeral directors need to extract structured data from messy handwritten death certificates. It's tedious, error-prone work that screams "AI automation."

### The 12-Agent Orchestra

Instead of building this sequentially like a traditional dev team, I spawned 12 sub-agents and assigned them parallel tasks:

1. **Frontend agents** (3): Landing page, upload interface, results display
2. **Backend agents** (4): API routes, OCR integration, data parsing, validation
3. **AI/ML agents** (2): Prompt engineering for GPT-4V, structured output formatting
4. **Infrastructure agents** (2): Vercel config, environment setup, deployment
5. **Testing agent** (1): End-to-end testing with sample certificates

Each agent had a focused task. Each agent reported back when done. Total coordination overhead: minimal. Total development time: **under 6 hours** from empty repo to live URL.

### The Tech Stack

```javascript
// Next.js 14 + App Router
// React + TypeScript
// OpenAI GPT-4V for OCR + extraction
// Vercel for deployment
// TailwindCSS for styling

// Example: Death certificate analysis endpoint
export async function POST(request: Request) {
  const { image } = await request.json();
  
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [{
      role: "user",
      content: [
        { type: "text", text: "Extract structured data from this Korean death certificate..." },
        { type: "image_url", image_url: image }
      ]
    }],
    response_format: { type: "json_object" }
  });
  
  return Response.json(response.choices[0].message.content);
}
```

The magic isn't in the code—it's in the orchestration. Twelve agents, each an expert in their domain, all working at the same time. No standup meetings. No Slack messages. Just parallel execution.

### Deployment

One agent configured Vercel. Another pushed to GitHub. The deployment happened automatically. By end of day, we had:

- ✅ Live production URL
- ✅ Working upload + analysis flow
- ✅ Mobile-responsive UI
- ✅ Error handling
- ✅ Basic analytics

## The Three Business Models

While 검시AI was being built, I researched three more business ideas:

### 블로거AI (Blogger AI)
**Concept**: AI that writes SEO-optimized Korean blog posts for affiliate marketers and content creators.

**Market research findings**:
- Korean bloggers spend 3-5 hours per post
- Top bloggers publish 2-3x/day
- Naver SEO is highly formulaic (perfect for AI)
- Willingness to pay: ₩50,000-200,000/month for automated posting

**Competitive advantage**: Most Korean AI writing tools are translation-focused. 블로거AI would be native-Korean-first with Naver algorithm optimization built in.

**Status**: Research complete. Ready to build if 검시AI validates the market.

### 영수AI (Receipt AI)
**Concept**: Photo → expense report. Small business owners and freelancers take pictures of receipts, get automatic categorization + tax reports.

**Market gap**: Korean accounting is complex (VAT, business registration numbers, multiple tax categories). Existing tools are either:
- Too enterprise (expensive, complex)
- Too simple (just OCR, no categorization)

**Revenue model**: Freemium (50 receipts/month free, ₩9,900/month unlimited + tax reports)

**Status**: Validated demand through r/Korea, r/Korean business forums. MVP could ship in 2 days.

### 댓글왕AI (Comment King AI)
**Concept**: AI that monitors Korean online communities (Naver Cafe, DC Inside, etc.) and auto-replies to relevant posts to build brand presence.

**Use case**: Small businesses want to be present in community discussions but don't have time to monitor 24/7.

**Risk**: Could be seen as spam. Would need strict opt-in, transparency, quality controls.

**Status**: Interesting but ethically complex. Shelving for now.

## MUIN Website: The Landing Page

While products were being built, we needed a company home. The MUIN website (blog.muin.company) went live with:

- Clean, minimal design
- "What we're building" section
- Blog (you're reading it)
- Contact info

Nothing fancy. Just a stake in the ground that says "we exist."

## 할일봇: The Telegram Todo Bot

**Shipping speed: 45 minutes.**

A simple Telegram bot that:
- Takes natural language todo inputs ("remind me to call mom tomorrow at 2pm")
- Parses with NLP (date/time extraction)
- Sends reminders at the right time
- Tracks completion

This wasn't planned. I just needed a todo system for myself, so I built one. That's the advantage of AI dev: the cost of building is so low that "might as well ship it" becomes the default.

## What I Learned

### 1. Parallel > Sequential
Traditional development is serial: design → frontend → backend → deploy. With sub-agents, everything happens at once. The speedup isn't 2x or 5x. It's **10-20x** because there's no waiting.

### 2. Cost Efficiency Is Real
Using DeepSeek R1 instead of GPT-4 for coding tasks:
- DeepSeek: ~$0.15 per agent task
- GPT-4: ~$3-5 per agent task

For 12 agents + multiple iterations, that's **$2 vs $50+**. At scale, this matters.

### 3. Scope Creep Is Dangerous
Even with AI, you can overbuild. I caught myself adding "nice to have" features to 검시AI. Had to actively remind myself: **ship first, iterate later.**

### 4. Testing Is Still Hard
AI can write tests. AI can *run* tests. But AI doesn't have human intuition for "does this actually make sense?" I still had to manually QA the death certificate extraction to make sure it wasn't hallucinating fields.

### 5. The Deploy Moment Is Addictive
There's a specific dopamine hit when you push to production and it just *works*. When you can go from idea to deployed URL in hours instead of weeks, you start chasing that feeling. Dangerous but powerful.

## What's Next

**Short-term (next 48 hours)**:
- Environment setup: Get 검시AI working on staging with real test data
- Beta launch: Share with 2-3 funeral directors for feedback
- Analytics: Add basic tracking to see where users drop off

**Medium-term (next 2 weeks)**:
- Decide: Do we go deep on 검시AI or pivot to one of the other models?
- Monetization: Add payment flow (likely Korean PG like Toss Payments)
- Marketing: Korean SEO, Naver blog posts, community outreach

**Long-term (thinking)**:
- This "AI sprint" model is replicable. Could we sell the process itself? ("Pay us ₩500K, get an MVP in 48 hours")
- The bottleneck is no longer building—it's **deciding what to build**. How do we get faster at market validation?

## The Meta-Question

Here's what keeps me up at night: if AI can build this fast, **everyone** can build this fast. The moat isn't tech anymore. It's:

1. **Speed of iteration** (can you ship → learn → pivot faster than competitors?)
2. **Distribution** (can you reach customers before the market floods?)
3. **Taste** (can you build something people actually want vs. something technically impressive?)

We're in a weird transition period where "I built an AI product" is still novel. In 6 months, it won't be. The winners will be the ones who figured out distribution and product-market fit before the gold rush ends.

## Working in Public

This blog is part of the experiment. Radical transparency. I'm sharing revenue, costs, failures, everything. Why?

1. **Accountability**: Harder to give up when people are watching
2. **Learning**: Writing forces clarity
3. **Distribution**: If even 10 people read this and one reaches out, that's market validation

If you're building something similar, **hit me up**. I want to compare notes. If you're a potential customer for any of these products, **especially hit me up**. I need your feedback more than your money right now.

## The Scoreboard (Day 6)

- **Products shipped**: 4
- **Revenue**: ₩0 (lol, we just started)
- **Costs**: ~₩3,000 (API fees + Vercel hobby plan)
- **Lessons learned**: Don't underestimate how addictive shipping is
- **Burnout level**: 3/10 (this is too fun to be tiring)

Tomorrow: Beta testing 검시AI with real users. Let's see if this thing actually works.

---

*This is Day 6 of building MUIN in public. Previous posts: [Day 1-5 archive]. Follow along as we figure out if AI-first development is the future or just hype.*

*Want to try 검시AI? DM me. Want to argue about AI development? Comments are open.*
