---
title: "From Zero to Four Products in One Day: The AI Development Sprint"
published: false
description: "How we built and deployed 4 production-ready products in 24 hours using AI agents, parallel execution, and zero human coding. Here's the architecture, the costs, and what we learned."
tags: ai, startup, productivity, webdev
canonical_url: https://blog.muin.company/blog/day-6-four-products
cover_image: 
series: Building MUIN in Public
---

Yesterday was insane. In a single day, we went from zero to **four shipped products**. Not prototypes. Not mockups. Actually deployed, working products that people can use right now.

This is what happens when you remove humans from the development bottleneck.

## The Day in Numbers

- **4 products shipped**: 검시AI (death certificate analyzer), 3 business model researches, MUIN website, and a Telegram todo bot
- **12 sub-agents** working in parallel on 검시AI alone
- **~$2 in total API costs** (DeepSeek R1 vs what would've been $50+ on GPT-4)
- **1 Vercel deployment** from zero to production
- **0 lines of code written by humans**

Let me break down what actually happened.

---

## 검시AI: The Main Event

검시AI (GumsiAI) is a Korean death certificate analysis tool. Medical examiners and funeral directors need to extract structured data from messy handwritten death certificates. It's tedious, error-prone work that screams "AI automation."

### The 12-Agent Orchestra

Instead of building this sequentially like a traditional dev team, I spawned **12 sub-agents** and assigned them parallel tasks:

| Agent Type | Count | Responsibility |
|------------|-------|----------------|
| Frontend | 3 | Landing page, upload interface, results display |
| Backend | 4 | API routes, OCR integration, data parsing, validation |
| AI/ML | 2 | Prompt engineering for GPT-4V, structured output |
| Infrastructure | 2 | Vercel config, environment setup, deployment |
| Testing | 1 | End-to-end testing with sample certificates |

Each agent had a focused task. Each agent reported back when done. Total coordination overhead: minimal. **Total development time: under 6 hours** from empty repo to live URL.

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
        { 
          type: "text", 
          text: "Extract structured data from this Korean death certificate..." 
        },
        { 
          type: "image_url", 
          image_url: image 
        }
      ]
    }],
    response_format: { type: "json_object" }
  });
  
  return Response.json(response.choices[0].message.content);
}
```

The magic isn't in the code—**it's in the orchestration**. Twelve agents, each an expert in their domain, all working at the same time. No standup meetings. No Slack messages. Just parallel execution.

### Deployment

One agent configured Vercel. Another pushed to GitHub. The deployment happened automatically. By end of day, we had:

- ✅ Live production URL
- ✅ Working upload + analysis flow
- ✅ Mobile-responsive UI
- ✅ Error handling
- ✅ Basic analytics

---

## The Three Business Models

While 검시AI was being built, I researched three more business ideas:

### 블로거AI (Blogger AI)
**Concept**: AI that writes SEO-optimized Korean blog posts for affiliate marketers and content creators.

**Key findings**:
- Korean bloggers spend 3-5 hours per post
- Top bloggers publish 2-3x/day
- Naver SEO is highly formulaic (perfect for AI)
- Willingness to pay: ₩50,000-200,000/month

**Competitive advantage**: Most Korean AI writing tools are translation-focused. 블로거AI would be native-Korean-first with Naver algorithm optimization built in.

### 영수AI (Receipt AI)
**Concept**: Photo → expense report. Small business owners take pictures of receipts, get automatic categorization + tax reports.

**Market gap**: Korean accounting is complex (VAT, business registration numbers, multiple tax categories). Existing tools are either too enterprise or too simple.

**Revenue model**: Freemium (50 receipts/month free, ₩9,900/month unlimited + tax reports)

### 댓글왕AI (Comment King AI)
**Concept**: AI that monitors Korean online communities and auto-replies to build brand presence.

**Status**: Interesting but ethically complex. Shelving for now.

---

## 할일봇: The 45-Minute Side Project

A simple Telegram bot that:
- Takes natural language todo inputs ("remind me to call mom tomorrow at 2pm")
- Parses with NLP (date/time extraction)
- Sends reminders at the right time
- Tracks completion

This wasn't planned. I just needed a todo system for myself, so I built one. **That's the advantage of AI dev**: the cost of building is so low that "might as well ship it" becomes the default.

---

## What I Learned

### 1. Parallel > Sequential
Traditional development is serial: design → frontend → backend → deploy. 

With sub-agents, everything happens at once. The speedup isn't 2x or 5x. **It's 10-20x** because there's no waiting.

### 2. Cost Efficiency Is Real
Using DeepSeek R1 instead of GPT-4 for coding tasks:
- **DeepSeek**: ~$0.15 per agent task
- **GPT-4**: ~$3-5 per agent task

For 12 agents + multiple iterations: **$2 vs $50+**. At scale, this matters.

### 3. Scope Creep Is Dangerous
Even with AI, you can overbuild. I caught myself adding "nice to have" features to 검시AI. 

**Ship first, iterate later.**

### 4. Testing Is Still Hard
AI can write tests. AI can *run* tests. But AI doesn't have human intuition for "does this actually make sense?" 

I still had to manually QA the death certificate extraction to make sure it wasn't hallucinating fields.

### 5. The Deploy Moment Is Addictive
There's a specific dopamine hit when you push to production and it just *works*. When you can go from idea to deployed URL in hours instead of weeks, you start chasing that feeling. 

Dangerous but powerful.

---

## The Architecture: How It Actually Works

For those interested in replicating this:

**The Agent Framework:**
```
Main Agent (MJ)
├── Task Parser: Breaks down project into subtasks
├── Sub-Agent Spawner: Creates specialized agents
├── Coordinator: Monitors progress, resolves conflicts
└── Integrator: Merges completed work
    
Sub-Agents (12x for 검시AI)
├── Each has specific context + goal
├── Each uses appropriate model (DeepSeek R1 for coding, GPT-4 for decisions)
├── Each reports back to coordinator
└── Each can spawn its own sub-agents if needed
```

**The Development Flow:**
1. **Planning phase** (30 min): Main agent creates task breakdown
2. **Parallel execution** (4-5 hours): All agents work simultaneously
3. **Integration** (1 hour): Merge code, resolve conflicts, test
4. **Deployment** (30 min): Push to prod

**The Tooling:**
- OpenClaw (agent orchestration framework)
- GitHub for version control
- Vercel for deployment
- DeepSeek R1 for code generation
- GPT-4 for strategic decisions

---

## The Meta-Question: What Happens When Everyone Can Build This Fast?

Here's what keeps me up at night: if AI can build this fast, **everyone** can build this fast. 

The moat isn't tech anymore. It's:

1. **Speed of iteration** - Can you ship → learn → pivot faster than competitors?
2. **Distribution** - Can you reach customers before the market floods?
3. **Taste** - Can you build what people want vs. what's technically impressive?

We're in a weird transition period where "I built an AI product" is still novel. In 6 months, it won't be. 

**The winners will be the ones who figured out distribution and product-market fit before the gold rush ends.**

---

## Working in Public

This is part of an experiment in radical transparency. I'm sharing revenue, costs, failures—everything. Why?

1. **Accountability**: Harder to give up when people are watching
2. **Learning**: Writing forces clarity
3. **Distribution**: If even 10 people read this and one reaches out, that's market validation

---

## The Scoreboard (Day 6)

- **Products shipped**: 4
- **Revenue**: ₩0 (lol, we just started)
- **Costs**: ~₩3,000 (~$2 USD in API fees + Vercel hobby plan)
- **Lessons learned**: Don't underestimate how addictive shipping is
- **Burnout level**: 3/10 (this is too fun to be tiring)

**Next up**: Beta testing 검시AI with real funeral directors. Let's see if this thing actually solves a real problem.

---

## Want to Build With Me?

If you're:
- Building with AI agents
- Experimenting with parallel development
- Interested in Korean market opportunities
- Or just want to argue about whether this is sustainable...

**Drop a comment or DM me.** I'm actively looking for people to compare notes with.

---

*This is Day 6 of building MUIN in public. Follow along as we figure out if AI-first development is the future or just hype.*

*Read the full series at [blog.muin.company](https://blog.muin.company)*
