# Dev.to Posting Guide for MUIN

## Quick Start

1. **Create account**: Sign up at [dev.to](https://dev.to)
2. **Get API key**: Settings → Account → DEV Community API Keys
3. **Save key**: Store in password manager as `DEVTO_API_KEY`

---

## Publishing Options

### Option 1: Manual (Recommended for First Post)
1. Go to https://dev.to/new
2. Copy/paste from `devto-posts/*.md`
3. Preview thoroughly
4. Set `published: true` in frontmatter when ready
5. Hit "Publish"

### Option 2: Dev.to API (For Automation)

```bash
# Create a new article
curl -X POST https://dev.to/api/articles \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "article": {
      "title": "Your Title",
      "published": false,
      "body_markdown": "Your markdown content...",
      "tags": ["ai", "startup", "productivity", "webdev"],
      "canonical_url": "https://blog.muin.company/blog/your-post",
      "series": "Building MUIN in Public"
    }
  }'

# Update an article (get ID from first POST response)
curl -X PUT https://dev.to/api/articles/ARTICLE_ID \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"article": {"published": true}}'
```

### Option 3: Dev.to CLI (Experimental)
```bash
npm install -g dev-to-cli
devto publish ./devto-posts/your-post.md
```

---

## Dev.to Frontmatter Reference

```yaml
---
title: "Your Attention-Grabbing Title (Max 128 chars)"
published: false  # Set to true when ready to go live
description: "SEO-friendly summary (Max 250 chars, shows in previews)"
tags: ai, startup, productivity, webdev  # Max 4 tags, comma-separated
canonical_url: https://blog.muin.company/blog/your-slug  # Link back to your blog
cover_image: https://example.com/image.jpg  # Optional: 1000x420px recommended
series: Building MUIN in Public  # Groups related posts together
---
```

**Important Notes:**
- `published: false` = draft (only you can see)
- `published: true` = live (appears in feeds)
- **Always use `canonical_url`** to point to your original blog post (SEO best practice)
- Dev.to respects canonical URLs and won't hurt your original post's SEO

---

## Best Posting Times (UTC)

Dev.to's audience is globally distributed but US/Europe-heavy. Based on analytics:

### Peak Traffic Times
- **Tuesday-Thursday**: Best engagement days
- **13:00-16:00 UTC** (8am-11am ET): Morning coffee reading (US East Coast)
- **20:00-22:00 UTC** (3pm-5pm ET): Evening wind-down (US West Coast)

### Avoid
- **Friday afternoon-Sunday**: Lower engagement
- **00:00-07:00 UTC**: Low traffic (late night US)

### For MUIN (Korea-based but global audience)
- **Post at 21:00-22:00 KST (12:00-13:00 UTC)** for European lunch + US morning
- **Or post at 01:00-02:00 KST (16:00-17:00 UTC previous day)** for US afternoon peak

**Pro tip**: Schedule posts as drafts, then publish at peak times.

---

## Tag Strategy

Dev.to allows **max 4 tags per post**. Choose wisely!

### Primary Tag (Position 1)
This is your **main category**. Pick based on content focus:
- `ai` - AI/ML content (hot topic, high traffic)
- `webdev` - General web development
- `startup` - Business/entrepreneurship angle
- `devops` - Infrastructure/deployment focus

### Secondary Tags (Positions 2-4)
Mix **traffic tags** (popular, competitive) with **niche tags** (targeted, less competitive):

**High-Traffic Tags** (harder to rank, but huge reach):
- `javascript`, `python`, `react`, `nextjs`
- `tutorial`, `beginners`, `productivity`
- `opensource`, `career`, `discuss`

**Niche Tags** (easier to rank, engaged audience):
- `buildinpublic` - Perfect for our series!
- `indiehackers` - Startup/bootstrapping community
- `automation` - Process optimization content
- `ai agents` - Specific AI sub-topic

### Recommended Tag Combos for MUIN Posts

**Technical/Tutorial Posts:**
```yaml
tags: ai, webdev, nextjs, tutorial
```

**Startup/Business Posts:**
```yaml
tags: startup, buildinpublic, ai, productivity
```

**Behind-the-Scenes Posts:**
```yaml
tags: buildinpublic, ai, startup, devjournal
```

**Architecture/Deep Dives:**
```yaml
tags: ai, webdev, architecture, productivity
```

---

## Content Optimization for Dev.to

### What Works Well
1. **Code examples** - Dev.to readers love seeing actual code
2. **Numbers/metrics** - "4 products in 1 day" > "built some products"
3. **Lessons learned** - "Here's what failed" > pure success stories
4. **Interactive tone** - "Let me show you" > "I will demonstrate"
5. **Clear structure** - H2 headers, bullet points, tables

### What to Adapt from Blog Posts
- **Add code snippets** if the blog post is light on code
- **Break up long paragraphs** - Dev.to readers skim more
- **Add "follow along" CTAs** - Dev.to is social, encourage comments
- **Use inline code formatting** for technical terms
- **Add emoji sparingly** - Some is good, too much is Reddit

### Dev.to-Specific Features
```markdown
{% embed https://twitter.com/username/status/123 %}  # Embed tweets
{% github username/repo %}  # Embed GitHub repos
{% youtube VIDEO_ID %}  # Embed videos
{% codepen CODEPEN_URL %}  # Embed interactive code
```

---

## Cross-Promotion Strategy

### When You Publish on Dev.to

**Immediate (Within 1 hour):**
1. Share on Twitter/X with:
   - Link to Dev.to post (gets their traffic)
   - 2-3 sentence hook
   - Relevant hashtags: #AI #Startup #BuildInPublic
   - Tag @ThePracticalDev (Dev.to's official account)

2. Share in relevant Telegram/Discord communities:
   - AI dev groups
   - Indie hacker communities
   - Korean tech communities (for MUIN context)

**Next Day:**
1. Engage with comments on Dev.to - reply to everyone in first 24h
2. Share in LinkedIn (more professional angle)
3. Post in Reddit (carefully - follow subreddit rules):
   - r/webdev (if technical)
   - r/startups (if business-focused)
   - r/SideProject (if product launch)

### Linking Strategy

**From Dev.to → Your Blog:**
- Always include canonical URL in frontmatter
- End post with "Read more at blog.muin.company"
- Add series navigation at bottom

**From Your Blog → Dev.to:**
- Add "Also on Dev.to" badge at top of blog posts
- Link to Dev.to profile in blog footer

**Cross-Series Linking:**
```markdown
*This is part of the "Building MUIN in Public" series:*
- [Day 1: Post title](link)
- [Day 6: This post](link) ← You are here
- [Day 10: Future post](link)
```

---

## Engagement Best Practices

### First 24 Hours Matter
- Dev.to's algorithm favors posts with early engagement
- Reply to every comment in first 24h (boosts visibility)
- Heart/unicorn thoughtful comments (encourages more)

### Comment Starters
Ask questions at the end of your post:
- "What's your experience with [topic]?"
- "Anyone else trying [approach]?"
- "Would you use something like this?"

### Series Strategy
Use the `series` frontmatter to group related posts:
```yaml
series: Building MUIN in Public
```
Benefits:
- Readers can binge your content
- Better retention across posts
- Signals commitment (not a one-off)

---

## Analytics & Iteration

### Track These Metrics
- **Views** - How many people saw it
- **Reactions** - Hearts, Unicorns, Bookmarks (quality signal)
- **Comments** - Engagement level
- **Reading time** - Are people reading or bouncing?

### Where to Find Them
- Dashboard: https://dev.to/dashboard
- Individual post stats: Click post → "Stats"

### What to Test
- **Titles**: A/B test different angles
- **Cover images**: Visual posts get 2-3x views
- **Post length**: 5-7 min read is sweet spot
- **Tags**: Rotate tag combos, see what works
- **Posting time**: Track when your posts perform best

---

## Automation Ideas

### Auto-Post Script
```javascript
// post-to-devto.js
const axios = require('axios');
const fs = require('fs');
const matter = require('gray-matter');

async function postToDevTo(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: markdown } = matter(content);
  
  const response = await axios.post('https://dev.to/api/articles', {
    article: {
      title: frontmatter.title,
      published: frontmatter.published || false,
      body_markdown: markdown,
      tags: frontmatter.tags.split(', '),
      canonical_url: frontmatter.canonical_url,
      series: frontmatter.series
    }
  }, {
    headers: {
      'api-key': process.env.DEVTO_API_KEY,
      'Content-Type': 'application/json'
    }
  });
  
  console.log(`Posted: ${response.data.url}`);
  return response.data;
}

// Usage: node post-to-devto.js ./devto-posts/my-post.md
postToDevTo(process.argv[2]);
```

### Scheduled Publishing
```bash
# Use cron or GitHub Actions to auto-publish at optimal times
# Add to .github/workflows/publish-devto.yml
name: Publish to Dev.to
on:
  schedule:
    - cron: '0 13 * * 2'  # Every Tuesday at 1pm UTC
  workflow_dispatch:  # Manual trigger

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Publish to Dev.to
        run: node post-to-devto.js ./devto-posts/next-post.md
        env:
          DEVTO_API_KEY: ${{ secrets.DEVTO_API_KEY }}
```

---

## Checklist Before Publishing

- [ ] Frontmatter complete (title, tags, canonical_url)
- [ ] `published: false` (start as draft)
- [ ] Code blocks have language tags (```javascript, not just ```)
- [ ] Images are live URLs (not local paths)
- [ ] Links work (especially canonical URL)
- [ ] Preview on Dev.to (click "Preview" button)
- [ ] Mobile preview looks good (Dev.to is mobile-heavy)
- [ ] Added clear CTAs (comment, follow, etc.)
- [ ] Series tag added if applicable
- [ ] Scheduled for optimal posting time
- [ ] Cross-promotion posts ready (Twitter, etc.)

---

## Resources

- **Dev.to API Docs**: https://developers.forem.com/api
- **Dev.to Editor Guide**: https://dev.to/p/editor_guide
- **Markdown Cheatsheet**: https://www.markdownguide.org/cheat-sheet/
- **Tag Guidelines**: https://dev.to/tags (browse to see popular tags)
- **Community Etiquette**: https://dev.to/code-of-conduct

---

## Notes for MUIN

- **Voice**: Keep the authentic, building-in-public tone
- **Transparency**: Dev.to readers appreciate honesty (including failures)
- **Technical depth**: Don't dumb down - Dev.to audience is technical
- **Community-first**: Engage genuinely, not just for promotion
- **Long game**: Consistency > viral one-off posts

**Goal**: Build reputation as a legit AI-first dev, not just another "I used ChatGPT" post.

---

*Last updated: 2026-02-07*
