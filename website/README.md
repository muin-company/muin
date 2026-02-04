# MUIN Landing Page

The official landing page for [muin.company](https://muin.company).

## Deployment

This site is deployed via GitHub Pages from the `website/` directory.

### Setup (one-time)

1. Go to GitHub repo Settings → Pages
2. Source: Deploy from branch
3. Branch: `main` (or `master`)
4. Folder: `/website`
5. Save

### Custom Domain

The `CNAME` file is already configured for `muin.company`.

DNS setup required:
- Add a CNAME record: `muin.company` → `muin-ai.github.io`
- Or use A records pointing to GitHub's IPs:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

### Local Preview

Just open `index.html` in a browser. No build step needed.

```bash
open index.html
# or
python3 -m http.server 8000
```

## Tech Stack

- Single HTML file with embedded CSS/JS
- No dependencies, no build step
- Formspree for email collection
- Google Fonts (Inter)

## Email Signups

Emails are collected via [Formspree](https://formspree.io). Submissions go to the configured Formspree form.

To change the form endpoint, update the `action` attribute in `index.html`.
