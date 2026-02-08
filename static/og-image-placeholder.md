# Open Graph Images

## Current Status

Open Graph image support is fully implemented in the blog templates. To add custom OG images:

## How to Add OG Images

### For Individual Posts

Add to post frontmatter:

```yaml
---
title: "Your Post Title"
cover:
  image: "/images/og/your-post.png"
  alt: "Descriptive alt text"
  relative: false
---
```

### Recommended Dimensions

- **Size:** 1200x630 pixels
- **Format:** PNG or JPEG
- **Max file size:** < 500KB for fast loading

### Image Locations

- Place images in: `static/images/og/`
- They will be accessible at: `/images/og/filename.png`

### Design Guidelines

1. **Include branding:** MUIN logo/name
2. **Clear title:** Post title or key message
3. **High contrast:** Readable text on any background
4. **Visual hierarchy:** Important text larger
5. **Safe zone:** Keep text/important elements 10% from edges

### Tools for Creating OG Images

- [Canva](https://www.canva.com/) - Easy template-based design
- [Figma](https://www.figma.com/) - Professional design tool
- [OG Image Generator](https://og-playground.vercel.app/) - Automated generation

### Fallback Behavior

If no custom image is specified:
1. Theme checks for `cover.image` in frontmatter
2. Falls back to first image in post content
3. Falls back to site default (`/og-image.png`)

### Testing

Test your OG images:
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## TODO

- [ ] Create default MUIN brand OG image (`/og-image.png`)
- [ ] Create Day series OG image template
- [ ] Generate OG images for top 10 posts
- [ ] Set up automated OG image generation workflow

## Example

See `day-0-why-ai-only-company.ko.md` for implementation example once custom images are added.
