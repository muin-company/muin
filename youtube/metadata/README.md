# YouTube Upload Metadata

Complete upload-ready metadata for developer productivity tool videos.

## Files

### Metadata JSON Files
- `curl-to-code-v1-metadata.json` - cURL to code converter tool demo
- `json-to-types-v1-metadata.json` - JSON to TypeScript types generator demo

## Metadata Structure

Each JSON file contains:

### 1. **Titles**
- Primary title (optimized for Korean audience)
- Alternative title (English-focused)

### 2. **Descriptions**
- Korean description with emojis, timeline, and links
- English description (full translation)
- Both include:
  - Feature highlights (✨)
  - Tool links (🔗)
  - Timeline (⏱️)
  - Call-to-action
  - Relevant hashtags

### 3. **Tags (25+ each)**
- English technical tags
- Korean localized tags
- Mix of:
  - Tool-specific keywords
  - Generic developer tools
  - Programming languages
  - Use cases

### 4. **Category**
- Category ID: `28` (Science & Technology)

### 5. **Playlists**
Suggested playlists:
- Developer Productivity Tools
- Code Generators & Converters
- TypeScript Tips & Tricks (json-to-types)
- API Development Tools (curl-to-code)
- Quick Dev Tips
- 개발자 생산성 도구

### 6. **End Screens**
Each video configured with:
- Best for viewer (top-left)
- Subscribe button (top-right)
- Playlist link (bottom-left)
- Related video cross-promotion (bottom-right)

### 7. **Cards**
- Link cards to mentioned tools
- Timed to appear during relevant sections

### 8. **Timestamps/Chapters**
Detailed timeline for each video section

### 9. **Pinned Comments**
- Bilingual (Korean primary, English secondary)
- Engagement prompt
- Tool links
- Call-to-action

## Usage

### Option 1: YouTube Studio Manual Upload

1. Go to YouTube Studio → Create → Upload videos
2. Select video file
3. Copy-paste from JSON:
   - Title: Use `title.primary`
   - Description: Use `description.korean` or `description.english`
   - Tags: Copy all items from `tags` array (comma-separated)
   - Category: Select "Science & Technology"
4. After upload:
   - Add to suggested playlists
   - Configure end screen using `endScreen` data
   - Add cards using `cards` data
   - Pin the comment from `pinned_comment`

### Option 2: YouTube Data API v3

Use the JSON files directly with the API:

```bash
# Example using YouTube Data API
curl -X POST \
  "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d @curl-to-code-v1-metadata.json
```

### Option 3: Use youtube-upload CLI

```bash
# Install youtube-upload
pip install youtube-upload

# Upload with metadata
youtube-upload \
  --title="$(jq -r '.title.primary' curl-to-code-v1-metadata.json)" \
  --description="$(jq -r '.description.korean' curl-to-code-v1-metadata.json)" \
  --category=28 \
  --tags="$(jq -r '.tags | join(",")' curl-to-code-v1-metadata.json)" \
  /Users/mj/muin/youtube/videos/curl-to-code-v1.mp4
```

## Metadata Fields Reference

### Standard YouTube API Fields
- `title` - Video title (max 100 characters)
- `description` - Video description (max 5000 characters)
- `tags` - Array of tags (max 500 characters total)
- `category` - Category ID (28 = Science & Technology)
- `language` - Primary language (ko)
- `visibility` - public/private/unlisted
- `madeForKids` - COPPA compliance (false)

### Additional Fields
- `timestamps` - Chapter markers (add to description)
- `endScreen` - End screen configuration
- `cards` - Video cards configuration
- `pinned_comment` - Pin after upload

## Post-Upload Checklist

After uploading each video:

- [ ] Verify title and description
- [ ] Check all tags are applied
- [ ] Set to "Science & Technology" category
- [ ] Add to relevant playlists
- [ ] Configure end screen (last 5-20 seconds)
- [ ] Add cards at specified timestamps
- [ ] Upload thumbnail (if exists)
- [ ] Set language to Korean
- [ ] Enable embedding
- [ ] Make public
- [ ] Pin the comment
- [ ] Add to "Developer Productivity Tools" playlist
- [ ] Share on social media

## Cross-Promotion Strategy

Both videos link to each other:
- `curl-to-code-v1` end screen → points to `json-to-types-v1`
- `json-to-types-v1` end screen → points to `curl-to-code-v1`

This creates a viewing loop and increases watch time.

## SEO Optimization

Tags are optimized for:
- **Discovery**: Generic terms (developer tools, productivity)
- **Intent**: Specific use cases (API testing, type generation)
- **Technology**: Specific tech (TypeScript, Python, curl)
- **Localization**: Korean terms for local audience
- **Competition**: Mix of high-volume and long-tail keywords

## Analytics Tracking

After upload, track:
- Click-through rate (CTR) on thumbnails
- Average view duration
- Traffic sources (search, suggested, external)
- Top search terms leading to videos
- Audience retention graphs

Optimize titles/thumbnails if CTR < 4% after first week.

---

**Created:** 2026-02-07 03:47 KST  
**Updated:** 2026-02-07 03:47 KST  
**Status:** Ready for upload
